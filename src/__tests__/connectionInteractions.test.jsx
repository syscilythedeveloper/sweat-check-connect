import "@testing-library/jest-dom";
import { followUser, unfollowUser } from "../utils/connectionInteractions";

describe("functions for following/unfollowing users", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe("follow user", () => {
    it("returns response when fetch is successful", async () => {
      const mockData = { message: "User followed successfully" };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockData),
      });
      const result = await followUser("testuser");
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "testuser" }),
      });
    });

    it("throws an error when following fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(followUser("testuser")).rejects.toThrow(
        "Failed to follow user"
      );
      expect(fetch).toHaveBeenCalledWith("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "testuser" }),
      });
    });
  });
  describe("unfollow user", () => {
    it("returns response when fetch is successful", async () => {
      const mockData = { message: "User unfollowed successfully" };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockData),
      });
      const result = await unfollowUser("testuser");
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("/api/follow", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "testuser" }),
      });
    });

    it("throws an error when unfollowing fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(unfollowUser("testuser")).rejects.toThrow(
        "Failed to unfollow user"
      );
      expect(fetch).toHaveBeenCalledWith("/api/follow", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "testuser" }),
      });
    });
  });
});
