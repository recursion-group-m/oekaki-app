import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

const UserList = () => (
  <List
    sx={{
      height: "100%",
      width: "90%",
      borderRadius: "1rem",
      bgcolor: "background.paper",
      position: "relative",
      overflow: "auto",
      boxShadow: 3,
      "& ul": { p: 2 },
    }}
    subheader={<li />}
  >
    {[0, 1, 2, 3, 4].map((sectionId) => (
      <li key={`section-${sectionId}`}>
        <ul>
          <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
          {[0, 1, 2].map((item) => (
            <ListItem key={`item-${sectionId}-${item}`}>
              <ListItemText primary={`Item ${item}`} />
            </ListItem>
          ))}
        </ul>
      </li>
    ))}
  </List>
);

export default UserList;