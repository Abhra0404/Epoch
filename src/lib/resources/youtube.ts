export interface YouTubeChannel {
  name: string;
  url: string;
  description: string;
  topics: string[];
  subscriberCount?: string;
}

export const youtubeChannels: YouTubeChannel[] = [
  {
    name: "Krish Naik",
    url: "https://www.youtube.com/@krishnaik06",
    description: "Machine Learning, Deep Learning, NLP, and Data Science tutorials in Hindi",
    topics: ["ML", "Deep Learning", "NLP", "Data Science"],
    subscriberCount: "1.5M+",
  },
  {
    name: "Campusx",
    url: "https://www.youtube.com/@campusx-official",
    description: "ML, Deep Learning, and Python tutorials explained in simple Hindi",
    topics: ["ML", "Python", "Deep Learning"],
    subscriberCount: "1M+",
  },
  {
    name: "Sheriyans AI School",
    url: "https://www.youtube.com/@SheriyansAI",
    description: "AI and Machine Learning courses and tutorials in Hindi",
    topics: ["AI", "ML", "Deep Learning"],
  },
];
