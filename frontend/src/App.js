// StAuth10244: I Young Sang Kwon, 000847777 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Home from './Home';
import Inventory from './Inventory';
import Search from './Search';
import About from './About';
import './App.css';

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Pet Store
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/inventory">Inventory</Button>
          <Button color="inherit" component={Link} to="/search">Search</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;