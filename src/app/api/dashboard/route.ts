import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import {
  getLeaderboardData,
  getGlobalCheckins,
  getFollowingCheckins,
} from "@/app/server/utils/feedFunctions";

export async function GET(request: NextRequest) {
  try {
    // const url = new URL(request.url);
    // console.log("URL:", url);
    const { userId: signedInUserId } = getAuth(request);
    if (!signedInUserId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const leaderboard = await getLeaderboardData();
    const globalCheckIns = await getGlobalCheckins(signedInUserId);
    const followingCheckIns = await getFollowingCheckins(signedInUserId);

    return NextResponse.json({
      leaderboard,
      globalCheckIns,
      followingCheckIns,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
