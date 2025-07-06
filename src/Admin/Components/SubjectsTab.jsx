import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Grow,
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import DescriptionIcon from '@mui/icons-material/Description';

const SubjectsTab = () => {
  const teachers = [
    { id: 1, name: " أحمد " },
    { id: 2, name: " علي " },
    { id: 3, name: "  خالد" },
    { id: 2, name: "  حسن" },
    { id: 2, name: "  محمد" },
    { id: 2, name: "  سعيد" },
    { id: 2, name: "  حسين" },
    { id: 2, name: "  نور" },

  ];

  const [subjects, setSubjects] = useState([
    { id: 1, name: "الفقه", teacher: " نور ", syllabus: "DB2EndProject.pdf" },
    { id: 4, name: "السيرة", teacher: " خالد ", syllabus: null },
    { id: 5, name: "التفسير", teacher: "  علي", syllabus: null }
  ]);

  const [newSubject, setNewSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleAddSubject = () => {
    if (newSubject.trim() && selectedTeacher) {
      const newSubjectObj = {
        id: Date.now(),
        name: newSubject,
        teacher: selectedTeacher,
        syllabus: null
      };
      setSubjects([...subjects, newSubjectObj]);
      handleCloseDialog();
    }
  };

  const handleFileUpload = (subjectId, event) => {
    const file = event.target.files[0];
    if (file) {
      setSubjects(subjects.map(subject =>
        subject.id === subjectId ? { ...subject, syllabus: file.name } : subject
      ));
      if (selectedSubject && selectedSubject.id === subjectId) {
        setSelectedSubject({ ...selectedSubject, syllabus: file.name });
      }
    }
  };

  const handleSelectSubject = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    setSelectedSubject(subject);
  };

  const handleCloseDialog = () => {
    setNewSubject("");
    setSelectedTeacher("");
    setOpenAddDialog(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
          sx={{
            backgroundColor: '#5a3e1b',
            '&:hover': { backgroundColor: '#7b3f00' }
          }}
        >
          إضافة مادة
        </Button>
      </Box>

      {}
      <Box sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 2,
        py: 2,
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#E7BC91',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f8f4e9',
        }
      }}>
        {subjects.map((subject, index) => (
          <Box key={subject.id} sx={{
            minWidth: { xs: '80%', sm: '45%', md: '30%' },
            flexShrink: 0
          }}>
            <Grow in={true} timeout={index * 200}>
              <Card
                onClick={() => handleSelectSubject(subject.id)}
                sx={{
                  backgroundColor: selectedSubject?.id === subject.id ? '#f8f4e9' : '#fffaf5',
                  border: selectedSubject?.id === subject.id ? '2px solid #E7BC91' : '1px solid #e0d6c2',
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: '#E7BC91'
                  },
                  cursor: 'pointer',
                  mb: 2,
                  height: '100%'
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {subject.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          </Box>
        ))}
      </Box>

      {}
      {selectedSubject && (
        <Box sx={{
          mt: 3,
          width: '100%',
          height: '100%',
          border: '2px solid #E7BC91',
          borderRadius: 2,
          backgroundColor: '#fffaf5',
          p: 3,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'visible'
        }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#5a3e1b' }}>
              الأستاذ: {selectedSubject.teacher}
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%'
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#5a3e1b' }}>
              المنهاج:
            </Typography>

            {selectedSubject.syllabus ? (
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                backgroundColor: '#f8f4e9',
                p: 2,
                borderRadius: 1,
                gap: 2,
                width: '100%'
              }}>
                <DescriptionIcon color="primary" sx={{ fontSize: '2rem' }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{
                    wordBreak: 'break-word',
                    whiteSpace: 'normal'
                  }}>
                    {selectedSubject.syllabus}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'flex-start'
              }}>
                <Typography variant="body1">
                  لا يوجد منهاج مرفوع حالياً
                </Typography>
                <input
                  accept=".pdf"
                  id={`upload-syllabus-${selectedSubject.id}`}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(selectedSubject.id, e)}
                />
                <label htmlFor={`upload-syllabus-${selectedSubject.id}`}>
                  <Button
                    variant="contained"
                    startIcon={<UploadIcon />}
                    component="span"
                    sx={{
                      backgroundColor: '#5a3e1b',
                      color: 'white',
                      '&:hover': { backgroundColor: '#7b3f00' },
                      px: 3,
                      py: 1
                    }}
                  >
                    رفع المنهاج
                  </Button>
                </label>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {}
      <Dialog
        open={openAddDialog}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleCloseDialog();
          }
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{
          backgroundColor: '#f8f4e9',
          borderBottom: '1px solid #E7BC91',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            إضافة مادة جديدة
          </Typography>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{
          py: 3,
          backgroundColor: '#fffaf5',
          overflow: 'visible'
        }}>
          <TextField
            fullWidth
            label="اسم المادة"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            select
            fullWidth
            label="اختر الأستاذ"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    overflow: 'auto',
                  },
                },
              },
            }}
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.name}>
                {teacher.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions sx={{
          backgroundColor: '#f8f4e9',
          borderTop: '1px solid #E7BC91',
          px: 3,
          py: 2
        }}>
          <Button
            onClick={handleCloseDialog}
            sx={{ color: '#5a3e1b' }}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleAddSubject}
            disabled={!newSubject || !selectedTeacher}
            variant="contained"
            sx={{
              backgroundColor: '#5a3e1b',
              '&:hover': { backgroundColor: '#7b3f00' },
              '&:disabled': { backgroundColor: '#e0d6c2' }
            }}
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubjectsTab;