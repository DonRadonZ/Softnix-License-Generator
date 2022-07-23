// import React, { FunctionComponent } from "react";
import {
    getTypingIndicatorsById,
    TypingIndicator,
    TypingIndicatorEnvelope,
    TYPING_INDICATOR_DURATION_SECONDS
  } from "../typingIndicatorModel";
import {getCurrentConversationId} from "../../currentConversation/currentConversationModel"
import {getUsersById} from "../../users/userModel"
// import { getLoggedInUserId } from "../../../authentication/login/authenticationModel";
// import { useSelector } from "react-redux";
import { createSelector } from "reselect";
// import {
//     Label,
//     LabelSizes,
//     LabelVariants
//   } from "../../foundations/component/presentation/label/label"
//   import { StyledBox } from "../../foundations/component/layout/Index"; 

  export interface TypingIndicatorFragment {
    sender: {
      id: string;
      name: string;
    };
    timetoken: string;
    message: TypingIndicator;
  }
  
  export const getCurrentConversationTypingIndicators = createSelector(
    [getTypingIndicatorsById, getCurrentConversationId, getUsersById],
    (typingIndicators, conversationId, users): TypingIndicatorFragment[] => {
      return typingIndicators[conversationId]
        ? Object.values(
            Object.values(typingIndicators[conversationId] || [])
              .filter(
                typingIndicator => typingIndicator.channel === conversationId
              )
              .reduce(
                (
                  grouped: { [key: string]: TypingIndicatorEnvelope },
                  typingIndicator
                ) => {
                  grouped[typingIndicator.publisher] = typingIndicator;
                  return grouped;
                },
                {}
              )
          )
            .filter(
              typingIndicator =>
                Date.now() - typingIndicator.timetoken / 10000 <
                TYPING_INDICATOR_DURATION_SECONDS * 1000
            )
            .map(typingIndicator => {
              return {
                ...typingIndicator,
                timetoken: String(typingIndicator.timetoken),
                sender:
                  users[typingIndicator.publisher || ""] ||
                  (typingIndicator.publisher
                    ? {
                        id: typingIndicator.publisher,
                        name: typingIndicator.publisher
                      }
                    : {
                        id: "unknown",
                        name: "unknown"
                      })
              };
            })
        : [];
    }
  );
  
  // const TypingLabel: FunctionComponent : FC({children}) => {
  //   return (
  //     <StyledBox px="6" paddingBottom="1">
  //       <Label size={LabelSizes.SMALL} variant={LabelVariants.DARK}>
  //         {children}
  //       </Label>
  //     </StyledBox>
  //   );
  // };
  
  // /**
  //  * Display a Message based on its type
  //  */
  // export const TypingIndicatorDisplay = () => {
  //   const typingIndicators: TypingIndicatorFragment[] = useSelector(
  //     getCurrentConversationTypingIndicators
  //   );
  //   const loggedInUser = useSelector(getLoggedInUserId);
  
  //   if (typingIndicators.length === 0) {
  //     return <TypingLabel>&nbsp;</TypingLabel>;
  //   } else if (typingIndicators.length === 1) {
  //     const {
  //       sender: { name, id }
  //     } = typingIndicators[0];
  //     return (
  //       <TypingLabel>
  //         {id === loggedInUser ? `You are` : `${name} is`} typing ...
  //       </TypingLabel>
  //     );
  //   } else {
  //     return <TypingLabel>Multiple users typing ...</TypingLabel>;
  //   }
  // };
