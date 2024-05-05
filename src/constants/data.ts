interface Filters {
  [key: string]: string[];
}

const categories = [
  "backgrounds",
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "religion",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music",
];

const filters: Filters = {
  orientation: ["all", "horizontal", "vertical"],
  type: ["all", "photo", "illustration", "vector"],
  order: ["popular", "latest"],
  colors: [
    "red",
    "orange",
    "yellow",
    "green",
    "turquoise",
    "blue",
    "pink",
    "white",
    "gray",
    "black",
    "brown",
  ],
};

export const data = {
  categories,
  filters,
};
