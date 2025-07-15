import React from "react";
import {
  Box,
  Typography,
  Paper,
  CardMedia,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const AdsSection = ({ ads }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={3}
      sx={{
        mb: 4,
        py: 3,
        px: isSmallScreen ? 2 : 4,
        direction: "rtl",
        backgroundColor: "#fffaf5",
        borderTop: "4px solid #E7BC91",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "#333",
          textAlign: "right",
        }}
      >
        الإعلانات
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto",
          gap: 3,
          py: 1,
          "&::-webkit-scrollbar": {
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#E7BC91",
            borderRadius: "3px",
          },
        }}
      >
        {ads.map((ad) => (
          <Box
            key={ad.id}
            sx={{
              width: isSmallScreen ? 280 : 320,
              flex: "0 0 auto",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              border: "2px solid #E7BC91",
              backgroundColor: "#fffaf5",
            }}
          >
            <CardMedia
              component="img"
              height="160"
              image={ad.image}
              alt="إعلان"
              sx={{
                width: "100%",
                objectFit: "cover",
              }}
            />

            {ad.description && (
              <Box
                sx={{
                  p: 2,
                  textAlign: "center",
                  minHeight: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.5, color: "#555", fontWeight: 500 }}
                >
                  {ad.description}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default AdsSection;
