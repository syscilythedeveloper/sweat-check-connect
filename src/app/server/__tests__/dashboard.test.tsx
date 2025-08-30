import { prismaMock } from "../mocks/prisma";

jest.mock("../../../../prisma/utils/prisma", () => ({
  __esModule: true,
  default: prismaMock,
}));

// Adjust this import to wherever your function lives (e.g., "@/server/feeds")
import {
  getLeaderboardData,
  getGlobalCheckins,
  getFollowingCheckins,
} from "../utils/feedFunctions";

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

describe("getGlobalCheckins", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("queries prisma with correct shape and returns checkins", async () => {
    const userId = "user123";
    const checkins = [{ id: 1 }, { id: 2 }];
    prismaMock.checkIn = { findMany: jest.fn().mockResolvedValue(checkins) };

    const result = await getGlobalCheckins(userId);

    expect(prismaMock.checkIn.findMany).toHaveBeenCalledWith({
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
            name: true,
            isPrivate: true,
            followers: {
              where: { followerId: userId },
              select: { status: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    });
    expect(result).toEqual(checkins);
  });

  it("bubbles up prisma errors", async () => {
    const userId = "user123";
    prismaMock.checkIn = {
      findMany: jest.fn().mockRejectedValue(new Error("fail")),
    };
    await expect(getGlobalCheckins(userId)).rejects.toThrow("fail");
  });
});

describe("getFollowingCheckins", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns empty array if no following", async () => {
    const userId = "user123";
    prismaMock.userFollow = { findMany: jest.fn().mockResolvedValue([]) };
    const result = await getFollowingCheckins(userId);
    expect(result).toEqual([]);
  });

  it("queries prisma with correct shape and returns checkins", async () => {
    const userId = "user123";
    const following = [{ followingId: "f1" }, { followingId: "f2" }];
    const checkins = [{ id: 1 }, { id: 2 }];
    prismaMock.userFollow = {
      findMany: jest.fn().mockResolvedValue(following),
    };
    prismaMock.checkIn = { findMany: jest.fn().mockResolvedValue(checkins) };

    const result = await getFollowingCheckins(userId);

    expect(prismaMock.userFollow.findMany).toHaveBeenCalledWith({
      where: { followerId: userId, status: "ACCEPTED" },
      select: { followingId: true },
    });
    expect(prismaMock.checkIn.findMany).toHaveBeenCalledWith({
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
            name: true,
            isPrivate: true,
            followers: {
              where: { followerId: userId },
              select: { status: true },
              take: 1,
            },
          },
        },
      },
      where: { userId: { in: ["f1", "f2"] } },
      orderBy: { createdAt: "desc" },
      take: 30,
    });
    expect(result).toEqual(checkins);
  });

  it("bubbles up prisma errors", async () => {
    const userId = "user123";
    const following = [{ followingId: "f1" }];
    prismaMock.userFollow = {
      findMany: jest.fn().mockResolvedValue(following),
    };
    prismaMock.checkIn = {
      findMany: jest.fn().mockRejectedValue(new Error("fail")),
    };
    await expect(getFollowingCheckins(userId)).rejects.toThrow("fail");
  });
});
