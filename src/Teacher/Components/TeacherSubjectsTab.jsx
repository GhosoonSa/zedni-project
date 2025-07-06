import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grow,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Divider
} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';

const TeacherSubjectsTab = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "الفقه", teacher: "نور", syllabus: "DB2EndProject.pdf", attachments: [], showSyllabus: false },
    { id: 2, name: "التفسير", teacher: "علي", syllabus: null, attachments: [], showSyllabus: false },
    { id: 3, name: "الحديث", teacher: "أحمد", syllabus: "حديث.pdf", attachments: [], showSyllabus: false },
    { id: 4, name: "التجويد", teacher: "محمد", syllabus: "تجويد.pdf", attachments: ["ملاحظات.pdf", "تمارين.pdf"], showSyllabus: false },
  ]);

  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleAttachmentUpload = (event) => {
    const file = event.target.files[0];
    if (file && selectedSubject) {
      const updatedSubjects = subjects.map(subject => {
        if (subject.id === selectedSubject.id) {
          return {
            ...subject,
            attachments: [...subject.attachments, file.name]
          };
        }
        return subject;
      });
      setSubjects(updatedSubjects);
      setSelectedSubject({
        ...selectedSubject,
        attachments: [...selectedSubject.attachments, file.name]
      });
    }
  };

  const handleSelectSubject = (subjectId) => {
    const updatedSubjects = subjects.map(subject => ({
      ...subject,
      showSyllabus: subject.id === subjectId ? subject.showSyllabus : false
    }));
    setSubjects(updatedSubjects);

    const subject = subjects.find(s => s.id === subjectId);
    setSelectedSubject(subject);
  };

  const handleShowSyllabus = (subjectId) => {
    const updatedSubjects = subjects.map(subject => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          showSyllabus: true
        };
      }
      return subject;
    });
    setSubjects(updatedSubjects);

    if (selectedSubject?.id === subjectId) {
      setSelectedSubject({
        ...selectedSubject,
        showSyllabus: true
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      { }
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

      { }
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
          { }
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#5a3e1b' }}>
              الأستاذ: {selectedSubject.teacher}
            </Typography>
          </Box>

          { }
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#5a3e1b', mb: 1 }}>
              المنهاج:
            </Typography>

            { }
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="contained"
                onClick={() => handleShowSyllabus(selectedSubject.id)}
                disabled={!selectedSubject.syllabus}
                sx={{
                  backgroundColor: '#5a3e1b',
                  color: 'white',
                  '&:hover': { backgroundColor: '#7b3f00' },
                  '&:disabled': { backgroundColor: '#e0d6c2', color: '#5a3e1b' },
                  px: 3,
                  py: 1,
                  mb: 2
                }}
              >
                عرض المنهاج
              </Button>
            </Box>

            {(selectedSubject.showSyllabus && selectedSubject.syllabus) ? (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f8f4e9',
                p: 2,
                borderRadius: 1,
                gap: 2,
                width: '100%'
              }}>
                <DescriptionIcon color="primary" sx={{ fontSize: '2rem' }} />
                <Typography variant="body1" sx={{ wordBreak: 'break-word', whiteSpace: 'normal', flex: 1 }}>
                  {selectedSubject.syllabus}
                </Typography>
              </Box>
            ) : !selectedSubject.syllabus ? (
              <Typography variant="body1">لا يوجد منهاج مرفوع حالياً</Typography>
            ) : null}
          </Box>

          { }
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                component="label"
                sx={{
                  backgroundColor: '#5a3e1b',
                  color: 'white',
                  '&:hover': { backgroundColor: '#7b3f00' },
                  px: 3,
                  py: 1,
                  mb: 2
                }}
              >
                إضافة ملحق
                <input
                  accept=".pdf"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleAttachmentUpload}
                />
              </Button>
            </Box>

            {selectedSubject.attachments.length > 0 ? (
              <List sx={{ width: '100%', bgcolor: '#f8f4e9', borderRadius: 1, p: 0 }}>
                {selectedSubject.attachments.map((attachment, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <DescriptionIcon color="primary" />
                      </ListItemIcon>
                      <Typography variant="body1" sx={{ flex: 1, textAlign: 'right' }}>
                        {attachment}
                      </Typography>
                    </ListItem>
                    {index < selectedSubject.attachments.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body1">لا يوجد ملحقات مرفوعة حالياً</Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TeacherSubjectsTab;