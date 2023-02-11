const User = require(`../models/userModel`);
const bcrypt = require('bcrypt');
exports.login = async (req, res, next) => {
    try {
        const curUser = await User.findOne({ email: req.body.email })
        if (!curUser) throw new Error('Something went wrong');
        const isValid = await bcrypt.compare(req.body.password, curUser.password);
        if (isValid) res.status(200).send('Logged In');
        else throw new Error('Something went wrong');
    } catch (err) {
        res.status(404).send(err.message)
    }

}

exports.signup = async (req, res, next) => {
    const user = new User({ name: req.body.name, email: req.body.email, password: req.body.password });
    try {
        const response = await user.save();
        console.log(response);
        res.status(200).send('signup');
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: err });
    }
}