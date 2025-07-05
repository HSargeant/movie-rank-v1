import React, { useState, useEffect, useCallback } from 'react';
import {
    Modal,
    Box,
    Button,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Snackbar,
    Alert,
    AppBar,
    Toolbar,
    Container,
    IconButton,
} from '@mui/material';
import { Close as CloseIcon, LibraryBooks as LibraryBooksIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define a custom theme for Material-UI
const theme = createTheme({
    typography: {
        fontFamily: '"Inter", sans-serif',
    },
    palette: {
        primary: {
            main: '#6200EE', // A deep purple
        },
        secondary: {
            main: '#03DAC6', // A teal accent
        },
        background: {
            default: '#f5f5f5', // Light grey background
            paper: '#ffffff',
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    padding: '10px 20px',
                },
            },
        },
        MuiModal: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            },
        },
    },
});

// BookCard Component
const BookCard = ({ book, onClick, disabled }) => {
    // Placeholder image function
    const getPlaceholderImage = (title) => {
        const width = 200;
        const height = 300;
        const bgColor = 'cccccc';
        const textColor = '333333';
        const text = encodeURIComponent(title.substring(0, 20) + '...'); // Shorten title for URL
        return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${text}`;
    };

    return (
        <Card
            sx={{
                width: 200,
                height: 350,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.7 : 1,
                pointerEvents: disabled ? 'none' : 'auto',
                border: '2px solid transparent',
                '&:hover': {
                    borderColor: theme.palette.primary.main,
                },
            }}
            onClick={() => !disabled && onClick(book._id)}
        >
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '0 !important' }}>
                <Typography variant="h6" component="div" sx={{ textAlign: 'center', mb: 1, fontWeight: 'bold' }}>
                    {book.title}
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                sx={{ width: 120, height: 180, objectFit: 'cover', borderRadius: 8, mb: 2 }}
                image={getPlaceholderImage(book.title)}
                alt={book.title}
                onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = getPlaceholderImage('No Image'); // Fallback to a generic placeholder
                }}
            />
        </Card>
    );
};

// ComparisonModal Component
const ComparisonModal = ({ open, onClose, onComparisonComplete, dailyComparisonLimit }) => {
    const [book1, setBook1] = useState(null);
    const [book2, setBook2] = useState(null);
    const [matchupsLeft, setMatchupsLeft] = useState(dailyComparisonLimit);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    // Function to fetch a new pair of books
    const fetchBooksForComparison = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/rank`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setBook1(data.book1);
            setBook2(data.book2);
        } catch (error) {
            console.error('Error fetching books for comparison:', error);
            setSnackbar({ open: true, message: 'Failed to load books. Please try again later.', severity: 'error' });
            setBook1(null); // Clear books on error
            setBook2(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Effect to load the first comparison when modal opens
    useEffect(() => {
        if (open && matchupsLeft > 0) {
            fetchBooksForComparison();
        }
    }, [open, matchupsLeft, fetchBooksForComparison]);

    // Handle user's selection
    const handleBookSelection = async (winnerId) => {
        if (isLoading) return; // Prevent multiple clicks
        setIsLoading(true);

        const loserId = winnerId === book1._id ? book2._id : book1._id;

        try {
            const response = await fetch(`/api/rank/compare`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ winnerId, loserId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Comparison result processed:', data);

            setMatchupsLeft(prev => prev - 1);
            onComparisonComplete(); // Notify parent about completion

            if (matchupsLeft - 1 > 0) {
                // Fetch next pair if more matchups are left
                fetchBooksForComparison();
            } else {
                // All matchups completed
                setSnackbar({ open: true, message: 'Congratulations! You have completed all comparisons for today.', severity: 'success' });
                setTimeout(() => onClose(), 1500); // Close modal after a short delay
            }
        } catch (error) {
            console.error('Error submitting comparison:', error);
            setSnackbar({ open: true, message: 'Failed to submit comparison. Please try again.', severity: 'error' });
            setIsLoading(false); // Re-enable interaction if submission fails
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="comparison-modal-title"
            aria-describedby="comparison-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: 800,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    outline: 'none',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h5" component="h2" id="comparison-modal-title" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Rank Books
                </Typography>

                <Typography variant="subtitle1" sx={{ position: 'absolute', top: 16, right: 16, fontWeight: 'bold' }}>
                    Matchups Left: {matchupsLeft}
                </Typography>

                {isLoading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300 }}>
                        <CircularProgress size={60} />
                        <Typography variant="h6" sx={{ mt: 2 }}>Loading next matchup...</Typography>
                    </Box>
                ) : (book1 && book2) ? (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: { xs: 3, sm: 5 },
                                mt: 3,
                                mb: 4,
                            }}
                        >
                            <BookCard book={book1} onClick={handleBookSelection} disabled={isLoading} />
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                                VS
                            </Typography>
                            <BookCard book={book2} onClick={handleBookSelection} disabled={isLoading} />
                        </Box>
                        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                            Click on the card of the book you prefer!
                        </Typography>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300 }}>
                        <Typography variant="h6" color="text.secondary">
                            No books available for comparison or an error occurred.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={fetchBooksForComparison}
                            sx={{ mt: 2 }}
                        >
                            Retry Loading Books
                        </Button>
                    </Box>
                )}

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Modal>
    );
};

