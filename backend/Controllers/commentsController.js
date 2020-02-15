const router = require('express').Router();
const Comments = require('../Schemas/commentsSchema');
const Signup = require('../Schemas/signupSchema');
const Blogs = require('../Schemas/blogsSchema');


router.get('/', async (req, res) => {
    let filter = {};

    if (req.query.blogId) {
        filter.blogId = req.query.blogId
    }

    try {
        let comments = await Comments.find(filter);
        res.status(200).json({
            comments: comments
        })
    } catch (error) {
        console.log(error)
    }
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    Comments.findById(id).then(data => {
        res.status(200).json({
            data: data
        })
    })
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Comments.findByIdAndUpdate(id, {
        $set: body,
        $inc: {
            v: 1
        }
    }, {
        new: true
    })
        .then((data) => {
            res.json({
                data: data
            })
        }).catch(err => next(err))
});

router.post('/', async (req, res) => {
    let body = req.body;
    let user = await Signup.findById(body.userId);
    let blog = await Blogs.findById(body.blogId);
    let comment = new Comments(body);
    comment.blogInfo = blog;
    comment.userInfo = user;
    comment.save().then(newComment => {
        res.status(201).json({
            message: 'Comment saved successfully',
            comment: newComment
        })
    }).catch(err => console.log(err))
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    Comments.findByIdAndDelete(id).then((data) => {
        res.status(200).json({
            msg: `Comments deleted of id ${id}`,
            data: data
        })
    })
});

module.exports = router;