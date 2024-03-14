const UserModel = require('../models/userModel');

exports.getAllUsers = async (req, res, next) => {
    try {
        const { status, name, page, pageSize } = req.query;
        const users = await UserModel.getAllUsers({ status, name, page, pageSize });
        res.json(users);
    } catch (error) {
        next(error);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const userId = await UserModel.createUser(userData);
        res.status(201).json({ id: userId, message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const userData = req.body;
        const success = await UserModel.updateUser(userId, userData);
        if (success) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found or no changes were made' });
        }
    } catch (error) {
        next(error);
    }
};


exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const success = await UserModel.deleteUser(userId);
        if (success) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found or no changes were made' });
        }
    } catch (error) {
        next(error);
    }
};

