import rep1 from "../assets/featured/albino.webp";
import rep2 from "../assets/featured/alligator.jpg";
import rep3 from "../assets/featured/iguana2.webp";
import rep4 from "../assets/featured/python1.jpg";
import rep5 from "../assets/featured/pythonmorphs.webp";
import rep6 from "../assets/featured/monitorlizard.webp";
import rep7 from "../assets/featured/twoheaded.webp";

export type FeaturedAttraction = {
  id: string;
  name: string;
  species: string;
  habitat?: string;
  diet?: string;
  location: string;
  venomous?: boolean;
  isEndangered?: boolean;
  image?: string;
  description?: string;
};

export const featuredAttractionsMock: FeaturedAttraction[] = [
  {
    id: "albino-alligator",
    name: "Albino Alligator",
    species: "American Alligator",
    habitat: "Wetland",
    diet: "Carnivore",
    location: "Alligator Exhibit",
    image: rep1,
    description: "A rare, pale-colored alligator that is a guest favorite.",
  },
  {
    id: "darth",
    name: "Darth",
    species: "250 lb American Alligator",
    habitat: "Wetland",
    diet: "Carnivore",
    location: "Alligator Exhibit",
    image: rep2,
    description: "A heavyweight legend and one of our biggest stars.",
  },
  {
    id: "jolly-green",
    name: "Jolly Green",
    species: "Iguana",
    habitat: "Rainforest",
    diet: "Herbivore",
    location: "Tropical Reptile House",
    image: rep3,
    description: "Bright, bold, and full of personality.",
  },
  {
    id: "juliette",
    name: "Juliette",
    species: "20 ft Reticulated Python",
    habitat: "Rainforest",
    diet: "Carnivore",
    location: "Snake Gallery",
    image: rep4,
    description: "An unforgettable giant and a guest favorite.",
  },
  {
    id: "retic-morphs",
    name: "Rainbow of Retics",
    species: "Reticulated Python Morphs",
    habitat: "Rainforest",
    diet: "Carnivore",
    location: "Snake Gallery",
    image: rep5,
    description: "A colorful variety of morphs to see up close.",
  },
  {
    id: "asian-water-monitor",
    name: "Asian Water Monitor",
    species: "Monitor Lizard",
    habitat: "Wetland",
    diet: "Carnivore",
    location: "Monitor Exhibit",
    image: rep6,
    description: "Fast, powerful, and curious.",
  },
  {
    id: "two-headed-turtle",
    name: "Two-Headed Turtle",
    species: "Turtle",
    habitat: "Wetland",
    diet: "Omnivore",
    location: "Special Exhibits",
    image: rep7,
    description: "A rare wonder—two heads, one shell.",
    isEndangered: true,
  },
];
