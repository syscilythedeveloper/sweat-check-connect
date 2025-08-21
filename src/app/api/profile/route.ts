import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/utils/prisma";
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
      checkInThumbNail:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1755282034/sys_lightBgs_tluhv4.png",
      videoUrl:
        "https://res.cloudinary.com/dbmgioxbm/video/upload/v1755281763/sysLightBgs_nup9eb.mp4",
      caption: "light werkkkkk ",
    },
    {
      id: "2",

      checkInDate: "August 2, 2025",
      checkInThumbNail:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1755282033/sys_backExtension_e6ncbe.png",
      videoUrl:
        "https://res.cloudinary.com/dbmgioxbm/video/upload/v1755281771/sys_backextensions_usmxux.mov",
      caption: "Back Day ",
    },
    {
      id: "3",
      checkInDate: "August 3, 2025",
      checkInThumbNail:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1755282034/sys_singleArmRow_nbqd9o.png",
      videoUrl:
        "https://res.cloudinary.com/dbmgioxbm/video/upload/v1755281763/sys_singleArmRows_av6hzc.mov",
      caption: "Don't neglect upper body!",
    },

    {
      id: "4",
      checkInDate: "August 7, 2025",
      checkInThumbNail:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1755282034/sys_bgs_g0w1kz.png",
      videoUrl:
        "https://res.cloudinary.com/dbmgioxbm/video/upload/v1755281763/sys_bgs_zmzrrc.mp4",
      caption: "progressive overload is key!",
    },
    {
      id: "5",
      checkInDate: "August 8, 2025",
      checkInThumbNail:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1755282034/sys_stairmaster_wfmtzq.png",
      videoUrl:
        "https://res.cloudinary.com/dbmgioxbm/video/upload/v1755281763/sys_stairmaster_rhfryd.mov",
      caption: "Stairmaster Sys",
    },
    {
      id: "6",
      checkInDate: "August 9, 2025",
      checkInThumbNail:
        "https://res.cloudinary.com/dbmgioxbm/image/upload/v1755282034/sys_standingAb_k7j0v3.png",
      videoUrl:
        "https://res.cloudinary.com/dbmgioxbm/video/upload/v1755281770/sys_standingabs_nltfgi.mov",
      caption: "Weighted abWork!",
    },
  ];

  return checkIns;
}

async function getFollowing(signedInUserId: string) {
  console.log("Fetching following for user:", signedInUserId);
  const following = await prisma.userFollow.findMany({
    where: { followerId: signedInUserId, status: "ACCEPTED" },
    select: { followingId: true },
  });

  //get following id
  const followingIds = following.map((f) => f.followingId);
  if (followingIds.length === 0) return [];

  const usersFollowed = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      avatar: true,
    },
    where: { id: { in: followingIds } },
  });
  return usersFollowed;
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
