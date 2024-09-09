import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
  Box,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const Login = async () => {
    const formBody = { username, password };
    await axios
      .post("http://localhost:4000/api/user/login", formBody)
      .then((res) => {
        console.log(res.data, "data"),
          dispatch(
            loginSuccess({
              token: res.data.token,
              username: res.data.username,
              password: res.data.password,
            })
          );
        navigate("/products", { replace: true });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          <TextField
            id="input-with-icon-textfield"
            label="Username"
            name="username"
            type="name"
            size="small"
            required
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle fontSize="inherit" />
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
            <InputLabel size="small" htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              size="small"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? (
                      <VisibilityOff fontSize="inherit" />
                    ) : (
                      <Visibility fontSize="inherit" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            variant="outlined"
            color="info"
            size="small"
            disableElevation
            fullWidth
            sx={{ my: 2 }}
            onClick={Login}
          >
            LogIn
          </Button>
          <Link href="/" variant="body2">
            Sign up
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
