import { Box, MenuItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { courseTypeLoadAction } from '../../redux/actions/courseTypeAction';
import { registerAcourseAction } from '../../redux/actions/courseAction';


const validationSchema = yup.object({
    title: yup
        .string('Enter a course title')
        .required('title is required'),
    description: yup
        .string('Enter a description')
        .min(6, 'Description should be of minimum 6 characters length')
        .required('Description is required'),
     courseType: yup
        .string('Enter a Category')
        .required('Category is required'),
});


const DashCreateCourse = () => {
    const dispatch = useDispatch();

    //course type
    useEffect(() => {
        dispatch(courseTypeLoadAction());
    }, []);

    const { courseType } = useSelector(state => state.courseTypeAll);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            courseType: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(registerAcourseAction(values))
            // alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });



    return (
        <>

            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                            Register a Course
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

                        <Button fullWidth variant="contained" type='submit' >Create course</Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default DashCreateCourse