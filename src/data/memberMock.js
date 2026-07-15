export const mockMember = {
  name: "Chin Durex",
  username: "chinnarach",
  email: "demo@mail.com",
  bio: "Basketball writer and weekend analyst sharing sharp NBA stories.",
  avatar: "",
};

export const mockNotifications = [
  {
    id: 1,
    title: "Profile updated",
    detail: "Your public profile information was saved successfully.",
    time: "Today, 10:32",
    unread: true,
    actionLabel: "View profile",
    actionTo: "/member/profile",
  },
  {
    id: 2,
    title: "Password reminder",
    detail: "Remember to use a strong password before the backend phase.",
    time: "Yesterday, 18:05",
    unread: true,
    actionLabel: "Reset password",
    actionTo: "/member/reset-password",
  },
  {
    id: 3,
    title: "Article tools are ready",
    detail: "Mock admin article management is available for UI review.",
    time: "Monday, 09:15",
    unread: false,
    actionLabel: "View articles",
    actionTo: "/admin",
  },
];

export const mockManagedArticles = [
  {
    id: 1,
    title:
      "Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do",
    category: "Cat",
    status: "Published",
    author: "Thompson P.",
    introduction:
      "Decode everyday cat behavior with practical cues for calmer companionship.",
    content:
      "Cats communicate through body language, sound, and habit. This article explains the signals behind common feline behavior and how owners can respond with more confidence.",
    thumbnail: "",
  },
  {
    id: 2,
    title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
    category: "Cat",
    status: "Published",
    author: "Thompson P.",
    introduction:
      "A warm look at why cats remain one of the most beloved companions.",
    content:
      "From independent routines to affectionate moments, cats bring a distinctive rhythm into daily life. This article explores the charm behind that bond.",
    thumbnail: "",
  },
  {
    id: 3,
    title: "Finding Motivation: How to Stay Inspired Through Life's Challenges",
    category: "General",
    status: "Published",
    author: "Thompson P.",
    introduction:
      "Simple ways to keep momentum when life feels difficult or uncertain.",
    content:
      "Motivation is easier to protect when goals are clear and small actions are repeatable. This article shares habits for staying grounded through challenges.",
    thumbnail: "",
  },
  {
    id: 4,
    title: "Unlocking Creativity: Simple Habits to Spark Inspiration Daily",
    category: "Inspiration",
    status: "Draft",
    author: "Thompson P.",
    introduction:
      "Draft notes for a practical guide to building more creative routines.",
    content:
      "Creativity grows through observation, experimentation, and regular practice. This draft collects simple daily habits that can make inspiration easier to find.",
    thumbnail: "",
  },
];
