/*
This is a Next.js API route that retrieve a list of posts and creates a new post. 

*/

const posts = [
  {
    id: 1,
    title: "gym_checkin",
    type: "gym_checkin",
    mediaType: "image",
    user: {
      username: "sys_lifts",
      profilePhoto: "/images/user.png",
    },
    timestamp: "2h",
    image: "/images/workoutpost.jpeg",
    focus: "Glutes, Quads, Hamstrings",
    caption:
      "Crushed leg day! 💪 New PR on squats - 185lbs x 5 reps. Feeling stronger every week!",
    location: "Gold's Gym Downtown",
    likes: 24,
    comments: 8,
    liked: false,
  },
  {
    id: 2,
    title: "morning_run",
    type: "cardio_session",
    mediaType: "video",
    user: {
      username: "runner_jane",
      profilePhoto: "/images/workoutpost.jpeg",
    },
    timestamp: "4h",
    image: "/videos/foodvid.mov",
    focus: "Cardio, Endurance",
    caption:
      "Beautiful sunrise run along the waterfront! 🌅 5 miles in 42 minutes. Nothing beats starting the day with fresh air and endorphins!",
    location: "Lakefront Trail",
    likes: 31,
    comments: 12,
    liked: true,
  },
  {
    id: 3,
    title: "yoga_flow",
    type: "yoga_session",
    mediaType: "image",
    user: {
      username: "zen_master_mike",
      profilePhoto: "/images/foodpost.jpeg",
    },
    timestamp: "6h",
    image: "/images/foodpost.jpeg",
    focus: "Flexibility, Balance, Core",
    caption:
      "Hour-long vinyasa flow complete! 🧘‍♂️ Finally nailed that crow pose I've been working on. Mind-body connection is everything.",
    location: "Peaceful Yoga Studio",
    likes: 18,
    comments: 5,
    liked: false,
  },
  {
    id: 4,
    title: "strength_training",
    type: "gym_checkin",
    mediaType: "video",
    user: {
      username: "iron_woman_23",
      profilePhoto: "/images/user.png",
    },
    timestamp: "8h",
    image: "/videos/workoutvid.mov",
    focus: "Back, Traps, Glutes",
    caption:
      "Deadlift day is best day! 🔥 Hit 225lbs for 3 reps today. Form over everything - slow and controlled wins the race!",
    location: "CrossFit Central",
    likes: 42,
    comments: 15,
    liked: true,
  },
];

export async function GET() {
  try {
    // const response = await fetch("https://api.example.com/posts");
    // const data = await response.json();
    const data = posts;
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response("Failed to fetch posts", { status: 500 });
  }
}
