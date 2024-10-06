import { Avatar, Box } from '@mui/material'
import React from 'react'
import TypingIndicator from "../../assets/images/typing.webp"
import { BASE_URL } from '../../services/apis'

function TypingMsg({ profilePic }) {
    return (
        <>
            <Box display="flex" px={2} py={2} >

                <Avatar src={`${BASE_URL}/${profilePic}`} />
                <img src={TypingIndicator} alt="typing indicator" width={60} />
            </Box>
        </>
    )
}

export default TypingMsg