import os
from flask import Flask, request, jsonify

app = Flask(__name__, template_folder="views", static_folder="public", static_url_path="/")
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", os.urandom(32))


@app.route("/")
def index():
    return jsonify({"message": "hello world"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True, threaded=True)
