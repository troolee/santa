import { Action } from "redux";
import { IPartyState } from "./interfaces";
import { IParty } from "../interfaces";
import { Api } from "../utils/api";

const initialState: IPartyState = {
  isLoading: true,
  current: null,
}

const PARTY_RECEIVE = 'PARTY_RECEIVE';
interface IPartyReceiveAction extends Action<'PARTY_RECEIVE'> {
  party: IParty | null,
}
export const partyReceive = (party: IParty | null) => {
  return {
    type: PARTY_RECEIVE,
    party,
  }
}

const PARTY_REQUEST = 'PARTY_REQUEST';
interface IPartyRequestAction extends Action<'PARTY_REQUEST'> {
}
export const partyRequest = () => {
  return {
    type: PARTY_REQUEST,
  }
}

export function fetchParty(code: string) {
  return async (dispatch: any) => {
    dispatch(partyRequest());
    const party = await Api.fetchParty(code);
    dispatch(partyReceive(party));
  };
}

export function joinParty(party: IParty, password: string | null) {
  return async (dispatch: any) => {
    // dispatch(partyRequest());
    const res = await Api.joinParty({party: party.id, password});
    console.log(res);
    if (res.userErrors) {
      ////
    }
    else {
      // dispatch(partyReceive(res.node));
    }
  };
}

type AuthActions = (
  IPartyReceiveAction | IPartyRequestAction
)

export default function auth(state = initialState, action: AuthActions) {
  switch(action.type) {
    case PARTY_RECEIVE:
      return {
        ...state,
        isLoading: false,
        current: action.party,
      }
    case PARTY_REQUEST:
      return {
        ...state,
        isLoading: true,
        current: null,
      }
    default:
      return state;
  }
}
