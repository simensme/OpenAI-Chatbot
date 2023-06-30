import {nameAndWelcomeMessage, onlineCheck} from "./Services/functions.js";

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


         // Send message functionality
         let sendButtonNode = document.getElementById('send-button');
         let userInputNode = document.querySelector('.user-input');

         sendButtonNode.addEventListener('click', async () => {
            let userMessage = userInputNode.value.trim();
            const maxInputLength = 3800;
            if (userMessage === '') {

            } else {
                if(!onlineCheck()) {
                    showChat('error', 'Please check your internet connection!');
                    return;
                } else if (userMessage.length > maxInputLength) {
                    showChat('error', `Message too long (max ${maxInputLength} characters)`);
                } 
                else {
                    showChat('sent', userMessage);
                };
            };
         });


});