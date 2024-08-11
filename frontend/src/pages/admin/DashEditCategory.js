import { Box, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { editSingleCourseTypeAction, courseTypeLoadAction } from '../../redux/actions/courseTypeAction';
import { useNavigate, useParams } from 'react-router-dom';
import { EDIT_COURSE_TYPE_RESET } from '../../redux/constants/courseTypeConstant';

const validationSchema = yup.object({
    courseTypeName: yup
        .string('Enter a Category')
        .required('Category is required'),
});

const DashEditCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [courseTypeName, setCourseTypeName] = useState([]);

    useEffect(() => {
        if (id) {
            dispatch(courseTypeLoadAction(id));
        }
    }, [dispatch, id]);

    const { success } = useSelector(state => state.updateCategory || {});

    const formik = useFormik({
        initialValues: {
            courseTypeName: '',
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            dispatch(editSingleCourseTypeAction(values));
            actions.resetForm();
        },
    });

    useEffect(() => {
        if (id) {
            setCourseTypeName(/* Fetch courseTypeName from Redux state */);
        }
    }, [id]);

    useEffect(() => {
        if (success && success === true) {
            setTimeout(() => {
                dispatch({ type: EDIT_COURSE_TYPE_RESET });
                navigate('/admin/category');
            }, 800)
        }
    }, [dispatch, navigate, success]);

    return (
        <>
            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>
                <Box component="form" className='form_style border-style' onSubmit={formik.handleSubmit}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                            Edit Course
                        </Typography>

                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            className="px-2 my-2"
                            variant="outlined"
                            name="courseTypeName"
                            id="courseTypeName"
                            select
                            label="Category"
                            value={formik.values.courseTypeName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.courseTypeName && Boolean(formik.errors.courseTypeName)}
                            helperText={formik.touched.courseTypeName && formik.errors.courseTypeName}
                        >
                            <MenuItem key={""} value={""}></MenuItem>

                            {courseTypeName && courseTypeName.map((cat) => (
                                <MenuItem key={cat._id} value={cat._id}>
                                    {cat.courseTypeName}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button fullWidth variant="contained" type='submit'>Edit Category</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default DashEditCategory;
