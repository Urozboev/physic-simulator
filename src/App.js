import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid, 
  Slider, 
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SettingsIcon from '@mui/icons-material/Settings';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const App = () => {
  const [force1, setForce1] = useState(2);
  const [force2, setForce2] = useState(8);
  const [pistonPosition, setPistonPosition] = useState('neutral');
  const [isExperimentRunning, setIsExperimentRunning] = useState(false);
  const [showTheory, setShowTheory] = useState(false);

  const handleStartExperiment = () => {
    setIsExperimentRunning(true);
    setPistonPosition('neutral');
    
    setTimeout(() => {
      setPistonPosition(force1 > force2 ? 'left' : 'right');
    }, 1000);
  };

  const handleReset = () => {
    setIsExperimentRunning(false);
    setPistonPosition('neutral');
  };

  const calculatePressure = (force, area) => force / area;

  const pressure1 = calculatePressure(force1, 2);
  const pressure2 = calculatePressure(force2, 8);

  return (
    <Paper elevation={3} sx={{ 
      p: 3, 
      borderRadius: 2, 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      maxWidth: 1200,
      margin: '0 auto'
    }}>
      <Box display="flex" alignItems="center" mb={2}>
        <ScienceIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h4" component="h1" color="primary">
          Gidravlik Press Tajribasi
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={5} sx={{ height: '100%', borderLeft: '4px solid #3f51b5' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <SettingsIcon sx={{ mr: 1 }} /> Tajriba Nazorati
              </Typography>
              
              <Box mb={3}>
                <Typography gutterBottom>Kuch 1 (F₁): {force1}N</Typography>
                <Slider
                  value={force1}
                  onChange={(e, newValue) => setForce1(newValue)}
                  min={1}
                  max={20}
                  step={1}
                  disabled={isExperimentRunning}
                  color="primary"
                />
                <Typography variant="caption" display="block">2 ml shpris (Quvvatsiz o'quvchi)</Typography>
              </Box>
              
              <Box mb={3}>
                <Typography gutterBottom>Kuch 2 (F₂): {force2}N</Typography>
                <Slider
                  value={force2}
                  onChange={(e, newValue) => setForce2(newValue)}
                  min={1}
                  max={20}
                  step={1}
                  disabled={isExperimentRunning}
                  color="secondary"
                />
                <Typography variant="caption" display="block">8 ml shpris (Baquvvat o'quvchi)</Typography>
              </Box>
              
              <Box display="flex" gap={2} mt={4} flexDirection="column">
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleStartExperiment}
                  disabled={isExperimentRunning}
                  startIcon={<ScienceIcon />}
                  size="large"
                >
                  Tajribani Boshlash
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={handleReset}
                  startIcon={<ArrowUpwardIcon />}
                  size="large"
                >
                  Qayta O'rnatish
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Card elevation={5} sx={{ height: '100%', borderLeft: '4px solid #4caf50' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <ScienceIcon sx={{ mr: 1 }} /> Gidravlik Press Modeli
              </Typography>
              
              <Box sx={{ 
                position: 'relative', 
                height: 400,
                backgroundColor: '#f5f5f5', 
                borderRadius: 1,
                overflow: 'hidden',
                mb: 3,
                border: '1px solid #ddd'
              }}>
                {/* Base platform */}
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 20,
                  backgroundColor: '#795548',
                }} />
                
                {/* Left cylinder */}
                <Box sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: 50,
                  width: 80,
                  height: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  {/* Cylinder body */}
                  <Box sx={{
                    width: 60,
                    height: 250,
                    backgroundColor: '#e0e0e0',
                    border: '3px solid #9e9e9e',
                    borderRadius: '30px 30px 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    overflow: 'hidden'
                  }}>
                    {/* Liquid */}
                    <Box sx={{
                      width: '100%',
                      height: `${(force1 / 20) * 100}%`,
                      backgroundColor: '#2196f3',
                      transition: 'height 0.5s ease',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-end'
                    }}>
                      <Typography variant="caption" sx={{ color: 'white', mb: 1 }}>{force1}N</Typography>
                    </Box>
                  </Box>
                  
                  {/* Piston */}
                  <Box sx={{
                    width: 70,
                    height: 20,
                    backgroundColor: '#607d8b',
                    borderRadius: '5px 5px 0 0',
                    position: 'relative',
                    zIndex: 2,
                    transition: 'transform 0.5s ease',
                    transform: pistonPosition === 'left' ? 'translateY(-30px)' : 'translateY(0)'
                  }} />
                  
                  {/* Force arrow */}
                  <Box sx={{
                    position: 'absolute',
                    top: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <ArrowDownwardIcon color="error" fontSize="large" />
                    <Typography variant="caption">F₁</Typography>
                  </Box>
                </Box>
                
                {/* Right cylinder */}
                <Box sx={{
                  position: 'absolute',
                  bottom: 20,
                  right: 50,
                  width: 160,
                  height: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  {/* Cylinder body */}
                  <Box sx={{
                    width: 120,
                    height: 250,
                    backgroundColor: '#e0e0e0',
                    border: '3px solid #9e9e9e',
                    borderRadius: '60px 60px 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    overflow: 'hidden'
                  }}>
                    {/* Liquid */}
                    <Box sx={{
                      width: '100%',
                      height: `${(force2 / 20) * 100}%`,
                      backgroundColor: '#2196f3',
                      transition: 'height 0.5s ease',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-end'
                    }}>
                      <Typography variant="caption" sx={{ color: 'white', mb: 1 }}>{force2}N</Typography>
                    </Box>
                  </Box>
                  
                  {/* Piston */}
                  <Box sx={{
                    width: 140,
                    height: 20,
                    backgroundColor: '#607d8b',
                    borderRadius: '10px 10px 0 0',
                    position: 'relative',
                    zIndex: 2,
                    transition: 'transform 0.5s ease',
                    transform: pistonPosition === 'right' ? 'translateY(-30px)' : 'translateY(0)'
                  }} />
                  
                  {/* Force arrow */}
                  <Box sx={{
                    position: 'absolute',
                    top: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <ArrowDownwardIcon color="error" fontSize="large" />
                    <Typography variant="caption">F₂</Typography>
                  </Box>
                </Box>
                
                {/* Connecting tube */}
                <Box sx={{
                  position: 'absolute',
                  bottom: 120,
                  left: 130,
                  right: 210,
                  height: 20,
                  backgroundColor: '#2196f3',
                  border: '2px solid #0d47a1',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <SwapHorizIcon sx={{ color: 'white', fontSize: 16 }} />
                </Box>
                
                {/* Fluid flow animation */}
                {isExperimentRunning && (
                  <>
                    <Box sx={{
                      position: 'absolute',
                      bottom: 125,
                      left: pistonPosition === 'right' ? 130 : 290,
                      width: 10,
                      height: 10,
                      backgroundColor: '#ffeb3b',
                      borderRadius: '50%',
                      animation: pistonPosition === 'right' ? 
                        'flowRight 2s linear infinite' : 
                        'flowLeft 2s linear infinite',
                      '@keyframes flowRight': {
                        '0%': { left: 130 },
                        '100%': { left: 290 }
                      },
                      '@keyframes flowLeft': {
                        '0%': { left: 290 },
                        '100%': { left: 130 }
                      }
                    }} />
                    <Box sx={{
                      position: 'absolute',
                      bottom: 125,
                      left: pistonPosition === 'right' ? 150 : 270,
                      width: 10,
                      height: 10,
                      backgroundColor: '#ffeb3b',
                      borderRadius: '50%',
                      animation: pistonPosition === 'right' ? 
                        'flowRight 2s linear infinite 0.5s' : 
                        'flowLeft 2s linear infinite 0.5s',
                    }} />
                  </>
                )}
                
                {/* Labels */}
                <Box sx={{
                  position: 'absolute',
                  bottom: 60,
                  left: 70,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  px: 1,
                  borderRadius: 1
                }}>
                  <Typography variant="caption">2 ml shpris</Typography>
                </Box>
                <Box sx={{
                  position: 'absolute',
                  bottom: 60,
                  right: 90,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  px: 1,
                  borderRadius: 1
                }}>
                  <Typography variant="caption">8 ml shpris</Typography>
                </Box>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={2} sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                    <Typography variant="body2">Bosim 1 (P₁)</Typography>
                    <Typography variant="h5">{pressure1.toFixed(2)} N/ml</Typography>
                    <Typography variant="caption" color="textSecondary">F₁/A₁ = {force1}N / 2ml</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={2} sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                    <Typography variant="body2">Bosim 2 (P₂)</Typography>
                    <Typography variant="h5">{pressure2.toFixed(2)} N/ml</Typography>
                    <Typography variant="caption" color="textSecondary">F₂/A₂ = {force2}N / 8ml</Typography>
                  </Paper>
                </Grid>
              </Grid>
              
              {isExperimentRunning && (
                <Box mt={2} p={2} bgcolor={pressure1 === pressure2 ? '#e3f2fd' : pressure1 > pressure2 ? '#ffebee' : '#e8f5e9'} borderRadius={1}>
                  <Typography variant="body1" color={pressure1 === pressure2 ? 'primary' : pressure1 > pressure2 ? 'error' : 'success'} fontWeight="bold">
                    {pressure1 === pressure2 ? 
                      "⚖️ Bosimlar teng - porshen harakatlanmaydi" : 
                      pressure1 > pressure2 ? 
                      `← Porshen kichik shpris tomonga harakatlanadi (${pressure1.toFixed(2)} > ${pressure2.toFixed(2)})` : 
                      `→ Porshen katta shpris tomonga harakatlanadi (${pressure2.toFixed(2)} > ${pressure1.toFixed(2)})`}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box mt={3}>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => setShowTheory(!showTheory)}
          endIcon={showTheory ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          fullWidth
          size="large"
        >
          {showTheory ? "Nazariyani Yopish" : "Paskal Qonuni Nazariyasi"}
        </Button>
        
        {showTheory && (
          <Paper elevation={2} sx={{ p: 3, mt: 1, backgroundColor: '#e3f2fd', borderLeft: '4px solid #2196f3' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <ScienceIcon sx={{ mr: 1 }} /> Gidravlik Press Prinsipi
            </Typography>
            <Typography paragraph>
              Paskal qonuniga ko'ra, suyuqlikka ta'sir etuvchi bosim suyuqlikning barcha nuqtalariga bir xilda uzatiladi.
            </Typography>
            <Typography paragraph>
              <strong>Gidravlik press</strong> ikki turli diametrli silindrlardan iborat bo'lib, ular suyuqlik bilan to'ldirilgan va bir-biriga ulanadi. Kichik silindrga kichik kuch (F₁) ta'sir etganda, katta silindrda katta kuch (F₂) hosil bo'ladi.
            </Typography>
            <Box sx={{ 
              p: 2, 
              backgroundColor: 'white', 
              borderRadius: 1, 
              border: '1px dashed #2196f3',
              my: 2
            }}>
              <Typography textAlign="center" variant="h6">
                Paskal qonuni formulasi: <strong>F₁/A₁ = F₂/A₂</strong>
              </Typography>
              <Typography textAlign="center" variant="body2" color="textSecondary">
                (Bosim bir xil bo'lgani uchun P₁ = P₂)
              </Typography>
            </Box>
            <Typography>
              Tajribada ko'rinib turibdiki, katta maydonga (A₂) ta'sir etuvchi kuch (F₂) kichik maydondagi kuchdan (F₁) katta bo'ladi, chunki bosim bir xil bo'lishi uchun kuch va maydon mutanosib bo'lishi kerak.
            </Typography>
          </Paper>
        )}
      </Box>
    </Paper>
  );
};

export default App;