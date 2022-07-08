import {Box} from '@mui/material';
import HeaderNotifications from './button/notification/Notification';

function HeaderButtons() {
  return (
    <Box sx={{ mx:0.5 }} component="span">
      <HeaderNotifications />
    </Box>);
}

export default HeaderButtons;