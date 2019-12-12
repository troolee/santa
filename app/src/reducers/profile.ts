import { Action } from "redux";
import { IProfileState } from "./interfaces";
import { Api } from "../utils/api";
import { IParty } from "../interfaces";

const initialState: IProfileState = {
  parties: null,
}

export function fetchParties() {
  return async (dispatch: any) => {
    dispatch(partiesRequest());
    const parties = await Api.fetchParties();
    dispatch(partiesReceive(parties || []));
  };
}

const PARTIES_REQUEST = 'PARTIES_REQUEST';
interface IPartiesRequestAction extends Action<'PARTIES_REQUEST'> {
}
const partiesRequest = () => {
  return {
    type: PARTIES_REQUEST,
  }
}

const PARTIES_RECEIVE = 'PARTIES_RECEIVE';
interface IPartiesReceiveAction extends Action<'PARTIES_RECEIVE'> {
  parties: IParty[],
}
const partiesReceive = (parties: IParty[]) => {
  return {
    type: PARTIES_RECEIVE,
    parties,
  }
}

type Actions = (
  IPartiesRequestAction | IPartiesReceiveAction
)

export default function(state = initialState, action: Actions) {
  switch(action.type) {
    case PARTIES_REQUEST:
      return {
        ...state,
      }
    case PARTIES_RECEIVE:
      return {
        ...state,
        parties: action.parties,
      }
    default:
      return state;
  }
}
