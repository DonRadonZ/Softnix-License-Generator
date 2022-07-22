import React from "react";
import {useSelector} from "react-redux";
import {getLoggedInUserId} from "../../../authentication/login/authenticationModel";
import {getUsersById} from "../../users/userModel"
import {AppState} from "../../../../component/countermessage/storeTypes"
import {
    Label,
    LabelVariants,
    Icon,
    Icons
  } from "../../foundations/component/presentation/Index"
  import { StyledBox, FlexRow } from  "../../foundations/component/layout/Index"

  export interface MyUserDetailsFragment {
    name: string;
    profileUrl: string;
    custom:{
        title:string;
    };
  }

const MyUserDetails = () => {
    const userId = useSelector(getLoggedInUserId);
    const userById = useSelector(getUsersById);
    const user = userById[userId];
    const isConnected: boolean = useSelector(
        (state: AppState) => state.networkStatus.isConnected
    );

    // We must always have a user; change this to a development time error check
    if (user === undefined){
        return <div>Loading...</div>;
    }

    return(
        <FlexRow>
            <Label variant={LabelVariants.INVERSE}>{user.name}</Label>

            <StyledBox marginLeft={1}>
                <Icon
                icon={Icons.Presence}
                title={isConnected ? "connected" : "not connected"}
                color={isConnected ? "success" : "inactive"}
                />
            </StyledBox>
        </FlexRow>
    );
};
export { MyUserDetails };