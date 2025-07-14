import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.05)",
  background: "linear-gradient(145deg, #fffaf5, #f8f4e9)",
  border: "1px solid #E7BC91",
  position: "relative",
  overflow: "hidden",
  height: "100%",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "100px",
    height: "100px",
    background: "radial-gradient(circle, #E7BC91 1px, transparent 1px)",
    backgroundSize: "15px 15px",
    opacity: 0.1,
  },
}));

const TeacherResultsTab = () => {
  // Sample data - will be replaced with API data later
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  const subjects = [
    { id: 1, name: "الفقه" },
  ];

  const students = [
    { id: 1, name: "أحمد" },
    { id: 2, name: "سارة" },
    { id: 3, name: "عبدالله" },
    { id: 4, name: "بيان" },
    { id: 5, name: "نور" },
  ];

  // Sample marks data
  const marks = {
    study: { 1: 25, 2: 28, 3: 20, 4: 30, 5: 3 },
    exam: { 1: 40, 2: 45, 3: 35, 4: 50, 5: 2 },
    attendance: { 1: 15, 2: 18, 3: 12, 4: 20, 5: 10 },
    total: { 1: 30,2:40,3: 67, 4: 100, 5: 60},
    status: { 1: "راسب", 2: "راسب", 3: "ناجح", 4: "ناجح", 5: "ناجح" }
  };

  // Calculate statistics from the table data
  const calculateStats = () => {
    const passed = Object.values(marks.status).filter(s => s === "ناجح").length;
    const totalStudents = students.length;

    return {
      passed,
      failed: totalStudents - passed,
      passedPercentage: ((passed / totalStudents) * 100).toFixed(1),
      failedPercentage: (((totalStudents - passed) / totalStudents) * 100).toFixed(1),
      totalStudents
    };
  };

  const stats = calculateStats();

  // Charts data - based on table data
  const chartsData = {
    resultStatus: [
      { name: "ناجح", value: stats.passed, fill: "#2E7D32" },
      { name: "راسب", value: stats.failed, fill: "#C62828" },
    ],
  };

  // Calculate mark ranges from table data
  const calculateRanges = () => {
    const studyMarks = Object.values(marks.study).map(Number).filter(n => !isNaN(n));
    const examMarks = Object.values(marks.exam).map(Number).filter(n => !isNaN(n));
    const attendanceMarks = Object.values(marks.attendance).map(Number).filter(n => !isNaN(n));

    const calcAvg = (arr) => arr.length > 0 ? (arr.reduce((a, b) => a + b, 0))/ arr.length : 0;

    return {
      study: {
        min: studyMarks.length > 0 ? Math.min(...studyMarks) : 0,
        max: studyMarks.length > 0 ? Math.max(...studyMarks) : 30,
        avg: calcAvg(studyMarks).toFixed(1)
      },
      exam: {
        min: examMarks.length > 0 ? Math.min(...examMarks) : 0,
        max: examMarks.length > 0 ? Math.max(...examMarks) : 50,
        avg: calcAvg(examMarks).toFixed(1)
      },
      attendance: {
        min: attendanceMarks.length > 0 ? Math.min(...attendanceMarks) : 0,
        max: attendanceMarks.length > 0 ? Math.max(...attendanceMarks) : 20,
        avg: calcAvg(attendanceMarks).toFixed(1)
      }
    };
  };

  const ranges = calculateRanges();

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, bgcolor: "background.paper" }}>
          <Typography variant="body2" color="text.primary">
            {payload[0].payload.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`العدد: ${payload[0].value}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`النسبة: ${((payload[0].value / stats.totalStudents) * 100).toFixed(1)}%`}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  // Render subject selection cards
  const renderSubjects = () => (
    <Box sx={{
      display: "flex",
      overflowX: "auto",
      gap: 2,
      py: 2,
      "&::-webkit-scrollbar": { height: "8px" },
      "&::-webkit-scrollbar-thumb": { backgroundColor: "#E7BC91", borderRadius: "4px" },
      "&::-webkit-scrollbar-track": { backgroundColor: "#f8f4e9" },
    }}>
      {subjects.map((subject) => (
        <Box key={subject.id} sx={{ minWidth: "22%", flexShrink: 0 }}>
          <Card
            onClick={() => setSelectedSubject(subject)}
            sx={{
              backgroundColor: selectedSubject?.id === subject.id ? "#f8f4e9" : "#fffaf5",
              border: selectedSubject?.id === subject.id ? "2px solid #E7BC91" : "1px solid #e0d6c2",
              borderRadius: 2,
              boxShadow: 3,
              transition: "all 0.3s ease",
              "&:hover": { transform: "translateY(-5px)", borderColor: "#E7BC91" },
              cursor: "pointer",
              height: "100%",
              minHeight: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.1rem" }}>
                {subject.name}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      {renderSubjects()}

      {selectedSubject && (
        <>
          {/* Results Analysis Title */}
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: "bold",
              color: "#5a3e1b",
              textAlign: "center",
              fontFamily: '"Amiri", serif',
              position: "relative",
              "&::after": {
                content: '""',
                display: "block",
                width: "100px",
                height: "4px",
                background: "linear-gradient(to right, #E7BC91, #5a3e1b)",
                margin: "12px auto 0",
                borderRadius: "3px",
              },
            }}
          >
            تحليل النتائج
          </Typography>

          {/* Charts Grid */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {/* Result Status Chart */}
            <Grid item xs={12} md={6}>
              <ChartCard>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: "bold",
                    color: "#5a3e1b",
                    textAlign: "center",
                    fontFamily: '"Amiri", serif',
                  }}
                >
                  حالة النتائج
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartsData.resultStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {chartsData.resultStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: "#f8f4e9",
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography>
                    إجمالي الطلاب: <strong>{stats.totalStudents}</strong>
                  </Typography>
                </Box>
              </ChartCard>
            </Grid>

            {/* Marks Range Chart */}
            <Grid item xs={12} md={6}>
              <ChartCard>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: "bold",
                    color: "#5a3e1b",
                    textAlign: "center",
                    fontFamily: '"Amiri", serif',
                  }}
                >
                  نطاق العلامات
                </Typography>
                <Box sx={{ height: 300, display: "flex", flexDirection: "column" }}>
                  {[
                    { type: "study", name: "المذاكرة", max: 30, color: "#5D4037" },
                    { type: "exam", name: "الامتحان", max: 50, color: "#0277BD" },
                    { type: "attendance", name: "الحضور", max: 20, color: "#6A1B9A" }
                  ].map((item, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography sx={{ fontWeight: "bold", color: "#5a3e1b" }}>
                        {item.name}
                      </Typography>
                      <Box
                        sx={{
                          height: "20px",
                          width: "100%",
                          backgroundColor: "#f0e6d2",
                          borderRadius: "10px",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            left: `${(ranges[item.type].min / item.max) * 100}%`,
                            right: `${100 - (ranges[item.type].max / item.max) * 100}%`,
                            top: 0,
                            bottom: 0,
                            backgroundColor: item.color,
                            opacity: 0.7,
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            left: `${(ranges[item.type].avg / item.max) * 100}%`,
                            top: "-5px",
                            bottom: "-5px",
                            width: "4px",
                            backgroundColor: "white",
                            boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 1,
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#8d6e63" }}>
                          {ranges[item.type].min}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: item.color,
                            fontWeight: "bold",
                          }}
                        >
                          المتوسط: {ranges[item.type].avg}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#8d6e63" }}>
                          {ranges[item.type].max}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </ChartCard>
            </Grid>
          </Grid>

          {/* Detailed Results Table */}
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: "bold",
              color: "#5a3e1b",
              textAlign: "center",
              fontFamily: '"Amiri", serif',
              position: "relative",
              "&::after": {
                content: '""',
                display: "block",
                width: "100px",
                height: "4px",
                background: "linear-gradient(to right, #E7BC91, #5a3e1b)",
                margin: "12px auto 0",
                borderRadius: "3px",
              },
            }}
          >
            النتائج التفصيلية
          </Typography>

          <TableContainer
            component={Paper}
            sx={{
              border: "1px solid #e0d6c2",
              borderRadius: "12px",
              overflowX: "auto",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.05)",
              background: "linear-gradient(to right, #fffaf5, #f8f4e9)",
              "& .MuiTableHead-root": {
                background: "linear-gradient(to right, #f8f4e9, #fffaf5)",
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#5a3e1b" }}>اسم الطالب</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#5a3e1b" }}>المذاكرة (30)</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#5a3e1b" }}>الامتحان (50)</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#5a3e1b" }}>الحضور (20)</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#5a3e1b" }}>المجموع (100)</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#5a3e1b" }}>النتيجة</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{marks.study[student.id] ?? "-"}</TableCell>
                    <TableCell>{marks.exam[student.id] ?? "-"}</TableCell>
                    <TableCell>{marks.attendance[student.id] ?? "-"}</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>{marks.total[student.id] ?? "-"}</TableCell>
                    <TableCell sx={{
                      color: marks.status[student.id] === "ناجح" ? "#2E7D32" : "#C62828",
                      fontWeight: "bold"
                    }}>
                      {marks.status[student.id] ?? "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default TeacherResultsTab;