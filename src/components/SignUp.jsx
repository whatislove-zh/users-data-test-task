import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  
} from "@mui/material";

import { useState } from "react";
import { StyledBtn } from "./StyledBtn";

export const SignUp = () => {
  const [value, setValue] = useState("frontend");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      sx={{
        mb: "140px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h2" sx={{ mb: "50px" }}>
        Working with PUT request
      </Typography>
      <Box component="form" onSubmit={handleSubmit} width="380px">
        <TextField
          margin="normal"
          fullWidth
          autoComplete="name"
          label="Your name"
          name="name"
        />
        <TextField
          margin="normal"
          fullWidth
          autoComplete="email"
          label="Email"
          name="email"
        />
        <TextField
          margin="normal"
          fullWidth
          autoComplete="tel"
          label="Phone"
          name="email"
        />
        <TextField sx={{ display: "none" }} autoComplete="password" />

        <FormControl sx={{ mt: "43px", mb:"50px" }}>
          <FormLabel>Select your position</FormLabel>
          <RadioGroup value={value} onChange={handleChange}>
            <FormControlLabel
              value="frontend"
              control={<Radio />}
              label="Frontend developer"
            />
            <FormControlLabel
              value="backend"
              control={<Radio />}
              label="Backend developer"
            />
            <FormControlLabel
              value="designer"
              control={<Radio />}
              label="Designer"
            />
            <FormControlLabel value="qa" control={<Radio />} label="QA" />
          </RadioGroup>
        </FormControl>

        
      </Box>
      <StyledBtn disabled title="Sign up"/>
    </Box>
  );
};
