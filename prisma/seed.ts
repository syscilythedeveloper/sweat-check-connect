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
        avatar: "/images/ki.jpeg",
        bio: "Coach Ki",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 3,
        longestActiveStreak: 3,
        daysActive: 4,
      },
    }),

    prisma.user.create({
      data: {
        username: "smiley",
        email: "enijah@example.com",
        name: "Enijah Smith",
        avatar: "/images/enijah.png",
        bio: "🌻",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 1,
        longestActiveStreak: 1,
        daysActive: 1,
      },
    }),

    prisma.user.create({
      data: {
        username: "gabby_m",
        email: "gabby@example.com",
        name: "Gabby Morris",
        avatar: "/images/gabby.png",
        bio: "Pilates Instructor",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 1,
        longestActiveStreak: 5,
        daysActive: 1,
      },
    }),

    prisma.user.create({
      data: {
        username: "william_o",
        email: "william@example.com",
        name: "William Orgertrice",
        avatar: "/images/william.png",
        bio: "Tech Entrepreneur",
        membershipType: MembershipType.PREMIUM,
        currentActiveStreak: 1,
        longestActiveStreak: 2,
        daysActive: 4,
      },
    }),

    prisma.user.create({
      data: {
        username: "vmack",
        email: "victoria@example.com",
        name: "Young Warden",
        avatar: "/images/victoria.png",
        bio: "HU alumna",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 0,
        longestActiveStreak: 3,
        daysActive: 3,
      },
    }),
    prisma.user.create({
      data: {
        username: "daniel",
        email: "daniel@example.com",
        name: "Deebo",
        avatar: "/images/daniel.png",
        bio: "Drums and gym",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 5,
        longestActiveStreak: 5,
        daysActive: 6,
      },
    }),
    prisma.user.create({
      data: {
        username: "aneesah",
        email: "aneesah@example.com",
        name: "Aneesah",
        avatar: "/images/aneesah.png",
        bio: "Living life on my own terms",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 2,
        longestActiveStreak: 2,
        daysActive: 3,
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create some follow relationships
  const follows = await Promise.all([
    prisma.userFollow.create({
      data: {
        followerId: users[0].id, // sys_capone follows kiara
        followingId: users[1].id,
        status: "ACCEPTED",
      },
    }),
    prisma.userFollow.create({
      data: {
        followerId: users[1].id, // kiara follows sys_capone
        followingId: users[0].id,
        status: "ACCEPTED",
      },
    }),
    prisma.userFollow.create({
      data: {
        followerId: users[2].id, // deebo follows smokey
        followingId: users[3].id,
        status: "ACCEPTED",
      },
    }),
  ]);

  console.log(`✅ Created ${follows.length} follow relationships`);

  console.log("🎉 Seed completed successfully!");
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
