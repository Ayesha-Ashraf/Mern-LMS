import { Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import {createCourseTypeAction} from '../../redux/actions/courseTypeAction';


const validationSchema = yup.object({

    courseTypeName: yup
        .string('Enter a Category')
        .required('Category is required'),
});


const DashCreateCategory = () => {

    const { user } = useSelector(state => state.userProfile);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            user: user && user._id,
            courseTypeName: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(createCourseTypeAction(values))
            //alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });


    return (
        <>

            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                            Create a Category
                        </Typography>
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="courseTypeName"
                            label="category"
                            name='courseTypeName'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="category name"
                            value={formik.values.courseTypeName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.courseTypeName && Boolean(formik.errors.courseTypeName)}
                            helperText={formik.touched.courseTypeName && formik.errors.courseTypeName}
                        />


                        <Button fullWidth variant="contained" type='submit' >Create category</Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default DashCreateCategory