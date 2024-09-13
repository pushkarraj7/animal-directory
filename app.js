const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let animals = []; // In-memory array to store animals

// GET - Retrieve all animals
app.get('/animals', (req, res) => {
  res.json(animals);
});

// POST - Add a new animal
app.post('/animals', (req, res) => {
  const animal = req.body;
  animals.push(animal);
  res.status(201).json(animal);
});

// PUT - Update an existing animal
app.put('/animals/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedAnimal = req.body;
  const index = animals.findIndex(animal => animal.id === id);

  if (index !== -1) {
    animals[index] = updatedAnimal;
    res.json(updatedAnimal);
  } else {
    res.status(404).json({ message: 'Animal not found' });
  }
});

// DELETE - Remove an animal
app.delete('/animals/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = animals.findIndex(animal => animal.id === id);

  if (index !== -1) {
    animals.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Animal not found' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
