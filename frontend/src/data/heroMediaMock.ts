import hero1 from "../assets/hero/hero-1.jpg";
import hero2 from "../assets/hero/hero-2.jpg";
// import hero3 from "../assets/hero/hero-3.jpg";
import hero4 from "../assets/hero/hero-4.jpg";
import hero5 from "../assets/hero/hero-5.jpg";
import hero6 from "../assets/hero/hero-6.jpg";
import hero7 from "../assets/hero/hero-7.jpg";
import hero8 from "../assets/hero/hero-8.jpg";

export type HeroMediaItem = {
  id: string;
  type: "IMAGE" | "VIDEO";
  media_url: string;
  title?: string;
  is_active: boolean;
};

export const heroMediaMock: HeroMediaItem[] = [
  {
    id: "1",
    type: "IMAGE",
    media_url: hero1,
    title: "Hero 1",
    is_active: true,
  },
  {
    id: "2",
    type: "IMAGE",
    media_url: hero2,
    title: "Hero 2",
    is_active: true,
  },
  {
    id: "4",
    type: "IMAGE",
    media_url: hero4,
    title: "Hero 4",
    is_active: true,
  },
  {
    id: "5",
    type: "IMAGE",
    media_url: hero5,
    title: "Hero 5",
    is_active: true,
  },
  {
    id: "6",
    type: "IMAGE",
    media_url: hero6,
    title: "Hero 6",
    is_active: true,
  },
  {
    id: "7",
    type: "IMAGE",
    media_url: hero7,
    title: "Hero 7",
    is_active: true,
  },
  {
    id: "8",
    type: "IMAGE",
    media_url: hero8,
    title: "Hero 8",
    is_active: true,
  },
];
