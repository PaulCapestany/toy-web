// script.js
//
// This file handles interactions with the toy-service /echo endpoint.
// It posts a user-provided message and displays the response.
// Every step is logged to the console for debugging and clarity.
//
// Assumptions:
// - toy-service is running at http://localhost:8080
// - The /echo endpoint expects a POST with JSON: {"message":"..."}
// - On success, it returns a JSON with {message, version, commit, env}.
//
// Error Handling:
// - If the fetch fails or returns non-200, we display an error message in the console and alert the user.
// - Input validation is minimal (required field in HTML). We also check empty strings in JS just in case.
//
// Tests:
// - We'll have a Jest test that mocks fetch and ensures our sendEchoRequest function behaves correctly.
//
// Usage:
// - The user enters a message, clicks "Send".
// - We send the request, log all steps, and update the DOM with results.

console.log("script.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, attaching event listeners");
  const form = document.getElementById("echo-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted by user");

    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();
    console.log("User input message:", message);

    if (!message) {
      console.warn("Empty message, not sending request");
      alert("Please enter a non-empty message.");
      return;
    }

    try {
      console.log("Sending request to /echo endpoint");
      const result = await sendEchoRequest(message);
      console.log("Request successful, updating UI with result", result);
      displayResult(result);
    } catch (err) {
      console.error("Error in sendEchoRequest:", err);
      alert("Failed to get echo response. Check console for details.");
    }
  });
});

/**
 * sendEchoRequest sends a message to the /echo endpoint and returns the parsed JSON.
 * @param {string} message The message to send
 * @returns {Promise<object>} The response object {message, version, commit, env}
 */
async function sendEchoRequest(message) {
  console.log("Inside sendEchoRequest function");
  const url = "http://localhost:8080/echo";
  const payload = { message };

  console.log("Fetch POST:", url, payload);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  console.log("Fetch response received. Status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Non-OK response from server:", errorText);
    throw new Error(`Server returned status ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  console.log("Parsed JSON from response:", data);
  return data;
}

/**
 * displayResult updates the DOM with the echo result fields.
 * @param {object} result The result object with {message, version, commit, env}.
 */
function displayResult(result) {
  console.log("Displaying result to user");
  const resultDiv = document.getElementById("result");
  const resultMessage = document.getElementById("resultMessage");
  const resultVersion = document.getElementById("resultVersion");
  const resultCommit = document.getElementById("resultCommit");
  const resultEnv = document.getElementById("resultEnv");

  resultMessage.textContent = result.message || "";
  resultVersion.textContent = result.version || "";
  resultCommit.textContent = result.commit || "";
  resultEnv.textContent = result.env || "";

  resultDiv.classList.remove("hidden");
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sendEchoRequest
  };
}
