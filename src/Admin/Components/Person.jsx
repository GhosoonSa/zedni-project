import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const Person = ({ isOpen, onClose, person, token }) => {
  if (!isOpen) return null;

  return (
    <>
      <Modal
        show={isOpen}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
        style={{ direction: "rtl" }}
        fullscreen="sm-down"
      >
        <Modal.Header
          className="justify-content-start"
          style={{ backgroundColor: "#FFEDD8" }}
        >
          <Modal.Title className="flex-grow-1 text-right">
            المعلومات الشخصية
          </Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
            style={{ marginLeft: 0 }}
          />
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <h4> {person.name}</h4>
            <p>البريد الالكتروني: {person.email}</p>
          </div>
          <div
            className="row"
            style={{
              textAlign: "center",
            }}
          >
            <div
              className="col-lg-3"
              style={{ width: "50%" }}
              xs={12}
              md={6}
              lg={5}
            >
              <p>اسم الأب: {person.fatherName}</p>
              <p>عنوان السكن: {person.address}</p>
              <p>مجازة: {person.mojazh}</p>
            </div>
            <div
              className="col-lg-3"
              style={{ width: "50%" }}
              xs={12}
              md={6}
              lg={5}
            >
              <p>رقم الموبايل: {person.phoneNumber}</p>
              <p>تاريخ الميلاد: {person.birthDate}</p>
              <p>الدراسة/العمل: {person.studyOrCareer}</p>
            </div>
          </div>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              className="btn"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="outline-danger"
              className="btn"
              type="submit"
              onClick={onClose}
            >
              حذف الحساب
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Person;
