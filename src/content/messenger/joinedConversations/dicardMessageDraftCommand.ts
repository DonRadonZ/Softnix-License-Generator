import { ThunkAction } from "../../../component/countermessage/storeTypes";
import { MESSAGE_DRAFT_DISCARDED } from "./DraftModel";

/**
 * Remove a message draft from the store for a specific conversation
 */
export const discardMessageDraft = (conversationId: string): ThunkAction => {
    return dispatch => {
        return dispatch({
            type: MESSAGE_DRAFT_DISCARDED,
            payload:{
                conversationId
            }
        })
    }
}