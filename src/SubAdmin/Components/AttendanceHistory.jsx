import React, { useState } from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    Paper,
    Collapse,
    Grid
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const AttendanceHistory = ({ history, students }) => {
    const [expandedDate, setExpandedDate] = useState(null);

    const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleToggleDate = (date) => {
        setExpandedDate(expandedDate === date ? null : date);
    };

    if (sortedHistory.length === 0) {
        return (
            <Box sx={{
                textAlign: 'center',
                py: 4,
                backgroundColor: '#f8f4e9',
                borderRadius: 2,
                border: '1px dashed #e0d6c2'
            }}>
                <Typography variant="body1" sx={{
                    color: '#5a3e1b',
                    fontSize: '1.1rem'
                }}>
                    لا يوجد سجل حضور لهذه المادة بعد
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ direction: 'rtl' }}>
            <Typography variant="h6" sx={{
                color: '#7b3f00',
                mb: 3,
                pb: 1,
                borderBottom: '2px solid #f8f4e9',
                fontSize: '1.2rem',
                fontWeight: 'bold'
            }}>
                سجلات الحضور السابقة
            </Typography>

            <List sx={{ width: '100%' }}>
                {sortedHistory.map((record) => {
                    const presentStudents = students.filter(s =>
                        record.presentStudents.includes(s.id)
                    );

                    return (
                        <Paper key={record.id} elevation={0} sx={{
                            mb: 2,
                            backgroundColor: '#fffaf5',
                            border: '1px solid #e0d6c2',
                            borderRadius: 2,
                            overflow: 'hidden'
                        }}>
                            <ListItem
                                button
                                onClick={() => handleToggleDate(record.date)}
                                sx={{
                                    backgroundColor: '#f8f4e9',
                                    borderBottom: '1px solid #e0d6c2',
                                    '&:hover': {
                                        backgroundColor: 'rgba(231, 188, 145, 0.3)'
                                    },
                                    py: 1.5
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '24px' }}>
                                    <EventIcon sx={{
                                        color: '#7b3f00',
                                        fontSize: '1.5rem'
                                    }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={formatDate(record.date)}
                                    primaryTypographyProps={{
                                        sx: {
                                            fontWeight: 'bold',
                                            color: '#5a3e1b',
                                            fontSize: '1.1rem'
                                        }
                                    }}
                                />
                                {expandedDate === record.date ? (
                                    <ExpandLessIcon sx={{
                                        color: '#7b3f00',
                                        fontSize: '1.5rem'
                                    }} />
                                ) : (
                                    <ExpandMoreIcon sx={{
                                        color: '#7b3f00',
                                        fontSize: '1.5rem'
                                    }} />
                                )}
                            </ListItem>

                            <Collapse in={expandedDate === record.date} timeout="auto" unmountOnExit>
                                <Box sx={{ p: 3 }}>
                                    <Typography variant="subtitle1" sx={{
                                        color: '#5a3e1b',
                                        mb: 2,
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '1.1rem'
                                    }}>
                                        <PersonIcon sx={{
                                            fontSize: '1.2rem',
                                            mr: 1,
                                            color: '#E7BC91',
                                            ml:2
                                        }} />
                                        الطلاب الحاضرين:
                                    </Typography>

                                    <Grid container spacing={2}>
                                        {presentStudents.map(student => (
                                            <Grid item xs={12} sm={6} md={4} key={student.id}>
                                                <ListItem sx={{
                                                    p: 1.5,
                                                    backgroundColor: 'rgba(231, 188, 145, 0.1)',
                                                    borderRadius: 1,
                                                    border: '1px solid #e0d6c2',
                                                                gap: 1, 

                                                }}>
                                                    <ListItemIcon sx={{ minWidth: '24px' }}>
                                                        <Avatar sx={{
                                                            bgcolor: '#E7BC91',
                                                            width: 24,
                                                            height: 24,
                                                            fontSize: '1rem'
                                                        }}>
                                                            {student.name.split(' ')[0].charAt(0)}
                                                        </Avatar>
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={student.name}
                                                        primaryTypographyProps={{
                                                            sx: {
                                                                color: '#5a3e1b',
                                                                fontWeight: 'medium',
                                                                fontSize: '1rem'
                                                            }
                                                        }}
                                                    />
                                                </ListItem>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </Collapse>
                        </Paper>
                    );
                })}
            </List>
        </Box>
    );
};

export default AttendanceHistory;