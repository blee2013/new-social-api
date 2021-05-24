// const { Comment, Pizza } = require('../models'); example from online assignment
const { User, Thought } = require('../models');


const thoughtController = {

    //create a thought
    addThought({ params, body }, res) {
        console.log("starting add thoughts fx")
        console.log({ params })
        Thought.create(body)
            .then(({ _id }) => {
                console.log("index add thoughts fx");
                console.log(_id);
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $addToSet: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
// example from code online assignment 
// const commentController = {
//   // add comment to pizza
//   addComment({ params, body }, res) {
//     console.log(params);
//     Comment.create(body)
//       .then(({ _id }) => {
//         return Pizza.findOneAndUpdate(
//           { _id: params.pizzaId },
//           { $push: { comments: _id } },
//           { new: true }
//         );
//       })
//       .then(dbPizzaData => {
//         console.log(dbPizzaData);
//         if (!dbPizzaData) {
//           res.status(404).json({ message: 'No pizza found with this id!' });
//           return;
//         }
//         res.json(dbPizzaData);
//       })
//       .catch(err => res.json(err));
//   },

    //get all thoughts
    getAllThoughts(req, res) {
        console.log("works");
        Thought.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.json(400).json(err);
            })
    },

    // from online assignment 
    // const pizzaController = {
    //     // get all pizzas
    //     getAllPizza(req, res) {
    //         Pizza.find({})
    //             .populate({
    //                 path: 'comments',
    //                 select: '-__v'
    //             })
    //             .select('-__v')
    //             .sort({ _id: -1 })
    //             .then(dbPizzaData => res.json(dbPizzaData))
    //             .catch(err => {
    //                 console.log(err);
    //                 res.sendStatus(400);
    //             });
    //     },

    //get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    //from online assignment 

  // // get one pizza by id
  // getPizzaById({ params }, res) {
  //   Pizza.findOne({ _id: params.id })
  //     .populate({
  //       path: 'comments',
  //       select: '-__v'
  //     })
  //     .select('-__v')
  //     .then(dbPizzaData => res.json(dbPizzaData))
  //     .catch(err => {
  //       console.log(err);
  //       res.sendStatus(400);
  //     });
  // },


    //add reaction
    addReaction({ params, body }, res) {
        // Thought.findOneAndUpdate(
        //     { _id: params.thoughtId },
        //     { $push: { reactions: body } },
        //     { new: true }
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            // {new: true, runValidators: true}
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },



//   // add reply to comment from online assignment code 
//   addReply({ params, body }, res) {
//     Comment.findOneAndUpdate(
//       { _id: params.commentId },
//       { $push: { replies: body } },
//       { new: true, runValidators: true }
//     )
//       .then(dbPizzaData => {
//         if (!dbPizzaData) {
//           res.status(404).json({ message: 'No pizza found with this id!' });
//           return;
//         }
//         res.json(dbPizzaData);
//       })
//       .catch(err => res.json(err));
//   },


    //delete reaction
    deleteReaction({ params }, res) {
        console.log({ params })
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { id: params.id } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

      // remove reply from online assignment 
//   removeReply({ params }, res) {
//     Comment.findOneAndUpdate(
//       { _id: params.commentId },
//       { $pull: { replies: { replyId: params.replyId } } },
//       { new: true }
//     )
//       .then(dbPizzaData => res.json(dbPizzaData))
//       .catch(err => res.json(err));
//   }
// };

    //update reaction
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
     // // update pizza by id from online assignmnent 
  // updatePizza({ params, body }, res) {
  //   Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
  //     .then(dbPizzaData => {
  //       if (!dbPizzaData) {
  //         res.status(404).json({ message: 'No pizza found with this id!' });
  //         return;
  //       }
  //       res.json(dbPizzaData);
  //     })
  //     .catch(err => res.json(err));
  // },


    // delete thought
    deleteThought({ body, params }, res) {
        console.log({ body })
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                return User.findOneAndUpdate(

                    { _id: body.userId },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }

//   // remove comment from online assignment 
//   removeComment({ params }, res) {
//     Comment.findOneAndDelete({ _id: params.commentId })
//       .then(deletedComment => {
//         if (!deletedComment) {
//           return res.status(404).json({ message: 'No comment with this id!' });
//         }
//         return Pizza.findOneAndUpdate(
//           { _id: params.pizzaId },
//           { $pull: { comments: params.commentId } },
//           { new: true }
//         );
//       })
//       .then(dbPizzaData => {
//         if (!dbPizzaData) {
//           res.status(404).json({ message: 'No pizza found with this id!' });
//           return;
//         }
//         res.json(dbPizzaData);
//       })
//       .catch(err => res.json(err));
//   },

};

module.exports = thoughtController;



//   // remove reply
//   removeReply({ params }, res) {
//     Comment.findOneAndUpdate(
//       { _id: params.commentId },
//       { $pull: { replies: { replyId: params.replyId } } },
//       { new: true }
//     )
//       .then(dbPizzaData => res.json(dbPizzaData))
//       .catch(err => res.json(err));
//   }
// };

// module.exports = commentController;
