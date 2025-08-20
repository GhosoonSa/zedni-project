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
  useTheme,
  useMediaQuery,
  Divider,
  styled
} from "@mui/material";

const themeColors = {
  primary: '#8D6E63',
  secondary: '#F5EDE4',
  light: '#FDF9F6',
  text: '#6B5D4D',
  white: '#FFFFFF',
  hover: '#F9F3EE',
  success: '#6BBF70'
};

const StyledTableRow = styled(TableRow) ({
  '&:nth-of-type(even)': {
    backgroundColor: themeColors.light,
  },
  '&:hover': {
    backgroundColor: themeColors.hover,
  },
});

const ScrollableContent = styled('div')(({ theme }) => ({
  maxHeight: '120px',
  overflowY: 'auto',
  width: '100%',
  paddingLeft: '8px',
  textAlign: 'right',
  wordBreak: 'keep-all', 
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: themeColors.primary,
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: themeColors.light,
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: '80px',
    padding: '4px',
    whiteSpace: 'normal' 
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
  wordBreak: 'keep-all', 
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

const StudentClassesPlanTab = ({ level }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showPlan, setShowPlan] = useState(false);

  const [savedPlans] = useState([
  ]);

  const filteredPlans = savedPlans.filter((plan) => plan.level === level);

  return (
    <Box sx={{
      p: isSmallScreen ? 2 : 4,
      background: themeColors.light,
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      direction: 'rtl'
    }}>
      {/*  عرض الخطة */}
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        mb: 4
      }}>
        <Button
          variant="contained"
          onClick={() => setShowPlan(!showPlan)}
          sx={{
            bgcolor: themeColors.primary,
            color: themeColors.white,
            borderRadius: '8px',
            px: 3,
            py: 1,
            fontSize: isSmallScreen ? '0.9rem' : '1rem',
            '&:hover': {
              bgcolor: '#6D4C41',
            }
          }}
        >
          عرض الخطة الدرسية
        </Button>
      </Box>

      {/* واجهة العرض */}
      {showPlan && (
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
                    <col style={{ width: isSmallScreen ? '120px' : '20%' }} />
                    <col style={{ width: isSmallScreen ? '150px' : '25%' }} />
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
                          <ScrollableContent>{plan.date}</ScrollableContent>
                        </StyledTableCell>
                        <StyledTableCell>
                          <ScrollableContent>{plan.subject}</ScrollableContent>
                        </StyledTableCell>
                        <StyledTableCell>
                          <ScrollableContent>{plan.dailyPlan}</ScrollableContent>
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

export default StudentClassesPlanTab;