import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useLocation, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ open, handleClose }) => {
  const location = useLocation();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {location.pathname === "/login" ? (
            <LoginForm></LoginForm>
          ) : (
            <RegisterForm></RegisterForm>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
