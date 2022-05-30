const router = require('express').Router();

const { getAllThought, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction
} = require('../../controller/thoughtController');

router.route('/')
.get(getAllThought);

router.route('/:id')
.get(getThoughtById)
.put(updateThought);

router.route('/:userId')
.post(createThought);

router.route('/:userId/:thoughtId')
.post(createThought)
.delete(deleteThought);

router.route('/thoughts/:thoughtID/reactions/reactionId')
.post(createThought)
.delete(removeReaction);


module.exports = router;


