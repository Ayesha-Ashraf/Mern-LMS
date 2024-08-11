import { Typography, Box } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import StatComponent from '../../components/StatComponent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import { useSelector } from 'react-redux'
import moment from 'moment'

const UserDashboard = () => {
    const { user } = useSelector(state => state.userProfile);
    return (
        <>
            <Box >

                <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
                  Student Dashboard
                </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >

                    <StatComponent
                        value={user && moment(user.createdAt).format('YYYY / MM / DD')}
                        icon={<CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Member since"
                        money=''
                    />
                    <StatComponent
                        value={user && user.coursesHistory.length }
                        icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Number of courses registered"
                        money=''
                    />


                </Stack>
            </Box>

        </>
    )
}

export default UserDashboard