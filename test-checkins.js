// Simple test to check if our function works
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testGetRecentCheckins() {
  const userId = "user_30qhShYzApqma5SupMzp7NKshxP"; // Real Clerk user with check-ins

  console.log("Testing getRecentCheckins with userId:", userId);

  // First, let's verify the user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true },
  });
  console.log("User found:", user);

  const checkins = await prisma.checkIn.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      user: {
        select: { username: true },
      },
    },
  });
  console.log("Check-ins found:", checkins.length);
  console.log("Check-ins data:", checkins);

  await prisma.$disconnect();
}

testGetRecentCheckins().catch(console.error);
