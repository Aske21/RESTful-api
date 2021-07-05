"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var sample_1 = __importDefault(require("./routes/sample"));
var NAMESPACE = "Server";
var router = express_1.default();
// logging
router.use(function (req, res, next) {
    // log the req
    logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
    res.on("finish", function () {
        // log res
        logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - STATUS: [" + res.statusCode + "] - IP: [" + req.socket.remoteAddress + "]");
    });
    next();
});
router.use(body_parser_1.default.urlencoded({ extended: false }));
router.use(body_parser_1.default.json());
// rules of api
// in prod ips and routes should be predefined //
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
// routes
router.use("/ping", sample_1.default);
// err handling
router.use(function (req, res, next) {
    var error = new Error("not found");
    return res.status(404).json({
        message: error.message,
    });
});
// server creating
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () {
    return logging_1.default.info(NAMESPACE, "Server is running " + config_1.default.server.hostname + ":" + config_1.default.server.port);
});
