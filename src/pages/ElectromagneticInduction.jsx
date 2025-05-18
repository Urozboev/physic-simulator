import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid, 
  Slider, 
  Card,
  CardContent,
  FormControlLabel,
  Switch
} from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import DownloadIcon from '@mui/icons-material/Download';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import html2canvas from 'html2canvas';

const ElectromagneticInduction = () => {
  const [rotationSpeed, setRotationSpeed] = useState(3);
  const [coilTurns, setCoilTurns] = useState(50);
  const [isCoilRotating, setIsCoilRotating] = useState(false);
  const [magnetPosition, setMagnetPosition] = useState('inside');
  const [galvanometerValue, setGalvanometerValue] = useState(0);
  
  const experimentRef = useRef(null);
  const animationRef = useRef(null);
  const rotationAngleRef = useRef(0);
  const lastTimeRef = useRef(null);

  // G'altak aylanishini boshqarish
  useEffect(() => {
    if (!isCoilRotating) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const animate = (currentTime) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      rotationAngleRef.current += (rotationSpeed * deltaTime) / 50;
      
      // Galvanometr qiymatini hisoblash (sinusoidal tarzda)
      const inducedVoltage = calculateInducedVoltage(rotationSpeed, coilTurns);
      const angleInRadians = (rotationAngleRef.current * Math.PI) / 180;
      setGalvanometerValue(inducedVoltage * Math.sin(angleInRadians));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isCoilRotating, rotationSpeed, coilTurns]);

  const handleStartExperiment = () => {
    setIsCoilRotating(true);
    lastTimeRef.current = null;
  };

  const handleStopExperiment = () => {
    setIsCoilRotating(false);
    // Galvanometrni asta-sekin nolga qaytarish
    const startValue = galvanometerValue;
    const startTime = performance.now();
    const duration = 1000;
    
    const animateReset = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setGalvanometerValue(startValue * (1 - progress));
      
      if (progress < 1) {
        requestAnimationFrame(animateReset);
      }
    };
    
    requestAnimationFrame(animateReset);
  };

  const handleMagnetPosition = () => {
    setMagnetPosition(prev => prev === 'inside' ? 'outside' : 'inside');
  };

  const handleSaveExperiment = async () => {
    if (!experimentRef.current) return;
    
    try {
      const canvas = await html2canvas(experimentRef.current);
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'elektromagnit-induksiya-tajribasi.png';
      link.click();
    } catch (error) {
      console.error('Rasm yuklashda xatolik:', error);
    }
  };

  const calculateInducedVoltage = (speed, turns) => {
    const baseVoltage = (speed * turns) / 50;
    return magnetPosition === 'inside' ? baseVoltage * 1.5 : baseVoltage;
  };

  // Galvanometr strelkasi burchagini hisoblash
  const getNeedleAngle = (value) => {
    const maxAngle = 45; // Maksimal burchak
    const normalizedValue = Math.min(Math.max(value / 5, -1), 1); // -5...+5 oralig'ida normalizatsiya
    return normalizedValue * maxAngle;
  };

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
          Elektromagnit Induksiya Tajribasi
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={5} sx={{ height: '100%', borderLeft: '4px solid #3f51b5' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <ScienceIcon sx={{ mr: 1 }} /> Tajriba Nazorati
              </Typography>
              
              <Box mb={3}>
                <Typography gutterBottom>Aylanish Tezligi: {rotationSpeed}</Typography>
                <Slider
                  value={rotationSpeed}
                  onChange={(e, newValue) => setRotationSpeed(newValue)}
                  min={1}
                  max={10}
                  step={1}
                  disabled={isCoilRotating}
                  color="primary"
                />
                <Typography variant="caption" display="block">G'altak aylanish tezligi</Typography>
              </Box>
              
              <Box mb={3}>
                <Typography gutterBottom>O'ramlar Soni: {coilTurns}</Typography>
                <Slider
                  value={coilTurns}
                  onChange={(e, newValue) => setCoilTurns(newValue)}
                  min={10}
                  max={100}
                  step={5}
                  disabled={isCoilRotating}
                  color="secondary"
                />
                <Typography variant="caption" display="block">G'altakdagi o'ramlar soni</Typography>
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={magnetPosition === 'outside'}
                    onChange={handleMagnetPosition}
                    disabled={isCoilRotating}
                    color="primary"
                  />
                }
                label={magnetPosition === 'inside' ? "Magnit g'altak ichida" : "Magnit g'altak tashqarisida"}
                sx={{ mb: 3 }}
              />
              
              <Box display="flex" gap={2} mt={4} flexDirection="column">
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleStartExperiment}
                  disabled={isCoilRotating}
                  startIcon={<PlayArrowIcon />}
                  size="large"
                >
                  Aylantirishni Boshlash
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={handleStopExperiment}
                  disabled={!isCoilRotating}
                  startIcon={<StopIcon />}
                  size="large"
                >
                  To'xtatish
                </Button>
                <Button 
                  variant="contained" 
                  color="success" 
                  onClick={handleSaveExperiment}
                  startIcon={<DownloadIcon />}
                  size="large"
                >
                  Natijani Yuklab Olish
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Card elevation={5} sx={{ height: '100%', borderLeft: '4px solid #4caf50' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <ScienceIcon sx={{ mr: 1 }} /> Tajriba Modeli
              </Typography>
              
              <Box 
                ref={experimentRef}
                sx={{ 
                  position: 'relative', 
                  height: 400,
                  backgroundColor: '#f5f5f5', 
                  borderRadius: 1,
                  overflow: 'hidden',
                  mb: 3,
                  border: '1px solid #ddd'
                }}
              >
                {/* Stend */}
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 20,
                  backgroundColor: '#795548',
                }} />
                
                {/* Aylanadigan g'altak */}
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '35%',
                  transform: `translate(-50%, -50%) rotate(${rotationAngleRef.current}deg)`,
                  width: 150,
                  height: 150,
                  border: '3px solid #9c27b0',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(156, 39, 176, 0.1)',
                  transition: isCoilRotating ? 'none' : 'transform 0.5s ease',
                  zIndex: 2
                }}>
                  {/* O'ramlar */}
                  {[...Array(Math.min(10, Math.floor(coilTurns/5)))].map((_, i) => (
                    <Box key={i} sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      border: '1px solid #7b1fa2',
                      borderRadius: '50%',
                      top: 0,
                      left: 0,
                      transform: `scale(${1 - i*0.05})`
                    }} />
                  ))}
                  
                  {/* Magnit (g'altak ichida) */}
                  {magnetPosition === 'inside' && (
                    <Box sx={{
                      position: 'absolute',
                      width: 40,
                      height: 80,
                      backgroundColor: '#e53935',
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      py: 1,
                      boxShadow: 2
                    }}>
                      <NorthIcon sx={{ color: '#0d47a1', fontSize: 20 }} />
                      <Typography variant="caption" sx={{ color: 'white', fontSize: 10 }}>N</Typography>
                      <Typography variant="caption" sx={{ color: 'white', fontSize: 10 }}>S</Typography>
                      <SouthIcon sx={{ color: '#e53935', fontSize: 20 }} />
                    </Box>
                  )}
                  
                  {/* Simlar ulanish nuqtalari */}
                  <Box sx={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    width: 10,
                    height: 10,
                    backgroundColor: '#ffeb3b',
                    borderRadius: '50%',
                    border: '2px solid #333',
                    zIndex: 3
                  }} />
                  <Box sx={{
                    position: 'absolute',
                    top: '80%',
                    right: '10%',
                    width: 10,
                    height: 10,
                    backgroundColor: '#ffeb3b',
                    borderRadius: '50%',
                    border: '2px solid #333',
                    zIndex: 3
                  }} />
                </Box>
                
                {/* Magnit (g'altak tashqarisida) */}
                {magnetPosition === 'outside' && (
                  <Box sx={{
                    position: 'absolute',
                    top: '40%',
                    left: '15%',
                    width: 40,
                    height: 80,
                    backgroundColor: '#e53935',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1,
                    boxShadow: 2,
                    zIndex: 1
                  }}>
                    <NorthIcon sx={{ color: '#0d47a1', fontSize: 20 }} />
                    <Typography variant="caption" sx={{ color: 'white', fontSize: 10 }}>N</Typography>
                    <Typography variant="caption" sx={{ color: 'white', fontSize: 10 }}>S</Typography>
                    <SouthIcon sx={{ color: '#e53935', fontSize: 20 }} />
                  </Box>
                )}
                
                {/* Galvanometr */}
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  right: '15%',
                  transform: 'translateY(-50%)',
                  width: 120,
                  height: 140,
                  backgroundColor: '#fff',
                  border: '2px solid #333',
                  borderRadius: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 1,
                  boxShadow: 3,
                  zIndex: 3
                }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', mb: 1 }}>GALVANOMETR</Typography>
                  <Box sx={{
                    width: '90%',
                    height: '60%',
                    border: '1px solid #333',
                    borderRadius: 1,
                    position: 'relative',
                    backgroundColor: '#f9f9f9',
                    overflow: 'hidden'
                  }}>
                    {/* Shkala */}
                    <Box sx={{
                      position: 'absolute',
                      bottom: '50%',
                      left: 0,
                      right: 0,
                      height: 1,
                      backgroundColor: '#333'
                    }} />
                    {[...Array(11)].map((_, i) => {
                      const pos = i * 10;
                      const value = i - 5;
                      return (
                        <React.Fragment key={i}>
                          <Box sx={{
                            position: 'absolute',
                            bottom: '50%',
                            left: `${pos}%`,
                            height: i % 5 === 0 ? 12 : 6,
                            width: 1,
                            backgroundColor: '#333'
                          }} />
                          {i % 5 === 0 && (
                            <Typography variant="caption" sx={{
                              position: 'absolute',
                              bottom: 'calc(50% - 20px)',
                              left: `${pos}%`,
                              transform: 'translateX(-50%)',
                              fontSize: 10
                            }}>
                              {value}
                            </Typography>
                          )}
                        </React.Fragment>
                      );
                    })}
                    {/* Strelka */}
                    <Box sx={{
                      position: 'absolute',
                      bottom: '50%',
                      left: '50%',
                      width: '40%',
                      height: 2,
                      backgroundColor: '#d32f2f',
                      transformOrigin: 'left center',
                      transform: `translate(0, -50%) rotate(${getNeedleAngle(galvanometerValue)}deg)`,
                      transition: 'transform 0.1s ease-out',
                      zIndex: 2
                    }} />
                    <Box sx={{
                      position: 'absolute',
                      bottom: 'calc(50% - 1px)',
                      left: '50%',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#d32f2f',
                      transform: 'translate(-50%, 50%)',
                      zIndex: 3
                    }} />
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
                    {Math.abs(galvanometerValue).toFixed(2)} mV
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    {galvanometerValue > 0 ? "O'ng tomonga" : "Chap tomonga"}
                  </Typography>
                </Box>
                
                {/* Simlar - G'altakdan galvanometrgacha */}
                <Box sx={{
                  position: 'absolute',
                  top: '20%',
                  left: '35%',
                  width: '30%',
                  height: 2,
                  backgroundColor: '#333',
                  zIndex: 1
                }} />
                <Box sx={{
                  position: 'absolute',
                  top: '20%',
                  left: '65%',
                  width: 2,
                  height: '30%',
                  backgroundColor: '#333',
                  zIndex: 1
                }} />
                <Box sx={{
                  position: 'absolute',
                  top: '80%',
                  left: '35%',
                  width: '30%',
                  height: 2,
                  backgroundColor: '#333',
                  zIndex: 1
                }} />
                <Box sx={{
                  position: 'absolute',
                  top: '80%',
                  left: '65%',
                  width: 2,
                  height: '30%',
                  backgroundColor: '#333',
                  zIndex: 1
                }} />
                
                {/* Tok oqimi animatsiyasi */}
                {isCoilRotating && (
                  <>
                    <Box sx={{
                      position: 'absolute',
                      top: '20%',
                      left: '40%',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#ff5722',
                      animation: 'currentFlow 2s linear infinite',
                      '@keyframes currentFlow': {
                        '0%': { left: '40%', opacity: 0 },
                        '10%': { opacity: 1 },
                        '90%': { opacity: 1 },
                        '100%': { left: '60%', opacity: 0 }
                      },
                      zIndex: 3
                    }} />
                    <Box sx={{
                      position: 'absolute',
                      top: '80%',
                      left: '60%',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#ff5722',
                      animation: 'currentFlowReverse 2s linear infinite',
                      '@keyframes currentFlowReverse': {
                        '0%': { left: '60%', opacity: 0 },
                        '10%': { opacity: 1 },
                        '90%': { opacity: 1 },
                        '100%': { left: '40%', opacity: 0 }
                      },
                      zIndex: 3
                    }} />
                  </>
                )}
              </Box>
              
              {/* Natijalar paneli */}
              <Box mt={2} p={2} bgcolor="#e8f5e9" borderRadius={1}>
                <Typography variant="h6" color="#2e7d32" gutterBottom>
                  Tajriba Natijalari
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Aylanish tezligi:</strong> {rotationSpeed}
                    </Typography>
                    <Typography variant="body1">
                      <strong>O'ramlar soni:</strong> {coilTurns}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Magnit joylashuvi:</strong> {magnetPosition === 'inside' ? "G'altak ichida" : "G'altak tashqarisida"}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Induksiyalangan tok:</strong> {isCoilRotating ? `${Math.abs(galvanometerValue).toFixed(2)} mV` : '0 mV'}
                    </Typography>
                  </Grid>
                </Grid>
                {isCoilRotating && (
                  <Typography variant="body2" mt={2} fontStyle="italic">
                    {rotationSpeed > 7 ? (
                      "G'altak tez aylanayotgani uchun kuchli tok hosil bo'lyapti!"
                    ) : rotationSpeed > 3 ? (
                      "G'altak o'rtacha tezlikda aylanayotgani uchun tok kuchi ham o'rtacha"
                    ) : (
                      "G'altak sekin aylanayotgani uchun tok kuchi ham past"
                    )}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ElectromagneticInduction;