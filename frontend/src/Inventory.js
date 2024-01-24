// StAuth10244: I Young Sang Kwon, 000847777 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button } from '@mui/material';

function Inventory() {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({ animal: '', description: '', age: '', price: '' });
  const [editing, setEditing] = useState(false);
  const [editPetId, setEditPetId] = useState(null);
  const [editPetData, setEditPetData] = useState({ animal: '', description: '', age: '', price: '' });

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    fetch("http://localhost:3001/api?act=getall")
      .then(res => res.json())
      .then(data => setPets(data))
      .catch(err => console.error(err));
  };

  const handleAddPet = (e) => {
    e.preventDefault();
    const { animal, description, age, price } = newPet;

    if (!animal || !description || !age || !price) {
      alert("Please fill in all fields to add.");
      return;
    } 

    if (age < 0 || price < 0) {
      alert("Age and Price must be non-negative");
      return;
    }

    fetch(`http://localhost:3001/api?act=add&animal=${animal}&description=${description}&age=${age}&price=${price}`)
      .then(res => res.json())
      .then(() => {
        fetchPets();
        setNewPet({ animal: '', description: '', age: '', price: '' });
      })
      .catch(err => console.error(err));
  };

  const handleDeletePet = (id) => {
    fetch(`http://localhost:3001/api?act=delete&id=${id}`)
      .then(res => res.json())
      .then(() => fetchPets())
      .catch(err => console.error(err));
  };

  const handleEditPet = (id) => {
    setEditing(true);
    setEditPetId(id);
    const pet = pets.find(p => p.id === id);
    setEditPetData({ animal: pet.animal, description: pet.description, age: pet.age, price: pet.price });
  };

  const handleUpdatePet = (e) => {
    e.preventDefault();
    const { animal, description, age, price } = editPetData;
    fetch(`http://localhost:3001/api?act=update&id=${editPetId}&animal=${animal}&description=${description}&age=${age}&price=${price}`)
      .then(res => res.json())
      .then(() => {
        fetchPets();
        setEditing(false);
        setEditPetId(null);
        setEditPetData({ animal: '', description: '', age: '', price: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <Box display="flex" justifyContent="center" minHeight="100vh">
      <div>
        <h2>Inventory</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Animal</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>{pet.animal}</TableCell>
                <TableCell>{pet.description}</TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>{pet.price}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEditPet(pet.id)}>Edit</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDeletePet(pet.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br/>
        {editing ? (
          // Edit Pet Form
          <div>
            <TextField 
              label="Animal" 
              variant="outlined" 
              value={editPetData.animal} 
              onChange={(e) => setEditPetData({ ...editPetData, animal: e.target.value })}
            />
            <TextField 
              label="Description" 
              variant="outlined" 
              value={editPetData.description} 
              onChange={(e) => setEditPetData({ ...editPetData, description: e.target.value })}
            />
            <TextField 
              label="Age" 
              variant="outlined" 
              type="number" 
              value={editPetData.age} 
              onChange={(e) => setEditPetData({ ...editPetData, age: e.target.value })}
            />
            <TextField 
              label="Price" 
              variant="outlined" 
              type="number" 
              value={editPetData.price} 
              onChange={(e) => setEditPetData({ ...editPetData, price: e.target.value })}
            />
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleUpdatePet}
            >
              Update
            </Button>
          </div>
        ) : (
          // Add Pet Form
          <div>
            <TextField 
              label="Animal" 
              variant="outlined" 
              value={newPet.animal} 
              onChange={(e) => setNewPet({ ...newPet, animal: e.target.value })}
            />
            <TextField 
              label="Description" 
              variant="outlined" 
              value={newPet.description} 
              onChange={(e) => setNewPet({ ...newPet, description: e.target.value })}
            />
            <TextField 
              label="Age" 
              variant="outlined" 
              type="number" 
              value={newPet.age} 
              onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
            />
            <TextField 
              label="Price" 
              variant="outlined" 
              type="number" 
              value={newPet.price} 
              onChange={(e) => setNewPet({ ...newPet, price: e.target.value })}
            />
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleAddPet}
            >
              Add
            </Button>
          </div>
        )}
      </div>
    </Box>
  );
}

export default Inventory;
