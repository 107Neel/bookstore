import { Box, MenuItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { bookTypeLoadAction } from '../../redux/actions/bookTypeAction';
import { registerAbookAction } from '../../redux/actions/bookAction';


const validationSchema = yup.object({
    title: yup
        .string('Enter a book title')
        .required('title is required'),
    description: yup
        .string('Enter a description')
        .min(6, 'Description should be of minimum 6 characters length')
        .required('Description is required'),
    price: yup
        .number('Enter a price')
        .required('Price is required'),
    location: yup
        .string('Enter a location')
        .required('Location is required'),
    bookType: yup
        .string('Enter a Category')
        .required('Category is required'),
});


const DashCreateBook = () => {
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(bookTypeLoadAction());
    }, []);

    const { bookType } = useSelector(state => state.bookTypeAll);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            location: '',
            bookType: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(registerAbookAction(values))
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
                            Register a Book
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
                            id="price"
                            name="price"
                            label="price"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="location"
                            name="location"
                            label="Location"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />

                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            className="px-2 my-2"
                            variant="outlined"
                            name="bookType"
                            id="bookType"
                            select
                            label="Category"
                            value={formik.values.bookType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.bookType && Boolean(formik.errors.bookType)}
                            helperText={formik.touched.bookType && formik.errors.bookType}
                        >
                            <MenuItem key={""} value={""}>

                            </MenuItem>

                            {bookType && bookType.map((cat) => (
                                <MenuItem key={cat._id} value={cat._id}>
                                    {cat.bookTypeName}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button fullWidth variant="contained" type='submit' >Create book</Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default DashCreateBook