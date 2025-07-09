const mongoose = require('mongoose');

const users = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        nickname: {
            type: String,
        }
    },
    {timestamps: true}, // createAt insert 시 입력시간 설정 updaterAt uptate 시 수정시간 설정
);

module.exports = mongoose.model('Users', users);