export type QuizCardItem = {
  label: string;
  title: string;
  author: string;
};

export type CollectionItem = {
  label: string;
};

export const homeDiscoverCards: QuizCardItem[] = [
  { label: "16 Qs", title: "Get Smarter with Productivity Quiz...", author: "Titus Kitamura" },
  { label: "10 Qs", title: "Great Ideas Come from Brilliant Min...", author: "Alfonso Schuessler" },
  { label: "15 Qs", title: "Great Ideas Come from Brilliant Min...", author: "Alfonso Schuessler" },
  { label: "20 Qs", title: "Great Ideas Come from Brilliant Min...", author: "Alfonso Schuessler" },
];

export const homeAuthors: string[] = ["Rayford", "Willard", "Hannah", "Geoffrey"];

export const homeCollections: CollectionItem[] = [
  { label: "Education" },
  { label: "Games" },
  { label: "Science" },
];

export const homeTrendingCards: QuizCardItem[] = [
  { label: "12 Qs", title: "Let's Memorize the Names of Flowers", author: "Cyndy Lillibridge" },
  { label: "20 Qs", title: "Earth is Our Home and Will Always be", author: "Elmer Laverty" },
];

