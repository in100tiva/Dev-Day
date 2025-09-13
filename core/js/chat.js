// Chat functionality module
export class ChatWidget {
    constructor() {
        this.chatWidget = document.getElementById('chat-widget');
        this.openChatBtn = document.getElementById('open-chat');
        this.closeChatBtn = document.getElementById('close-chat');
        this.chatForm = document.getElementById('chat-form');
        this.chatInput = document.getElementById('chat-input');
        this.chatMessages = document.getElementById('chat-messages');
        
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.openChatBtn.addEventListener('click', () => {
            this.chatWidget.classList.remove('hidden');
        });

        this.closeChatBtn.addEventListener('click', () => {
            this.chatWidget.classList.add('hidden');
        });

        this.chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = this.chatInput.value.trim();
            if (message) {
                this.addUserMessage(message);
                this.chatInput.value = '';
                setTimeout(() => {
                    this.addBotMessage('Obrigado por sua mensagem! Um de nossos atendentes responderá em breve.');
                }, 1000);
            }
        });
    }

    addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'flex items-start justify-end';
        messageElement.innerHTML = `
            <div class="mr-3 bg-primary text-white p-3 rounded-2xl rounded-tr-none max-w-[80%]">
                <p>${message}</p>
            </div>
            <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="ri-user-line text-white text-sm"></i>
            </div>
        `;
        this.chatMessages.appendChild(messageElement);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'flex items-start';
        messageElement.innerHTML = `
            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <i class="ri-customer-service-2-line text-white text-sm"></i>
            </div>
            <div class="ml-3 bg-gray-100 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                <p class="text-gray-800">${message}</p>
            </div>
        `;
        this.chatMessages.appendChild(messageElement);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}
