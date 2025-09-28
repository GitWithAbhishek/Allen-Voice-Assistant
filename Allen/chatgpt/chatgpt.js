const listenButton = document.getElementById("listen-btn");
const responseElement = document.getElementById("response");
const statusElement = document.getElementById("status");

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = function(event) {
    let transcript = event.results[0][0].transcript.toLowerCase();
    console.log("You said: " + transcript);

    if (transcript.includes("chatgpt")) {
        let question = transcript.replace("chatgpt", "").trim();
        if (question) {
            getChatGPTResponse(question);
        } else {
            responseElement.innerText = "Please ask a specific question after saying 'ChatGPT'.";
        }
    } else {
        responseElement.innerText = "Please start with 'ChatGPT' to ask a question.";
    }
};

listenButton.addEventListener("click", () => {
    recognition.start();
    listenButton.disabled = true;
    statusElement.innerText = "Listening...";
});

async function getChatGPTResponse(question) {
    statusElement.innerText = "Fetching answer...";

    const apiKey = "";  // Replace with your API key
    const endpoint = "https://api.openai.com/v1/completions";
    
    const requestData = {
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 100,
        temperature: 0.7
    };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        if (data.choices && data.choices[0].text) {
            const answer = data.choices[0].text.trim();
            openAnswerInNewTab(answer);
            responseElement.innerText = "Answer fetched!";
        } else {
            responseElement.innerText = "Sorry, I couldn't get an answer from ChatGPT.";
        }
    } catch (error) {
        console.error("Error fetching response from ChatGPT:", error);
        responseElement.innerText = "Error fetching answer. Please try again.";
    }
}

function openAnswerInNewTab(answer) {
    const newTab = window.open('', '_blank');
    newTab.document.write(`
        <html>
            <head><title>ChatGPT Answer</title></head>
            <body>
                <h1>Your Question Answered:</h1>
                <p>${answer}</p>
            </body>
        </html>
    `);
}
