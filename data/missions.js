const MISSIONS_DATA = [
  {
    id: "1-artisan",
    title: "1 Artisan",
    location: "Criminal Outpost – Talk to Erik",
    description: "I've been brainstorming some ideas for gun modifications, but I'm too busy to test them myself. I want you to follow these instructions exactly, test them out, and then get back to me: Mod UMP 45 with Holographic Sight and a Tactical Laser.",
    requirements: ["Criminal / Syndicate team"],
    howToComplete: "Mod the UMP 45 with Holographic Sight and a Tactical Laser",
    difficulty: "EASY",
    rewards: ["$20,000"]
  },
  {
    id: "2-artisan",
    title: "2 Artisan",
    location: "Criminal Outpost – Talk to Erik",
    description: "Back for more? Let's get to it. Same as last time: set up the gun, test it out, and head back here. Mod the Model 870 with 12 Gauge Slugs and Vertical Foregrip.",
    requirements: ["Criminal / Syndicate team"],
    howToComplete: "Mod the Model 870 with 12 Gauge Slugs and Vertical Foregrip",
    difficulty: "EASY",
    rewards: ["$25,000"]
  },
  {
    id: "3-artisan",
    title: "3 Artisan",
    location: "Criminal Outpost – Talk to Erik",
    description: "Let's get right into it. Set up the gun, test it out, and come back: Mod Uzi with Mono Suppressor and Uzi Stock.",
    requirements: ["Criminal / Syndicate team"],
    howToComplete: "Mod Uzi with Mono Suppressor and Uzi Stock",
    difficulty: "EASY",
    rewards: ["$40,000"]
  },
  {
    id: "4-artisan",
    title: "4 Artisan",
    location: "Criminal Outpost – Talk to Erik",
    description: "Let's get right into it. Set up the gun, test it out, and come back: Bring me a modded AK-47 with Mono Suppressor, Tactical Laser, and Horizontal Foregrip.",
    requirements: ["Criminal / Syndicate team"],
    howToComplete: "Mod the AK-47 with Mono Suppressor, Tactical Laser, and Horizontal Foregrip.",
    difficulty: "MEDIUM",
    rewards: ["$60,000"]
  },
  {
    id: "5-artisan",
    title: "5 Artisan",
    location: "Criminal Outpost – Talk to Erik",
    description: "Let's get right into it. Set up the gun, test it out, and come back: Bring me a modded Glock 18c with Pistol Suppressor, Reflex Sight and Glock Stock.",
    requirements: ["Criminal / Syndicate team"],
    howToComplete: "Mod the Glock 18c with Pistol Suppressor, Reflex Sight and Glock Stock",
    difficulty: "MEDIUM",
    rewards: ["$75,000"]
  },
  {
    id: "6-artisan",
    title: "6 Artisan",
    location: "Criminal Outpost – Talk to Erik",
    description: "Let's get right into it. Set up the gun, test it out, and come back: Bring me a modded M4A1 with ACOG, Horizontal Foregrip, and Tactical Laser.",
    requirements: ["Criminal / Syndicate team"],
    howToComplete: "Mod the M4A1 with ACOG, Horizontal Foregrip, and Tactical Laser",
    difficulty: "HARD",
    rewards: ["$85,000"]
  },
  {
    id: "7-artisan",
    title: "7 Artisan",
    location: "Criminal Outpost – Talk to Erik",
    description: "Let's get right into it. Set up the gun, test it out, and come back: Bring me a modded AWM with Reflex Sight, Mono Suppressor and Tactical Laser.",
    requirements: ["Criminal / Syndicate team"],
    howToComplete: "Mod the AWM with Reflex Sight, Mono Suppressor and Tactical Laser",
    difficulty: "HARD",
    rewards: ["$100,000"]
  },
  {
    id: "8-artisan",
    title: "8 Artisan",
    location: "Criminal Outpost – Talk to Erik",
    description: "Let's get right into it. Set up the gun, test it out, and come back: Bring me a modded M60 with Rifle Scope and M60 Bipod.",
    requirements: ["Criminal / Syndicate team"],
    howToComplete: "Mod the M60 with Rifle Scope and M60 Bipod.",
    difficulty: "HARD",
    rewards: ["$200,000"]
  },
  {
    id: "fuel-depot",
    title: "Fuel Depot",
    location: "Criminal Outpost – Talk to Sir.B",
    description: "We've been in the shadows for far too long. I think it's time we come out of hiding. I want to put a real scare into those cops, so let's make some fireworks. Fuel Tankers are the target. You'll need explosives to really make them go boom. Find 3 different tankers and light them up.",
    requirements: ["Criminal / Syndicate team"],
    howToComplete: "Destroy 3 of the 5 tankers located at Bank, Military, Airport, Gas Station near Pawn Shop, and near Crystal Resort",
    difficulty: "EASY",
    rewards: ["$25,000"]
  },
  {
    id: "loyalty-test",
    title: "Loyalty Test",
    location: "Police Station – Talk to Bert",
    description: "If you want to move up in the police force, you'll need to prove your loyalty. There have been reports of new underground criminal activity, and we could use an undercover. Maybe we can use your connections to our advantage...",
    requirements: ["Criminal / Syndicate team"],
    howToComplete: "Locate the Criminal Hideout at the Badlands",
    difficulty: "EASY",
    rewards: ["$25,000", "Access to the Police Team"]
  },
  {
    id: "forbidden-meat",
    title: "Forbidden Meat",
    location: "Dans Diner – Talk to Dan",
    description: "Business has been rough lately: meat prices have skyrocketed. If you can help find an alternative supply, we'll be able to stay open. Find a good meat source, and use the grinder in the back room to see if it makes for good burger meat.",
    requirements: ["Criminal / Syndicate team"],
    howToComplete: "Put a player inside the meat grinder to make them into burgers",
    difficulty: "MEDIUM",
    rewards: ["$20,000", "Meat Grinder Furniture"]
  },
  {
    id: "bank-heist",
    title: "Bank Heist",
    location: "Tutorial",
    description: "We've been watching you. Don't know who we are? Good, let's keep it that way for now.If you want to be a real criminal, you're going to have to prove you're worthy by doing a big job.Hit the central bank downtown and that will get you our respect.",
    requirements: ["Criminal team"],
    howToComplete: "Locate the Bank, use the elevator, rob the vault and escape",
    difficulty: "EASY",
    rewards: ["$5,000"]
  }
];

