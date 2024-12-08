import * as React from 'react';
import { useState } from 'react'
import { AccessAlarm, Home, Delete, MoveToInbox, Mail } from '@mui/icons-material';
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
  // Card
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
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
      <ButtonGroup 
        variant="contained" aria-label="Basic button group"
        sx={ButtonGroupStyles}
      >
        <Button sx={btnStyles} color="error" onClick={() => alert('Alarm')}>
          <AccessAlarm sx={{ fontSize: '16px' }} /> Alert
        </Button>
        <Button sx={btnStyles} color="secondary" onClick={handleOpenModal}>
          <Home sx={{ fontSize: '16px' }} /> Modal
        </Button>
        <Button sx={btnStyles} onClick={toggleDrawer(true)}>
          <Delete sx={{ fontSize: '16px' }} />Three
        </Button>
      </ButtonGroup>

      <h1>Vite + React + Material UI</h1>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            be{bull}nev{bull}o{bull}lent
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


      <Stack direction="row" spacing={1} sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Button variant="contained"onClick={() => setCount(count - 1)}>Decrement</Button> 
        <Chip label={count} color="primary" />
        <Button variant="contained"onClick={() => setCount(count + 1)}>Increment</Button>
      </Stack>


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

    </>
  )
}

export default App
