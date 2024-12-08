import * as React from 'react';
import { useState } from 'react'
import { AccessAlarm, Home, Delete, MoveToInbox, Mail, Menu, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';


import './App.css'

// https://mui.com/material-ui/all-components/

/////////////////////////////////////////////////////////////////////
// Styles
/////////////////////////////////////////////////////////////////////
const ButtonGroupStyles = {
  gap: 0,
}

const btnStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
}

const ModalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#333',
  color: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/////////////////////////////////////////////////////////////////////
// Component
/////////////////////////////////////////////////////////////////////
function App() {
  // Counter
  const [count, setCount] = useState(0)
  // Modal
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)
  // Drawer
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  // Snackbar 
  const [openSb, setOpenSb] = React.useState(false);
  const handleClickSb = () => {
    setOpenSb(true);
  };
  const handleCloseSb = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSb(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));


  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleCloseSb}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSb}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Home />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <ButtonGroup 
        variant="outlined" aria-label="Basic button group"
        sx={ButtonGroupStyles}
      >
        <Button sx={btnStyles} onClick={() => alert('Alarm')}>
          <AccessAlarm sx={{ fontSize: '16px' }} /> Alert
        </Button>
        <Button sx={btnStyles}  onClick={handleOpenModal}>
          <Home sx={{ fontSize: '16px' }} /> Modal
        </Button>
        <Button sx={btnStyles} onClick={handleClickSb}>
          <Delete sx={{ fontSize: '16px' }} />Snackbar
        </Button>
      </ButtonGroup>

      <Typography variant="h2" component="h1">
        Vite + React + Material UI
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Components
      </Typography>



      <Container maxWidth="md">

        <Box sx={{ flexGrow: 1}}>
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            <Grid size={{xs: 12, sm: 6, lg: 4}}>
              <Card sx={{ textAlign:'left' }}>
                <CardContent>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="div">
                    Lorem Ipsum Dolor It Semet!
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                  <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid size={{xs: 12, sm: 6, lg: 4}}>
              <Card sx={{ textAlign:'left', minHeight: '100%' }}>
                <CardContent>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="div">
                    Lorem Dolor It 
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                  <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid size={{xs: 12, sm: 6, lg: 4}}>
              <Card sx={{ textAlign:'left' }}>
                <CardContent>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="div">
                    Lorem Ipsum Dolor It Semet!
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                  <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid size={12}>
              <Stack direction="row" spacing={1} sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Button variant="contained"onClick={() => setCount(count - 1)}>Decrement</Button> 
                <Chip label={count} color="primary" />
                <Button variant="contained"onClick={() => setCount(count + 1)}>Increment</Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        

      </Container>

      


      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyles}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>

      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      {/* <Button onClick={handleClickSb}>Open Snackbar</Button> */}
      <Snackbar
        open={openSb}
        autoHideDuration={6000}
        onClose={handleCloseSb}
        message="Note archived"
        action={action}
      />

      <Fab
        aria-label="menu"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={toggleDrawer(true)}
      >
        <Menu />
      </Fab>

    </>
  )
}

export default App
