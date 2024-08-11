import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import {  useSelector } from 'react-redux'
import CardElement from '../../components/CardElement'


const UserCoursesHistory = () => {
    const { user } = useSelector(state => state.userProfile);
    

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "#000" }}> Courses History</Typography>
                <Box>
                    {
                        user && user.coursesHistory.map((history, i) => (
                            <CardElement
                                key={i}
                                id={history._id}
                                courseTitle={history.title}
                                description={history.description}
                                category=''
                                
                            />
                        ))
                    }
                </Box>
               
            </Box>
        </>
    )
}

export default UserCoursesHistory