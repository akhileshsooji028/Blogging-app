// Import Modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const middlewares = require('./Middlewares/errorhandler');
const signup = require('./Controllers/signupController');
const blogs = require('./Controllers/blogsController');
const comments = require('./Controllers/commentsController');
const login = require('./Controllers/login');

// Data base connectivity
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/bloggin-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    data => console.log('Connected to db')
).catch(err => console.log('Issue connecting to db', err));

// Register static resources
app.use(morgan('tiny', {}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// App Routes
app.get('/', (req, res) => {
    res.send("API is up and running");
});
app.use('/signup', signup);
app.use('/login', login);
app.use('/blogs', blogs);
app.use('/comments', comments);

app.use(middlewares.notFound);
app.use(middlewares.errors);

app.listen(3050, () => console.log('Server is running on port 3050'));