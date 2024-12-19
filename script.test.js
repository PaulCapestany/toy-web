/**
 * script.test.js
 *
 * Unit tests for the sendEchoRequest function.
 * We mock global fetch to simulate API responses.
 */

const { sendEchoRequest } = require("./script.js");

// Mock the fetch function
global.fetch = jest.fn();

describe("sendEchoRequest", () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  test("successful request returns parsed JSON", async () => {
    const mockResponse = {
      message: "Hello world [modified]",
      version: "v0.2.1",
      commit: "abc1234",
      env: "dev"
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await sendEchoRequest("Hello world");
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/echo", expect.objectContaining({
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ message: "Hello world" })
    }));
  });

  test("non-200 response throws an error", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => "Invalid input"
    });

    await expect(sendEchoRequest("")).rejects.toThrow("Server returned status 400: Invalid input");
  });

  test("network error throws an error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network fail"));
    await expect(sendEchoRequest("Hello world")).rejects.toThrow("Network fail");
  });
});
