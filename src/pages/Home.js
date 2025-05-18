import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ElectricBolt as MechanicsIcon,
  Waves as WavesIcon,
  Thermostat as ThermodynamicsIcon,
  FlashOn as ElectromagnetismIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const physicsTopics = [
    {
      title: "Gidravlik bosim",
      description: "Interaktiv simulyatsiyalarda harakat, kuch va energiyani o'rganing",
      icon: <MechanicsIcon fontSize="large" />,
      color: theme.palette.primary.main,
      path: "/hydraulic-press"
    },
    {
      title: "Optika",
      description: "To'lqin tarqalishi, interferentsiya va optik hodisalarni tasavvur qiling",
      icon: <WavesIcon fontSize="large" />,
      color: theme.palette.secondary.main,
      path: "/laser-optics"
    },
    {
      title: "Suyuqlik bosimi",
      description: "Burchak ostida otilayotgan suyuqlik harakatining balandlikka bog‘liqligi",
      icon: <ThermodynamicsIcon fontSize="large" />,
      color: theme.palette.error.main,
      path: "/fluid-pressure"
    },
    {
      title: "Elektromagnit",
      description: "Elektrodinamika, elektr maydonlari, magnit kuchlari va zanjirlarini kashf eting",
      icon: <ElectromagnetismIcon fontSize="large" />,
      color: theme.palette.success.main,
      path: "/electromagnetic-induction2"
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={4}>
          <Typography
            variant={isMobile ? 'h4' : 'h2'}
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Fizika interaktiv laboratoriya
          </Typography>
          <Typography
            variant={isMobile ? 'subtitle1' : 'h6'}
            color="text.secondary"
            maxWidth="md"
            mx="auto"
          >
            Amaliy simulyatsiyalar orqali tabiatning asosiy qonunlarini o'rganing.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {physicsTopics.map((topic, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  },
                  borderLeft: `4px solid ${topic.color}`
                }}
                elevation={3}
              >
                <CardActionArea
                  component={Link}
                  to={topic.path}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    p: 3
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: `${topic.color}20`,
                      color: topic.color,
                      p: 2,
                      borderRadius: '50%',
                      mb: 3
                    }}
                  >
                    {topic.icon}
                  </Box>
                  <CardContent sx={{ p: 0, flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {topic.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {topic.description}
                    </Typography>
                  </CardContent>
                  <Typography
                    variant="caption"
                    color={topic.color}
                    sx={{
                      mt: 2,
                      fontWeight: 600,
                      alignSelf: 'flex-end'
                    }}
                  >
                    Boshlash →
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={6}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            "Koinotning eng tushunarsiz tomoni shundaki, u tushunarli". - Albert Eynshteyn
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;