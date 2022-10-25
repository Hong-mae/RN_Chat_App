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
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;

        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
};
