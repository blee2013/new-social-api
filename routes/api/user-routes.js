const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');


// /api/users/:userId/friends/:friendIds
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);


// set up GET all and POST at /api/users
router.route('/')
    // GET all users
    .get(getAllUsers)
    // POST a new user:
    .post(createUser)

// set up GET one, PUT and DELETE at /api/users/<userId>
router.route('/:userId')
    // GET a single user by its _id and populated  and friend data
    .get(getUserById)
    // PUT to update a user by its _id
    .put(updateUser)
    // DELETE to remove user by its _id
    .delete(deleteUser)



module.exports = router;