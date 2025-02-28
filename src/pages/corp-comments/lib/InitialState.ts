export const MAX_CHAR = 150;

export type FeedbackItemType = { id: number; upvoteCount: number; badgeLetter: string; companyName: string; text: string; daysAgo: number };

export const initialItems: FeedbackItemType[] = [
  { id: 1, upvoteCount: 222, badgeLetter: "L", companyName: "Bytegrad", text: "Some text about company with #hashtag.", daysAgo: 4 },
  { id: 2, upvoteCount: 322, badgeLetter: "B", companyName: "Nike", text: "Some sdfsfsdfsdfsdfsd.", daysAgo: 3 },
  { id: 3, upvoteCount: 122, badgeLetter: "I", companyName: "Khabarovsk", text: "Hello! ertwetergdfgcxvb.", daysAgo: 1 },
];
