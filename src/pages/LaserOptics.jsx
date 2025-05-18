import React, { useRef, useState } from 'react';
import { Box, Button, Slider, Typography, Paper, Container, Switch, FormControlLabel, Collapse } from '@mui/material';
import html2canvas from 'html2canvas';

const LaserOptics = () => {
    const [angle, setAngle] = useState(30);
    const [laserOn, setLaserOn] = useState(true);
    const [showScreen, setShowScreen] = useState(true);
    const experimentRef = useRef(null);

    const handleAngleChange = (event, newValue) => {
        setAngle(newValue);
    };

    const toggleLaser = () => {
        setLaserOn(!laserOn);
    };

    const toggleScreen = () => {
        setShowScreen(!showScreen);
    };

    const saveExperimentImage = () => {
        if (experimentRef.current) {
            html2canvas(experimentRef.current).then(canvas => {
                const link = document.createElement('a');
                link.download = 'laser-optics-experiment.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };

    // Nur yo'nalishini hisoblash
    const calculateLightPath = () => {
        const incidentAngle = (angle * Math.PI) / 180;
        const reflectedAngle = incidentAngle;

        // Rezervuar markaziga nisbatan koordinatalar
        const reservoirCenterX = 250;
        const reservoirCenterY = 250;

        return {
            incidentLine: {
                x1: 100,
                y1: 250,
                x2: reservoirCenterX - Math.sin(incidentAngle) * 50,
                y2: reservoirCenterY - Math.cos(incidentAngle) * 50
            },
            reflectedLine: {
                x1: reservoirCenterX - Math.sin(incidentAngle) * 50,
                y1: reservoirCenterY - Math.cos(incidentAngle) * 50,
                x2: reservoirCenterX + Math.sin(reflectedAngle) * 150,
                y2: reservoirCenterY - Math.cos(reflectedAngle) * 150
            },
            refractedLine: {
                x1: reservoirCenterX - Math.sin(incidentAngle) * 50,
                y1: reservoirCenterY - Math.cos(incidentAngle) * 50,
                x2: reservoirCenterX + Math.sin(incidentAngle * 0.7) * 150,
                y2: reservoirCenterY + Math.cos(incidentAngle * 0.7) * 150
            }
        };
    };

    const lightPath = calculateLightPath();

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom align="center" sx={{ mt: 3 }}>
                Nurning Ikki Muhit Chegarasida Qaytishi Tajribasi
            </Typography>

            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Kerakli Asboblar:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{
                            width: '40px',
                            height: '20px',
                            backgroundColor: '#d32f2f',
                            borderRadius: '10px 0 0 10px',
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                right: '-15px',
                                top: '5px',
                                width: '0',
                                height: '0',
                                borderTop: '5px solid transparent',
                                borderBottom: '5px solid transparent',
                                borderLeft: '10px solid #d32f2f'
                            }
                        }} />
                        <Typography variant="body2" sx={{ ml: 1 }}>LG-209 Gaz Lazer</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{
                            width: '30px',
                            height: '40px',
                            backgroundColor: '#bbdefb',
                            border: '1px solid #64b5f6',
                            borderRadius: '2px',
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: '-5px',
                                left: '5px',
                                width: '20px',
                                height: '5px',
                                backgroundColor: '#8d6e63',
                                borderRadius: '0 0 3px 3px'
                            }
                        }} />
                        <Typography variant="body2" sx={{ ml: 1 }}>Sovunli Rezervuar</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{
                            width: '30px',
                            height: '40px',
                            backgroundColor: '#e0e0e0',
                            border: '1px solid #9e9e9e',
                            position: 'relative',
                            transformOrigin: 'bottom center'
                        }} />
                        <Typography variant="body2" sx={{ ml: 1 }}>Yassi Ko'zgu</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{
                            width: '30px',
                            height: '20px',
                            backgroundColor: '#795548',
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: '-10px',
                                left: '10px',
                                width: '10px',
                                height: '10px',
                                backgroundColor: '#5d4037',
                                borderRadius: '50%'
                            },
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: '-5px',
                                left: '5px',
                                width: '20px',
                                height: '5px',
                                backgroundColor: '#a1887f',
                                borderRadius: '3px'
                            }
                        }} />
                        <Typography variant="body2" sx={{ ml: 1 }}>Prujinali Tutqich</Typography>
                    </Box>
                </Box>

                <Box sx={{ width: '100%', mt: 2 }}>
                    <Typography gutterBottom>Ko'zguga tushish burchagi: {angle}°</Typography>
                    <Slider
                        value={angle}
                        onChange={handleAngleChange}
                        min={10}
                        max={80}
                        step={1}
                        aria-labelledby="angle-slider"
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <FormControlLabel
                        control={<Switch checked={laserOn} onChange={toggleLaser} color="primary" />}
                        label="Lazer Yoqilgan"
                    />
                    <FormControlLabel
                        control={<Switch checked={showScreen} onChange={toggleScreen} color="secondary" />}
                        label="Ekran Ko'rinishda"
                    />
                </Box>
            </Paper>

            <Box ref={experimentRef} sx={{
                position: 'relative',
                height: '500px',
                backgroundColor: '#f5f5f5',
                mb: 3,
                p: 2,
                borderRadius: 1,
                border: '1px solid #e0e0e0'
            }}>
                {/* Lazer qurilmasi */}
                <Box sx={{
                    position: 'absolute',
                    left: '50px',
                    top: '240px',
                    width: '50px',
                    height: '20px',
                    backgroundColor: '#424242',
                    borderRadius: '5px',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        right: '-15px',
                        top: '5px',
                        width: '0',
                        height: '0',
                        borderTop: '5px solid transparent',
                        borderBottom: '5px solid transparent',
                        borderLeft: '15px solid #d32f2f',
                        opacity: laserOn ? 1 : 0.3
                    }
                }}>
                    <Typography variant="caption" sx={{
                        position: 'absolute',
                        top: '-20px',
                        left: '0',
                        whiteSpace: 'nowrap',
                        color: '#424242'
                    }}>
                        LG-209
                    </Typography>
                </Box>

                {/* Prujinali tutqich */}
                <Box sx={{
                    position: 'absolute',
                    left: '230px',
                    top: '180px',
                    width: '40px',
                    height: '20px',
                    backgroundColor: '#5d4037',
                    borderRadius: '3px',
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: 'left center',
                    zIndex: 3,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: '-15px',
                        top: '5px',
                        width: '15px',
                        height: '10px',
                        backgroundColor: '#3e2723',
                        borderRadius: '5px',
                        backgroundImage: 'linear-gradient(90deg, #3e2723 50%, #5d4037 50%)',
                        backgroundSize: '10px 10px'
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        right: '0',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        backgroundColor: '#8d6e63',
                        borderRadius: '50%'
                    }
                }} />

                {/* Ko'zgu */}
                <Box sx={{
                    position: 'absolute',
                    left: '250px',
                    top: '170px',
                    width: '60px',
                    height: '4px',
                    backgroundColor: '#e0e0e0',
                    border: '1px solid #9e9e9e',
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: 'left center',
                    zIndex: 2,
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        right: '-2px',
                        top: '-8px',
                        width: '4px',
                        height: '20px',
                        backgroundColor: '#bdbdbd'
                    }
                }} />

                {/* Sovunli Rezervuar */}
                <Box sx={{
                    position: 'absolute',
                    left: '200px',
                    top: '150px',
                    width: '100px',
                    height: '200px',
                    backgroundColor: '#e3f2fd',
                    border: '2px solid #bbdefb',
                    borderRadius: '0 0 10px 10px',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        height: '150px',
                        backgroundColor: '#bbdefb',
                        opacity: 0.6
                    }
                }}>
                    <Typography variant="caption" sx={{
                        position: 'absolute',
                        bottom: '5px',
                        left: '0',
                        right: '0',
                        textAlign: 'center',
                        color: '#0d47a1'
                    }}>
                        Sovun eritmasi
                    </Typography>
                </Box>

                {/* Ekran */}
                <Collapse in={showScreen} orientation="horizontal" sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '100px'
                }}>
                    <Box sx={{
                        height: '100%',
                        backgroundColor: '#212121',
                        borderRadius: '0 4px 4px 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        textAlign: 'center',
                        padding: '10px',
                        boxSizing: 'border-box'
                    }}>
                        Qaytgan va sinagan nurlar ekranda ko'rinadi
                    </Box>
                </Collapse>

                {/* Nur chiziqlari */}
                {laserOn && (
                    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                        {/* Tushayotgan nur (qizil) */}
                        <line
                            x1={lightPath.incidentLine.x1}
                            y1={lightPath.incidentLine.y1}
                            x2={lightPath.incidentLine.x2}
                            y2={lightPath.incidentLine.y2}
                            stroke="red"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                        />

                        {/* Qaytgan nur (yashil) - faqat ekran ko'rinishda bo'lsa */}
                        {showScreen && (
                            <line
                                x1={lightPath.reflectedLine.x1}
                                y1={lightPath.reflectedLine.y1}
                                x2={lightPath.reflectedLine.x2}
                                y2={lightPath.reflectedLine.y2}
                                stroke="#4caf50"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                            />
                        )}

                        {/* Sinagan nur (ko'k) */}
                        <line
                            x1={lightPath.refractedLine.x1}
                            y1={lightPath.refractedLine.y1}
                            x2={lightPath.refractedLine.x2}
                            y2={lightPath.refractedLine.y2}
                            stroke="#2196f3"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                        />

                        {/* O'q markeri */}
                        <defs>
                            <marker
                                id="arrowhead"
                                markerWidth="10"
                                markerHeight="7"
                                refX="9"
                                refY="3.5"
                                orient="auto"
                            >
                                <polygon points="0 0, 10 3.5, 0 7" fill="context-stroke" />
                            </marker>
                        </defs>
                    </svg>
                )}

                {/* Belgilar */}
                {laserOn && (
                    <>
                        <Box sx={{ position: 'absolute', left: '120px', top: '220px' }}>
                            <Typography variant="caption" color="red">Lazer nuri</Typography>
                        </Box>
                        {showScreen && (
                            <Box sx={{ position: 'absolute', left: '300px', top: '100px' }}>
                                <Typography variant="caption" color="#4caf50">Qaytgan nur</Typography>
                            </Box>
                        )}
                        <Box sx={{ position: 'absolute', left: '300px', top: '350px' }}>
                            <Typography variant="caption" color="#2196f3">Sinagan nur</Typography>
                        </Box>
                    </>
                )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={saveExperimentImage}
                    startIcon={<span>📷</span>}
                >
                    Tajriba Natijasini Saqlash
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={toggleLaser}
                    startIcon={<span>✋</span>}
                >
                    {laserOn ? 'Stop' : 'Start'}
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={toggleScreen}
                    startIcon={<span>🖥️</span>}
                >
                    {showScreen ? 'Ekranni Yashirish' : "Ekranni Ko'rsatish"}
                </Button>
            </Box>
        </Container>
    );
};

export default LaserOptics;