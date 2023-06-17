import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { bookLoadAction } from '../../redux/actions/bookAction';



const DashBooks = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(bookLoadAction())
    }, []);


    const { books, loading } = useSelector(state => state.loadBooks);
    let data = [];
    data = (books !== undefined && books.length > 0) ? books : []


   
    const deleteBookById = (e, id) => {
        console.log(id)
    }

    const columns = [

        {
            field: '_id',
            headerName: 'Book ID',
            width: 150,
            editable: true,
        },
        {
            field: 'title',
            headerName: 'Book name',
            width: 150,
        },
        {
            field: 'bookType',
            headerName: 'Category',
            width: 150,
            valueGetter: (data) => data.row.bookType.bookTypeName
        },
        {
            field: 'user',
            headerName: 'User',
            width: 150,
            valueGetter: (data) => data.row.user.firstName
        },
        {
            field: 'available',
            headerName: 'available',
            width: 150,
            renderCell: (values => (
                values.row.available ? "Yes" : "No"
            ))

        },

        {
            field: 'price',
            headerName: 'price',
            type: Number,
            width: 150,
            renderCell: (values => (
                "$" + values.row.price
            ))

        },

        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/book/${values.row._id}`}>Edit</Link></ Button>
                    < Button onClick={(e) => deleteBookById(e, values.row._id)} variant="contained" color="error">Delete</ Button>
                </Box>
            )
        }
    ];


    return (
        <Box >

            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Books list
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}> <Link style={{ color: "white", textDecoration: "none" }} to="/admin/book/create">Create Book</Link></Button>
            </Box>
            <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >

                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{

                            '& .MuiTablePagination-displayedRows': {
                                color: 'white',
                            },
                            color: 'white',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) =>
                                    // theme.palette.mode === 'light' ? grey[200] : grey[900],
                                    theme.palette.secondary.main
                            },
                            button: {
                                color: '#ffffff'
                            }

                        }}
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </Box>
            </Paper>

        </Box>
    )
}

export default DashBooks