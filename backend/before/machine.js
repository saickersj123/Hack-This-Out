const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    console.log('Request body:', req.body);
  
    try {
      const { name, category, info, exp } = req.body;
      const newMachine = new Machine({ name, category, info, exp });
      await newMachine.save();
      res.json(newMachine);
    } catch (error) {
      console.error('Error creating machine:', error);
      res.status(500).send('Server error');
    }
});

module.exports = router