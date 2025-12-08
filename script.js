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

// Default timeout so fetch requests don't hang indefinitely.
const REQUEST_TIMEOUT_MS = 10000;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, attaching event listeners");
  const form = document.getElementById("echo-form");
  if (!form) {
    console.warn("echo-form not found in DOM, skipping listener registration");
    return;
  }
  const submitButton =
    form.querySelector("button[type='submit']") || form.querySelector("button");
  const defaultButtonLabel = submitButton ? submitButton.textContent : "";
  const errorMessage = document.getElementById("errorMessage");
  const statusMessage = document.getElementById("statusMessage");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted by user");

    const messageInput = document.getElementById("messageInput");
    const shouldTemporarilyDisableInput =
      messageInput && !messageInput.disabled;
    const message = messageInput ? messageInput.value.trim() : "";
    console.log("User input message:", message);

    if (errorMessage) {
      errorMessage.textContent = "";
      errorMessage.classList.add("hidden");
    }
    if (statusMessage) {
      statusMessage.textContent = "";
      statusMessage.classList.add("hidden");
    }

    if (messageInput) {
      messageInput.removeAttribute("aria-invalid");
    }

    if (!message) {
      console.warn("Empty message, not sending request");
      if (errorMessage) {
        errorMessage.textContent = "Please enter a non-empty message.";
        errorMessage.classList.remove("hidden");
      }
      if (messageInput) {
        messageInput.setAttribute("aria-invalid", "true");
        messageInput.focus();
      }
      return;
    }

    form.setAttribute("aria-busy", "true");
    if (shouldTemporarilyDisableInput) {
      console.log("Disabling message input while request is in flight");
      messageInput.disabled = true;
      messageInput.setAttribute("aria-disabled", "true");
    }
    if (statusMessage) {
      statusMessage.textContent = "Sending message...";
      statusMessage.classList.remove("hidden");
    }
    try {
      if (submitButton) {
        console.log("Disabling submit button while request is in flight");
        submitButton.disabled = true;
        submitButton.setAttribute("aria-disabled", "true");
        submitButton.textContent = "Sending...";
      }
      const resultContainer = document.getElementById("result");
      if (resultContainer) {
        console.log("Hiding previous result while fetching new data");
        resultContainer.classList.add("hidden");
      }
      console.log("Sending request to /echo endpoint");
      const result = await sendEchoRequest(message);
      console.log("Request successful, updating UI with result", result);
      displayResult(result);
      if (messageInput) {
        console.log("Clearing message input after successful submission");
        messageInput.value = "";
      }
      if (statusMessage) {
        statusMessage.textContent = "Echo response received.";
        statusMessage.classList.remove("hidden");
      }
      if (errorMessage) {
        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");
      }
    } catch (err) {
      console.error("Error in sendEchoRequest:", err);
      if (errorMessage) {
        const detail =
          err instanceof Error && err.message ? err.message : "Unknown error. Check console for details.";
        errorMessage.textContent = `Failed to get echo response: ${detail}`;
        errorMessage.classList.remove("hidden");
      }
      if (statusMessage) {
        statusMessage.textContent = "Request failed. Please try again.";
        statusMessage.classList.remove("hidden");
      }
    } finally {
      form.removeAttribute("aria-busy");
      if (shouldTemporarilyDisableInput && messageInput) {
        console.log("Re-enabling message input");
        messageInput.disabled = false;
        messageInput.removeAttribute("aria-disabled");
      }
      if (submitButton) {
        console.log("Re-enabling submit button");
        submitButton.disabled = false;
        submitButton.removeAttribute("aria-disabled");
        submitButton.textContent = defaultButtonLabel;
      }
    }
  });
});

/**
 * sendEchoRequest sends a message to the /echo endpoint and returns the parsed JSON.
 * @param {string} message The message to send
 * @returns {Promise<object>} The response object {message, version, commit, env}
 */
async function sendEchoRequest(message, { timeoutMs = REQUEST_TIMEOUT_MS } = {}) {
  console.log("Inside sendEchoRequest function");
  const url = "http://localhost:8080/echo";
  const payload = { message };

  console.log("Fetch POST:", url, payload);
  const controller =
    typeof AbortController !== "undefined" ? new AbortController() : null;
  const timeoutId = controller
    ? setTimeout(() => controller.abort(), timeoutMs)
    : null;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload)
  };
  if (controller) {
    requestOptions.signal = controller.signal;
  }
  let response;
  try {
    response = await fetch(url, requestOptions);
  } catch (err) {
    if (controller && err && err.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs / 1000} seconds`);
    }
    throw err;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  console.log("Fetch response received. Status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Non-OK response from server:", errorText);
    throw new Error(`Server returned status ${response.status}: ${errorText}`);
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error("Failed to parse JSON response:", err);
    throw new Error("Server returned invalid JSON");
  }
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

  if (!resultDiv) {
    console.warn("Result container missing; cannot render response");
    return;
  }

  if (!resultMessage || !resultVersion || !resultCommit || !resultEnv) {
    console.warn("One or more result fields are missing; skipping update");
    return;
  }

  resultMessage.textContent = result.message || "";
  resultVersion.textContent = result.version || "";
  resultCommit.textContent = result.commit || "";
  resultEnv.textContent = result.env || "";

  resultDiv.classList.remove("hidden");
  if (typeof resultDiv.focus === "function") {
    // Shift focus so assistive tech announces the updated result content.
    try {
      resultDiv.focus({ preventScroll: true });
    } catch (err) {
      resultDiv.focus();
    }
  }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sendEchoRequest
  };
}
