import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)({
  background: "#F4E041",
  border: "none",
  borderRadius: "80px",
  color: "rgba(0, 0, 0, 0.87)",
  minWidth: "100px",
  height: "34px",
  marginLeft: "10px",
  fontSize:"16px",
  "&:hover": {
    background: "#FFE302",
  },
  "&.Mui-disabled": {
    background: "#B4B4B4",
    color: "#ffffff",
  },
});

export const StyledBtn = (props) => {
  const { title, disabled = false } = props;
  return <CustomButton disabled={disabled}>{title}</CustomButton>;
};
