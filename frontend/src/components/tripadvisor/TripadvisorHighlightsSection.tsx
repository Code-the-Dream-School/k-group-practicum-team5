import * as React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import { useTranslation } from "react-i18next";

type Highlight = {
  id: string;
  rating: number; // 1-5
  title: string;
  quote: string;
  meta: string;
};

type HighlightKey = {
  id: string;
  rating: number; // 1-5
  titleKey: string;
  quoteKey: string;
  metaKey: string;
};

const highlightKeys: HighlightKey[] = [
  {
    id: "h1",
    rating: 4,
    titleKey: "tripadvisor.items.h1.title",
    quoteKey: "tripadvisor.items.h1.quote",
    metaKey: "tripadvisor.items.h1.meta",
  },
  {
    id: "h2",
    rating: 5,
    titleKey: "tripadvisor.items.h2.title",
    quoteKey: "tripadvisor.items.h2.quote",
    metaKey: "tripadvisor.items.h2.meta",
  },
  {
    id: "h3",
    rating: 4,
    titleKey: "tripadvisor.items.h3.title",
    quoteKey: "tripadvisor.items.h3.quote",
    metaKey: "tripadvisor.items.h3.meta",
  },
  {
    id: "h4",
    rating: 5,
    titleKey: "tripadvisor.items.h4.title",
    quoteKey: "tripadvisor.items.h4.quote",
    metaKey: "tripadvisor.items.h4.meta",
  },
];

function Stars({ value, ariaLabel }: { value: number; ariaLabel: string }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <Box
      component="span"
      aria-label={ariaLabel}
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
  const { t } = useTranslation();
  const [index, setIndex] = React.useState(0);

  const highlights = React.useMemo<Highlight[]>(
    () =>
      highlightKeys.map((item) => ({
        id: item.id,
        rating: item.rating,
        title: t(item.titleKey),
        quote: t(item.quoteKey),
        meta: t(item.metaKey),
      })),
    [t],
  );

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
          <Typography variant="h3">{t("tripadvisor.title")}</Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1, maxWidth: 760, mx: "auto" }}
          >
            {t("tripadvisor.subtitle")}
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
                    <Stars
                      value={h.rating}
                      ariaLabel={t("tripadvisor.starsAria", {
                        count: Math.max(0, Math.min(5, Math.round(h.rating))),
                      })}
                    />
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
            aria-label={t("tripadvisor.prevAria")}
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
            aria-label={t("tripadvisor.nextAria")}
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
            {t("tripadvisor.readReviews")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
