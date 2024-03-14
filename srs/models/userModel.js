const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (params = {}) => {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM users WHERE 1=1";
        const values = [];

        if (params.status) {
            query += " AND status = ?";
            values.push(params.status);
        }

        if (params.name) {
            query += " AND first_name LIKE ?";
            values.push(`%${params.name}%`);
        }

        if (params.page && params.pageSize) {
            const pageSize = parseInt(params.pageSize, 10) || 10;
            const page = parseInt(params.page, 10) || 1;
            const offset = (page - 1) * pageSize;

            query += " LIMIT ? OFFSET ?";
            values.push(pageSize, offset);
        }

        db.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};


exports.createUser = async (userData) => {
    return new Promise((resolve, reject) => {
        const { first_name, last_name, email, phone, password, status } = userData;
  
        bcrypt.hash(password, 10, (error, hash) => {
            if (error) {
                reject(error);
            } else {
                const sql = 'INSERT INTO users (first_name, last_name, email, phone, password, status) VALUES (?, ?, ?, ?, ?, ?)';
                db.query(sql, [first_name, last_name, email, phone, hash, status], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results.insertId);
                    }
                });
            }
        });
    });
};

exports.updateUser = async (userId, userData) => {
    return new Promise((resolve, reject) => {
        const { first_name, last_name, email, phone, status } = userData;

        const sql = 'UPDATE users SET first_name=?, last_name=?, email=?, phone=?, status=? WHERE user_id=?';
        db.query(sql, [first_name, last_name, email, phone, status, userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.affectedRows > 0);
            }
        });
    });
};

exports.deleteUser = async (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM users WHERE user_id=?';
        db.query(sql, [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.affectedRows > 0);
            }
        });
    });
};

