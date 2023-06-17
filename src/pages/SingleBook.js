import { Card, CardContent, Stack, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../component/Footer'
import LoadingBox from '../component/LoadingBox'
import Navbar from '../component/Navbar'
import { bookLoadSingleAction } from '../redux/actions/bookAction'
import Button from '@mui/material/Button'
import { userApplyBookAction } from '../redux/actions/userAction'
import { useTheme } from '@emotion/react'


const SingleBook = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { singleBook, loading } = useSelector(state => state.singleBook)
    const { id } = useParams();
    useEffect(() => {
        dispatch(bookLoadSingleAction(id));
    }, [id]);

    const applyForABook = () => {
        dispatch(userApplyBookAction({
            title: singleBook && singleBook.title,
            description: singleBook && singleBook.description,
            price: singleBook && singleBook.price,
            location: singleBook && singleBook.location
        }))
    }

    return (
        <>

            <Box sx={{ bgcolor: "#fafafa" }}>

                <Navbar />
                <Box sx={{ height: '85vh' }}>
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
                                                    {singleBook && singleBook.title}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Price</Box>: ${singleBook && singleBook.price}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Category</Box>: {singleBook && singleBook.bookType ? singleBook.bookType.bookTypeName : "No category"}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <Box component="span" sx={{ fontWeight: 700 }}>Location</Box>: {singleBook && singleBook.location}
                                                </Typography>
                                                <Typography variant="body2" sx={{ pt: 2 }}>
                                                    
                                                    {singleBook && singleBook.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                }
                            </Box>
                            <Box sx={{ flex: 1, p: 2 }}>
                                <Card sx={{ p: 2, bgcolor: palette.primary.white }}>
                                    <Button onClick={applyForABook} sx={{ fontSize: "13px" }} variant='contained'>Applied for this Book</Button>
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

export default SingleBook