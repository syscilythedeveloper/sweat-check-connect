import { NextResponse, NextRequest } from "next/server";
// import prisma from "../../../../../prisma/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const { userId: signedInUserId } = getAuth(request);
    if (!signedInUserId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.log("Signed-in user ID:", signedInUserId);
    const checkIns = await getCheckIns(signedInUserId);
    const following = await getFollowing(signedInUserId);
    const followers = await getFollowers(signedInUserId);

    return NextResponse.json({
      checkIns,
      following,
      followers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
async function getCheckIns(userId: string) {
  console.log("Fetching check-ins for user:", userId);
  const checkIns = [
    {
      id: "1",
      checkInDate: "August 1, 2025",
      checkInThumbNail: "/images/sys_lightbgs.png",
      videoUrl: "/videos/sysLightBgs.MOV",
      caption: "light werkkkkk ",
    },
    {
      id: "2",

      checkInDate: "August 2, 2025",
      checkInThumbNail: "/images/sys_backExtension.png",
      videoUrl: "/videos/backExtension.MOV",
      caption: "Back Day ",
    },
    {
      id: "3",
      checkInDate: "August 3, 2025",
      checkInThumbNail: "/images/sys_singleArmRow.png",
      videoUrl: "/videos/sys_singleArmRows.MOV",
      caption: "Don't neglect upper body!",
    },
    {
      id: "4",
      checkInDate: "August 5, 2025",
      checkInThumbNail: "/images/sys_gluteDrive.png",
      videoUrl: "/videos/sys_gluteDrive.MOV",
      caption: "up to 280lbs 💪🏿!",
    },

    {
      id: "5",
      checkInDate: "August 7, 2025",
      checkInThumbNail: "/images/sys_bgs.png",
      videoUrl: "/videos/sys_bgs.MOV",
      caption: "progressive overload is key!",
    },
    {
      id: "6",
      checkInDate: "August 8, 2025",
      checkInThumbNail: "/images/sys_stairmaster.png",
      videoUrl: "/videos/sys_stairmaster.MOV",
      caption: "Stairmaster Sys",
    },
    {
      id: "7",
      checkInDate: "August 9, 2025",
      checkInThumbNail: "/images/sys_standingAb.png",
      videoUrl: "/videos/sys_standingabs.MOV",
      caption: "Weighted abWork!",
    },
  ];

  return checkIns;
}

async function getFollowing(userId: string) {
  console.log("Fetching following for user:", userId);
  const following = [
    {
      id: "1",
      username: "XoxoKi_Breon",
      profilePicture:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604075/kiara_eoarvx.png",
    },
    {
      id: "2",
      username: "smiley",
      profilePicture:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604111/enijah_sfdym5.png",
    },
    {
      id: "3",
      username: "gabrielle_elyse",
      profilePicture:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604052/gabby_gqqlp3.png",
    },
  ];

  return following;
}

async function getFollowers(userId: string) {
  console.log("Fetching followers for user:", userId);
  const followers = [
    {
      id: "1",
      username: "XoxoKi_Breon",
      profilePicture:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604075/kiara_eoarvx.png",
    },
    {
      id: "2",
      username: "smiley",
      profilePicture:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604111/enijah_sfdym5.png",
    },
    {
      id: "3",
      username: "gabrielle_elyse",
      profilePicture:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604052/gabby_gqqlp3.png",
    },
    {
      id: "4",
      username: "future_Billionaire",
      profilePicture:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754604052/will_aberc7.png",
    },
    {
      id: "5",
      username: "vmackkk",
      profilePicture:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754603858/victoria_oehw6x.png",
    },
    {
      id: "6",
      username: "drummerDanny",
      profilePicture:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754603477/daniel_huwkmx.png",
    },
    {
      id: "7",
      username: "dr.aneesah",
      profilePicture:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754603476/aneesah_vlagrt.png",
    },
    {
      id: "8",
      username: "QueenHerc",
      profilePicture:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754603476/amanda_fuyzbl.png",
    },
    {
      id: "9",
      username: "ashlye_fay",
      profilePicture:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1754603250/ashlye_u14tip.jpg",
    },
  ];

  return followers;
}
