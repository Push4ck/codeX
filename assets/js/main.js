// Function to update the output based on HTML, CSS, and JS inputs
function run() {
  const htmlCode = document.getElementById("html-code").value;
  const cssCode = document.getElementById("css-code").value;
  const jsCode = document.getElementById("js-code").value;
  const output = document.getElementById("output");

  // Update the output with HTML, CSS, and JS
  output.contentDocument.body.innerHTML =
    htmlCode + "<style>" + cssCode + "</style>";
  output.contentWindow.eval(jsCode);
}

// Function to copy content from HTML textarea
function copyContent() {
  const htmlCode = document.getElementById("html-code");
  htmlCode.select();
  document.execCommand("copy");
}

// Function to delete content from a specific textarea
function deleteContent(contentType) {
  document.getElementById(contentType + "-code").value = "";
  updateOutput();
}

// Function to update output after content deletion
function updateOutput() {
  run();
}

// Function to save HTML content to a file
function saveContent() {
  downloadFile(
    "index.html",
    document.getElementById("html-code").value,
    "text/html"
  );
}

// Function to save CSS content to a file
function saveCSSContent() {
  downloadFile(
    "style.css",
    document.getElementById("css-code").value,
    "text/css"
  );
}

// Function to save JS content to a file
function saveJSContent() {
  downloadFile(
    "script.js",
    document.getElementById("js-code").value,
    "text/javascript"
  );
}

// Function to download a file with specified filename, content, and content type
function downloadFile(filename, content, contentType) {
  const blob = new Blob([content], { type: contentType });
  const a = document.createElement("a");

  // Set download link properties
  a.href = URL.createObjectURL(blob);
  a.download = filename;

  // Append the link to the body, trigger a click, and remove the link
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Function to handle Ctrl+A, Ctrl+C, Ctrl+X, and Tab within textarea
function handleTextareaKeyEvents(textareaId, event) {
  const textarea = document.getElementById(textareaId);

  if (event.ctrlKey) {
    switch (event.key) {
      case "a":
        // Select all text
        event.preventDefault();
        textarea.select();
        break;
      case "c":
        // Copy selected text
        document.execCommand("copy");
        break;
      case "x":
        // Cut selected text
        document.execCommand("cut");
        break;
      default:
        break;
    }
  } else if (event.key === "Tab") {
    event.preventDefault();

    // Insert tab at the current cursor position
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Add a tab character at the cursor position
    const tabCharacter = "\t";
    const currentContent = textarea.value;
    textarea.value =
      currentContent.substring(0, start) +
      tabCharacter +
      currentContent.substring(end);

    // Move the cursor to the position after the inserted tab
    textarea.selectionStart = textarea.selectionEnd =
      start + tabCharacter.length;
  }
}

// Array of textarea IDs for event handling
const textAreaIds = ["html-code", "css-code", "js-code"];

// Attach event listeners for Ctrl+A, Ctrl+C, Ctrl+X, and Tab for each textarea
textAreaIds.forEach((textareaId) => {
  const textarea = document.getElementById(textareaId);
  textarea.addEventListener("keydown", (event) =>
    handleTextareaKeyEvents(textareaId, event)
  );
});
