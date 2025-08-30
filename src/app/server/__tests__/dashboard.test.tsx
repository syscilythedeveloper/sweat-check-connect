/**
 * @jest-environment node
 */

import { prismaMock } from "./mocks/prisma";

// IMPORTANT: This path must exactly match how your code imports prisma
// If your util imports prisma from "@/prisma/utils/prisma", update the string below accordingly.
jest.mock("../../../../prisma/utils/prisma", () => ({
  __esModule: true,
  default: prismaMock,
}));

// Adjust this import to wherever your function lives (e.g., "@/server/feeds")
import { getLeaderboardData } from "../utils/feedFunctions";

describe("getLeaderboardData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("queries prisma with the expected shape and returns rows", async () => {
    const rows = [
      {
        username: "sys",
        name: "Syscily Brown",
        avatar: "https://example.com/a.png",
        daysActive: 12,
        currentActiveStreak: 5,
        longestActiveStreak: 15,
      },
      {
        username: "alex",
        name: "Alex",
        avatar: null,
        daysActive: 9,
        currentActiveStreak: 3,
        longestActiveStreak: 11,
      },
    ];
    prismaMock.user.findMany.mockResolvedValue(rows);

    const result = await getLeaderboardData();

    expect(prismaMock.user.findMany).toHaveBeenCalledWith({
      select: {
        username: true,
        name: true,
        avatar: true,
        daysActive: true,
        currentActiveStreak: true,
        longestActiveStreak: true,
      },
      orderBy: [
        { daysActive: "desc" },
        { currentActiveStreak: "desc" },
        { username: "asc" },
      ],
      take: 10,
      where: { daysActive: { gt: 0 } },
    });
    expect(result).toEqual(rows);
  });

  it("bubbles up prisma errors", async () => {
    prismaMock.user.findMany.mockRejectedValue(new Error("db down"));
    await expect(getLeaderboardData()).rejects.toThrow("db down");
  });
});
