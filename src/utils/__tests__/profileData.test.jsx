import "@testing-library/jest-dom";
import { fetchProfileData } from "../profileData";

describe("Retrieving profile data", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe("fetchProfileData", () => {
    it("returns response when fetch is successful", async () => {
      const mockData = { message: "fetched profile data" };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockData),
      });
      const result = await fetchProfileData();
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("/api/profile");
    });

    it("throws an error when fetch fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(fetchProfileData()).rejects.toThrow(
        "Failed to fetch profile data"
      );
      expect(fetch).toHaveBeenCalledWith("/api/profile");
    });
  });
});
