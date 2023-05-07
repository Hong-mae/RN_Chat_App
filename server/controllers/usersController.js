const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.json({ msg: "이미 존재하는 이름입니다", status: false });

        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({
                msg: "이미 존재하는 이메일입니다",
                status: false,
            });

        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        delete user["password"];

        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        var user = await User.findOne({ username });
        if (!user)
            return res.json({
                msg: "존재하지 않는 사용자입니다.",
                status: false,
            });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({
                msg: "비밀번호가 맞지 않습니다.",
                status: false,
            });

        delete user.password;

        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        });

        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (error) {
        next(error);
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);

        return res.json(users);
    } catch (error) {
        next(error);
    }
};
