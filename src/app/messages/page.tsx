"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
} from "lucide-react";

const MessagesPage = () => {
  const { user } = useUser();
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - you'll fetch this from your database
  const [conversations] = useState([
    {
      id: "1",
      name: "GymBuddy",
      avatar: "/images/placeholder-avatar-1.png",
      lastMessage: "Great workout today! Ready for tomorrow's challenge?",
      timestamp: "2m ago",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      name: "CardioQueen",
      avatar: "/images/placeholder-avatar-2.png",
      lastMessage: "Thanks for the motivation! 💪",
      timestamp: "1h ago",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "3",
      name: "IronMan",
      avatar: "/images/placeholder-avatar-3.png",
      lastMessage: "Let's hit the gym this weekend",
      timestamp: "3h ago",
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: "4",
      name: "HealthyHabits",
      avatar: "/images/placeholder-avatar-4.png",
      lastMessage: "Check out this new protein recipe!",
      timestamp: "1d ago",
      unreadCount: 0,
      isOnline: false,
    },
  ]);

  const [messages] = useState([
    {
      id: "1",
      senderId: "1",
      senderName: "GymBuddy",
      content: "Hey! How was your morning run?",
      timestamp: "10:30 AM",
      isRead: true,
      isCurrentUser: false,
    },
    {
      id: "2",
      senderId: user?.id || "current",
      senderName: "You",
      content: "It was amazing! Hit a new personal record 🏃‍♂️",
      timestamp: "10:32 AM",
      isRead: true,
      isCurrentUser: true,
    },
    {
      id: "3",
      senderId: "1",
      senderName: "GymBuddy",
      content: "That's awesome! What was your time?",
      timestamp: "10:33 AM",
      isRead: true,
      isCurrentUser: false,
    },
    {
      id: "4",
      senderId: user?.id || "current",
      senderName: "You",
      content: "5K in 22 minutes! Can't believe it 😄",
      timestamp: "10:35 AM",
      isRead: true,
      isCurrentUser: true,
    },
    {
      id: "5",
      senderId: "1",
      senderName: "GymBuddy",
      content: "Great workout today! Ready for tomorrow's challenge?",
      timestamp: "10:40 AM",
      isRead: false,
      isCurrentUser: false,
    },
  ]);

  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedChat
  );
  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message sending logic here
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 flex">
      {/* Conversations Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Messages
          </h2>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedChat(conversation.id)}
              className={`p-4 border-b border-gray-100 dark:border-slate-700 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-slate-700 ${
                selectedChat === conversation.id
                  ? "bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-500"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800 dark:text-white truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {conversation.timestamp}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-800">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={selectedConversation.avatar}
                      alt={selectedConversation.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {selectedConversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {selectedConversation.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedConversation.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.isCurrentUser
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white dark:bg-slate-700 text-gray-800 dark:text-white border border-gray-200 dark:border-slate-600"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div
                      className={`flex items-center justify-end mt-1 space-x-1 ${
                        message.isCurrentUser
                          ? "text-blue-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <span className="text-xs">{message.timestamp}</span>
                      {message.isCurrentUser &&
                        (message.isRead ? (
                          <CheckCheck className="w-3 h-3" />
                        ) : (
                          <Check className="w-3 h-3" />
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                    <Smile className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No Chat Selected */
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-slate-900">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose a friend to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
