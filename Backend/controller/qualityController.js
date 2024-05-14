const Quality = require('../Models/Quality');

exports.createQuality = async (req, res) => {
    try {
        const quality = new Quality(req.body);
        await quality.save();
        res.status(201).send(quality);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllQualities = async (req, res) => {
    try {
        const qualities = await Quality.find();
        res.status(200).send(qualities);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateQuality = async (req, res) => {
    try {
        const quality = await Quality.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(quality);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteQuality = async (req, res) => {
    try {
        const quality = await Quality.findByIdAndDelete(req.params.id);
        if (!quality) return res.status(404).send();
        res.status(200).send(quality);
    } catch (error) {
        res.status(500).send(error);
    }
};
