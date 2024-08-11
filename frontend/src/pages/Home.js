import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { Box, Card, Container, ListItemIcon, MenuItem, MenuList, Pagination, Stack, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { courseLoadAction } from '../redux/actions/courseAction'
import { Link, useParams } from 'react-router-dom'
import CardElement from '../components/CardElement'
import Footer from '../components/Footer'
import LoadingBox from '../components/LoadingBox'
import SelectComponent from '../components/SelectComponent'
import { courseTypeLoadAction } from '../redux/actions/courseTypeAction'
import LocationOnIcon from '@mui/icons-material/LocationOn';



const Home = () => {
    const { courses,  pages, loading } = useSelector(state => state.loadCourses);

    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { keyword } = useParams();

    const [page, setPage] = useState(1);
    const [cat, setCat] = React.useState('');

    useEffect(() => {
        dispatch(courseLoadAction(page, keyword, cat));
    }, [page, keyword, cat]);

    useEffect(() => {
        dispatch(courseTypeLoadAction());
    }, []);

    const handleChangeCategory = (e) => {
        setCat(e.target.value);
    }

    return (
        <>
            <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>

                <Navbar />
                <Header />
                <Container>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <Box sx={{ flex: 2, p: 2 }}>
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                                <Box sx={{ pb: 2 }}>
                                    <Typography component="h4" sx={{ color: palette.primary.main, fontWeight: 600 }}>
                                        Filter course by category
                                    </Typography>
                                </Box>
                                <SelectComponent handleChangeCategory={handleChangeCategory} cat={cat} />

                            </Card>

                          
                        </Box>
                        <Box sx={{ flex: 5, p: 2 }}>
                            {
                                loading ?
                                    <LoadingBox /> :
                                    courses && courses.length === 0 ?
                                        <>
                                            <Box
                                                sx={{
                                                    minHeight: '350px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>

                                                <h2>No result found!</h2>
                                            </Box>
                                        </> :


                                        courses && courses.map((course, i) => (
                                            <CardElement
                                                key={i}
                                                id={course._id}
                                                courseTitle={course.title}
                                                description={course.description}
                                                category={course.courseType ? course.courseType.courseTypeName : "No category"}
                                              
                                            />
                                        ))
                            }
                            <Stack spacing={2} >
                                <Pagination page={page} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)} />
                            </Stack>
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Footer />

        </>
    )
}

export default Home