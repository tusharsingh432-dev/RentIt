const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/rentit',
    () => {
        console.log('connected');
    },
    err => console.log(err)
);

module.exports = mongoose;