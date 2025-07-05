import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Card,
    CardContent,
    CardMedia,
    Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddAdDialog from './AddAdDialog';

const AdsSection = () => {
    const [ads, setAds] = useState([
        {
            id: 1,
            content: "/course.png",
            text: "إعلان هام عن بدء التسجيل في الدورات الجديدة"
        },
        {
            id: 2,
            content: "/course.png",
            text: "ورشة عمل مجانية الأسبوع القادم"
        }
    ]);

    const [openAddAdDialog, setOpenAddAdDialog] = useState(false);

    const handleAddAd = (newAd) => {
        const newAdWithId = {
            id: Date.now(),
            content: newAd.image || "/course.png",
            text: newAd.text || ""
        };
        setAds([...ads, newAdWithId]);
    };

    return (
        <Paper elevation={3} sx={{
            p: 4,
            mb: 6,
            backgroundColor: "rgba(255, 250, 245, 0.95)",
            border: "1px solid #e0d6c2",
            borderRadius: "16px",
            backdropFilter: "blur(2px)"
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4
            }}>
                <Typography variant="h4" sx={{
                    color: "#5a3e1b",
                    fontWeight: "bold",
                    fontFamily: "'Tajawal', sans-serif"
                }}>
                    الإعلانات
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenAddAdDialog(true)}
                    sx={{
                        backgroundColor: "#7b3f00",
                        "&:hover": { backgroundColor: "#5a3e1b" },
                        fontSize: "1rem",
                        px: 3,
                        py: 1
                    }}
                >
                    إضافة إعلان
                </Button>
            </Box>

            <Box sx={{
                display: "flex",
                overflowX: "auto",
                gap: 3,
                py: 2,
                '&::-webkit-scrollbar': {
                    height: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#E7BC91',
                    borderRadius: '4px',
                },
            }}>
                {ads.map((ad) => (
                    <Card key={ad.id} sx={{
                        minWidth: "300px",
                        flexShrink: 0,
                        height: "400px",
                        borderRadius: "16px",
                        boxShadow: 4,
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: 6
                        }
                    }}>
                        <Box sx={{
                            height: "70%",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#f8f4e9"
                        }}>
                            <CardMedia
                                component="img"
                                image={ad.content}
                                alt="إعلان"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center"
                                }}
                            />
                        </Box>

                        <CardContent sx={{
                            height: "30%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fffaf5"
                        }}>
                            <Typography variant="h6" sx={{
                                fontWeight: "bold",
                                color: "#5a3e1b",
                                textAlign: "center",
                                lineHeight: 1.4
                            }}>
                                {ad.text}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <AddAdDialog
                open={openAddAdDialog}
                onClose={() => setOpenAddAdDialog(false)}
                onSave={handleAddAd}
            />
        </Paper>
    );
};

export default AdsSection;