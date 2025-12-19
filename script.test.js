/**
 * script.test.js
 *
 * Unit tests for the sendEchoRequest function.
 * We mock global fetch to simulate API responses.
 */

const { sendEchoRequest, fetchHealthStatus } = require("./script.js");

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
      status: 200,
      json: async () => mockResponse
    });

    const result = await sendEchoRequest("Hello world");
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/echo", expect.objectContaining({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ message: "Hello world" })
    }));
    const requestOptions = fetch.mock.calls[0][1];
    expect(requestOptions.signal).toBeDefined();
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

  test("timeout aborts long-running requests", async () => {
    const abortError = new Error("The operation was aborted");
    abortError.name = "AbortError";
    fetch.mockRejectedValueOnce(abortError);
    await expect(sendEchoRequest("Hello world")).rejects.toThrow("Request timed out after 10 seconds");
  });

  test("invalid JSON response throws a descriptive error", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => {
        throw new SyntaxError("Unexpected token < in JSON at position 0");
      }
    });

    await expect(sendEchoRequest("Hello world")).rejects.toThrow("Server returned invalid JSON");
  });
});

describe("fetchHealthStatus", () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  test("returns the status string from a healthy service", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ status: "ok" })
    });

    const status = await fetchHealthStatus();
    expect(status).toBe("ok");
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/healthz", expect.objectContaining({
      method: "GET",
      headers: { Accept: "application/json" }
    }));
    const requestOptions = fetch.mock.calls[0][1];
    expect(requestOptions.signal).toBeDefined();
  });

  test("non-200 response throws an error", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 503,
      text: async () => "Service unavailable"
    });

    await expect(fetchHealthStatus()).rejects.toThrow("Health check failed with status 503: Service unavailable");
  });

  test("timeout aborts health checks", async () => {
    const abortError = new Error("The operation was aborted");
    abortError.name = "AbortError";
    fetch.mockRejectedValueOnce(abortError);

    await expect(fetchHealthStatus({ timeoutMs: 1000 })).rejects.toThrow("Health check timed out after 1 seconds");
  });

  test("missing status field is rejected", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ message: "ok" })
    });

    await expect(fetchHealthStatus()).rejects.toThrow("Health check response missing status");
  });
});
