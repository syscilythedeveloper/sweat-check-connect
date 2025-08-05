import { PrismaClient, MembershipType } from "@prisma/client";

const prisma = new PrismaClient();
// Use the imported enum MembershipType from "@/types/user"
async function main() {
  console.log("🌱 Starting seed...");

  // Create test users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        username: "XoxoKi_Breon",
        email: "kiara@example.com",
        name: "Kiara McCalvin",
        avatar:
          "https://qqahaz9rntmohbfm.public.blob.vercel-storage.com/ki.jpeg",
        bio: "Coach Ki",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 3,
        longestActiveStreak: 3,
        daysActive: 4,
        isPrivate: false,
      },
    }),

    prisma.user.create({
      data: {
        username: "smiley",
        email: "enijah@example.com",
        name: "Enijah Smith",
        avatar:
          "https://qqahaz9rntmohbfm.public.blob.vercel-storage.com/enijah.png",
        bio: "🌻",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 1,
        longestActiveStreak: 1,
        daysActive: 1,
        isPrivate: false,
      },
    }),

    prisma.user.create({
      data: {
        username: "gabby_m",
        email: "gabby@example.com",
        name: "Gabby Morris",
        avatar:
          "https://qqahaz9rntmohbfm.public.blob.vercel-storage.com/gabby.png",
        bio: "Pilates Instructor",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 1,
        longestActiveStreak: 5,
        daysActive: 1,
        isPrivate: false,
      },
    }),

    prisma.user.create({
      data: {
        username: "william_o",
        email: "william@example.com",
        name: "William Orgertrice",
        avatar:
          "https://qqahaz9rntmohbfm.public.blob.vercel-storage.com/william.png",
        bio: "Tech Entrepreneur",
        membershipType: MembershipType.PREMIUM,
        currentActiveStreak: 1,
        longestActiveStreak: 2,
        daysActive: 4,
        isPrivate: false,
      },
    }),

    prisma.user.create({
      data: {
        username: "vmack",
        email: "victoria@example.com",
        name: "Young Warden",
        avatar:
          "https://qqahaz9rntmohbfm.public.blob.vercel-storage.com/victoria.png",
        bio: "HU alumna",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 0,
        longestActiveStreak: 3,
        daysActive: 3,
        isPrivate: false,
      },
    }),
    prisma.user.create({
      data: {
        username: "daniel",
        email: "daniel@example.com",
        name: "Daniel",
        avatar:
          "https://qqahaz9rntmohbfm.public.blob.vercel-storage.com/daniel.png",
        bio: "Drums and gym",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 5,
        longestActiveStreak: 5,
        daysActive: 6,
        isPrivate: false,
      },
    }),
    prisma.user.create({
      data: {
        username: "aneesah",
        email: "aneesah@example.com",
        name: "Aneesah",
        avatar:
          "https://qqahaz9rntmohbfm.public.blob.vercel-storage.com/aneesah.png",
        bio: "Living life on my own terms",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 2,
        longestActiveStreak: 2,
        daysActive: 3,
        isPrivate: false,
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);
  //create check-ins for victoria
  const checkIns = await prisma.checkIn.createMany({
    data: [
      {
        userId: users[4].id,
        caption: "Lat Pull Downs",
        createdAt: new Date("2025-12-03T10:00:00Z"),
        videoUrl:
          "https://qqahaz9rntmohbfm.public.blob.vercel-storage.com/victoria.mov",
        fileSize: 300,
        mimeType: "video/mp4",
      },
      {
        userId: users[5].id,
        caption: "Upper body workout complete! 💪🏿",
        createdAt: new Date("2025-12-04T08:30:00Z"),
        videoUrl:
          "https://qqahaz9rntmohbfm.public.blob.vercel-storage.com/daniel_upper.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
    ],
  });

  console.log(`✅ Created ${checkIns.count} check-ins`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
