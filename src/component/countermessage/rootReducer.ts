import { combineReducers } from "redux";

import { currentConversationStateReducer } from "../../content/messenger/currentConversation/currentConversationModel";
import { LayoutStateReducer } from "../../content/messenger/layout/LayoutReducer";
// import { UsersReducer } from "features/users/userModel";
 import { AuthenticationStateReducer } from "../../content/authentication/login/authenticationModel";
import { MessageStateReducer } from "../../content/messenger/message/messageModel";
// import { TypingIndicatorStateReducer } from "features/typingIndicator/typingIndicatorModel";
// import { conversationStateReducer } from "features/conversations/conversationModel";
 import { JoinedConversationsStateReducer } from "../../content/messenger/joinedConversations/joinedConversationModel";
// import { ConversationDraftStateReducer } from "features/joinedConversations/DraftsModel";
// import { ConversationMembersStateReducer } from "features/conversationMembers/conversationMemberModel";
// import { ConversationMembersCountStateReducer } from "features/conversationMembers/conversationMemberCountModel";
// import { NetworkStatusReducer } from "features/currentUser/networkStatusModel";
// import { MemberPresenceReducer } from "features/memberPresence/memberPresenceModel";
// import { PaginationStateReducer } from "features/pagination/PaginationReducer";

/**
 * Combine all of the reducers in this application
 */
const rootReducer = combineReducers({
   layout: LayoutStateReducer,
//   networkStatus: NetworkStatusReducer,
//   users: UsersReducer,
//   conversations: conversationStateReducer,
   joinedConversations: JoinedConversationsStateReducer,
//   drafts: ConversationDraftStateReducer,
//   conversationMembers: ConversationMembersStateReducer,
//   conversationMembersCount: ConversationMembersCountStateReducer,
//   memberPresence: MemberPresenceReducer,
   messages: MessageStateReducer,
//   typingIndicators: TypingIndicatorStateReducer,
   authentication: AuthenticationStateReducer,
  currentConversation: currentConversationStateReducer,
//   pagination: PaginationStateReducer
});

export default rootReducer;

/**
 * RootState describes the shape of the global Redux store in this application
 */
export type RootState = Readonly<ReturnType<typeof rootReducer>>;