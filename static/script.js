document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatArea = document.getElementById('chatArea');

    // Templates
    const userMessageTemplate = document.getElementById('userMessageTemplate');
    const aiMessageTemplate = document.getElementById('aiMessageTemplate');
    const loadingTemplate = document.getElementById('loadingTemplate');

    let isWaitingForResponse = false;

    // Auto-resize textarea
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        
        // Enable/disable send button
        if (this.value.trim() !== '' && !isWaitingForResponse) {
            sendBtn.removeAttribute('disabled');
        } else {
            sendBtn.setAttribute('disabled', 'true');
        }
    });

    // Handle Enter key (Shift+Enter for new line)
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (userInput.value.trim() !== '' && !isWaitingForResponse) {
                chatForm.dispatchEvent(new Event('submit'));
            }
        }
    });

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const text = userInput.value.trim();
        if (!text || isWaitingForResponse) return;

        // Reset input
        userInput.value = '';
        userInput.style.height = 'auto';
        sendBtn.setAttribute('disabled', 'true');

        // Add user message
        addUserMessage(text);
        
        // Add loading state
        const loadingEl = addLoading();
        
        isWaitingForResponse = true;

        try {
            // Call the AI Agent API endpoint
            const response = await fetch(`/agent?query=${encodeURIComponent(text)}`);
            const data = await response.json();
            
            // Remove loading state
            loadingEl.remove();

            if (data.response) {
                addAiMessage(data.response);
            } else {
                addAiMessage("Sorry, I didn't get a valid response.");
            }
        } catch (error) {
            loadingEl.remove();
            addAiMessage("Error: Could not connect to the agent.");
            console.error("API Error:", error);
        } finally {
            isWaitingForResponse = false;
        }
    });

    function scrollToBottom() {
        chatArea.scrollTo({
            top: chatArea.scrollHeight,
            behavior: 'smooth'
        });
    }

    function addUserMessage(text) {
        const clone = userMessageTemplate.content.cloneNode(true);
        const messageEl = clone.querySelector('.message');
        const textEl = clone.querySelector('.text');
        
        // Basic escaping to prevent XSS
        textEl.textContent = text;
        
        chatArea.appendChild(messageEl);
        scrollToBottom();
    }

    function addLoading() {
        const clone = loadingTemplate.content.cloneNode(true);
        const loadingEl = clone.querySelector('.message');
        chatArea.appendChild(loadingEl);
        scrollToBottom();
        return loadingEl;
    }

    function addAiMessage(text) {
        const clone = aiMessageTemplate.content.cloneNode(true);
        const messageEl = clone.querySelector('.message');
        const textEl = clone.querySelector('.text');
        const copyBtn = clone.querySelector('.copy-btn');
        
        chatArea.appendChild(messageEl);
        
        // Typing Effect
        let i = 0;
        textEl.innerHTML = ''; // Start empty
        
        // Simple markdown parsing for bold and code
        const processText = (str) => {
            if (!str) return "";
            let p = str.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
            p = p.split('**').map((part, i, arr) => (i % 2 === 1 && i < arr.length - 1) ? '<strong>' + part + '</strong>' : (i % 2 === 1 ? '**' + part : part)).join('');
            p = p.split('*').map((part, i, arr) => (i % 2 === 1 && i < arr.length - 1) ? '<em>' + part + '</em>' : (i % 2 === 1 ? '*' + part : part)).join('');
            p = p.split('`').map((part, i, arr) => (i % 2 === 1 && i < arr.length - 1) ? '<code>' + part + '</code>' : (i % 2 === 1 ? '`' + part : part)).join('');
            p = p.replace(/\\n/g, '<br>');
            return p;
        };
        
        const speed = 15; // ms per character
        
        function typeWriter() {
            if (i < text.length) {
                // If we encounter a tag, skip typing it out character by character
                // For a true typing effect with HTML, this gets complex, 
                // so we will simulate typing using plain text appending and re-parse slightly
                // Or simply output chunks.
                // Because rich text formatting during typing can break tags,
                // we'll just substring and then process text.
                
                const currentText = text.substring(0, i + 1);
                textEl.innerHTML = processText(currentText);
                
                i++;
                scrollToBottom();
                setTimeout(typeWriter, speed);
            } else {
                // Formatting is complete. Set up copy button.
                textEl.innerHTML = processText(text);
                setupCopyButton(copyBtn, text);
            }
        }
        
        typeWriter();
    }

    function setupCopyButton(btn, text) {
        btn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(text);
                
                // Show tick icon temporarily
                const originalIcon = btn.innerHTML;
                btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                
                setTimeout(() => {
                    btn.innerHTML = originalIcon;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy', err);
            }
        });
    }
});
