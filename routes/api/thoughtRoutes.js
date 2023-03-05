const router = require('express').Router();
const { User, Thought } = require('../../models')

router.get('/', (req, res) => {
    Thought.find().select('-__v')
      .then((thoughts) => {
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
    Thought.findOne({ _id: req.params.id }).select('-__v').populate('reactions')
    .then((thoughts) => {
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
});

router.post('/', (req, res) => {
    Thought.create(req.body)
    .then((thoughts) => {
        User.findOneAndUpdate({ _id: req.body.userId }, { $push: {thoughts: thoughts._id} }, { new: true })
        .then((data) => {
            return res.json(thoughts);
        })
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.id }, {$set: req.body}, {runValidators: true, new: true})
    .then((thoughts) => {
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
});

router.delete('/:id', (req, res) => {
    Thought.findOneAndDelete({ _id: req.params.id })
    .then((thoughts) => {
        User.findOneAndUpdate({ thoughts: req.params.id}, { $pull: {thoughts: req.params.id }}, { new: true })
        .then((data) => {
            return res.json('Thought Destroyed!');
        })
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
});

router.post('/:thoughtId/reactions', (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: {reactions: req.body}}, { new: true})
    .then((thoughts) => {
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
});

router.delete('/:thoughtId/reactions/:reactionId', (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: {reactions: {reactionId: req.params.reactionId}}}, { new: true})
    .then((thoughts) => {
        return res.json('Reaction Destroyed!');
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
});

module.exports = router;