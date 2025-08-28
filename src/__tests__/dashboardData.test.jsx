import "@testing-library/jest-dom";
import { fetchDashboardData } from "../utils/dashboardData";

describe("Retrieving dashboard data", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe("fetchDashboardData", () => {
    it("returns response when fetch is successful", async () => {
      const mockData = { message: "fetched dashboard data" };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockData),
      });
      const result = await fetchDashboardData();
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("/api/dashboard");
    });

    it("throws an error when fetch fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(fetchDashboardData()).rejects.toThrow(
        "Failed to fetch dashboard data"
      );
      expect(fetch).toHaveBeenCalledWith("/api/dashboard");
    });
  });
});
