const User = require(`../models/userModel`);
const bcrypt = require('bcrypt');
const jwt = require(`jsonwebtoken`);

const genJwtToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '168h' });
}

exports.login = async (req, res, next) => {
    try {
        const curUser = await User.findOne({ email: req.body.email })
        if (!curUser) throw new Error('Something went wrong');
        const isValid = await bcrypt.compare(req.body.password, curUser.password);
        if (isValid) {
            const token = genJwtToken({ userId: curUser._id });
            res.header('auth-token', token)
            res.status(200).json({
                status: 'Success'
            });
        }
        else throw new Error('Something went wrong');
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'Failed',
            Error: err
        })
    }

}



exports.signup = async (req, res, next) => {
    const user = new User({ name: req.body.name, email: req.body.email, password: req.body.password });
    try {
        const response = await user.save();
        console.log(response);
        const token = genJwtToken({ userId: user._id });
        res.header('auth-token', token)
        res.status(200).json({
            status: "Success"
        })
    } catch (err) {
        console.error(err);
        res.status(404).json({
            status: "Failure",
            error: err
        });
    }
}

exports.protect = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) res.status(404).send('access denied');
    try {
        const ver = jwt.verify(token, process.env.JWT_SECRET);
        res.userId = ver.userId;
        console.log('verified');
        next();
    } catch (err) {
        res.status('404').json({
            status: 'Failure',
            error: err
        })
    }
}