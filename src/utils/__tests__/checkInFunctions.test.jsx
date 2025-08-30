import "@testing-library/jest-dom";
import { postCheckIn } from "../checkInFunctions";

describe("Posting check-in data", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  const formData = new FormData();
  formData.append(
    "video",
    new Blob(["test video"], { type: "video/mp4" }),
    "test.mp4"
  );
  formData.append("caption", "Test caption");
  formData.append("challengeId", "yoga challenge");

  it("calls fetch with correct arguments and returns response json", async () => {
    const mockData = {
      url: "videourl",
      userid: "123345",
      challengeId: "yoga challenge",
    };
    const mockJson = jest.fn().mockResolvedValueOnce(mockData);
    fetch.mockResolvedValueOnce({ ok: true, json: mockJson });

    const result = await postCheckIn(formData);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("/api/checkin", {
      method: "POST",
      body: formData,
    });
    expect(result).toEqual(mockData);
  });

  it("throws an error when fetch fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await expect(postCheckIn(formData)).rejects.toThrow(
      "Failed to post checkin"
    );
  });
});
