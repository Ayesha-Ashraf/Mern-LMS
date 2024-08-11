import { Box, MenuItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { courseTypeLoadAction } from '../../redux/actions/courseTypeAction';
import { editSingleCourseAction, courseLoadSingleAction } from '../../redux/actions/courseAction';
import { useNavigate, useParams } from 'react-router-dom';
import { EDIT_COURSE_RESET } from '../../redux/constants/courseconstant';



const validationSchema = yup.object({
    title: yup
        .string('Enter a course title')
        .required('title is required'),
    description: yup
        .string('Enter a description')
        .min(6, 'Description should be of minimum 6 characters length')
        .required('Description is required'),
   
    available: yup
        .boolean('Add availability')
        .required('availability is required'),
    courseType: yup
        .string('Enter a Category')
        .required('Category is required'),
});


const DashEditCourse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    //course type
    useEffect(() => {
        dispatch(courseTypeLoadAction());
        if (id) {
            dispatch(courseLoadSingleAction(id));
        }
    }, [id]);


    const { courseType } = useSelector(state => state.courseTypeAll);
    const { singleCourse, loading } = useSelector(state => state.singleCourse);
    const { success } = useSelector(state => state.updateCourse);

    const formik = useFormik({
        initialValues: {
            _id: singleCourse?._id,
            title: singleCourse?.title,
            description: singleCourse?.description,
            available: singleCourse?.available,
            courseType: singleCourse?.courseType?._id,
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            dispatch(editSingleCourseAction(values))
            // alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });


    //redirect after successfull update
    useEffect(() => {
        if (success && success === true) {
            setTimeout(() => {
                dispatch({ type: EDIT_COURSE_RESET })
                navigate('/admin/courses');
            }, 800)
        }
    }, [success && success]);



    return (
        <>

            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                            Edit Course
                        </Typography>
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="title"
                            label="Title"
                            name='title'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                       

                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="available"
                            name="available"
                            label="Available"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Location"
                            value={formik.values.available}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.available && Boolean(formik.errors.available)}
                            helperText={formik.touched.available && formik.errors.available}
                        />

                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            className="px-2 my-2"
                            variant="outlined"
                            name="courseType"
                            id="courseType"
                            select
                            label="Category"
                            value={formik.values.courseType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.courseType && Boolean(formik.errors.courseType)}
                            helperText={formik.touched.courseType && formik.errors.courseType}
                        >
                            <MenuItem key={""} value={""}>

                            </MenuItem>

                            {courseType && courseType.map((cat) => (
                                <MenuItem key={cat._id} value={cat._id}>
                                    {cat.courseTypeName}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button fullWidth variant="contained" type='submit' >Edit Course</Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default DashEditCourse