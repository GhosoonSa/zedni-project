import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grow,
  Chip,
  Paper
} from "@mui/material";

const StudentResultsTab = () => {
  const [subjects] = useState([
    {
      id: 1,
      name: "الفقه",
      results: {
        "علامة المذاكرة": 25,
        "علامة الامتحان": 40,
        "علامة الحضور": 15,
        "العلامة النهائية": 80,
        "النتيجة": "ناجح",
      }
    },
    {
      id: 2,
      name: "التفسير",
      results: {
        "علامة المذاكرة": 28,
        "علامة الامتحان": 45,
        "علامة الحضور": 18,
        "العلامة النهائية": 91,
        "النتيجة": "ناجح"
      }
    },
    {
      id: 3,
      name: "الحديث",
      results: {
        "علامة المذاكرة": 10,
        "علامة الامتحان": 28,
        "علامة الحضور": 2,
        "العلامة النهائية": 40,
        "النتيجة": "راسب",
      }
    },
      {
      id: 4,
      name: "التجويد",
      results: {
        "علامة المذاكرة": 25,
        "علامة الامتحان": 40,
        "علامة الحضور": 15,
        "العلامة النهائية": 80,
        "النتيجة": "ناجح",
      }
    },
  ]);

  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSelectSubject = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    setSelectedSubject(subject);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* قائمة المواد   */}
      <Box sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 2,
        py: 2,
        '&::-webkit-scrollbar': { height: '8px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#E7BC91', borderRadius: '4px' },
        '&::-webkit-scrollbar-track': { backgroundColor: '#f8f4e9' }
      }}>
        {subjects.map((subject, index) => (
          <Box key={subject.id} sx={{ minWidth: { xs: '45%', sm: '30%', md: '22%' }, flexShrink: 0 }}>
            <Grow in={true} timeout={index * 200}>
              <Card
                onClick={() => handleSelectSubject(subject.id)}
                sx={{
                  backgroundColor: selectedSubject?.id === subject.id ? '#f8f4e9' : '#fffaf5',
                  border: selectedSubject?.id === subject.id ? '2px solid #E7BC91' : '1px solid #e0d6c2',
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-5px)', borderColor: '#E7BC91' },
                  cursor: 'pointer',
                  mb: 2,
                  height: '100%'
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1rem' }}>
                    {subject.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          </Box>
        ))}
      </Box>

      {/* تفاصيل المادة المختارة */}
      {selectedSubject && (
        <Box sx={{
          mt: 3,
          width: '100%',
          border: '2px solid #E7BC91',
          borderRadius: 2,
          backgroundColor: '#fffaf5',
          p: 3,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
        }}>

          {/* النتائج  */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 4
          }}>
            {Object.entries(selectedSubject.results).map(([key, value]) => (
              key !== 'النتيجة' && (
                <Box key={key} sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#f8f4e9',
                  p: 2,
                  borderRadius: 1
                }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {key}:
                  </Typography>
                  <Typography variant="body1" sx={{
                    fontWeight: key === 'المجموع' ? 'bold' : 'normal',
                    color: '#5a3e1b'
                  }}>
                    {value}
                  </Typography>
                </Box>
              )
            ))}
          </Box>

          {/* النتيجة النهائية */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: selectedSubject.results.النتيجة === "ناجح" ? '#e8f5e9' : '#ffebee',
            p: 3,
            borderRadius: 1,
            border: `2px solid ${selectedSubject.results.النتيجة === "ناجح" ? '#4caf50' : '#f44336'}`,
          }}>
            <Chip
              label={`النتيجة: ${selectedSubject.results.النتيجة}`}
              color={selectedSubject.results.النتيجة === "ناجح" ? "success" : "error"}
              sx={{
                fontSize: '1.3rem',
                padding: '10px 20px',
                fontWeight: 'bold',
                width: '80%',
                textAlign: 'center'
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default StudentResultsTab;