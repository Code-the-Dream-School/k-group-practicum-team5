import * as React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";

type Highlight = {
  id: string;
  rating: number; // 1-5
  title: string;
  quote: string;
  meta: string;
};

const highlights: Highlight[] = [
  {
    id: "h1",
    rating: 4,
    title: "A Wild Adventure at The Reptile Zoo!",
    quote:
      "The Reptile Zoo is definitely a spot for curious minds and animal lovers alike! Walking through the exhibits, I was genuinely amazed by the incredible creatures they hav especially the albino crocodile that seemed to glow under the lights and the truly fascinating two-headed snake, which felt like something out of a nature documentary come to life.",
    meta: "Beyond Borders • London, United Kingdom",
  },
  {
    id: "h2",
    rating: 5,
    title: "LOVED the Reptile Zoo",
    quote:
      "My 13-yr old son is a reptile lover. We were on our way to Wenatchee and saw the Reptile Zoo sign, and pulled over to visit. It was a GEM!!! The diversity of reptiles, the ambience, and the wonderful staff who talked to us about owning reptiles - unbeatable!!! On our way back to Seattle, my kids said stopping by AGAIN was a must - and we went by for a second time for a longer visit, and loved the Reptile Zoo even more. Highly recommended!!!",
    meta: "Valerie P • Lima, Peru",
  },
  {
    id: "h3",
    rating: 4,
    title: "Informative",
    quote:
      "This place is fascinating with so many different creatures to see and learn about. There are lizards, a crocodile, an alligator, turtles, spiders, and lots of snakes. I was impressed with the large number of different types of snakes and the information posted about each. My 4 year old grandson loved being able to see so many different creatures up close. If your child has ever talked about the reptile man coming to their school, this is the guy and these are the reptiles (some of them at least) that he brings.",
    meta: "Susana H • Tacoma, Washington",
  },
  {
    id: "h4",
    rating: 5,
    title: "Loved this place",
    quote:
      "grandkids loved this place, it was clean and kids got to explore and read about each reptile, the plexi glass was great, they were able to few and find without any problems, love that they named each reptile",
    meta: "mo'opuna's • 1 contribution",
  },
];

function Stars({ value }: { value: number }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <Box
      component="span"
      aria-label={`${full} out of 5`}
      sx={{ letterSpacing: 1, color: "secondary.main" }}
    >
      {"★★★★★".slice(0, full)}
      <Box component="span" sx={{ opacity: 0.25 }}>
        {"★★★★★".slice(full)}
      </Box>
    </Box>
  );
}

export default function TripadvisorHighlightsSection() {
  const [index, setIndex] = React.useState(0);

  const tripadvisorUrl =
    "https://www.tripadvisor.com/Attraction_Review-g58617-d4590565-Reviews-The_Reptile_Zoo-Monroe_Washington.html";

  const visible = React.useMemo(() => {
    const n = highlights.length;
    const prev = (index - 1 + n) % n;
    const next = (index + 1) % n;
    return [highlights[prev], highlights[index], highlights[next]];
  }, [index]);

  return (
    <Box
      component="section"
      sx={{
        mt: 2,
        mb: 4,
        px: { xs: 2, md: 3 },
        color: "text.primary",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          borderRadius: 4,
          p: { xs: 2.5, md: 4 },

          bgcolor: "background.default",
          border: "1px solid",
          borderColor: "primary.dark",
          boxShadow: 2,
          position: "relative",
          overflow: "hidden",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(47,111,62,0.10), rgba(31,61,43,0.06))",
            pointerEvents: "none",
          },
        }}
      >
        <Box sx={{ position: "relative", textAlign: "center" }}>
          <Typography variant="h3">Customer Highlights</Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1, maxWidth: 760, mx: "auto" }}
          >
            A quick snapshot of what visitors love. For full reviews and
            ratings, visit Tripadvisor.
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            mt: 3,
            display: "grid",
            gap: 2,
            alignItems: "stretch",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1.2fr 1fr" },
          }}
        >
          {visible.map((h, i) => {
            const isCenter = i === 1;

            return (
              <Box
                key={h.id}
                sx={{
                  borderRadius: 4,
                  p: 2.5,
                  bgcolor: "background.paper",

                  boxShadow: isCenter ? 6 : 3,
                  transform: { md: isCenter ? "scale(1.03)" : "scale(0.98)" },
                  opacity: isCenter ? 1 : 0.92,
                  transition:
                    "transform 200ms ease, opacity 200ms ease, box-shadow 200ms ease",
                  border: "1px solid",
                  borderColor: isCenter ? "primary.main" : "divider",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {h.title}
                  </Typography>

                  <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                    <Stars value={h.rating} />
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {h.meta}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mt: 1.5,
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  “{h.quote}”
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            position: "relative",
            mt: 2.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton
            aria-label="Previous highlight"
            onClick={() =>
              setIndex((i) => (i - 1 + highlights.length) % highlights.length)
            }
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <ChevronLeftRounded />
          </IconButton>

          <Typography variant="body2" color="text.secondary">
            {index + 1} / {highlights.length}
          </Typography>

          <IconButton
            aria-label="Next highlight"
            onClick={() => setIndex((i) => (i + 1) % highlights.length)}
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <ChevronRightRounded />
          </IconButton>
        </Box>

        <Box
          sx={{
            position: "relative",
            mt: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="secondary" // pops with your zooOrange
            href={tripadvisorUrl}
            target="_blank"
            rel="noreferrer"
            disabled={tripadvisorUrl.includes("PASTE_")}
          >
            Read Reviews on Tripadvisor
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
