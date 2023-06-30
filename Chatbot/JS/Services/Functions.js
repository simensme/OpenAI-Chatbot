const nameAndWelcomeMessage = () => {
   
    // Name generator
    const generateChatBotName = () => {
        const adjectives = ['Virtual', 'Specialist', 'Intelligent', 'Super'];
        const nouns = ['Robot', 'Bot', 'Assistant', 'Machine'];
        const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        return `${randomAdj} Chat ${randomNoun}`;
    };

    // Gives the Open AI Chatbot a unique name.
    let chatbotName = '';
    const setChatBotName = () => {
        chatbotName = generateChatBotName();
        document.querySelector('.chatbot-name').innerHTML = chatbotName;
        document.title = chatbotName;
    };
    setChatBotName();

    // Unique welcome message
    const generateWelcomeMessage = () => {
        const welcomeArray = ['How may I help you?', 'Please ask me anything.', 'Let me know what I can do for you.', 'How can I assist you today?', 'What can I help you with?', "I'm here to answer your questions. What would you like to know?", "Feel free to explore and ask me anything you'd like.", "I'm here to provide information and support, How can I assist you?", 'Please let me know how I can help you.'];
        const randomWelcomeMessage = welcomeArray[Math.floor(Math.random() * welcomeArray.length)];
        const welcomeMessageNode = document.getElementById('welcome-message');
        if (chatbotName[0] === 'I') {
            welcomeMessageNode.innerHTML = `Hello, I am an ${chatbotName}! <br>${randomWelcomeMessage}`;
        } else {
            welcomeMessageNode.innerHTML = `Hello, I am a ${chatbotName}! <br>${randomWelcomeMessage}`;
        }
    };
    generateWelcomeMessage();
};


// Check if you have internet
const onlineCheck = () => {
    return navigator.onLine;
 };



export {nameAndWelcomeMessage, onlineCheck};