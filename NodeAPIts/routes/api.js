"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/images', function (req, res) {
    res.json({ message: "Image List" });
});
router.route('/images/:id') // 輸入id當作參數
    .get(function (req, res) {
    res.json({
        id: req.params.id,
        message: 'The get api for image: ' + req.params.id
    });
})
    .post(function (req, res) {
    res.json({
        id: req.params.id,
        message: 'The post api for image: ' + req.params.id
    });
})
    .put(function (req, res) {
    res.json({
        id: req.params.id,
        message: 'The put api for image: ' + req.params.id
    });
})
    .delete(function (req, res) {
    res.json({
        id: req.params.id,
        message: 'The delete api for image: ' + req.params.id
    });
})
    .head(function (req, res) {
    res.json({
        id: req.params.id,
        message: 'The head api for image: ' + req.params.id
    });
});
exports.default = router;
