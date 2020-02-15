const router = require('express').Router();
const Signup = require('../Schemas/signupSchema');
const md5 = require('md5');


router.post('/', async (req, res, next) => {
    var emailId = req.body.emailId;
    var password = md5(req.body.password);
    console.log("username", emailId, "password", password);

    const checkUser = await Signup.findOne({
        emailId: req.body.emailId,
        password: md5(req.body.password)
    })
    console.log("checkUser", checkUser);

    if (!checkUser) return res.json({
        code: 400,
        error: 'Username or password not correct'
    })
    res.json({
        "data": checkUser,
        "code": 200
    });
});



module.exports = router;