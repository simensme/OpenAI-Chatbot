import {nameAndWelcomeMessage} from "./Services/functions.js";

// Load name and welcome message
document.addEventListener('DOMContentLoaded', e => {
    nameAndWelcomeMessage();


         // Chatbot messages - Handlechatbot function
         let textboxNode = document.getElementById('textbox');
         const showChat = (type, message) => {
             let chatContainerNode = document.createElement('div');
             chatContainerNode.classlIst.add('message', type);
             let chatText = document.createElement('p');
             chatText.innerHTML = message;
             chatContainerNode.appendChild(chatText);

             textboxNode.appendChild(chatContainerNode);
             textboxNode.scrollTop = chatLog.scrollHeight;
         };


         // Check if you have internet
         const onlineCheck = () => {
            return navigator.onLine;
         };

         console.log(onlineCheck());



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
    

});

