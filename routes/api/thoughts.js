const router = require('express').Router();

const { 
    getAllThought, 
    getThoughtById, 
    createThought, 
    updateThought, 
    deleteThought, 
    addReaction, 
    removeReaction
} = require('../../controller/thoughtController');

router.route('/')
.get(getAllThought)

router.route('/:userId')
    .post(createThought)

router.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.put(addReaction);

router.route('/:userId/:thoughtId')
    .delete(deleteThought)


router.route(':thoughtId/:reactionId')
    .delete(removeReaction)


module.exports = router;