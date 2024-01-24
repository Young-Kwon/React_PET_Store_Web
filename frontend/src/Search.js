// StAuth10244: I Young Sang Kwon, 000847777 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
import React, { useState, useEffect } from 'react';
import { Box, TextField, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      fetch(`http://localhost:3001/api?act=search&term=${encodeURIComponent(searchTerm)}`)
        .then(res => res.json())
        .then(data => setFilteredPets(data))
        .catch(err => console.error(err));
    } else {
      setFilteredPets([]);
    }
  }, [searchTerm]);

  return (
    <Box display="flex" justifyContent="center" minHeight="100vh">
      <div>
        <TextField
          label="Search for pets"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ margin: '20px 0' }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Animal</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>{pet.animal}</TableCell>
                <TableCell>{pet.description}</TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>{pet.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Box>
  );
}

export default Search;
