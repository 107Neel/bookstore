import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import { Box, Card, Container, ListItemIcon, MenuItem, MenuList, Pagination, Stack, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { bookLoadAction } from '../redux/actions/bookAction'
import { Link, useParams } from 'react-router-dom'
import CardElement from '../component/CardElement'
import Footer from '../component/Footer'
import LoadingBox from '../component/LoadingBox'
import SelectComponent from '../component/SelectComponent'
import { bookTypeLoadAction } from '../redux/actions/bookTypeAction'
import LocationOnIcon from '@mui/icons-material/LocationOn';



const Home = () => {
    const { books, setUniqueLocation, pages, loading } = useSelector(state => state.loadBooks);

    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { keyword, location } = useParams();

    const [page, setPage] = useState(1);
    const [cat, setCat] = React.useState('');

    useEffect(() => {
        dispatch(bookLoadAction(page, keyword, cat, location));
    }, [page, keyword, cat, location]);

    useEffect(() => {
        dispatch(bookTypeLoadAction());
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
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: palette.primary.white }}>
                                <Box sx={{ pb: 2 }}>
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filter book by category
                                    </Typography>
                                </Box>
                                <SelectComponent handleChangeCategory={handleChangeCategory} cat={cat} />

                            </Card>

                     
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: palette.primary.white }}>
                                <Box sx={{ pb: 2 }}>
                                    {/* <h4>Filter by category</h4> */}
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filter book by location
                                    </Typography>
                                    <MenuList>
                                        {
                                            setUniqueLocation && setUniqueLocation.map((location, i) => (
                                                <MenuItem key={i}>
                                                    <ListItemIcon>
                                                        <LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} />
                                                    </ListItemIcon>
                                                    <Link style={{ color: palette.secondary.main }} to={`/search/location/${location}`}>{location}</Link>
                                                </MenuItem>

                                            ))
                                        }

                                    </MenuList>

                                </Box>
                            </Card>
                        </Box>
                        <Box sx={{ flex: 5, p: 2 }}>
                            {
                                loading ?
                                    <LoadingBox /> :
                                    books && books.length === 0 ?
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


                                        books && books.map((book, i) => (
                                            <CardElement
                                                key={i}
                                                id={book._id}
                                                bookTitle={book.title}
                                                description={book.description}
                                                category={book.bookType ? book.bookType.bookTypeName : "No category"}
                                                location={book.location}
                                            />
                                        ))
                            }
                            <Stack spacing={2} >
                                <Pagination color="primary" variant="outlined" page={page} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)} />
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