const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes/index.js'));



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/new-social-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));


// from homework assignment and worked on with tutor Vivian 

// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pizza-hunt', {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Use this to log mongo queries being executed!
// mongoose.set('debug', true);

// app.use(require('./routes'));

// app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
