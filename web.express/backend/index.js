const redis = require("redis");
const crypto = require("crypto");
const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");

const SECRET_KEY = process.env.SECRET_KEY || crypto.randomBytes(32).toString();

const app = express();
const redisClient = redis.createClient({
    url: 'redis://session:6379'
});
const RedisStore = require("connect-redis")(expressSession);

app.set("view engine", "ejs");
app.set("trust proxy", 1);
app.use(expressSession({
    name: "session",
    secret: SECRET_KEY,
    proxy: true,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({client: redisClient}),
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    return res.json({"message": "hello world"});
});

app.listen(3000, "0.0.0.0");
