from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# ردود البوت البسيطة
def get_bot_response(message):
    responses = {
        "السلام عليكم": "وعليكم السلام ورحمة الله وبركاته 🌸",
        "صباح الخير": "صباح النور ☀️",
        "كيف حالك؟": "أنا بخير، شكرًا لسؤالك! 😊",
    }
    return responses.get(message.strip(), "لم أفهم رسالتك، حاول مرة أخرى.")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    bot_reply = get_bot_response(user_message)
    return jsonify({"reply": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)
