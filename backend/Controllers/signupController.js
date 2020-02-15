const router = require('express').Router();
const Signup = require('../Schemas/signupSchema');
const md5 = require('md5');


router.get('/', async (req, res) => {
    let filter = {};

    if (req.query.firstName) {
        filter.firstName = req.query.firstName
    }
    if (req.query.emailId) {
        filter.emailId = req.query.emailId
    }
    try {
        let users = await Signup.find(filter);
        res.status(200).json({
            users: users
        })
    } catch (error) {
        console.log(error)
    }
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    Signup.findById(id).then(data => {
        res.status(200).json({
            data: data
        })
    })
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Signup.findByIdAndUpdate(id, {
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

router.post('/', (req, res) => {
    let body = req.body;
    let user = new Signup(body);
    user.password = md5(body.password);
    user.save().then(newUser => {
        res.status(201).json({
            message: 'User saved successfully',
            user: newUser
        })
    }).catch(err => console.log(err))
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    Signup.findByIdAndDelete(id).then((data) => {
        res.status(200).json({
            msg: `User deleted of id ${id}`,
            data: data
        })
    })
});






module.exports = router;