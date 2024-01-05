from flask import Flask, render_template, request, session, redirect, url_for
from openai import OpenAI

client = OpenAI()
import uuid
import os
import json
import config   
from flask import Flask, render_template, request, session
from openai import OpenAI

client = OpenAI()
import tempfile
import os
from werkzeug.utils import secure_filename

# Other imports as necessary


database = {"conversations": {}}

app = Flask(__name__)
app.secret_key = os.urandom(24)  # or any other method to generate a secret key

# Assuming settings.json has the OpenAI API key

with open("settings.json", "r") as settings_file:
    settings = json.load(settings_file)
app.config['SECRET_KEY'] = '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'
@app.route("/")
def index():
    session['conversation'] = []  # Start a new conversation
    return render_template("index.html")

@app.route("/send_message", methods=["POST"])
def send_message():
    file_ids = []
    # Handle file upload if necessary
    # ... file handling code ...
    if "file" in request.files:
        file = request.files["file"]
        if file.filename != "":
            temp_dir = tempfile.mkdtemp()

            filename = secure_filename(file.filename)
            file_path = os.path.join(temp_dir, filename)

            print(f"Saving to {file_path}")

            file.save(file_path)
            uploaded_file = openai.files.create(
                file=openai.file_from_path(file_path),
                purpose="assistants",
            )

            file_ids.append(uploaded_file.id)

            os.remove(file_path)
            os.rmdir(temp_dir)

    user_message = request.form["message"]
    session.setdefault('conversation', [])
    session['conversation'].append({"role": "user", "content": user_message})

    try:
        response = client.chat.completions.create(model="gpt-3.5-turbo",
        messages=session['conversation'])
        response_message = response.choices[0].message.content
        session['conversation'].append({"role": "assistant", "content": response_message})
    except Exception as e:
        print(e)
        response_message = "Sorry, I couldn't process your request."

    return render_template("messages.html", messages=session['conversation'])

@app.route("/get_response")
def get_response():
    # You may not need this route if you're handling everything in send_message
    pass

if __name__ == "__main__":
    app.run(debug=True)