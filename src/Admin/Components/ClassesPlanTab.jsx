import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  StyledTableRow,
  StyledTableCell,
  StyledTableHeadCell,
  ScrollableContent,
  ContentWrapper,
  themeColors,
} from "./StyledComponents";
import axios from "axios";
import AddClassPlanForm from "./AddClassPlanForm ";
import RemoveIcon from "@mui/icons-material/Remove";

const ClassesPlanTab = ({ courseId, level }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeView, setActiveView] = useState("add");
  const [savedPlans, setSavedPlans] = useState([]);
  const authToken = localStorage.getItem("authToken");

  const fetchClassPlan = async () => {
    console.log("reach fetch class plan ", courseId);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getCurriculumPlan/${courseId}/${level}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
            ContentType: "application/json",
          },
        }
      );
      const sortedPlans = response.data.curriculumPlan.sort(
        (a, b) => new Date(a.sessionDate) - new Date(b.sessionDate)
      );
      setSavedPlans(sortedPlans);
      console.log("from class plan ", savedPlans);
    } catch (error) {
      console.error("fetch class plan error ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/admin/deleteCurriculumPlan/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
            ContentType: "application/json",
          },
        }
      );
      if (response.status === 200) {
        fetchClassPlan();
      }
    } catch (error) {
      console.error("delete field error", error);
    }
  };

  return (
    <Box
      sx={{
        p: isSmallScreen ? 2 : 4,
        background: themeColors.light,
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
          gap: 2,
        }}
      >
        <Button
          variant={activeView === "add" ? "contained" : "outlined"}
          onClick={() => setActiveView("add")}
          sx={{
            bgcolor: activeView === "add" ? themeColors.primary : "transparent",
            color:
              activeView === "add" ? themeColors.white : themeColors.primary,
            borderColor: themeColors.primary,
            borderRadius: "8px",
            px: 3,
            py: 1,
            fontSize: isSmallScreen ? "0.9rem" : "1rem",
            "&:hover": {
              bgcolor:
                activeView === "add" ? themeColors.primary : themeColors.hover,
            },
          }}
        >
          إضافة خطة درسية
        </Button>
        <Button
          variant={activeView === "view" ? "contained" : "outlined"}
          onClick={() => {
            setActiveView("view");
            fetchClassPlan();
          }}
          sx={{
            bgcolor:
              activeView === "view" ? themeColors.primary : "transparent",
            color:
              activeView === "view" ? themeColors.white : themeColors.primary,
            borderColor: themeColors.primary,
            borderRadius: "8px",
            px: 3,
            py: 1,
            fontSize: isSmallScreen ? "0.9rem" : "1rem",
            "&:hover": {
              bgcolor:
                activeView === "view" ? themeColors.primary : themeColors.hover,
            },
          }}
        >
          عرض الخطة الدرسية
        </Button>
      </Box>

      {/*  الإضافة */}
      {activeView === "add" && (
        <AddClassPlanForm
          courseID={courseId}
          level={level}
          isSmallScreen={isSmallScreen}
        />
      )}

      {/*  العرض */}
      {activeView === "view" && (
        <Paper
          elevation={0}
          sx={{
            p: isSmallScreen ? 2 : 3,
            bgcolor: themeColors.white,
            borderRadius: "12px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "right",
              color: themeColors.primary,
              fontWeight: "500",
              fontSize: isSmallScreen ? "1rem" : "1.1rem",
            }}
          >
            الخطة الدرسية للمستوى الحالي
          </Typography>
          <Divider
            sx={{
              mb: 3,
              borderColor: themeColors.secondary,
            }}
          />

          {savedPlans.length > 0 ? (
            <Box
              sx={{
                width: "100%",
                overflowX: "auto",
                "&::-webkit-scrollbar": {
                  height: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: themeColors.primary,
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: themeColors.light,
                },
              }}
            >
              <TableContainer
                sx={{
                  border: `1px solid ${themeColors.secondary}`,
                  borderRadius: "10px",
                  minWidth: isSmallScreen ? "650px" : "100%",
                  display: "inline-block",
                }}
              >
                <Table
                  sx={{
                    tableLayout: "fixed",
                    minWidth: "100%",
                  }}
                >
                  <colgroup>
                    <col style={{ width: isSmallScreen ? "140px" : "20%" }} />
                    <col style={{ width: isSmallScreen ? "170px" : "25%" }} />
                    <col style={{ width: isSmallScreen ? "335px" : "40%" }} />
                    <col style={{ width: isSmallScreen ? "45" : "15%" }} />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <StyledTableHeadCell>التاريخ</StyledTableHeadCell>
                      <StyledTableHeadCell>المواد</StyledTableHeadCell>
                      <StyledTableHeadCell>المقرر اليومي</StyledTableHeadCell>
                      <StyledTableHeadCell>الإجراء</StyledTableHeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {savedPlans.map((plan) => (
                      <StyledTableRow key={plan.id}>
                        <StyledTableCell>
                          <ContentWrapper>
                            <ScrollableContent>
                              {plan.sessionDate}
                              <ScrollableContent />
                            </ScrollableContent>
                          </ContentWrapper>
                        </StyledTableCell>
                        <StyledTableCell>
                          <ContentWrapper>
                            <ScrollableContent>
                              {plan.subjectName}
                              <ScrollableContent />
                            </ScrollableContent>
                          </ContentWrapper>
                        </StyledTableCell>
                        <StyledTableCell>
                          <ContentWrapper>
                            <ScrollableContent>
                              {plan.sessionContent}
                              <ScrollableContent />
                            </ScrollableContent>
                          </ContentWrapper>
                        </StyledTableCell>
                        <StyledTableCell>
                          <ContentWrapper>
                            <IconButton
                              component="label"
                              sx={{
                                position: "relative",
                                left: 8,
                                top: 5,
                                color: "#5a3e1b",
                                "&:hover": {
                                  backgroundColor: "rgba(90, 62, 27, 0.1)",
                                },
                              }}
                              onClick={() => handleDelete(plan.id)}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </ContentWrapper>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Typography
              sx={{
                textAlign: "center",
                py: 4,
                color: themeColors.text,
                fontStyle: "italic",
                fontSize: isSmallScreen ? "0.9rem" : "1rem",
              }}
            >
              لا توجد خطط درسية لهذا المستوى
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default ClassesPlanTab;
