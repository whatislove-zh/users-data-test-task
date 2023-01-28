import { Grid, Typography, Box } from "@mui/material";

import data from "../data.js";
import { StyledBtn } from "./StyledBtn.js";
import { UserCard } from "./UserCard";

const DATA = data();

export const Users = () => {
  return (
    <Box sx={{mb:"140px"}} align="center" >
      <Typography align="center" variant="h4" component="h2" sx={{mb:"50px"}}>
        Working with GET request
      </Typography>
      <Grid container spacing="29" align="center" sx={{mb:"50px"}}>
        {DATA.map((user) => (
          <Grid key={user.name} item lg={4} sm={6} xs={12} >
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
      <StyledBtn title="Show more" />
    </Box>
  );
};
