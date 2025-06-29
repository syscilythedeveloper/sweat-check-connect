/*
This is a Next.js API route that retrieve a list of posts and creates a new post. 

*/

const posts = [
  {
    id: 1,
    title: "gym_checkin",
    type: "gym_checkin",
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
    user: {
      username: "runner_jane",
      profilePhoto: "/images/user2.png",
    },
    timestamp: "4h",
    image: "/images/morning_run.jpeg",
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
    user: {
      username: "zen_master_mike",
      profilePhoto: "/images/user3.png",
    },
    timestamp: "6h",
    image: "/images/yoga_pose.jpeg",
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
    user: {
      username: "iron_woman_23",
      profilePhoto: "/images/user4.png",
    },
    timestamp: "8h",
    image: "/images/deadlift_session.jpeg",
    focus: "Back, Traps, Glutes",
    caption:
      "Deadlift day is best day! 🔥 Hit 225lbs for 3 reps today. Form over everything - slow and controlled wins the race!",
    location: "CrossFit Central",
    likes: 42,
    comments: 15,
    liked: true,
  },
  {
    id: 5,
    title: "swimming_laps",
    type: "cardio_session",
    user: {
      username: "pool_shark_sam",
      profilePhoto: "/images/user5.png",
    },
    timestamp: "10h",
    image: "/images/swimming_pool.jpeg",
    focus: "Full Body, Cardio",
    caption:
      "1000m freestyle this morning! 🏊‍♂️ Water was perfect temperature. Swimming is the ultimate full-body workout - love how it feels like meditation in motion.",
    location: "Community Aquatic Center",
    likes: 27,
    comments: 9,
    liked: false,
  },
  {
    id: 6,
    title: "cycling_adventure",
    type: "cardio_session",
    user: {
      username: "bike_life_brad",
      profilePhoto: "/images/user6.png",
    },
    timestamp: "12h",
    image: "/images/mountain_bike.jpeg",
    focus: "Legs, Cardio, Endurance",
    caption:
      "Epic 25-mile mountain bike ride! 🚵‍♂️ Those hills were brutal but the views were worth every burning quad. Nature is the best gym!",
    location: "Mountain Ridge Trail",
    likes: 35,
    comments: 11,
    liked: true,
  },
  {
    id: 7,
    title: "hiit_workout",
    type: "home_workout",
    user: {
      username: "fit_at_home_sarah",
      profilePhoto: "/images/user7.png",
    },
    timestamp: "14h",
    image: "/images/home_workout.jpeg",
    focus: "Full Body, HIIT",
    caption:
      "30-minute HIIT session done! ⚡ Burpees, mountain climbers, and jump squats. No gym, no problem! Sweat equity pays dividends.",
    location: "Home Gym",
    likes: 29,
    comments: 7,
    liked: false,
  },
  {
    id: 8,
    title: "rock_climbing",
    type: "adventure_sport",
    user: {
      username: "vertical_limit_vic",
      profilePhoto: "/images/user8.png",
    },
    timestamp: "16h",
    image: "/images/rock_climbing.jpeg",
    focus: "Grip Strength, Core, Arms",
    caption:
      "Conquered that 5.9 route I've been eyeing for weeks! 🧗‍♀️ Grip strength and mental game are everything in climbing. Feeling on top of the world!",
    location: "Indoor Climbing Gym",
    likes: 33,
    comments: 13,
    liked: true,
  },
  {
    id: 9,
    title: "boxing_training",
    type: "combat_sport",
    user: {
      username: "knockout_kelly",
      profilePhoto: "/images/user9.png",
    },
    timestamp: "18h",
    image: "/images/boxing_gloves.jpeg",
    focus: "Cardio, Arms, Core",
    caption:
      "Heavy bag session was intense today! 🥊 3 rounds of combinations followed by core work. Boxing isn't just physical - it's mental chess at lightning speed.",
    location: "Champion Boxing Club",
    likes: 38,
    comments: 16,
    liked: false,
  },
  {
    id: 10,
    title: "pilates_class",
    type: "studio_class",
    user: {
      username: "core_queen_emma",
      profilePhoto: "/images/user10.png",
    },
    timestamp: "20h",
    image: "/images/pilates_studio.jpeg",
    focus: "Core, Stability, Posture",
    caption:
      "Pilates reformer class complete! 🤸‍♀️ 45 minutes of controlled movements that had my core shaking. Quality over quantity - every rep with intention!",
    location: "Pure Pilates Studio",
    likes: 22,
    comments: 6,
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
