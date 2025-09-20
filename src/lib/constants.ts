export const REAL_HEADLINES = [
    "Scientists Discover New Species of Deep-Sea Fish",
    "Global Stock Markets See Slight Increase After Central Bank Announcement",
    "New Study Links Regular Exercise to Improved Cognitive Function in Elderly",
    "Archaeologists Unearth Ancient Roman Villa in Rural England",
    "NASA's Mars Rover Collects Rock Samples for Future Return Mission",
    "City Council Approves Plan for New Public Park and Green Space",
    "International Space Station Crew Conducts Spacewalk for Maintenance",
    "World Health Organization Releases New Guidelines on Sugar Intake",
    "Major Tech Company Unveils its Latest Smartphone Model",
    "Classical Music Concert Receives Standing Ovation"
];

export const FAKE_NEWS_TOPICS = ["politics", "health", "science", "technology", "finance", "world news"];
export const FAKE_NEWS_BIASES = ["left-leaning", "right-leaning", "conspiracy", "anti-science", "corporate greed"];
export const FAKE_NEWS_STYLES = ["sensational", "alarming", "clickbait", "humorous", "outrage-inducing"];

export interface Badge {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  score: number;
}

export const LEVELS = [
    { name: 'Beginner', score: 0 },
    { name: 'Apprentice', score: 50 },
    { name: 'Sleuth', score: 150 },
    { name: 'Investigator', score: 300 },
    { name: 'Fact-Finder', score: 500 },
    { name: 'Truth-Seeker', score: 800 },
    { name: 'Master Analyst', score: 1200 },
    { name: 'Veritas Guardian', score: 2000 },
];
