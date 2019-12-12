import { gql } from 'apollo-boost';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient, OperationVariables, QueryOptions, MutationOptions } from "apollo-client";
import { setContext } from 'apollo-link-context';
import { createHttpLink } from "apollo-link-http";
import { ToastsContainer } from "../../containers";
import introspectionQueryResultData from '../../fragmentTypes.json';
import { AuthResponse } from "./facebook";
import { IUser, ICreatePartyInput, ICreatePartyPayload, IParty, IJoinPartyInput, IJoinPartyPayload, ILeavePartyInput, ILeavePartyPayload } from '../../interfaces';
import config from '../../config';

interface IApiResponse {
  status: 'ok' | 'error';
}

interface IAuthApiResponse extends IApiResponse {
  token: string | null;
}

export type AuthApiRequest = AuthResponse;

const Fragmets = {
  party: gql`
    fragment PartyFields on Party {
      id
      name
      password
      code
      isJoined
      isHost
      isProtected
      participantCount
      participants
    }
  `,
}

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({fragmentMatcher});

export default class Api {
  private static instance: Api;

  private static getInstance(): Promise<Api> {
    return new Promise(complete => {
      if (!this.instance) {
        this.instance = new Api();
      }
      complete(this.instance);
    })
  }

  private client = new ApolloClient({
    cache,
    link: setContext((_, {headers}) => {
      const token = localStorage.getItem('Auth-Token');
      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : '',
        }
      }
    }).concat(createHttpLink({uri: `${config.apiEndpoint}/graph`})),
  });

  public post(path: string, data?: any): Promise<IApiResponse> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('Auth-Token');

      fetch(`${config.apiEndpoint}/${path}`, {
        method: 'POST',
        body: data ? JSON.stringify(data) : null,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      }).then(response => {
        response.json().then(jsonData => {
          if (jsonData.status !== 'error') {
            resolve(jsonData);
          }
          else {
            reject(jsonData);
          }
        });
      }, error => reject(error)).catch(error => reject(error));
    });
  }

  public async query<T, TVariables = OperationVariables>(options: QueryOptions<TVariables>): Promise<T | null> {
    try {
      const {data, errors} = await this.client.query({
        ...options,
        fetchPolicy: 'network-only',
      });
      if (errors) {
        console.error(errors);
      }
      return data;
    } catch(error) {
      ToastsContainer.displaySystemError();
      throw error;
    }
  }

  public async mutate<T, TVariables = OperationVariables>(options: MutationOptions<TVariables>): Promise<any | null> {
    try {
      const {data, errors} = await this.client.mutate({
        ...options,
        fetchPolicy: 'no-cache',
      });
      if (errors) {
        console.error(errors);
      }
      return data;
    } catch(error) {
      ToastsContainer.displaySystemError();
      throw error;
    }
  }

  public static async init({token}: {
    token?: string | null,
  }): Promise<void> {
    const instance = await this.getInstance();
    if (token !== undefined) {
      await instance.storeToken(token);
    }
  }

  public static signIn(params: AuthApiRequest): Promise<IAuthApiResponse> {
    return new Promise(async (complete, error) => {
      try {
        complete(await Api.instance.post('auth', params) as IAuthApiResponse);
      }
      catch (e) {
        complete({status: 'error', token: null});
      }
    });
  }

  public static async signOut() {
    localStorage.clear();
  }

  public static async fetchInitialAppData(): Promise<{
    user: IUser | null,
  }> {
    const data: any = await Api.instance.query({
      query: gql`{ user { id name picture } }`,
    });
    return data;
  }

  public static async createParty(input: ICreatePartyInput): Promise<ICreatePartyPayload> {
    const data: any = await Api.instance.mutate({
      mutation: gql`
        mutation Mutate($input: CreatePartyInput!) {
          parties {
            createParty(input: $input) {
              status
              userErrors { fieldName messages }
              node {
                id
                name
                code
              }
            }
          }
        }
      `,
      variables: { input }
    });
    return data.parties.createParty;
  }

  public static async fetchParty(code: string): Promise<IParty | null> {
    const data: any = await Api.instance.query({
      query: gql`query ($code: String!) {
        party(code: $code) {
          ...PartyFields
        }
      }
      ${Fragmets.party}
      `,
      variables: {code}
    });
    return data.party;
  }

  public static async joinParty(input: IJoinPartyInput): Promise<IJoinPartyPayload> {
    const data: any = await Api.instance.mutate({
      mutation: gql`
        mutation Mutate($input: JoinPartyInput!) {
          parties {
            joinParty(input: $input) {
              status
              userErrors { fieldName messages }
              node {
                ...PartyFields
              }
            }
          }
        }
        ${Fragmets.party}
      `,
      variables: { input }
    });
    return data.parties.joinParty;
  }

  public static async leaveParty(input: ILeavePartyInput): Promise<ILeavePartyPayload> {
    const data: any = await Api.instance.mutate({
      mutation: gql`
        mutation Mutate($input: LeavePartyInput!) {
          parties {
            leaveParty(input: $input) {
              status
              userErrors { fieldName messages }
              node {
                ...PartyFields
              }
            }
          }
        }
        ${Fragmets.party}
      `,
      variables: { input }
    });
    return data.parties.leaveParty;
  }

  private async storeToken(token: string | null) {
    if (token) {
      localStorage.setItem('Auth-Token', token);
    } else {
      localStorage.removeItem('Auth-Token')
    }
  }
}
