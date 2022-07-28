const config = {
    "queue": {
        "port": 5672,
        "host": "queue",
        "name": "browser",
        "username": "guest",
        "password": "guest",
    },
    "timeout": 240000,
    "extend": {
        printTitle: async function () {
            const title = await context.page.title();
            console.log(title);
        },
    },
    "allowed_actions": [
        "page.goto",
        "extend.printTitle",
    ],
    "browser": {
        "options": {
            "headless": true,
            "ignoreHTTPSErrors": true,
            "args": [
                "--no-sandbox",
                "--disable-gpu",
                "--ignore-certificate-errors",
                "--disable-dev-shm-usage",
            ]
        }
    },
    "page": {
        "events": {
            // "console": message => console.debug(`[${message.type().toUpperCase()}] ${message.text()}`),
            "error": message => console.error(message),
            "pageerror": message => console.error(message),
        },
        "evaluate": {
            "document_start": function () {
                window.open = () => {
                    console.warn('window.open');
                };
                window.prompt = () => {
                    console.warn('window.prompt');
                };
                window.confirm = () => {
                    console.warn('window.confirm');
                };
                window.alert = () => {
                    console.warn('window.alert');
                };
            }
        }
    }
}

module.exports = config;
