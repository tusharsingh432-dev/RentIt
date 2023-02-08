const User = require(`../models/userModel`);

exports.login = (req, res, next) => {
    console.log(req.body);
    res.status(200).send('login');
}

exports.signup = (req, res, next) => {
    const incoming = req.body;
    const user = new User({ name: incoming.name });
    user.save();
    res.status(200).send('signup');
}   