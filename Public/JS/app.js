import { nameAndWelcomeMessage, onlineCheck, triggerLoader, stopLoader } from "./Services/functions.js";

document.addEventListener('DOMContentLoaded', async (e) => {
  triggerLoader();

  // Delay before render
  setTimeout(() => {
    nameAndWelcomeMessage();
    stopLoader();

    // Chatbot messages - Handlechatbot function
    let textBoxNode = document.getElementById('textbox');
    const showChat = (type, message) => {
      let chatContainerNode = document.createElement('div');
      chatContainerNode.classList.add('message', type);
      let chatText = document.createElement('p');
      chatText.innerHTML = message;
      chatContainerNode.appendChild(chatText);

      textBoxNode.appendChild(chatContainerNode);
      textBoxNode.scrollTop = textBoxNode.scrollHeight;
    };

    // Scrolling inside the textBoxNode
    let scrollPosition = 0;
    const unscroll = () => {
      textBoxNode.scrollTop = scrollPosition;
    };

    const scrollText = () => {
      let scrolledToBottom =
        textBoxNode.scrollHeight - textBoxNode.clientHeight <=
        textBoxNode.scrollTop + 1;
      textBoxNode.scrollTop = textBoxNode.scrollHeight;
      if (scrolledToBottom) {
        unscroll();
      }
    };

    scrollText();

    // API communication
    const APIURL = 'https://api.openai.com/v1/chat/completions';

    let conversation = [
      {
        role: 'system',
        content: 'How are you today? Please ask me anything',
      },
    ];

    const sendBotMessage = async (msg, APIKEY) => {
      let message = {
        role: 'user',
        content: msg,
      };

      // Add user message to conversation history
      conversation.push(message);

      let data = {
        model: 'gpt-3.5-turbo',
        messages: conversation,
      };

      triggerLoader();
      try {
        let chatResponse = await fetch(APIURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${APIKEY}`,
          },
          body: JSON.stringify(data),
        });

        if (!chatResponse.ok) {
          throw new Error('Error occurred while rendering the chat message');
        }

        let responseData = await chatResponse.json();
        if (responseData && responseData.choices && responseData.choices.length > 0) {
          let botResponse = responseData.choices[0].message.content;
          stopLoader();
          showChat('received', botResponse);

          // Add bot response to conversation history
          conversation.push({
            role: 'assistant',
            content: botResponse,
          });
        }
      } catch (err) {
        console.log(err);
        showChat('error', `The following error occurred: ${err}`);
      }
    };
          

    // Send-button and input field
    let sendButtonNode = document.getElementById('send-button');
    let userInputNode = document.querySelector('.user-input');

    sendButtonNode.addEventListener('click', async () => {
        let userMessage = userInputNode.value.trim();
        userInputNode.value = '';
        const maxInputLength = 3800;
        if (userMessage === '') {
          return;
        } else {
          if (!onlineCheck()) {
            showChat('error', 'Please check your internet connection!');
            return;
          } else if (userMessage.length > maxInputLength) {
            showChat('error', `Message too long (max ${maxInputLength} characters)`);
            return;
          } else {
            try {
              let response = await fetch('http://localhost:2500/api/key');
              if (!response.ok) {
                throw new Error('Error occurred while fetching the API key');
              }
      
              let keyData = await response.json();
              let APIKEY = keyData.apiKey; // Retrieve the API key
      
              if (!APIKEY) {
                showChat('error', 'Missing API Key');
                return;
              }
      
              showChat('sent', userMessage);
              let res = await sendBotMessage(userMessage, APIKEY);
              if (res) {
                showChat('received', res);
                scrollText();
              }
            } catch (err) {
              showChat('error', 'Failed to fetch from API');
              console.log(err);
            }
          }
        }
      });

    // Send by pressing enter functionality
    userInputNode.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            sendButtonNode.click();
            userInputNode.value = '';
        }
    });
}, 1000);
});