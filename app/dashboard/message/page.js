"use client";
import {
  Card,
  Container,
} from "@mui/material";
import React from "react";
import { ChatSidebar, ChatWindow } from "@/sections/dashboard/chat";

function Messages() {
  return (
    <Container maxWidth={"xl"}>
      <Card sx={{ height: "80vh", display: "flex" }}>
        <ChatSidebar />
        <ChatWindow />
      </Card>
    </Container>
  );
}

export default Messages;
