import {
  validatePassword,
  validateNewUser,
  saveUser,
} from "../SignUpForm.utils";

beforeEach(() => {
  global.fetch = jest.fn();
});
afterEach(() => {
  jest.resetAllMocks();
});

describe("validate Password", () => {
  it("returns all errors for a bad password", () => {
    expect(validatePassword("abc")).toEqual([
      "Password must be at least 8 characters long.",
      "Password must contain at least one uppercase letter.",
      "Password must contain at least one number.",
      "Password must contain at least one special character.",
    ]);
  });
  it("returns errors for a password missing uppercase letter", () => {
    expect(validatePassword("validpass1!")).toEqual([
      "Password must contain at least one uppercase letter.",
    ]);
  });
  it("returns errors for a password missing lowercase letter", () => {
    expect(validatePassword("VALIDPASS1!")).toEqual([
      "Password must contain at least one lowercase letter.",
    ]);
  });
  it("returns errors for missing special character", () => {
    expect(validatePassword("ValidPass12")).toEqual([
      "Password must contain at least one special character.",
    ]);
  });

  it("returns no errors for a valid password", () => {
    expect(validatePassword("ValidPass1!")).toEqual([]);
  });
});

describe("Validate User", () => {
  it("returns true if user exists", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ exists: true }),
    });
    const result = await validateNewUser("test@example.com");
    expect(result).toBe(true);
  });
  it("returns false is the user does not exist", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ exists: false }),
    });
    const result = await validateNewUser("test@example.com");
    expect(result).toBe(false);
  });
  it("throws error if fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Failed to fetch users" }),
    });
    await expect(validateNewUser("fail@example.com")).rejects.toThrow(
      "Failed to check user existence"
    );
  });
});

describe("saveUser", () => {
  it("returns data on successful user creation", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { id: "1", email: "test@example.com" } }),
    });
    const result = await saveUser("test@example.com", "ValidPass1!");
    expect(result).toEqual({ user: { id: "1", email: "test@example.com" } });
  });

  it("throws error if response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Email already exists" }),
    });
    await expect(saveUser("test@example.com", "ValidPass1!")).rejects.toThrow(
      "Email already exists"
    );
  });
});
