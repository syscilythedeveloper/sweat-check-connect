import { Message } from "@/components/Challenges/ChallengeThread";

export function getChallengeMessages(challengeId: string) {
  console.log(`Displaying messages for challenge ID: ${challengeId}`);
  //when fetching message, be sure to fetch in appropriate order, oldest to newest

  const challengeMessages = [
    {
      id: "msg1",
      username: "sys_capone",
      avatar: "/images/sys.png",
      timeAgo: "7 hours ago",
      message:
        "Only 12 hours left to complete today's challenge! Let's finish strong 💪",
      likes: 3,
    },
    {
      id: "msg2",
      username: "XoxoKiara",
      avatar: "/images/ki.jpeg",
      timeAgo: "4 hours ago",
      message:
        "Just finished my workout! Feeling pumped and ready for the next challenge 🔥",
      likes: 5,
    },
    {
      id: "msg3",
      username: "Deebo",
      avatar: "/images/deebo.png",
      timeAgo: "1 hour ago",
      message: "Stop being a bitch and come on!",
      likes: 8,
    },
    {
      id: "msg4",
      username: "Smokey",
      avatar: "/images/smokey.png",
      timeAgo: "45 minutes ago",
      message: "Just finished. And you know this... maaaaaaan",
      likes: 2,
    },
    {
      id: "msg5",
      username: "Grandpa",
      avatar: "/images/grandpa.png",
      timeAgo: "20 minutes",
      message: "Well that's too damn bad!",
      likes: 6,
    },
    {
      id: "msg6",
      username: "Young Warden",
      avatar: "/images/YoungWarden.png",
      timeAgo: "10 minutes ago",
      message: "I'm tired of this grandpa!",
      likes: 1,
    },
  ];
  return challengeMessages;
}

export function updateThreadMessages(challengeId: string, newMessage: Message) {
  console.log(`Updating messages for challenge ID: ${challengeId}`);

  // Here you would typically update the messages in your database or state management
  // For this example, we'll just log the new message
  console.log("New message to add:", newMessage);
  console.log("Message time: ", Date.now());
}

export function updateMessageLikes(messageId: string, likes: number) {
  console.log(`Updating likes for message ID ${messageId}`);
  console.log(`Message ${messageId} now has ${likes} likes`);
}
