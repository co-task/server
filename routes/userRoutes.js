import express from 'express';
import UserModel from '../model/UserModal.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await UserModel.find()
            .then((userData) => {
                res.status(201).json({ users: userData });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    msg: '유저 정보를 불러오는데 실패하였습니다.',
                });
            });
    } catch (err) {
        res.status(500).json({ msg: '유저 정보를 불러오는데 실패하였습니다.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            await UserModel.findById(id)
                .then((userInfo) => {
                    console.log(userInfo);
                    res.status(201).json({ user: userInfo });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        msg: '해당 유저 정보를 불러오는데 실패하였습니다.',
                    });
                });
        }
    } catch (err) {
        res.status(500).json({
            msg: '해당 유저 정보를 불러오는데 실패하였습니다.',
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
        await newUser
            .save()
            .then((savedUser) => {
                res.status(201).json({ msg: '회원가입이 완료되었습니다.' });
            })
            .catch((err) => {
                if (
                    err.code === 11000 &&
                    err.keyPattern &&
                    err.keyPattern.email
                ) {
                    res.status(500).json({
                        msg: '이미 사용중인 이메일입니다.',
                    });
                }
                res.status(500).json({ msg: '회원가입에 실패하였습니다.' });
            });
    } catch (err) {
        res.status(500).json({ msg: '새 유저를 저장하는데 실패하였습니다.' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const updatedUser = req.body;
            await UserModel.findOneAndUpdate({ _id: id }, updatedUser, {
                new: true,
            })
                .then((updatedUser) => {
                    console.log(updatedUser);
                    res.status(201).json({
                        msg: '유저 정보가 업데이트 되었습니다.',
                        user: updatedUser,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        msg: '유저 정보를 업데이트하는데 실패하였습니다.',
                    });
                });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: '유저 정보를 업데이트하는데 실패하였습니다.',
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            await UserModel.findByIdAndDelete(id)
                .then((deletedUser) => {
                    console.log(deletedUser);
                    res.status(201).json({
                        msg: '유저 정보가 삭제되었습니다.',
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        msg: '유저 정보를 삭제하는데 실패하였습니다.',
                    });
                });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: '유저 정보를 삭제하는데 실패하였습니다.',
        });
    }
});

export default router;