const CHRISTMAS_MISSIONS_DATA = [
  {
    id: "santas-helper",
    title: "Santas Helper",
    location: "Park",
    description: "I was flying over the mountains into the city and a gust of wind knocked my sleigh and presents out of the sky! Please, help me find them! Christmas depends on it!",
    requirements: ["Criminal / Syndicate / Police team"],
    howToComplete: "Give Santa 1 Small Present, 1 Big Present and 1 Huge Present",
    difficulty: "CHRISTMAS",
    rewards: ["$25,000"]
  },
  {
    id: "toy-drive",
    title: "Toy Drive",
    location: "Park",
    description: "It turns out there were some priceless toys in this year's presents that I can't afford to lose. Bring them back to me and I'll make it worth your while!",
    requirements: ["Criminal / Syndicate / Police team"],
    howToComplete: "Give Santa 1 Nutcracker and 1 Candycane and 1 GoldPhone",
    difficulty: "CHRISTMAS",
    rewards: ["$60,000", "LED Reindeer Furniture"]
  },
  {
    id: "toy-drive-2",
    title: "Toy Drive 2",
    location: "Park",
    description: "Kids are getting more and more spoiled every year! These toys will be harder to find, but I'll put in a good word for you with the Easter Bunny if you succeed!",
    requirements: ["Criminal / Syndicate / Police team"],
    howToComplete: "Give Santa 1 GPU, 1 GoldBook and 1 Snowglobe",
    difficulty: "CHRISTMAS",
    rewards: ["$100,000", "Snowflake Rims"]
  },
  {
    id: "jingle-balls",
    title: "Jingle Balls",
    location: "Park",
    description: "Mrs. Claus doesn't think our tree is fancy enough... In the spirit of Christmas, can you find me some ornaments?",
    requirements: ["Criminal / Syndicate / Police team"],
    howToComplete: "Give Santa 5 Red Ornaments, 5 Green Ornaments and 5 Blue Ornaments",
    difficulty: "CHRISTMAS",
    rewards: ["$100,000", "Snowflake Rims"]
  },
  {
    id: "jingle-balls-2",
    title: "Jingle Balls 2",
    location: "Park",
    description: "Mrs. Claus doesn't think our tree is fancy enough... In the spirit of Christmas, can you find me some extra expensive ornaments?",
    requirements: ["Criminal / Syndicate / Police team"],
    howToComplete: "Give Santa 8 Gold Ornaments, 2 White Ornaments and 1 Diamond",
    difficulty: "CHRISTMAS",
    rewards: ["$100,000", "Snowflake Rims"]
  }
];