// Main App Component
function App() {
    const DAILY_COMPARISON_LIMIT = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comparisonsToday, setComparisonsToday] = useState(0);
    const [dailyLimitReached, setDailyLimitReached] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    // Simulate daily reset and load comparisons from local storage
    useEffect(() => {
        const lastVisitDate = localStorage.getItem('lastVisitDate');
        const today = new Date().toDateString();

        if (lastVisitDate !== today) {
            // New day, reset comparisons
            localStorage.setItem('lastVisitDate', today);
            localStorage.setItem('comparisonsToday', '0');
            setComparisonsToday(0);
            setDailyLimitReached(false);
            setIsModalOpen(true); // Open modal automatically on a new day
        } else {
            // Same day, load previous count
            const storedComparisons = parseInt(localStorage.getItem('comparisonsToday') || '0', 10);
            setComparisonsToday(storedComparisons);
            if (storedComparisons >= DAILY_COMPARISON_LIMIT) {
                setDailyLimitReached(true);
            } else {
                setIsModalOpen(true); // Open modal if not completed for the day
            }
        }
    }, []);

    // Update daily limit status whenever comparisonsToday changes
    useEffect(() => {
        if (comparisonsToday >= DAILY_COMPARISON_LIMIT) {
            setDailyLimitReached(true);
            setIsModalOpen(false); // Close modal if limit reached
            setSnackbar({ open: true, message: 'You have completed your daily comparison limit!', severity: 'info' });
        } else {
            setDailyLimitReached(false);
        }
        localStorage.setItem('comparisonsToday', comparisonsToday.toString());
    }, [comparisonsToday, DAILY_COMPARISON_LIMIT]);

    const handleOpenModal = () => {
        if (!dailyLimitReached) {
            setIsModalOpen(true);
        } else {
            setSnackbar({ open: true, message: 'You have reached your daily comparison limit. Please come back tomorrow!', severity: 'warning' });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleComparisonComplete = () => {
        setComparisonsToday(prev => prev + 1);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <LibraryBooksIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Book Ranker
                        </Typography>
                        <Typography variant="body2" sx={{ mr: 2 }}>
                            Comparisons Today: {comparisonsToday} / {DAILY_COMPARISON_LIMIT}
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={handleOpenModal}
                            disabled={dailyLimitReached}
                            variant="outlined"
                            sx={{ borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                        >
                            {dailyLimitReached ? 'Limit Reached' : 'Start Comparisons'}
                        </Button>
                    </Toolbar>
                </AppBar>

                <Container component="main" sx={{ flexGrow: 1, py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.dark }}>
                        Discover Your Favorite Books
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                        Help us rank books by choosing your preference in head-to-head matchups!
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleOpenModal}
                        disabled={dailyLimitReached}
                        sx={{
                            mt: 2,
                            px: 5,
                            py: 1.5,
                            fontWeight: 'bold',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
                            },
                        }}
                    >
                        {dailyLimitReached ? 'Come Back Tomorrow!' : 'Start Ranking Now'}
                    </Button>
                </Container>

                <ComparisonModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onComparisonComplete={handleComparisonComplete}
                    dailyComparisonLimit={DAILY_COMPARISON_LIMIT - comparisonsToday} // Pass remaining limit
                />

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
}

export default App;
