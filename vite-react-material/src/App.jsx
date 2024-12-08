import * as React from 'react';
import { useState } from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { AccessAlarm, Home, Delete } from '@mui/icons-material';
import './App.css'

// https://mui.com/material-ui/all-components/

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button>
          <AccessAlarm /> One
        </Button>
        <Button>
          <Home /> Two
        </Button>
        <Button>
          <Delete />Three
        </Button>
      </ButtonGroup>

      <h1>Vite + React + Material UI</h1>

      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        {count}
      </Box>

      <Button variant="contained"onClick={() => setCount(count + 1)}>Increment</Button>
      <Button variant="contained"onClick={() => setCount(count - 1)}>Decrement</Button>
    </>
  )
}

export default App
