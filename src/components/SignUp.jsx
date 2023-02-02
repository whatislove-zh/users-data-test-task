import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from "@mui/material";
import { StyledBtn } from "./StyledBtn";
import successImage from "../assets/success-image.svg";

import { v4 as uuid } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setExpand } from "../store/expanded/expanded-actions";
import { useForm } from "react-hook-form";

import avatarDefault from "../assets/photo-cover.svg"

import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const [percent, setPercent] = useState('0')

  const [avatarFile, setAvatarFile] = useState("");
  const [avatarImg, setAvatarImg] = useState(avatarDefault)
  const [succesRegistered, setSuccesRegistered] = useState(false);

  //Form state
  const [position, setPosition] = useState("frontend");

  const dispatch = useDispatch();


  const uploadFile = () => {
    const storageRef = ref(storage, `/files/${avatarFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, avatarFile);
    
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress 
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setAvatarImg(url);
        });
      }
    );
  }


  useEffect(() => {
    uploadFile()
  }, [avatarFile])







  const onSubmit = async (data) => {
    const { name, email, phone, avatar } = data;
    
    // const formDataAvatar = new FormData()
    // formDataAvatar.append("avatar", avatarImg)

    //add new user
    const collectionRef = collection(db, "users");
    await addDoc(collectionRef, {
      userId: uuid(),
      timestamp: serverTimestamp(),
      name: name,
      email: email,
      phone: phone,
      position: position,
      avatar: avatar ? avatar : avatarImg,
    });
    setSuccesRegistered(true);
    reset();
    dispatch(setExpand(false));
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
            opacity: 0,
            animation: "2s linear 0.2s success-image",
          }}
          onAnimationEnd={(e) => {
            setSuccesRegistered(false);
          }}
        />
      ) : (
        <Box
          sx={{
            opacity: 0,
            animation: "1.5s linear 0.1s success-image",
          }}
          onAnimationEnd={ (e) => {
            e.target.style.opacity = 1;
          }}
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
            onSubmit={handleSubmit(onSubmit)}
            width="380px"
            align="center"
          >
            <TextField
              margin="normal"
              fullWidth
              autoComplete="name"
              label="Your name"
              helperText={errors?.name ? errors.name.message : ""}
              error={errors?.name ? true : false}
              {...register("name", {
                required: "Enter your name",
                minLength: {
                  value: 3,
                  message: "Input at least three (3) characters",
                },
              })}
            />
            <TextField
              margin="normal"
              fullWidth
              autoComplete="email"
              label="Email"
              helperText={errors?.email ? errors.email.message : ""}
              error={errors?.email ? true : false}
              {...register("email", {
                required: "Enter your email",
                pattern: {
                  value: /^[\w-.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter valid email",
                },
              })}
            />
            <TextField
              margin="normal"
              fullWidth
              autoComplete="tel"
              label="Phone"
              helperText={errors?.phone ? errors.phone.message : ""}
              error={errors?.phone ? true : false}
              {...register("phone", {
                required: "Enter your phone",
                minLength: {
                  value: 7,
                  message: "Enter a valid phone number",
                },
                pattern: {
                  value:
                    /^((\+?\d{1,3})?[(\- ]?\d{3,5}[)\- ]?)?(\d[.\- ]?\d)+$/,
                  message: "Enter a valid phone number",
                },
              })}
            />
            <TextField sx={{ display: "none" }} autoComplete="password" />
            <Box>
              <FormControl sx={{ mt: "43px", mb: "47px", width: "100%" }}>
                <FormLabel>Select your position</FormLabel>
                <RadioGroup value={position} onChange={positionChange}>
                  <FormControlLabel
                    value="Frontend developer"
                    control={<Radio />}
                    label="Frontend developer"
                  />
                  <FormControlLabel
                    value="Backend developer"
                    control={<Radio />}
                    label="Backend developer"
                  />
                  <FormControlLabel
                    value="Designer"
                    control={<Radio />}
                    label="Designer"
                  />
                  <FormControlLabel value="QA" control={<Radio />} label="QA" />
                </RadioGroup>
              </FormControl>
              <Box
                sx={{
                  height: "56px",
                  display: "flex",
                  alignItems: "flex",
                  flexDirection: "row",
                  mb: "50px",
                }}
              >
                <Button
                  component="label"
                  variant="outlined"
                  width="80px"
                  disabled={errors?.avatar || watch("avatar") ? true : false}
                >
                  Upload {percent && percent+" %"}
                  <input
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      setAvatarFile(e.target.files[0])
                    }}
                    type="file"
                  />
                </Button>
                <TextField
                  label="Upload your photo"
                  fullWidth
                  helperText={errors?.avatar ? errors.avatar.message : ""}
                  error={errors?.avatar ? true : false}
                  margin="none"
                  {...register("avatar", {
                    pattern: {
                      value:
                        /[(http(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/gi,
                      message: "Enter a valid URL",
                    },
                  })}
                />
              </Box>
            </Box>

            <StyledBtn type="submit" title="Sign up" disabled={!isValid} />
          </Box>
        </Box>
      )}
    </Box>
  );
};
