import { nameAndWelcomeMessage, onlineCheck } from "./Services/functions.js";

// Load name and welcome message
document.addEventListener('DOMContentLoaded', e => {
    nameAndWelcomeMessage();


    // Chatbot messages - Handlechatbot function
    let textboxNode = document.getElementById('textbox');
    const showChat = (type, message) => {
        let textboxNode = document.getElementById('textbox');
        let chatContainerNode = document.createElement('div');
        chatContainerNode.classList.add('message', type);
        let chatText = document.createElement('p');
        chatText.innerHTML = message;
        chatContainerNode.appendChild(chatText);

        textboxNode.appendChild(chatContainerNode);
        textboxNode.scrollTop = textboxNode.scrollHeight;
    };

    // Loader
    const triggerLoader = () => {
        document.querySelector('.load-container').style.display = 'flex';
    };

    const stopLoader = () => {
        document.querySelector('.load-container').style.display = 'none';
    };

    // Focus on the bottom of the chat.
    let scrollPosition = 0;
    const unscroll = () => {
        textboxNode.scrollTop = scrollPosition;
    }
    const scrollText = () => {
        let scrolledToBottom = textboxNode.scrollHeight - textboxNode.clientHeight <= textboxNode.scrollTop + 1;
        textboxNode.scrollTop = textboxNode.scrollHeight;
        if (scrolledToBottom) {
            unscroll();
        }
    }
    scrollText();

    // API Key implementation

    const APIKEY = 'HIDDEN';
    const APIURL = 'HIDDEN';

    const sendBotMessage = async msg => {
        let data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    role: "system",
                    "content": "How are you today? Please ask me anything"
                },
                {
                    role: "user",
                    content: msg
                }
            ]

        };

        triggerLoader();
        try {
            let response = await fetch(APIURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${APIKEY}`
                },
                body: JSON.stringify(data)
            });
            console.log(response);

            if (!response.ok) {
                throw new Error ('Error occurred while chat message being rendered');
            } else {
                let data = await response.json();
                if (data && data.choices && data.choices.length > 0) {
                    let botResponse = data.choices[0].message.content;
                    stopLoader();
                    showChat('received', botResponse);
                } else {
                    handleAPIError(data);
                }
            }
        } catch (err) {
            console.log(err);
            showChat('error', `The following error occurred: ${err}`);
        }
    };

    

    // Send message functionality
    let sendButtonNode = document.getElementById('send-button');
    let userInputNode = document.querySelector('.user-input');

    sendButtonNode.addEventListener('click', async () => {
        let userMessage = userInputNode.value.trim();
        const maxInputLength = 3800;
        if (userMessage === '') {

        } else {
            if (!onlineCheck()) {
                showChat('error', 'Please check your internet connection!');
                return;
            } else if (userMessage.length > maxInputLength) {
                showChat('error', `Message too long (max ${maxInputLength} characters)`);
            }
            else {
                if (!APIKEY) {
                    showChat('error', 'Missing API Key');
                } else {
                    try {
                        showChat('sent', userMessage);
                        let res = await sendBotMessage(userMessage);
                        if (res) {
                            showChat('received', res);
                            scrollText();
                        }
                    } catch (err) {
                        showChat('error', 'Failed to fetch from API');
                    }
                }
            };
        };
    });
});