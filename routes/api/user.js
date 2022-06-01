const router = require('express').Router();

const { getAllUser, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controller/userController');

router.route('/')
.get(getAllUser)
.post(createUser);


router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends')
.post(addFriend)

router.route('/:userId/friends/:friendsId')

.delete(removeFriend);

module.exports = router;
