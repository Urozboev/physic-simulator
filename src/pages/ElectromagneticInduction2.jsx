import React, { useState, useRef, useEffect } from 'react';
import { Button, Slider, Typography, Paper, Box, Card, CardContent } from '@mui/material';
import html2canvas from 'html2canvas';

const ElectromagneticInduction2 = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(30);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [currentStrength, setCurrentStrength] = useState(0);
  const [direction, setDirection] = useState(1); // 1 - clockwise, -1 - counter-clockwise
  const animationRef = useRef(null);
  const coilRef = useRef(null);
  const experimentRef = useRef(null);

  // Galvanometr strelkasi uchun burchak (tok kuchiga mos ravishda)
  const meterAngle = currentStrength * 45; // ±45 gradus oralig'ida harakatlanadi

  // Tajribani boshlash/to'xtatish
  const toggleExperiment = () => {
    setIsRunning(!isRunning);
  };

  // G'altak aylanishini animatsiya qilish (to'g'ri AC tok simulyatsiyasi)
  const animate = () => {
    // Aylanish burchagini yangilash
    let newAngle = currentAngle + (rotationSpeed / 10) * direction;
    
    // Agar 360 gradusdan oshsa yoki 0 dan kichik bo'lsa, yo'nalishni o'zgartirish
    if (newAngle >= 180 || newAngle <= -180) {
      setDirection(-direction);
      newAngle = currentAngle + (rotationSpeed / 10) * direction;
    }
    
    setCurrentAngle(newAngle);
    
    // Sinusoidal tok kuchi (AC tok simulyatsiyasi)
    const newCurrent = Math.sin(newAngle * Math.PI / 180) * rotationSpeed / 30;
    setCurrentStrength(newCurrent);
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isRunning, rotationSpeed, currentAngle, direction]);

  // Tajriba natijasini saqlash
  const saveExperiment = () => {
    if (experimentRef.current) {
      html2canvas(experimentRef.current).then(canvas => {
        const link = document.createElement('a');
        link.download = 'electromagnetic-induction-experiment.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center" color="primary">
          Elektromagnit Induksiya Tajribasi (To'g'rilangan)
        </Typography>
        
        <Paper ref={experimentRef} sx={{ p: 3, mb: 3, position: 'relative', backgroundColor: '#f9f9f9' }}>
          {/* Tajriba tavsifi */}
          <Typography variant="body1" paragraph>
            Bu tajribada magnit maydonida g'altak aylanganda galvanometrda tok paydo bo'lishini kuzatamiz. 
            G'altak bir yo'nalishda aylanib, keyin teskari yo'nalishda aylanadi (AC tok hosil qiladi).
          </Typography>
          
          {/* Tajriba qurilmasi */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            {/* Magnit */}
            <Box sx={{
              width: 60,
              height: 120,
              backgroundColor: '#e0e0e0',
              border: '3px solid #333',
              borderRadius: '5px',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: '15px solid red',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderBottom: '15px solid blue',
              }
            }}>
              <Typography variant="caption" sx={{ position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)' }}>N</Typography>
              <Typography variant="caption" sx={{ position: 'absolute', bottom: 5, left: '50%', transform: 'translateX(-50%)' }}>S</Typography>
            </Box>
            
            {/* G'altak */}
            <Box ref={coilRef} sx={{
              position: 'relative',
              width: 100,
              height: 100,
              margin: '0 40px',
              transform: `rotate(${currentAngle}deg)`,
              transition: 'transform 0.1s linear',
            }}>
              <Box sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '8px solid #1976d2',
                borderTopColor: 'transparent',
                borderBottomColor: 'transparent',
              }} />
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '70%',
                height: '70%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                border: '8px solid #1976d2',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
              }} />
              {/* Simlar */}
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '-40px',
                width: '40px',
                height: '4px',
                backgroundColor: '#795548',
              }} />
              <Box sx={{
                position: 'absolute',
                top: '50%',
                right: '-40px',
                width: '40px',
                height: '4px',
                backgroundColor: '#795548',
              }} />
            </Box>
            
            {/* Galvanometr (to'g'ri ko'rsatkich bilan) */}
            <Box sx={{
              width: 120,
              height: 120,
              border: '2px solid #333',
              borderRadius: '5px',
              position: 'relative',
              backgroundColor: '#fff',
            }}>
              <Typography variant="body2" sx={{ textAlign: 'center', pt: 1 }}>Galvanometr</Typography>
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '80%',
                height: '2px',
                backgroundColor: '#333',
                transform: 'translate(-50%, -50%)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-15px',
                  left: '50%',
                  width: '2px',
                  height: '30px',
                  backgroundColor: '#d32f2f',
                  transform: `translateX(-50%) rotate(${meterAngle}deg)`,
                  transformOrigin: 'bottom center',
                  transition: 'transform 0.2s ease',
                }
              }} />
              <Box sx={{
                position: 'absolute',
                bottom: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                justifyContent: 'space-between',
                width: '80%',
              }}>
                <Typography variant="caption">-</Typography>
                <Typography variant="caption">{currentStrength.toFixed(2)}</Typography>
                <Typography variant="caption">+</Typography>
              </Box>
              {/* Haqiqiy tok ko'rsatkichi */}
              <Box sx={{
                position: 'absolute',
                bottom: 30,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '10px',
                backgroundColor: '#e0e0e0',
                borderRadius: '5px',
                overflow: 'hidden',
              }}>
                <Box sx={{
                  width: `${Math.abs(currentStrength) * 100}%`,
                  height: '100%',
                  backgroundColor: currentStrength > 0 ? '#4caf50' : '#f44336',
                  marginLeft: currentStrength > 0 ? '0' : 'auto',
                }} />
              </Box>
            </Box>
          </Box>
          
          {/* Simlar ulanishi */}
          <Box sx={{
            position: 'absolute',
            top: 'calc(50% + 60px)',
            left: '50%',
            width: 'calc(100% - 200px)',
            height: '4px',
            backgroundColor: '#795548',
            transform: 'translateX(-50%)',
            zIndex: -1,
          }} />
          
          {/* Tok kuchi ko'rsatkichi */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body1">
              Tok kuchi: <strong>{currentStrength.toFixed(2)}</strong> mA
              {currentStrength > 0 ? ' (musbat)' : currentStrength < 0 ? ' (manfiy)' : ' (nol)'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              G'altak aylanish tezligi: {rotationSpeed} birlik | 
              Aylanish yo'nalishi: {direction > 0 ? 'soat strelkasi boʻyicha' : 'soat strelkasiga teskari'}
            </Typography>
          </Box>
        </Paper>
        
        {/* Boshqaruv elementlari */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Button 
            variant="contained" 
            color={isRunning ? 'secondary' : 'primary'}
            onClick={toggleExperiment}
          >
            {isRunning ? 'To\'xtatish' : 'Tajribani boshlash'}
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={saveExperiment}
            disabled={!isRunning}
          >
            Natijani saqlash
          </Button>
        </Box>
        
        {/* Tezlikni boshqarish */}
        <Box sx={{ px: 2 }}>
          <Typography gutterBottom>G'altak aylanish tezligi</Typography>
          <Slider
            value={rotationSpeed}
            onChange={(e, newValue) => setRotationSpeed(newValue)}
            min={10}
            max={100}
            disabled={isRunning}
          />
        </Box>
        
        {/* Tushuntirish */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
          <Typography variant="body2">
            <strong>To'g'rilangan izoh:</strong> Haqiqiy tajribada g'altak bir tomonga aylanmaydi, 
            balki oldinga-orqaga harakatlanadi (AC tok hosil qiladi). 
            Bu versiyada g'altak 180 gradusgacha bir yo'nalishda, keyin teskari yo'nalishda aylanadi. 
            Galvanometr ham tok yo'nalishiga qarab musbat yoki manfiy qiymat ko'rsatadi.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ElectromagneticInduction2;