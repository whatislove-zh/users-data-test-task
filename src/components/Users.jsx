import { Grid, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";

import data from "../data.js";
import { StyledBtn } from "./StyledBtn.js";
import { UserCard } from "./UserCard";

const DATA = data();

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [numberOfitemsShown, setNumberOfItemsToShown] = useState(3);
  const [expanded, setExpanded] = useState(false);

  const showMore = () => {
    if (numberOfitemsShown + 3 <= users.length) {
      setNumberOfItemsToShown(numberOfitemsShown + 3);
    } else {
      setNumberOfItemsToShown(users.length);
      setExpanded(true);
    }
  };

  useEffect(() => {
    setUsers(DATA);
  }, []);

  return (
    <Box sx={{ mb: "140px" }} align="center">
      <Typography
        align="center"
        id="getReq"
        variant="h4"
        component="h2"
        sx={{ mb: "50px" }}
      >
        Working with GET request
      </Typography>
      <Grid container spacing="29" align="center" sx={{ mb: "50px" }}>
        {users.slice(0, numberOfitemsShown).map((user) => (
          <Grid key={user.name} item lg={4} sm={6} xs={12}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
      {expanded ? (
        <StyledBtn title="No more users" disabled />
      ) : (
        <StyledBtn
          title="Show more"
          onClick={() => {
            showMore();
          }}
        />
      )}
    </Box>
  );
};
