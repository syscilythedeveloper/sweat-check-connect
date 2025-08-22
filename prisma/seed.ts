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
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604075/kiara_eoarvx.png",
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
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604111/enijah_sfdym5.png",
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
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604052/gabby_gqqlp3.png",
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
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604052/will_aberc7.png",
        bio: "Tech Entrepreneur",
        membershipType: MembershipType.STANDARD,
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
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754603858/victoria_oehw6x.png",
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
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754603477/daniel_huwkmx.png",
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
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754603476/aneesah_vlagrt.png",
        bio: "Living life on my own terms",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 2,
        longestActiveStreak: 2,
        daysActive: 3,
        isPrivate: false,
      },
    }),
    prisma.user.create({
      data: {
        username: "amanda",
        email: "amanda@example.com",
        name: "Amanda",
        avatar:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754603476/amanda_fuyzbl.png",
        bio: "Living life on my own terms",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 2,
        longestActiveStreak: 2,
        daysActive: 3,
        isPrivate: false,
      },
    }),

    prisma.user.create({
      data: {
        username: "ashlye",
        email: "ashlye@example.com",
        name: "Ashlye",
        avatar:
          "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754603250/ashlye_u14tip.jpg",
        bio: "🌻",
        membershipType: MembershipType.STANDARD,
        currentActiveStreak: 1,
        longestActiveStreak: 1,
        daysActive: 1,
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
        createdAt: new Date("2025-08-10T10:00:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516833/victa_ahaibr.mov",
        fileSize: 300,
        mimeType: "video/mp4",
      },
      {
        userId: users[5].id,
        caption: "Upper body workout complete! 💪🏿",
        createdAt: new Date("2025-08-11T09:30:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754517234/daniel_upper_qpzb5a.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[5].id,
        caption: "Dead Lift 🦵🏿",
        createdAt: new Date("2025-08-12T08:35:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754517233/daniel_lower_lx4jvu.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[5].id,
        caption: "Leg Press ",
        createdAt: new Date("2025-08-13T08:30:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754517234/daniel_legpress_dv6yqd.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[0].id,
        caption: "Bulgarian Split Squat 🦵🏿",
        createdAt: new Date("2025-08-15T12:30:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516903/ki_bgs_ankeka.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[0].id,
        caption: "Cardio Check In🦵🏿",
        createdAt: new Date("2025-08-16T14:32:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516903/ki_cardio_brs97v.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[7].id,
        caption: "Workwork don't stop",
        createdAt: new Date("2025-08-17T05:30:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516913/amanda_lunges_wmar1f.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[7].id,
        caption: "Leg Dayyyyy",
        createdAt: new Date("2025-08-20T08:12:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516900/amanda_deadlift_o82peh.mp4",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[7].id,
        caption: "💪🏿",
        createdAt: new Date("2025-08-21T06:30:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516911/amanda_glutebridge_kdwrcx.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[7].id,
        caption: "Leg Dayyyyy",
        createdAt: new Date("2025-08-21T12:43:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516907/amanda_abs_x051cm.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[6].id,
        caption: "Upper Body Workout 🏋🏿‍♀️",
        createdAt: new Date("2025-08-21T15:12:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516899/aneesah_upper_udoy0e.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[6].id,
        caption: "Glute Day🦵🏿",
        createdAt: new Date("2025-08-20T13:27:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516898/aneesah_glutebridge_wo763p.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[2].id,
        caption: "Full Bodyyyyy ",
        createdAt: new Date("2025-08-13T08:30:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516903/gabby_lunges_jhajfp.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[2].id,
        caption: "Glute Day🦵🏿",
        createdAt: new Date("2025-08-15T08:30:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516904/gabby_squats_jdnvhh.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[3].id,
        caption: "🏋🏽‍♂️",
        createdAt: new Date("2025-08-11T08:35:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516832/will_lower_abo7xd.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[3].id,
        caption: "🏋🏽‍♂️",
        createdAt: new Date("2025-08-06T08:30:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516832/will_upper_jtwq2j.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[3].id,
        caption: "🏋🏽‍♂️",
        createdAt: new Date("2025-08-14T08:30:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516832/will_bicep_curls_qxo9iv.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[1].id,
        caption: "🏋🏽‍♂️",
        createdAt: new Date("2025-08-07T09:32:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754516841/enijah_bgs_l3rjer.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[8].id,
        caption: "🏋🏽Bent ova rowssssssss",
        createdAt: new Date("2025-08-05T07:34:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754604429/ashlye_upper_gsnulo.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
      {
        userId: users[8].id,
        caption: "RDLs for the win ",
        createdAt: new Date("2025-08-12T08:30:00Z"),
        videoUrl:
          "https://res.cloudinary.com/dbmgioxbm/video/upload/v1754604429/ashley_lower_mppepx.mov",
        fileSize: 250,
        mimeType: "video/mp4",
      },
    ],
  });

  console.log(`✅ Created ${checkIns.count} check-ins`);

  // Create follower relationships
  // Example: Kiara follows Enijah and Gabby, Amanda follows Kiara, Daniel follows Amanda
  const userFollows = await prisma.userFollow.createMany({
    data: [
      { followerId: users[0].id, followingId: users[1].id, status: "ACCEPTED" }, // Kiara -> Enijah
      { followerId: users[0].id, followingId: users[2].id, status: "ACCEPTED" }, // Kiara -> Gabby
      { followerId: users[7].id, followingId: users[0].id, status: "ACCEPTED" }, // Amanda -> Kiara
      { followerId: users[5].id, followingId: users[7].id, status: "ACCEPTED" }, // Daniel -> Amanda
      { followerId: users[3].id, followingId: users[0].id, status: "ACCEPTED" }, // William -> Kiara
      { followerId: users[2].id, followingId: users[4].id, status: "ACCEPTED" }, // Gabby -> Victoria
      { followerId: users[6].id, followingId: users[2].id, status: "ACCEPTED" }, // Aneesah -> Gabby
      { followerId: users[1].id, followingId: users[5].id, status: "ACCEPTED" }, // Enijah -> Daniel
      { followerId: users[8].id, followingId: users[0].id, status: "ACCEPTED" }, // Ashlye -> Kiara
    ],
  });
  console.log(`✅ Created ${userFollows.count} follower relationships`);

  //create challenges
  const challenges = await prisma.challenge.createMany({
    data: [
      {
        title: "Cardioooo",
        description: "Show your timer at 20 minutes or more every day!",
        createdById: users[0].id,
        startDate: new Date("2025-08-23"),
        tags: ["cardio", "full body"],
        duration: 14,
        requiredCheckIns: 14,
        maxParticipants: 20,
        isPrivate: false,
        updatedAt: new Date(),
        totalCheckIns: 0,
      },
      {
        title: "Pilates Princesses!",
        description: "Pilates for 4 weeks, 3x a week! 💃🏾",
        createdById: users[2].id,
        startDate: new Date("2025-08-27"),
        tags: ["pilates", "stretch", "yoga"],
        duration: 30,
        requiredCheckIns: 12,
        maxParticipants: 25,
        isPrivate: false,
        updatedAt: new Date(),
        totalCheckIns: 0,
      },
      {
        title: "Do Whatever!",
        description: "Do whatever workout you want. Just get in the paint",
        createdById: users[5].id,
        startDate: new Date("2025-08-29"),
        tags: ["strength", "cardio", "yoga"],
        duration: 7,
        requiredCheckIns: 7,
        maxParticipants: 25,
        isPrivate: false,
        updatedAt: new Date(),
        totalCheckIns: 0,
      },
      {
        title: "Marathon Prep",
        description: "3 miles 4 times a week for a month",
        createdById: users[8].id,
        startDate: new Date("2025-08-24"),
        tags: ["strength", "cardio", "yoga"],
        duration: 30,
        requiredCheckIns: 16,
        maxParticipants: 10,
        isPrivate: false,
        updatedAt: new Date(),
        totalCheckIns: 0,
      },
    ],
  });

  console.log(`✅ Created ${challenges.count} challenges`);
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
