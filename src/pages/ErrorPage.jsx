import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

const ErrorPage = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    padding: theme.spacing(4),
                }}
            >
                <ErrorOutlineIcon
                    sx={{
                        fontSize: '6rem',
                        color: theme.palette.error.main,
                        mb: 2,
                    }}
                />

                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        mb: 2,
                        color: theme.palette.text.primary,
                    }}
                >
                    404
                </Typography>

                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        mb: 3,
                        color: theme.palette.text.secondary,
                    }}
                >
                    Afsus! Sahifa topilmadi.
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        mb: 4,
                        maxWidth: '600px',
                        color: theme.palette.text.secondary,
                    }}
                >
                    Siz qidirayotgan sahifa oʻchirilgan, nomi oʻzgartirilgan yoki vaqtincha mavjud boʻlmagan boʻlishi mumkin.
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<HomeIcon />}
                    component={RouterLink}
                    to="/"
                    sx={{
                        borderRadius: '50px',
                        padding: theme.spacing(1.5, 4),
                        fontSize: '1rem',
                        textTransform: 'none',
                        boxShadow: theme.shadows[4],
                        '&:hover': {
                            boxShadow: theme.shadows[8],
                        },
                    }}
                >
                    Bosh sahifaga qaytish
                </Button>
            </Box>
        </Container>
    );
};

export default ErrorPage;