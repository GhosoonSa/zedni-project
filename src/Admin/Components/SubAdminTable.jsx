import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";

const SubAdminTable = () => {
  const [subAdmins, setSubAdmins] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const fetchSubAdmin = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/getAllSubadmins`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      setSubAdmins(response.data.subadmin);
    } catch (error) {
      console.error("fetch subAdmin error ", error);
    }
  };
  useEffect(() => {
    fetchSubAdmin();
  }, []);

  const handleDeleteAccount = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/admin/deleteSubadminAccount/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      if (response.status === 200) {
        fetchSubAdmin();
      }
    } catch (error) {
      console.error("delete error ", error);
    }
  };
  return (
    <>
      {subAdmins.length === 0 ? (
        <Typography variant="body1" sx={{ mb: 2, mt: 5 }}>
          لا يوجد مشرفين
        </Typography>
      ) : (
        <>
          <Typography variant="body1" sx={{ mb: 2, mt: 5 }}>
            المشرفين:
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              mt: 5,
              maxHeight: subAdmins.length > 20 ? 400 : "auto",
              overflowY: subAdmins.length > 20 ? "auto" : "visible",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>الاسم</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>اسم الأب</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    البريد الالكتروني
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    رقم الموبايل
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    تاريخ الميلاد
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    عنوان السكن
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>مجازة</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>الدور</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subAdmins.map((subadmin) => (
                  <TableRow key={subadmin.id} hover>
                    <TableCell sx={{ textAlign: "center" }}>
                      {subadmin.firstAndLastName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {subadmin.fatherName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {subadmin.email}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {subadmin.phoneNumber}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {subadmin.birthDate}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {subadmin.address}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {subadmin.mogazeh ? "نعم" : "لا"}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {subadmin.role === "subadmin" ? "مشرف" : ""}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        color="error"
                        variant="outlined"
                        size="small"
                        onClick={() => handleDeleteAccount(subadmin.id)}
                      >
                        حذف حساب
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default SubAdminTable;
