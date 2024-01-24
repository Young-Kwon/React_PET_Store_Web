// StAuth10244: I Young Sang Kwon, 000847777 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
import React from 'react';
import petStoreImage from './pet-store-image.jpg';
import { Box } from '@mui/material';

function Home() {
  return (
    <Box display="flex" justifyContent="center" minHeight="100vh">
      <div>
        <h1>Welcome to the Pet Store</h1>
        <img src={petStoreImage} alt="Pet Store" />
      </div>
    </Box>
  );
}

export default Home;