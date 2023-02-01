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
import { StyledBtn } from "./StyledBtn";

import { v4 as uuid } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

import { useState } from "react";

import successImage from "../assets/success-image.svg";

export const SignUp = () => {
  const [succesRegistered, setSuccesRegistered] = useState(false);

  //Form state
  const [position, setPosition] = useState("frontend");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    //add new user
    const collectionRef = collection(db, "users");
    await addDoc(collectionRef, {
      userId: uuid(),
      name: name,
      email: email,
      phone: phone,
      position: position,
    });
    setSuccesRegistered(true);
    setName("");
    setPhone("");
    setEmail("");
  };

  const positionChange = (event) => {
    setPosition(event.target.value);
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
      {succesRegistered ? (
        <img
          src={successImage}
          height="650px"
          alt="success"
          style={{ 
            opacity:0,
            animation: "2s linear 0.2s success-image",
           }}
           onAnimationEnd={(e) => {setSuccesRegistered(false);}}
           
        />
      ) : (
        <Box sx={{
          opacity:0,
          animation: "1.5s linear 0.1s success-image",
        }}
        onAnimationEnd={(e) => {e.target.style.opacity=1}}
        >
          <Typography
            variant="h4"
            id="putReq"
            component="h2"
            sx={{ mb: "50px" }}
          >
            Working with PUT request
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            width="380px"
            align="center"
          >
            <TextField
              margin="normal"
              fullWidth
              autoComplete="name"
              label="Your name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              autoComplete="email"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              autoComplete="tel"
              label="Phone"
              name="email"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField sx={{ display: "none" }} autoComplete="password" />
            <Box>
              <FormControl sx={{ mt: "43px", mb: "50px", width: "100%" }}>
                <FormLabel>Select your position</FormLabel>
                <RadioGroup value={position} onChange={positionChange}>
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

            <StyledBtn type="submit" title="Sign up" />
          </Box>{" "}
        </Box>
      )}
    </Box>
  );
};
