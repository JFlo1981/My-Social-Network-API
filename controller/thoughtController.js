const { Thought, User } = require("../models");

const thoughtController = {
  // get all Thoughts
  getAllThought(req, res) {
    Thought.find({})
    .populate(
      {
        path: "reactions",
        select: "-__v",
      })

      .select("-__v")
      .sort({ _id: -1 })
      .then((allThoughtData) => res.json(allThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one Thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate(
        {
          path: "reactions",
          select: "-__v",
        }
      )
      .select("-__v")
      .then((oneThoughtData) => {
        if (!oneThoughtData) {
          res.status(404)
          .json({ message: "No Thought found with this id!"});
          return;
        }
        res.json(oneThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createThought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findByIdAndUpdate(
          { _id: params.userId },
          { $push:  {thoughts: _id}},
          { new: true, runValidators: true}
        );
      })
      .then((updatedUser) => {
        if (!updatedUser) {
        res.status(404)
        .json({ message: "No Thought found with this id!" });
      }
      res.json(updatedUser);
    })
    .catch((err) => res.json(err));
  },

  // update Thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true
    })
      .then((updatedThoughtData) => {
        if (!updatedThoughtData) {
          res.status(404)
          .json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(updatedThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // delete Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((deletedThoughtData) =>  {
        if (!deletedThoughtData) {
          res.status(404)
          .json({ message: "No Thought found with this id!" });
        }
        return User.findByIdAndUpdate(
          { _id: params.userId },
          { $pull:  {thoughts: params.thoughtId}},
          { new: true, runValidators: true}
        );
      })
      .then((updatedUser) => {
        if (!updatedUser) {
          res.status(404)
          .json({ message: "No Thought found with this id!" });
          return;
        }
      res.json(updatedUser);
    })
      .catch((err) => res.json(err));
  },
  // add new reaction
  addReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((updatedThoughtData) => {
        if (!updatedThoughtData) {
          res.status(404)
          .json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(updatedThoughtData);
      })
      .catch((err) => res.json(err));
  },
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((updatedThoughtData) => {
        if (!updatedThoughtData) {
          res.status(404)
          .json({ message: "No thought found with this id!" });
          return;
        }
        res.json(updatedThoughtData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
