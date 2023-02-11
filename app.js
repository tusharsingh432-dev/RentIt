const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express')
const db = require(`./db`);
const app = express()
const itemRoutes = require(`./routes/itemRoutes`);
const authRoutes = require(`./routes/authRoutes`);
dotenv.config({ path: `${__dirname}/config.env` });
app.use(express.json());
app.use(morgan('dev'));

app
    .get('/', (req, res) => {
        res.send('Hello World!')
    })

app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})