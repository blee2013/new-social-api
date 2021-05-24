const router = require('express').Router();

const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

//localhost:3001/api
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;

// from homework assignment and worked on with tutor Vivian 

// const router = require('express').Router();
// const commentRoutes = require('./comment-routes');
// const pizzaRoutes = require('./pizza-routes');

// router.use('/comments', commentRoutes);
// router.use('/pizzas', pizzaRoutes);

// module.exports = router;
