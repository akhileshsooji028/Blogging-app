const router = require('express').Router();
const Blogs = require('../Schemas/blogsSchema');
const multer = require('multer')
const upload = multer({
    dest: 'uploads/'
});


router.get('/', async (req, res) => {
    let filter = {};

    if (req.query.title) {
        filter.title = req.query.title
    }
    try {
        let blogs = await Blogs.find(filter);
        res.status(200).json({
            blogs: blogs
        })
    } catch (error) {
        console.log(error)
    }
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    Blogs.findById(id).then(data => {
        res.status(200).json({
            data: data
        })
    })
});

router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let body = req.body;
    console.log("body data 1", id, body);
    console.log("body data 2", body.likes);
    console.log("body data 3", body.dislikes);



    let blogLikes = await Blogs.findById(id);
    console.log("bloglilkes", blogLikes.likes, "dislikes hai", blogLikes.dislikes);




    let obj = {
        likes: blogLikes.likes + (body.likes == undefined ? 0 : body.likes),
        dislikes: blogLikes.dislikes + (body.dislikes == undefined ? 0 : body.dislikes)
    }
    console.log("updsted ", obj)

    Blogs.findByIdAndUpdate(id, {
        $set: obj,
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

router.post('/', upload.single('image'), (req, res) => {
    let body = req.body;
    let blog = new Blogs(body);
    blog.likes = 0;
    blog.dislikes = 0;
    blog.save().then(newBlog => {
        res.status(201).json({
            message: 'Blog saved successfully',
            blog: newBlog
        })
    }).catch(err => console.log(err))
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    Blogs.findByIdAndDelete(id).then((data) => {
        res.status(200).json({
            msg: `Blog deleted of id ${id}`,
            data: data
        })
    })
});

module.exports = router;