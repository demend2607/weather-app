export const MAX_CHAR = 150;

export type FeedbackItemType = { id: number; upvoteCount: number; badgeLetter: string; companyName: string; text: string; daysAgo: number };

export type HashtagItemType = { id: number; text: string };

export const hashtagInitialList: HashtagItemType[] = [
  { id: 3, text: "#Microsoft" },
  { id: 4, text: "#Bytegrad" },
  { id: 1, text: "#Apple" },
  { id: 2, text: "#Google" },
  { id: 5, text: "#Nike" },
];
