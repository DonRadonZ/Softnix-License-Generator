import { ThunkAction } from "../../../component/countermessage/storeTypes";
import { getCurrentConversationId } from './../currentConversation/currentConversationModel';
import { sendSignal } from "pubnub-redux";
import { TypingIndicatorType } from "./typingIndicatorModel";

/**
 * Send a typing indicator to the current conversation
 *
 * This command does not handle failure and leaves the error to the caller
 */
export const sendTypingIndicator = (
  typingIndicatorType: TypingIndicatorType
): ThunkAction => {
    return (dispatch, getState) => {
        const state = getState();
        return dispatch(
            sendSignal({
                channel: getCurrentConversationId(state),
                message: { type: typingIndicatorType}  
            })
        );
    };
};