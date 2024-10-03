const express = require('express');
const router = express.Router();
const Example = require('../../model/Example');
const Counter = require('../../model/Counter');


const getNextSequence = async (name) => {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};

router.post('/', async (req, res) => {
  console.log('POST /api/challenge called');
  console.log('Request body:', req.body);

  try {
    const { title, content, answer, theme } = req.body;
    const numericId = await getNextSequence('challengeId');
    const newChallenge = new Example({ numericId, title, content, answer, theme });
    await newChallenge.save();
    res.json(newChallenge);
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).send('Server error');
  }
});

router.get('/', async (req, res) => {
  try {
    const challenges = await Example.find({});

    const formattedChallenges = challenges.map(challenge => ({
      id: challenge.numericId,
      title: challenge.title,
      content: challenge.content,
      answer: challenge.answer,
      theme: challenge.theme
    }));

    res.json(formattedChallenges);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).send('Server error');
  }
});

router.get('/:numericId', async (req, res) => {
  const challenge = await Example.findOne({ numericId: req.params.numericId });
  res.json(challenge);
});

router.delete('/:numericId', async (req, res) => {
  try {
    const { numericId } = req.params;
    const result = await Example.findOneAndDelete({ numericId });

    if (!result) {
      return res.status(404).json({ msg: 'Challenge not found' });
    }

    res.json({ msg: 'Challenge deleted successfully' });
  } catch (error) {
    console.error('Error deleting challenge:', error);
    res.status(500).send('Server error');
  }
});


module.exports = router