import React from "react";
import { ConversationOccupancy } from "../ConversationOccupancy";
import { useSelector,useDispatch} from "react-redux";
import {createSelector} from "reselect";
import {
    ConversationsIndexedById,
    getConversationsById
} from "../../conversations/conversationModel"
import { getCurrentConversationId } from "../currentConversationModel";
import { menuViewDisplayed } from "../../layout/LayoutActions";
import { Icon, 
    Icons,
     Title
     } from "../../foundations/component/presentation/Index";
import { FlexRow, StyledBox } from "../../foundations/component/layout/Index";

export interface ConversationDescriptionFragment {
    id: string;
    name: string;
    description: string;

}

export const getCurrentConversationDescription = createSelector(
    [getConversationsById, getCurrentConversationId],
    (
        conversations: ConversationsIndexedById,
        currentConversationId: string
    ): ConversationDescriptionFragment => {
        return {
            ...conversations[currentConversationId]
        };
    }
);

const Header = () => {
    const conversation: ConversationDescriptionFragment = useSelector(
        getCurrentConversationDescription
    );

    const dispatch = useDispatch();

    return(
        <StyledBox px="6" paddingTop="7" bg={["background.panel","transparent"]}>
            <FlexRow justifyContent="space-between">
                <StyledBox display={["block","none"]} color="active" marginRight="7">
                    <Icon
                    icon={Icons.Back}
                    onClick={() => {
                        dispatch(menuViewDisplayed());
                    }}
                    title="Back"
                    clickable
                    />
                </StyledBox>

                <Title
                heading={conversation.name}
                label={conversation.description}
                ></Title>

                <ConversationOccupancy />
            </FlexRow>

            <StyledBox paddingTop="5" borderBottom="light"></StyledBox>
        </StyledBox>
    );
};

export { Header };

