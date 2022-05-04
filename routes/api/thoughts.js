const router = require('express').Router();

const { getAllThought, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction} = require('../../controller/thoughtController');
router.route('/')
.get(getAllThought)
.post(createThought)


router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

router.route('/:thoughtId/reactions')
.post(addReaction)


router.route('/thoughts/:thoughtID/reactions/reactionId')
.delete(removeReaction)


module.exports = router;