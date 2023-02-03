import { Grid, Typography, Box } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { db } from "../firebase.js";
import { setExpand } from "../store/expanded/expanded-actions.js";
import { selectExpand } from "../store/expanded/expanded-selector.js";
import { StyledBtn } from "./StyledBtn";
import { UserCard } from "./UserCard";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [numberOfitemsShown, setNumberOfItemsToShown] = useState(6);
  const dispatch = useDispatch();
  const expanded = useSelector(selectExpand);

  const showMore = () => {
    if (numberOfitemsShown + 3 <= users.length) {
      setNumberOfItemsToShown(numberOfitemsShown + 3);
    } else {
      setNumberOfItemsToShown(users.length);
      dispatch(setExpand(true));
    }
  };

  const getUsers = async () => {
    const collectionRef = collection(db, "users");
    const queryColection = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(queryColection, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data() })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getUsers();
    dispatch(setExpand(false));
  }, [dispatch]);

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
          <Grid key={user.userId} item lg={4} sm={6} xs={12}>
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
