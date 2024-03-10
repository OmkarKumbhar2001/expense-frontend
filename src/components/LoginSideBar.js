import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { doLogout, getCurrentUser } from "../auth";
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ContactRound } from 'lucide-react';
import { FileKey } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { MessageSquareMore } from 'lucide-react';

const theme = createTheme();

const listItemButtonStyles = {
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.1)"
  }
};

const drawerPaperStyles = {
  backgroundColor: "black",
  color: "#fff"
};

export default function LoginSideBar() {
    const [username, setUsername] = React.useState("");
  const navigate = useNavigate();
  const logout = () => {
    doLogout(() => {
      navigate("/login");
    });
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
 
  React.useEffect(()=>{
      setUsername(getCurrentUser());
  },[])

  const DrawerList = (
    <Box sx={{ width: 350,marginTop:"3rem" }} onClick={toggleDrawer(false)}>
      <List>
        <ListItemButton sx={listItemButtonStyles}>
          <ListItemIcon>
            <ContactRound color="#fff" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton sx={listItemButtonStyles}>
          <ListItemIcon>
            <MessageSquareMore color="#fff" />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItemButton>
      </List>
      <Divider color="#fff" />
      <List>
        <ListItemButton sx={listItemButtonStyles}>
          <ListItemIcon>
            <FileKey color="#fff" />
          </ListItemIcon>
          <ListItemText primary="Privacy Policy" />
        </ListItemButton>
        <ListItemButton onClick={logout} sx={listItemButtonStyles}>
          <ListItemIcon>
            <LogOut color="#fff" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button onClick={toggleDrawer(true)}>
          <Avatar
            sx={{ bgcolor: deepOrange[500] }}
            alt={username}
            src="/broken-image.jpg"
          />
        </Button>
        <Drawer
          anchor="right"
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": drawerPaperStyles
          }}
        >
          {DrawerList}
        </Drawer>
      </div>
    </ThemeProvider>
  );
}
