import * as React from "react";
import { CustomButton } from "./CustomButton";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../utils/AuthContext";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const Auth: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loginEmail, setLoginEmail] = React.useState<string>("");
  const [loginPassword, setLoginPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const [showRegisterForm, setShowRegisterForm] =
    React.useState<boolean>(false);

  const { user } = useAuth();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log("Utilisateur connecté :", userCredential.user);
      setError(null);
      setOpen(false);
    } catch (err: any) {
      console.error("Erreur de connexion :", err.message);
      setError("auth.loginError");
    }
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:6273/users/register", {
      email: email,
      password: password,
    });
    console.log(response.data);

    try {
      setError(null);
      setOpen(false);
      setTimeout(() => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
          navigate("/fill-profile");
        });
      }, 500);
    } catch (err: any) {
      console.error("Erreur d'inscription :", err.message);
      setError("auth.registerError");
    }
  };

  console.log("User:", user);

  return (
    <React.Fragment>
      {!user && (
        <CustomButton
          variant="outlined"
          sx={{ textTransform: "none" }}
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
          label="Sign In"
        ></CustomButton>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Auth</DialogTitle>
          <DialogContent>Connect to interact with others</DialogContent>
          <Stack spacing={2}>
            <form onSubmit={handleLogin}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  autoFocus
                  required
                  type="loginEmail"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel>Password</FormLabel>
                <Input
                  required
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </FormControl>
              {error && <div style={{ color: "red" }}>{error}</div>}
              <CustomButton
                sx={{
                  bgcolor: "#10b981",
                  "&:hover": {
                    bgcolor: "#059669",
                  },
                }}
                type="submit"
                label="Sign In"
              ></CustomButton>
            </form>

            <Divider>Or</Divider>

            {!showRegisterForm && (
              <CustomButton
                variant="plain"
                color="primary"
                onClick={() => setShowRegisterForm(true)}
                label="Create an account"
              ></CustomButton>
            )}

            {showRegisterForm && (
              <div>
                <DialogContent>Create an account</DialogContent>
                <form onSubmit={handleRegister}>
                  <FormControl sx={{ mt: 2 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      required
                      type="loginEmail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2 }}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                  {error && <div style={{ color: "red" }}>{error}</div>}
                  <CustomButton
                    label="Register"
                    sx={{
                      bgcolor: "#10b981",
                      "&:hover": {
                        bgcolor: "#059669",
                      },
                    }}
                    type="submit"
                  >
                    Register
                  </CustomButton>
                </form>
              </div>
            )}
          </Stack>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};
