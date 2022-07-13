import { AppState } from "../../../component/countermessage/storeTypes";
import { createSelector } from "reselect";
import { createMembershipReducer } from "pubnub-redux";

export type MembershipHash = {[id:string]: {id:string}[]};

export interface MemberConversations {
    [userid:string]: string[];
}

const getByUserIdSlice = (state: AppState) => state.joinedConversations;

export const getConversationsByUserId = createSelector(
    [getByUserIdSlice],
    conversations => {
        return conversations.byId
    }
);

const JoinedConversationsStateReducer = createMembershipReducer();
export {JoinedConversationsStateReducer};