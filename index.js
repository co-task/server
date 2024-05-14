import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserModel from './model/UserModal.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URI;

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log('DB is connected Successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));

// user
app.get('/getUsers', async (req, res) => {
    const userData = await UserModel.find();
    res.json(userData);
});

// todo
