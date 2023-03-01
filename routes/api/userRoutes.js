const { User } = require('../../models');

const router = require('express').Router();

router.get('/', (req, res) => {
    User.find().select('-__v')
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
    User.findOne({ _id: req.params.id }).select('-__v').populate('thoughts').populate('friends')
    .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
});

router.post('/', (req, res) => {
    User.create(req.body)
    .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, {$set: req.body}, {runValidators: true, new: true})
    .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
});

router.delete('/:id', (req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
    .then((users) => {
        return res.json('User Destroyed!');
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
});

router.post('/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: {friends: req.params.friendId}}, { new: true})
    .then((users) => {
        return res.json('Friend Added!');
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
});

router.delete('/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: {friends: req.params.friendId}}, { new: true})
    .then((users) => {
        return res.json('Friend Destroyed!');
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
});

module.exports = router; 