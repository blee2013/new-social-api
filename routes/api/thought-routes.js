const router = require('express').Router();
const Thought = require("../../controllers/thought-controller");

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');



router
    .route('/')
    // GET to get all thoughts
    .get(getAllThoughts)
    //POST to create a new thought 
    .post(addThought)


// /api/thoughts/<thoughtId>
router.route('/:id')
    // GET to get a single thought by its _id
    .get(getThoughtById)
    // PUT to update a thought by its _id
    .put(updateThought)
    // DELETE to remove a thought by its _id
    .delete(deleteThought);

// /api/thoughts /: thoughtId / reactions
router.route('/:thoughtId/reactions')
    //POST to create a reaction stored in a single thought's reactions array field
    .post(addReaction)
    //DELETE to pull and remove a reaction by the reaction's reactionId value
    .delete(deleteReaction);

module.exports = router;