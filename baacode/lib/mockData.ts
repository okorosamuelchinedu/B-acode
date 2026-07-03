export interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime?: string;
  image?: string;
}

export const ARTICLES: Article[] = [
  {
    id: "1",
    category: "FEATURED ARTICLE",
    title: "AI - The Gen-Z Thief of Jobs",
    excerpt: "This discourse analyses the top concerns of AI on jobs. It is aimed at making the Gen Z to understand more about AI. There is a need for the Gen Z to understand what AI is, how it interacts with them and how it poses a threat. There is a need to learn, unlearn and relearn.",
    author: "Zara Adiele",
    date: "June 2, 2023",
    readTime: "8 mins read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80",
  },
  {
    id: "2",
    category: "LIFESTYLE",
    title: "Paypal receives seed funding of $10 million",
    excerpt: "You may payment gateway, Paypal vendors seed funding of $10 million dollars which valuing it as a company at $150 million in the valley. In 1934, a provision drew them up for expansion while several African countries built up their social platforms as well as cultural ones as well.",
    author: "Loren Hicks",
    date: "October 22, 2021",
    readTime: "4 mins read",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&q=80",
  },
  {
    id: "3",
    category: "LIFESTYLE",
    title: "Many techies will die in 2036",
    excerpt: "Did you know? A study that monitored key moves across the world's 4 in 2020 revealed to poor health, stress and lifestyle problems such as poor sleeping habits, sedentary lifestyles, increased food consumption, sugar absorption and even less, poor social health checks.",
    author: "Culpa Sit",
    date: "August 22, 2019",
    readTime: "5 mins read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80",
  },
  {
    id: "4",
    category: "PROGRAMMING",
    title: "Javascript and HTML are now saturated",
    excerpt: "When is the time from the transition program, frameworks in most modern day programming and the organisation is major programming language. Like Vue, React, Node.js gets increasingly apparent. They conclude that programmers can simply start and develop their thoughts to build things.",
    author: "Soren Tees",
    date: "January 13, 2017",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80",
  },
  {
    id: "5",
    category: "COMMUNITY",
    title: "Diversity, Inclusion, and Equality",
    excerpt: "Opportunities in the tech industry in recent times have become all encompassing as it takes into consideration diversity with regards to tribe, race, and culture; Inclusion as concerns marginalized groups such as children and women; Equality in the sense of making opportunities equally available to all genders.",
    author: "Irene Nwaogugu",
    date: "July 8, 2019",
    readTime: "12 mins read",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80",
  },
  {
    id: "6",
    category: "CAREER",
    title: "Transitioning into Tech Career",
    excerpt: "This piece will walk you through all the dos and donts you need to know before you leave your lucrative career to transition into tech. Read this first to know if you're ready for this big change.",
    author: "Hassan Michael",
    date: "November 1, 2022",
    image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=500&q=80",
  },
  {
    id: "7",
    category: "EVENTS",
    title: "UDC 2024 Coming Soon",
    excerpt: "The Untitled Design Conference 2024 is in the works and would happen soon. No better place for techies to cool off, connect with industry-likeminds and pitch themselves.",
    author: "Eleanor Williamson",
    date: "September 28, 2014",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80",
  },
  {
    id: "8",
    category: "COMMUNITY",
    title: "Survival of the Fittest or Polar Bear Space",
    excerpt: "The Nigerian tech space has proven that it isn't shark world but a family of polar bears",
    author: "Vin Enyinnaya",
    date: "June 15, 2014",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80",
  },
  {
    id: "9",
    category: "HEALTH",
    title: "Best Diet for Techies",
    excerpt: "Research shows that for increased cognitive and nervous function, as well as all-round good health, techies need adequate diets with the right proportions of macro and micronutrients.",
    author: "Lily Chiamaka",
    date: "June 21, 2025",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80",
  },
];

export const TAGS = [
  "writing", "community", "design", "photography", "health", "lifestyle",
  "architecture", "tech", "programming", "trading", "events", "web development",
  "ai", "games", "uiux", "product", "graphic design", "no code", "bitcoin",
  "computers", "machine learning",
];

export const SEARCH_TAGS = [
  "React", "Node", "CSS", "JS", "UI/UX", "Web Technologies", "Career",
  "Open source", "Backend", "By Irene", "Tutorials", "Arts", "Spirituality",
  "Events", "Gaming", "Sports", "Football",
];
