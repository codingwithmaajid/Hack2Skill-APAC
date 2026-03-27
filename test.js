const processText = (str) => {
    let processed = str
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') // Code block
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')         // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')                     // Italics
        .replace(/`([^`]+)`/g, '<code>$1</code>')                 // Inline code
        .replace(/\n/g, '<br>');                                  // Newlines
    return processed;
};
console.log(processText("**bold**"));
console.log(processText("normal text **bold** and *italic*"));
