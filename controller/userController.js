const { User } = require("../models");

const userController = {
  // get all users
  getAllUser(req, res) {
    User.find({})
    .populate(
      {
        path: ("thoughts", "friends"),
        select: "-__v",
      })

      .select("-__v")
      .sort({ _id: -1 })
      .then((allUsers) => res.json(allUsers))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate(
        {
          path: ("thoughts", "friends"),
          select: "-__v",
        })

      .select("-__v")
      .then((oneUser) => {
        if (!oneUser) {
          res.status(404)
          .json({ message: "No user found with this id!"});
          return;
        }
        res.json(oneUser);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then((newUser) => res.json(newUser))
      .catch((err) => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((updatedUser) => {
        if (!updatedUser) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(updatedUser);
      })
      .catch((err) => res.json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((deletedUser) => {
        if (!deletedUser) {
          res.status(404)
            .json({ message: "No user found with this id!"});
            return;
        }
       res.json(deletedUser);
      })
      .catch((err) => res.json(err));
  },
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          res.status(404)
          .json({ message: "No user found with this id!" });
          return;
        }
        res.json(updatedUser);
      })
      .catch((err) => res.json(err));
  },
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(updatedUser);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
