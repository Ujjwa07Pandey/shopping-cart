import { Box } from "@material-ui/core";
import React from "react";
import Navbar from "../Navbar";
import Notification from "../Notification";
const Layout = ({ children }) => {
  return (
    <main
      style={{
        minHeight: "100vh",

        backgroundColor: "#E2FCD3",
      }}
    >
      <Navbar />
      <Box mx="2rem">{children}</Box>
      <Notification />
    </main>
  );
};

export default Layout;
