import { ThunkAction } from "../../../component/countermessage/storeTypes";
import { getCurrentConversationId } from "../currentConversation/currentConversationModel";
import { DraftMessage } from "./draft";
import { sendMessage as sendPubnubMessage } from "pubnub-redux";

/**
 * Send a message to the current conversation
 *
 * This command does not handle failure and leaves the error to the caller
 */
export const sendMessage = (message: DraftMessage): ThunkAction => {
    return(dispatch, getState) => {
        const state = getState();
        return dispatch(
          sendPubnubMessage({
            channel: getCurrentConversationId(state),
            message
          })
        )
    }
}