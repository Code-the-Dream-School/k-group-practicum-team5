import hero1 from "../assets/hero/hero-1.jpg";
import hero2 from "../assets/hero/hero-2.jpg";
// import hero3 from "../assets/hero/hero-3.jpg";
import hero4 from "../assets/hero/hero-4.jpg";

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
];
