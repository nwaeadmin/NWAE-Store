const ADJECTIVES = [
  "Frosty", "Snowy", "Icy", "Crystal", "Arctic", "Polar", "Glacial",
  "Silver", "Midnight", "Quiet", "Velvet", "Stellar", "Cosmic", "Lunar",
  "Drifting", "Hidden", "Whisper", "Shadow", "Silent", "Misty", "Northern",
  "Winter", "Crimson", "Golden", "Royal", "Wild", "Brave", "Swift",
];

const ANIMALS = [
  "Fox", "Wolf", "Bear", "Owl", "Hawk", "Lynx", "Stag", "Raven",
  "Falcon", "Tiger", "Panther", "Otter", "Hare", "Moose", "Deer",
  "Eagle", "Heron", "Marten", "Sable", "Ibex", "Puma", "Crane",
];

export function generateAnonymousName(): string {
  const a = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const b = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const n = Math.floor(Math.random() * 900 + 100);
  return `${a}${b}${n}`;
}
