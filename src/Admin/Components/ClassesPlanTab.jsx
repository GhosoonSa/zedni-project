import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  styled
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TodayIcon from "@mui/icons-material/Today";

const themeColors = {
  primary: '#8D6E63',
  secondary: '#F5EDE4',
  light: '#FDF9F6',
  text: '#6B5D4D',
  white: '#FFFFFF',
  hover: '#F9F3EE',
  success: '#6BBF70',
  error: '#f44336'
};

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(even)': {
    backgroundColor: themeColors.light,
  },
  '&:hover': {
    backgroundColor: themeColors.hover,
  },
});

const ContentWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  paddingLeft: '8px',
  textAlign: 'right',
  wordBreak: 'break-word',
  whiteSpace: 'normal',
  [theme.breakpoints.down('sm')]: {
    padding: '4px',
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${themeColors.secondary}`,
  color: themeColors.text,
  fontWeight: '500',
  padding: '14px 16px',
  fontSize: '0.95rem',
  textAlign: 'right',
  verticalAlign: 'top',
  wordBreak: 'break-word',
  whiteSpace: 'normal',
  height: 'auto',
  minHeight: '60px',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: '10px 12px',
    fontSize: '0.85rem',
    minWidth: '150px'
  }
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: themeColors.primary,
  color: themeColors.white,
  fontWeight: '500',
  fontSize: '0.95rem',
  padding: '14px 16px',
  borderRight: `1px solid ${themeColors.secondary}`,
  textAlign: 'right',
  wordBreak: 'keep-all',
  whiteSpace: 'nowrap',
  '&:last-child': {
    borderRight: 'none'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 12px',
    fontSize: '0.85rem',
    whiteSpace: 'nowrap'
  }
}));

const isValidDate = (dateString) => {
  if (!dateString) return false;
  
  const parts = dateString.split('/');
  if (parts.length !== 3) return false;
  
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
  
  if (day < 1 || day > 31) return false;
  if (month < 1 || month > 12) return false;
  
  return true;
};

const ClassesPlanTab = ({ level }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [activeView, setActiveView] = useState("add");
  const [lessonPlan, setLessonPlan] = useState([{ date: "", subject: "", dailyPlan: "" }]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [savedPlans, setSavedPlans] = useState([
  ]);

  const filteredPlans = savedPlans.filter((plan) => plan.level === level);

  const handleDateClick = (index) => {
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    handleInputChange(index, "date", formattedDate);
  };

  const handleAddRow = () => {
    setLessonPlan([...lessonPlan, { date: "", subject: "", dailyPlan: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedPlan = [...lessonPlan];
    updatedPlan[index][field] = value;
    setLessonPlan(updatedPlan);
    
    if (field === 'date') {
      const newErrors = {...errors};
      if (!isValidDate(value)) {
        newErrors[`date_${index}`] = 'تاريخ غير صحيح';
      } else {
        delete newErrors[`date_${index}`];
      }
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const hasErrors = Object.keys(errors).length > 0;
    const hasEmptyFields = lessonPlan.some(plan => 
      !plan.date || !plan.subject || !plan.dailyPlan
    );
    
    if (hasErrors || hasEmptyFields) {
      if (hasEmptyFields) {
        alert('الرجاء ملئ جميع الحقول ');
      }
      return;
    }
    
    const newPlans = lessonPlan.map((plan) => ({
      ...plan,
      id: Date.now(),
      level: level,
    }));
    
    setSavedPlans([...savedPlans, ...newPlans]);
    setLessonPlan([{ date: "", subject: "", dailyPlan: "" }]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Box sx={{ 
      p: isSmallScreen ? 2 : 4,
      background: themeColors.light,
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      direction: 'rtl'
    }}>
      {}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        mb: 4,
        gap: 2
      }}>
        <Button
          variant={activeView === "add" ? "contained" : "outlined"}
          onClick={() => setActiveView("add")}
          sx={{ 
            bgcolor: activeView === 'add' ? themeColors.primary : 'transparent',
            color: activeView === 'add' ? themeColors.white : themeColors.primary,
            borderColor: themeColors.primary,
            borderRadius: '8px',
            px: 3,
            py: 1,
            fontSize: isSmallScreen ? '0.9rem' : '1rem',
            '&:hover': {
              bgcolor: activeView === 'add' ? themeColors.primary : themeColors.hover,
            }
          }}
        >
          إضافة خطة درسية
        </Button>
        <Button
          variant={activeView === "view" ? "contained" : "outlined"}
          onClick={() => setActiveView("view")}
          sx={{ 
            bgcolor: activeView === 'view' ? themeColors.primary : 'transparent',
            color: activeView === 'view' ? themeColors.white : themeColors.primary,
            borderColor: themeColors.primary,
            borderRadius: '8px',
            px: 3,
            py: 1,
            fontSize: isSmallScreen ? '0.9rem' : '1rem',
            '&:hover': {
              bgcolor: activeView === 'view' ? themeColors.primary : themeColors.hover,
            }
          }}
        >
          عرض الخطة الدرسية
        </Button>
      </Box>

      {/*  الإضافة */}
      {activeView === "add" && (
        <Paper elevation={0} sx={{ 
          p: isSmallScreen ? 2 : 3, 
          mb: 4,
          bgcolor: themeColors.white,
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
        }}>
          <Typography variant="h6" gutterBottom sx={{ 
            textAlign: "right",
            color: themeColors.primary,
            fontWeight: '500',
            fontSize: isSmallScreen ? '1rem' : '1.1rem'
          }}>
            إضافة خطة درسية جديدة
          </Typography>
          <Divider sx={{ 
            mb: 3,
            borderColor: themeColors.secondary
          }} />
          
          <form onSubmit={handleSubmit}>
            <Box sx={{
              width: '100%',
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                height: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: themeColors.primary,
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: themeColors.light,
              }
            }}>
              <TableContainer sx={{
                border: `1px solid ${themeColors.secondary}`,
                borderRadius: '10px',
                minWidth: isSmallScreen ? '650px' : '100%',
                display: 'inline-block'
              }}>
                <Table sx={{ 
                  tableLayout: 'fixed',
                  minWidth: '100%'
                }}>
                  <colgroup>
                    <col style={{ width: isSmallScreen ? '140px' : '20%' }} />
                    <col style={{ width: isSmallScreen ? '170px' : '25%' }} />
                    <col style={{ width: isSmallScreen ? '380px' : '55%' }} />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <StyledTableHeadCell>التاريخ</StyledTableHeadCell>
                      <StyledTableHeadCell>المواد</StyledTableHeadCell>
                      <StyledTableHeadCell>المقرر اليومي</StyledTableHeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lessonPlan.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'flex-start', 
                              justifyContent: 'flex-end',
                              flexDirection:  'row',
                              gap: 1
                            }}>
                              <IconButton 
                                onClick={() => handleDateClick(index)}
                                sx={{ 
                                  color: themeColors.primary, 
                                  '&:hover': {
                                    backgroundColor: 'rgba(199, 184, 165, 0.1)'
                                  }
                                }}
                              >
                                <TodayIcon />
                              </IconButton>
                              <TextField
                                fullWidth
                                value={row.date}
                                onChange={(e) => handleInputChange(index, "date", e.target.value)}
                                placeholder="يوم/شهر/سنة"
                                required
                                error={!!errors[`date_${index}`]}
                                helperText={errors[`date_${index}`]}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: themeColors.secondary,
                                    },
                                    '&:hover fieldset': {
                                      borderColor: themeColors.primary,
                                    },
                                    '&.Mui-error fieldset': {
                                      borderColor: themeColors.error,
                                    },
                                  },
                                  minWidth: isSmallScreen ? '120px' : 'auto'
                                }}
                              />
                            </Box>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            fullWidth
                            value={row.subject}
                            onChange={(e) => handleInputChange(index, "subject", e.target.value)}
                            required
                            multiline
                            minRows={2}
                            maxRows={4}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: themeColors.secondary,
                                },
                                '&:hover fieldset': {
                                  borderColor: themeColors.primary,
                                },
                              },
                              '& .MuiInputBase-input': {
                                overflow: 'auto',
                                maxHeight: '100px',
                              }
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <TextField
                            fullWidth
                            value={row.dailyPlan}
                            onChange={(e) => handleInputChange(index, "dailyPlan", e.target.value)}
                            required
                            multiline
                            minRows={2}
                            maxRows={4}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: themeColors.secondary,
                                },
                                '&:hover fieldset': {
                                  borderColor: themeColors.primary,
                                },
                              },
                              '& .MuiInputBase-input': {
                                overflow: 'auto',
                                maxHeight: '100px',
                              }
                            }}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              mt: 3,
              gap: 2,
              alignItems: 'center'
            }}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddRow}
                sx={{
                  color: themeColors.primary,
                  borderColor: themeColors.primary,
                  borderRadius: '8px',
                  px: 3,
                  py: 1,
                  fontSize: isSmallScreen ? '0.9rem' : '1rem',
                  '&:hover': {
                    bgcolor: themeColors.hover,
                    borderColor: themeColors.primary,
                  }
                }}
              >
                إضافة صف جديد
              </Button>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {showSuccess && (
                  <Typography sx={{ 
                    color: themeColors.success,
                    fontSize: isSmallScreen ? '0.8rem' : '0.9rem',
                    fontStyle: 'italic'
                  }}>
                    تم حفظ الخطة بنجاح
                  </Typography>
                )}
                <Button 
                  variant="contained" 
                  type="submit"
                  sx={{
                    bgcolor: themeColors.primary,
                    borderRadius: '8px',
                    px: 3,
                    py: 1,
                    fontSize: isSmallScreen ? '0.9rem' : '1rem',
                    '&:hover': {
                      bgcolor: '#B2A18F',
                    }
                  }}
                >
                  حفظ الخطة
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      )}

      {/*  العرض */}
      {activeView === "view" && (
        <Paper elevation={0} sx={{ 
          p: isSmallScreen ? 2 : 3,
          bgcolor: themeColors.white,
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}>
          <Typography variant="h6" gutterBottom sx={{ 
            textAlign: "right",
            color: themeColors.primary,
            fontWeight: '500',
            fontSize: isSmallScreen ? '1rem' : '1.1rem'
          }}>
            الخطة الدرسية للمستوى الحالي
          </Typography>
          <Divider sx={{ 
            mb: 3,
            borderColor: themeColors.secondary
          }} />
          
          {filteredPlans.length > 0 ? (
            <Box sx={{
              width: '100%',
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                height: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: themeColors.primary,
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: themeColors.light,
              }
            }}>
              <TableContainer sx={{
                border: `1px solid ${themeColors.secondary}`,
                borderRadius: '10px',
                minWidth: isSmallScreen ? '650px' : '100%',
                display: 'inline-block'
              }}>
                <Table sx={{ 
                  tableLayout: 'fixed',
                  minWidth: '100%'
                }}>
                  <colgroup>
                    <col style={{ width: isSmallScreen ? '140px' : '20%' }} />
                    <col style={{ width: isSmallScreen ? '170px' : '25%' }} />
                    <col style={{ width: isSmallScreen ? '380px' : '55%' }} />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <StyledTableHeadCell>التاريخ</StyledTableHeadCell>
                      <StyledTableHeadCell>المواد</StyledTableHeadCell>
                      <StyledTableHeadCell>المقرر اليومي</StyledTableHeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPlans.map((plan) => (
                      <StyledTableRow key={plan.id}>
                        <StyledTableCell>
                          <ContentWrapper>{plan.date}</ContentWrapper>
                        </StyledTableCell>
                        <StyledTableCell>
                          <ContentWrapper>{plan.subject}</ContentWrapper>
                        </StyledTableCell>
                        <StyledTableCell>
                          <ContentWrapper>{plan.dailyPlan}</ContentWrapper>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Typography sx={{ 
              textAlign: "center", 
              py: 4,
              color: themeColors.text,
              fontStyle: 'italic',
              fontSize: isSmallScreen ? '0.9rem' : '1rem'
            }}>
              لا توجد خطط درسية لهذا المستوى
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default ClassesPlanTab; 