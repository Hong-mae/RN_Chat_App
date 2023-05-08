const messageModel = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });

        if (data) return res.json({ msg: "Message added successfully." });
        return res.json({ msg: "Failed to add message to the db." });
    } catch (err) {
        next(err);
    }
};
module.exports.getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await messageModel
            .find({
                users: {
                    $all: [from, to],
                },
            })
            .sort({ updateAt: 1 });
        const procjectMessages = messages.map((msg) => {
            console.log(msg);
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });

        res.json(procjectMessages);
    } catch (err) {
        next(err);
    }
};
