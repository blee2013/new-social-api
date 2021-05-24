const router = require('express').Router();

// from homework assignment

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// from homework assignment and worked on with tutor Vivian 

// /api/users/:userId/friends/:friendIds
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

// from homework assignment and worked on with tutor Vivian 

// set up GET all and POST at /api/users
router.route('/')
    // GET all users
    .get(getAllUsers)
    // POST a new user:
    .post(createUser)
// from homework assignment and worked on with tutor Vivian 

// set up GET one, PUT and DELETE at /api/users/<userId>
router.route('/:userId')
    // GET a single user by its _id and populated  and friend data
    .get(getUserById)
    // PUT to update a user by its _id
    .put(updateUser)
    // DELETE to remove user by its _id
    .delete(deleteUser)



module.exports = router;