import { Box, Container, Paper, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Paper 
      component="footer" 
      sx={{ 
        py: 3,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.primary.contrastText
      }}
      elevation={3}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1
        }}>
          <Typography variant="body2" align="center">
            Fizika laboratoriya simulyatsiyalari
          </Typography>
          <Typography variant="body2">
            © {new Date().getFullYear()} Barcha huquqlar himoyalangan.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <a 
              href="https://t.me/MirjalolUrozboev" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: 'inherit',
                textDecoration: 'underline',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2">
                Dasturchi bilan aloqa.
              </Typography>
            </a>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer;