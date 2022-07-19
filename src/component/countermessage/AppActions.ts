import { focusOnConversationAction } from "../../content/messenger/currentConversation/currentConversationModel";
import {
  MessageDraftUpdatedAction,
  MessageDraftDiscardedAction
} from "../../content/messenger/joinedConversations/DraftModel";
import {
  logingInAction,
  loginSucceededAction
} from "../../content/authentication/login/authenticationModel";
import {
  menuViewDisplayedAction,
  currentConversationViewDisplayedAction,
  conversationMembersViewDisplayedAction,
  joinConversationViewDisplayedAction,
  menuViewHiddenAction,
  currentConversationViewHiddenAction,
  conversationMembersViewHiddenAction,
  joinConversationViewHiddenAction
} from "../../content/messenger/layout/LayoutActions";
import { SignalReceivedAction } from "pubnub-redux/dist/features/signal/SignalActions";
import {
  TypingIndicatorEnvelope,
  RemoveTypingIndicatorAction,
  RemoveTypingIndicatorAllAction
} from "../../content/messenger/typingIndicator/typingIndicatorModel";
 import { MessageReceivedAction } from "pubnub-redux/dist/features/message/MessageActions";
import { MessageEnvelope } from '../../content/messenger/messages/messageModel';

// /**
//  * AppActions is the union of all basic actions in this application.
//  *
//  * It is used to describe the actions that can be received by a reducer
//  * and is helpful for type inference of action payload types when writing
//  * switch style reducers.
//  *
//  * Thunks and other dispatchable objects that will not end up being received by
//  * reducers directly should not be added to this union.
//  */
export type AppActions =
  | focusOnConversationAction
  | logingInAction
  | loginSucceededAction
  | MessageDraftUpdatedAction
  | MessageDraftDiscardedAction
  | menuViewDisplayedAction
  | currentConversationViewDisplayedAction
  | conversationMembersViewDisplayedAction
  | joinConversationViewDisplayedAction
  | menuViewHiddenAction
  | currentConversationViewHiddenAction
  | conversationMembersViewHiddenAction
  | joinConversationViewHiddenAction
  | SignalReceivedAction<TypingIndicatorEnvelope>
  | MessageReceivedAction<MessageEnvelope>
  | RemoveTypingIndicatorAction
  | RemoveTypingIndicatorAllAction;