import "@testing-library/jest-dom";
import {
  fetchChallengesData,
  fetchChallengeData,
  createChallenge,
  joinChallenge,
  leaveChallenge,
  deleteChallenge,
  calculateDaysUntilStart,
  calculateCurrentDay,
} from "../utils/challengeData";

describe("Retrieving challenge data", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe("fetchChallengesData", () => {
    it("returns response when fetch is successful", async () => {
      const mockData = { message: "fetched challenges data" };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockData),
      });
      const result = await fetchChallengesData();
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("/api/challenges");
    });

    it("throws an error when fetch fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(fetchChallengesData()).rejects.toThrow(
        "Failed to fetch challenges data"
      );
      expect(fetch).toHaveBeenCalledWith("/api/challenges");
    });
  });

  describe("fetchChallengeData", () => {
    it("returns challenge data when fetch is successful", async () => {
      const mockData = { id: "123", name: "Test Challenge" };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const result = await fetchChallengeData("123");
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith("/api/challenges/123");
    });

    it("throws an error when fetch fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(fetchChallengeData("123")).rejects.toThrow(
        "Failed to fetch challenge data"
      );
      expect(fetch).toHaveBeenCalledWith("/api/challenges/123");
    });
  });

  describe("createChallenge", () => {
    it("returns success message when challenge is created", async () => {
      const mockData = {
        status: "200",
        name: "Challenge created successfully",
      };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const result = await createChallenge({
        id: "user1",
        challengeName: "PracticeChallenge",
      });
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith("/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "user1",
          challengeName: "PracticeChallenge",
        }),
      });
    });

    it("throws an error when fetch fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(
        createChallenge({ id: "user1", challengeName: "PracticeChallenge" })
      ).rejects.toThrow("Failed to create challenge");
    });
  });

  describe("joinChallenge", () => {
    it("returns response when joining challenge is successful", async () => {
      const mockData = { status: 200 };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockData),
      });
      const result = await joinChallenge("testchallenge1");
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith("/api/challenges/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: "testchallenge1" }),
      });
    });

    it("throws an error when joining fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false });
      await expect(joinChallenge("testchallenge1")).rejects.toThrow(
        "Failed to join challenge"
      );
      expect(fetch).toHaveBeenCalledWith("/api/challenges/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: "testchallenge1" }),
      });
    });
  });

  describe("leaveChallenge", () => {
    it("returns response when leaving challenge is successful", async () => {
      const mockData = { status: 200 };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockData),
      });
      const result = await leaveChallenge("testchallenge1");
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith("/api/challenges/join", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: "testchallenge1" }),
      });
    });

    it("throws an error when fetch fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false });
      await expect(leaveChallenge("testchallenge1")).rejects.toThrow(
        "Failed to leave challenge"
      );
      expect(fetch).toHaveBeenCalledWith("/api/challenges/join", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: "testchallenge1" }),
      });
    });
  });

  describe("deleteChallenge", () => {
    it("returns response when deleting challenge is successful", async () => {
      const mockData = { status: 200 };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockData),
      });
      const result = await deleteChallenge("testchallenge1");
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith("/api/challenges", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: "testchallenge1" }),
      });
    });

    it("throws an error when fetch fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false });
      await expect(deleteChallenge("testchallenge1")).rejects.toThrow(
        "Failed to delete challenge"
      );
      expect(fetch).toHaveBeenCalledWith("/api/challenges", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: "testchallenge1" }),
      });
    });
  });
});

describe("Calculation Functions", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-08-20T00:00:00Z"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  describe("calculateDaysUntilStart", () => {
    it("returns correct days until start for a future date", () => {
      const startDate = new Date("2025-08-25T00:00:00Z");
      expect(calculateDaysUntilStart(startDate)).toBe(5);
    });

    it("returns 0 if start date is today", () => {
      const startDate = new Date("2025-08-20T00:00:00Z");
      expect(calculateDaysUntilStart(startDate)).toBe(0);
    });

    it("returns negative days if start date is in the past", () => {
      const startDate = new Date("2025-08-15T00:00:00Z");
      expect(calculateDaysUntilStart(startDate)).toBe(-5);
    });
  });
  describe("CalculateCurrentDay", () => {
    it("returns correct current day within challenge duration", () => {
      const startDate = new Date("2025-08-18T00:00:00Z");
      const duration = 10;
      expect(calculateCurrentDay(startDate, duration)).toBe(3);
    });

    it("returns 1 if today is the start date", () => {
      const startDate = new Date("2025-08-20T00:00:00Z");
      const duration = 10;
      expect(calculateCurrentDay(startDate, duration)).toBe(1);
    });

    it("returns duration if today is the last day of the challenge", () => {
      const startDate = new Date("2025-08-11T00:00:00Z");
      const duration = 10;
      expect(calculateCurrentDay(startDate, duration)).toBe(10);
    });

    it("returns duration if today is after the challenge end date", () => {
      const startDate = new Date("2025-08-01T00:00:00Z");
      const duration = 10;
      expect(calculateCurrentDay(startDate, duration)).toBe(10);
    });

    it("returns 0 if today is before the challenge start date", () => {
      const startDate = new Date("2025-08-25T00:00:00Z");
      const duration = 10;
      expect(calculateCurrentDay(startDate, duration)).toBe(0);
    });
  });
});
