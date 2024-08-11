import { Card, CardContent, Stack, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import LoadingBox from '../components/LoadingBox'
import Navbar from '../components/Navbar'
import { courseLoadSingleAction } from '../redux/actions/courseAction'
import Button from '@mui/material/Button'
import { userApplyCourseAction } from '../redux/actions/userAction'
import { useTheme } from '@emotion/react'


const SingleCourse = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { singleCourse, loading } = useSelector(state => state.singleCourse)
    const { id } = useParams();
    useEffect(() => {
        dispatch(courseLoadSingleAction(id));
    }, [id]);

    const applyForACourse = () => {
        dispatch(userApplyCourseAction({
            title: singleCourse && singleCourse.title,
            description: singleCourse && singleCourse.description,
          
        }))
    }

    return (
        <>

            <Box sx={{ bgcolor: "#fafafa" }}>

                <Navbar />
                <Box sx={{ height: 'calc(100vh - 140px)' }}>
                    <Container sx={{ pt: '30px' }}>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <Box sx={{ flex: 4, p: 2 }}>

                                {
                                    loading ? <LoadingBox /> :

                                        <Card sx={{ bgcolor: palette.primary.white }} >
                                            <CardContent>
                                                <Typography variant="h5" component="h3">
                                                    {singleCourse && singleCourse.title}
                                                </Typography>
                                               
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Category</Box>: {singleCourse && singleCourse.courseType ? singleCourse.courseType.courseTypeName : "No category"}
                                                </Typography>
                                              
                                                <Typography variant="body2" sx={{ pt: 2 }}>
                                                    {/* <h3>Course description:</h3> */}
                                                    {singleCourse && singleCourse.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                }
                            </Box>
                            <Box sx={{ flex: 1, p: 2 }}>
                                <Card sx={{ p: 2, bgcolor: palette.primary.white }}>
                                    <Button onClick={applyForACourse} sx={{ fontSize: "13px" }} variant='contained'>Register for this Course</Button>
                                </Card>
                            </Box>

                        </Stack>

                    </Container>
                </Box>
                <Footer />
            </Box>
        </>
    )
}

export default SingleCourse