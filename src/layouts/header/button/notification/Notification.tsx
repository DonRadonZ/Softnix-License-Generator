import {
    alpha,
    Badge,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    Popover,
    Tooltip,
    Typography
  } from '@mui/material';

  import { useRef, useState } from 'react';
  import NotificationsIcon from '@mui/icons-material/Notifications';
  import { styled } from '@mui/material/styles';
  import { formatDistance, subDays } from 'date-fns';



  const NotificationsBadge = styled(Badge)(
    ({ theme }) => '\n    \n    .MuiBadge-badge {\n        background-color: ' + alpha(theme.palette.error.main, 0.1) + ';\n        color: ' + theme.palette.error.main + ';\n        min-width: 16px; \n        height: 16px;\n        padding: 0;\n\n        &::after {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            border-radius: 50%;\n            box-shadow: 0 0 0 1px ' + alpha(theme.palette.error.main, 0.3) + ';\n            content: "";\n        }\n    }\n'
  );

  
  function HeaderNotifications() {
    const ref = useRef<any>(null);
    const [isOpen, setOpen] = useState<boolean>(false);
  
    const handleOpen = (): void => {
      setOpen(true);
    };
  
    const handleClose = (): void => {
      setOpen(false);
    };
  
    return (
      <>
        <Tooltip arrow title="Notifications">
          <IconButton color= "default" ref={ref} onClick={handleOpen}>
            <NotificationsBadge
              badgeContent={1}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <NotificationsIcon />
            </NotificationsBadge>
          </IconButton>
        </Tooltip>
        <Popover
          anchorEl={ref.current}
          onClose={handleClose}
          open={isOpen}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <Box
            sx={{ p: 2 }}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">Notifications</Typography>
          </Box>
          <Divider />
          <List sx={{ p: 0 }}>
            <ListItem
              sx={{ p: 2, minWidth: 350, display: { xs: 'block', sm: 'flex' } }}
            >
              <Box flex="1">
                <Box display="flex" justifyContent="space-between">
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Messaging Platform
                  </Typography>
                  <Typography variant="caption" sx={{ textTransform: 'none' }}>
                    {formatDistance(subDays(new Date(), 3), new Date(), {
                      addSuffix: true
                    })}
                  </Typography>
                </Box>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {' '}
                  new messages in your inbox
                </Typography>
              </Box>
            </ListItem>
          </List>
        </Popover>
      </>
    );
  }
  
  export default HeaderNotifications;