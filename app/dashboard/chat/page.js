"use client";
import { fetchSearchMessage } from "@/redux/features/chat/chatSlice";
import withAuth from "@/sections/auth/withAuth";
import { ChatSidebar, ChatWindow } from "@/sections/dashboard/chat";
import { Card, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const MessagePage = () => {
  const dispatch = useDispatch();
  const [page,setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(" ");

  const {searchedMessages} = useSelector((state) => state.chat);

  useEffect(() => {
    if (page) {
      dispatch(fetchSearchMessage({ keyword: searchTerm, pageNumber: page }));
    }
  }, [dispatch, page, searchTerm]);
  

  return (
    <>
      <Container maxWidth={"xl"}>
        <Card sx={{ height: "80vh", display: "flex" }}>
          <ChatSidebar />
          <ChatWindow />
        </Card>
      </Container>
    </>
  );
};

export default withAuth(MessagePage);
