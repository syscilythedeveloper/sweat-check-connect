/* eslint-disable @typescript-eslint/no-explicit-any */

// Central, reusable Prisma mock for tests
export const prismaMock = {
  user: {
    findMany: jest.fn<Promise<any[]>, [any]>(),
  },
  checkIn: {
    findMany: jest.fn<Promise<any[]>, [any]>(),
  },
  userFollow: {
    findMany: jest.fn<Promise<any[]>, [any]>(),
  },
};
