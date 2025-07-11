import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Grid,
    FormControlLabel,
    Checkbox,
    Avatar,
    ListItem,
    ListItemText,
    ListItemIcon,
    Typography,
    Paper,
    useTheme,
    useMediaQuery
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AttendanceForm = ({ students, onSubmit }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const [date, setDate] = useState(formattedDate);
    const [attendance, setAttendance] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleCheckboxChange = (studentId) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: !prev[studentId]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const presentStudents = students.filter(student => attendance[student.id]);
        onSubmit(date, presentStudents);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ direction: 'rtl' }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                mb: 3,
                gap: 2,
                flexDirection: isSmallScreen ? 'column' : 'row',
                alignItems: isSmallScreen ? 'flex-start' : 'center'
            }}>
                <Typography variant="subtitle1" sx={{
                    color: '#5a3e1b',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    minWidth: isSmallScreen ? '100%' : 'auto'
                }}>
                    تاريخ الحضور:
                </Typography>
                <TextField
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                    sx={{
                        width: isSmallScreen ? '100%' : '200px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#e0d6c2',
                                borderRadius: 2
                            },
                            '&:hover fieldset': {
                                borderColor: '#E7BC91'
                            },
                        },
                        '& .MuiInputBase-input': {
                            textAlign: 'right',
                            padding: '12px 14px'
                        }
                    }}
                />
            </Box>

            <Typography variant="subtitle1" sx={{
                fontWeight: 'bold',
                color: '#5a3e1b',
                mb: 2,
                textAlign: 'right',
                fontSize: '1.1rem'
            }}>
                قائمة الطلاب:
            </Typography>

            <Paper elevation={0} sx={{
                backgroundColor: '#f8f4e9',
                borderRadius: 2,
                p: 2,
                mb: 3,
                border: '1px solid #e0d6c2'
            }}>
                <Grid container spacing={2}>
                    {students.map((student) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={student.id}>
                            <ListItem sx={{
                                p: 1,
                                direction: 'rtl',
                                backgroundColor: attendance[student.id] ? 'rgba(231, 188, 145, 0.2)' : 'transparent',
                                borderRadius: 1,
                                border: '1px solid #e0d6c2',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: isSmallScreen ? 'column' : 'row',
                                alignItems: isSmallScreen ? 'flex-start' : 'center'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: isSmallScreen ? 1 : 0,
                                    gap: 1
                                }}>
                                    <ListItemIcon sx={{
                                        minWidth: 'auto',
                                        mr: 0
                                    }}>
                                        <Avatar sx={{
                                            bgcolor: '#E7BC91',
                                            width: 30,
                                            height: 30,
                                            fontSize: '0.9rem'
                                        }}>
                                            {student.name.split(' ')[0].charAt(0)}
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={student.name}
                                        primaryTypographyProps={{
                                            sx: {
                                                textAlign: 'right',
                                                fontWeight: 'medium',
                                                color: '#5a3e1b',
                                            }
                                        }}
                                    />
                                </Box>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={attendance[student.id] || false}
                                            onChange={() => handleCheckboxChange(student.id)}
                                            sx={{
                                                color: '#E7BC91',
                                                '&.Mui-checked': {
                                                    color: '#7b3f00'
                                                }
                                            }}
                                        />
                                    }
                                    label=""
                                    sx={{
                                        m: 0,
                                        ml: isSmallScreen ? 0 : 2,
                                        alignSelf: isSmallScreen ? 'flex-end' : 'center'
                                    }}
                                />
                            </ListItem>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                mt: 3,

            }}>
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={submitted ? <CheckCircleIcon sx={{ mr: 2 }} /> : null}
                    sx={{
                        backgroundColor: submitted ? '#2e7d32' : '#7b3f00',
                        color: '#fff',
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: submitted ? '#1b5e20' : '#5a3e1b',
                            gap: 1
                        },
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        width: isSmallScreen ? '100%' : 'auto',
                        transition: 'all 0.3s ease',
                        minWidth: '180px',
                        ml: 4
                    }}
                >
                    {submitted ? 'تم تسجيل الحضور' : 'حفظ الحضور'}
                </Button>
            </Box>
        </Box>
    );
};

export default AttendanceForm;