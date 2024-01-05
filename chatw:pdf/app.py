from flask import Flask, render_template, request, session, redirect, url_for, jsonify
import openai
import uuid
import tempfile
import os
from werkzeug.utils import secure_filename
import json

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Load API Key
with open("settings.json", "r") as settings_file:
    settings = json.load(settings_file)
openai.api_key = settings["openai_api_key"]

@app.route("/")
def index():
    session['conversation'] = []
    return render_template("index.html")

@app.route("/send_message", methods=["POST"])
def send_message():
    file_ids = []
    if "file" in request.files:
        file = request.files["file"]
        if file.filename != "":
            temp_dir = tempfile.mkdtemp()
            filename = secure_filename(file.filename)
            file_path = os.path.join(temp_dir, filename)
            file.save(file_path)

            uploaded_file = openai.File.create(file=open(file_path, 'rb'), purpose='answers')
            file_ids.append(uploaded_file.id)

            os.remove(file_path)
            os.rmdir(temp_dir)

    user_message = request.form["message"]
    session.setdefault('conversation', [])
    session['conversation'].append({"role": "user", "content": user_message})

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=session['conversation'],
            file=file_ids[0] if file_ids else None
        )
        response_message = response.choices[0].message.content
        session['conversation'].append({"role": "assistant", "content": response_message})
    except Exception as e:
        print(e)
        response_message = "Sorry, I couldn't process your request."

    return render_template("messages.html", messages=session['conversation'])

if __name__ == "__main__":
    app.run(debug=True)
