import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navi from '@/components/Navi/Navi'

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
// Material 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';



function Page({child}) {
  
    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = (newOpen) => () => {
      setOpenDrawer(newOpen);
    };

  const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
          <List>
             <ListItem disablePadding>
                <ListItemButton onClick={toggleDrawer(false)}>
                  <ListItemIcon>
                  <AddIcon />
                  </ListItemIcon>
                  <Link to="/">Home Page</Link>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={toggleDrawer(false)}>
                  <ListItemIcon>
                  <AddIcon />
                  </ListItemIcon>
                  <Link to="/test-a">Test A</Link>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={toggleDrawer(false)}>
                  <ListItemIcon>
                  <AddIcon />
                  </ListItemIcon>
                  <Link to="/test-b">Test B</Link>
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
  );

  return (
    <>
        {/* <Navi /> */}
        <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
            <AppBar position="static" sx={{backgroundColor: 'teal'}}>
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Home
                </Typography>
                <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>

        <div className="page-body">
            <main>
                {child ? child : 'No Child Element'}
            </main>
        </div>

      <Fab
        aria-label="menu"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={toggleDrawer(true)}
        color="primary"
      >
        <MenuIcon />
      </Fab>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            {DrawerList}
      </Drawer>

    </>
  )
}

export default Page