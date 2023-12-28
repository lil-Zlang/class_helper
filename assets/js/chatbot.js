const form = document.getElementById('chat-form');
const mytextInput = document.getElementById('mytext');
const responseTextarea = document.getElementById('response');

const API_KEY = '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';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mytext = mytextInput.value.trim();

    if (mytext) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: "The GPT's primary role is to assist in website coding, encompassing both front-end and back-end development. It should provide guidance, suggestions, and code examples for HTML, CSS, JavaScript, and popular back-end languages. The GPT should also offer debugging tips, best practices in web development, and insights into the latest web technologies. It must avoid giving outdated or incorrect coding advice, and should not attempt to execute or run code. When faced with ambiguous requests, it should seek clarification to ensure accurate and helpful responses. The GPT should communicate in a clear, concise, and technically informed manner, tailored to users ranging from beginners to experienced developers. "}],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                responseTextarea.value = data.choices[0].message.content;
            } else {
                responseTextarea.value = 'Error: Unable to process your request.';
            }
        } catch (error) {
            console.error(error);
            responseTextarea.value = 'Error: Unable to process your request.';
        }
    }
});

function sendMessage(message) {
    var chatWindow = document.getElementById("chat-window");

    // Display user message
    chatWindow.innerHTML += "<div>User: " + message + "</div>";

    // Rest of your function...
}

$(document).ready(function() {
    var queryParams = new URLSearchParams(window.location.search);
    var query = queryParams.get('q'); // Assuming the query parameter is named 'q'
    
    if(query) {
        // Here, you would call your sendMessage function and pass 'query'
        sendMessage(query);
    }
});

// Rest of your code...
