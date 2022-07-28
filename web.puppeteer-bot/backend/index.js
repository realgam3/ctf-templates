const amqplib = require("amqplib");
const express = require("express");

const RABITMQ_HOST = process.env.RABITMQ_HOST || "queue";
const RABITMQ_PORT = parseInt(process.env.RABITMQ_PORT || 5672);
const RABITMQ_USERNAME = process.env.RABITMQ_USERNAME || "guest";
const RABITMQ_PASSWORD = process.env.RABITMQ_PASSWORD || "guest";
const QUEUE_NAME = process.env.QUEUE_NAME || "browser";

const app = express();

app.get('/', async (req, res) => {
    const url = req.query.url || "https://www.RealGame.co.il/";

    const connection = await amqplib.connect({
        protocol: "amqp",
        hostname: RABITMQ_HOST,
        port: RABITMQ_PORT,
        username: RABITMQ_USERNAME,
        password: RABITMQ_PASSWORD,
    });

    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, {
        durable: false
    });

    const msg = {
        "timeout": 60000,
        "actions": [
            // Open User URL
            {
                "action": "page.goto",
                "args": [
                    url,
                    {"timeout": 6000, "waitUntil": "load"}
                ]
            },
            // Print Page Title
            {
                "action": "extend.printTitle",
                "args": []
            },
        ]
    };

    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(msg)));
    return res.json({"message": "the url sent"});
});

app.listen(3000, "0.0.0.0");
