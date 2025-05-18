import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Slider,
    Typography,
    Button,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { PlayArrow, Stop, Replay, Download } from '@mui/icons-material';
import html2canvas from 'html2canvas';

const FluidPressure = () => {
    const [height, setHeight] = useState(5);
    const [angle, setAngle] = useState(45);
    const [distance, setDistance] = useState(0);
    const [maxHeight, setMaxHeight] = useState(0);
    const [isFlowing, setIsFlowing] = useState(false);
    const [waterDrops, setWaterDrops] = useState([]);
    const simulationRef = useRef(null);

    // Suv traektoriyasini hisoblash
    useEffect(() => {
        if (isFlowing) {
            const g = 9.8;
            const v0 = Math.sqrt(2 * g * height);
            const radians = angle * Math.PI / 180;

            // To'g'ri hisoblangan parametrlar
            const maxDistance = (v0 * v0 * Math.sin(2 * radians)) / g;
            const maxHeight = (v0 * v0 * Math.sin(radians) * Math.sin(radians)) / (2 * g);
            setMaxHeight(maxHeight);

            const totalTime = (2 * v0 * Math.sin(radians)) / g;

            // Suv tomchilari uchun nuqtalar
            const drops = [];
            for (let i = 0; i <= 30; i++) {
                const t = (i / 30) * totalTime;
                const x = v0 * Math.cos(radians) * t;
                const y = v0 * Math.sin(radians) * t - 0.5 * g * t * t;

                if (i % 3 === 0 && i < 27) {
                    drops.push({
                        x,
                        y,
                        id: i,
                        size: 4 + Math.random() * 4,
                        delay: i * 50
                    });
                }
            }
            setWaterDrops(drops);

            // Sachrash uzoqligini animatsiya qilish
            let currentDistance = 0;
            const interval = setInterval(() => {
                currentDistance += maxDistance / 40;
                if (currentDistance >= maxDistance) {
                    clearInterval(interval);
                    setTimeout(() => setIsFlowing(false), 1000);
                }
                setDistance(Math.min(currentDistance, maxDistance));
            }, 30);

            return () => clearInterval(interval);
        } else {
            setWaterDrops([]);
        }
    }, [height, angle, isFlowing]);

    const handleStart = () => {
        setDistance(0);
        setIsFlowing(true);
    };

    const handleStop = () => {
        setIsFlowing(false);
    };

    const handleReset = () => {
        setIsFlowing(false);
        setHeight(5);
        setAngle(45);
        setDistance(0);
    };

    const handleDownload = () => {
        if (simulationRef.current) {
            html2canvas(simulationRef.current, { scale: 2 }).then(canvas => {
                const link = document.createElement('a');
                link.download = 'suyuqlik-bosimi-simulyatsiya.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };

    return (
        <Box sx={{
            p: 3,
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <Typography variant="h4" gutterBottom align="center" sx={{
                mb: 4,
                fontWeight: 'bold',
                color: '#1976d2'
            }}>
                Suyuqlik Bosimi Simulyatsiyasi
            </Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
                flexGrow: 1
            }}>
                {/* Nazorat paneli */}
                <Paper sx={{
                    p: 3,
                    width: { xs: '100%', md: '350px' },
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Typography variant="h6" gutterBottom sx={{
                        mb: 3,
                        fontWeight: 'bold',
                        color: '#1976d2'
                    }}>
                        Nazorat paneli
                    </Typography>

                    <Box sx={{ mb: 4, flexGrow: 1 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography gutterBottom sx={{ mb: 1, fontWeight: '500' }}>
                                Suvli idish balandligi: {height} m
                            </Typography>
                            <Slider
                                value={height}
                                onChange={(e, newValue) => setHeight(newValue)}
                                min={1}
                                max={15}
                                step={0.5}
                                disabled={isFlowing}
                                sx={{
                                    color: '#1976d2',
                                    height: '8px',
                                    '& .MuiSlider-thumb': {
                                        width: '20px',
                                        height: '20px'
                                    }
                                }}
                                marks={[
                                    { value: 1, label: '1m' },
                                    { value: 5, label: '5m' },
                                    { value: 10, label: '10m' },
                                    { value: 15, label: '15m' }
                                ]}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ fontWeight: '500' }}>Quvur burchagi</InputLabel>
                                <Select
                                    value={angle}
                                    onChange={(e) => setAngle(e.target.value)}
                                    disabled={isFlowing}
                                    label="Quvur burchagi"
                                    sx={{ fontWeight: '500' }}
                                >
                                    <MenuItem value={30}>30°</MenuItem>
                                    <MenuItem value={45}>45°</MenuItem>
                                    <MenuItem value={60}>60°</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            mb: 3,
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <Button
                                variant="contained"
                                onClick={handleStart}
                                disabled={isFlowing}
                                startIcon={<PlayArrow />}
                                sx={{
                                    px: 3,
                                    py: 1,
                                    fontWeight: 'bold'
                                }}
                            >
                                Boshlash
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleStop}
                                disabled={!isFlowing}
                                startIcon={<Stop />}
                                sx={{
                                    px: 3,
                                    py: 1,
                                    fontWeight: 'bold'
                                }}
                            >
                                To'xtatish
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleReset}
                                startIcon={<Replay />}
                                sx={{
                                    px: 3,
                                    py: 1,
                                    fontWeight: 'bold'
                                }}
                            >
                                Qayta o'rnatish
                            </Button>
                        </Box>

                        <Box sx={{
                            mt: 'auto',
                            p: 2,
                            backgroundColor: '#f0f7ff',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0'
                        }}>
                            <Typography variant="h6" sx={{
                                mb: 1,
                                fontWeight: 'bold',
                                color: '#1976d2',
                                fontSize: '1rem'
                            }}>
                                Natijalar:
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography sx={{ flex: 1, fontSize: '0.9rem' }}>Sachrash uzoqligi:</Typography>
                                <Typography sx={{ fontWeight: 'bold' }}>{distance.toFixed(2)} m</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ flex: 1, fontSize: '0.9rem' }}>Bosim:</Typography>
                                <Typography sx={{ fontWeight: 'bold' }}>{(height * 9.8).toFixed(2)} kPa</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleDownload}
                        fullWidth
                        startIcon={<Download />}
                        sx={{
                            py: 1,
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            mt: 2
                        }}
                    >
                        Yuklab olish
                    </Button>
                </Paper>

                {/* Simulyatsiya qismi */}
                <Paper sx={{
                    flexGrow: 1,
                    p: 2,
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '500px'
                }}>
                    <div ref={simulationRef} style={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom sx={{
                            mb: 2,
                            fontWeight: 'bold',
                            color: '#1976d2'
                        }}>
                            Simulyatsiya
                        </Typography>

                        <Box sx={{
                            position: 'relative',
                            height: '500px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            backgroundColor: '#f5fbff'
                        }}>
                            {/* Suvli idish */}
                            <Box sx={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                bottom: `calc(100px + ${height * 20}px)`,
                                width: '100px',
                                height: '120px',
                                background: 'linear-gradient(to bottom, #4fc3f7, #0288d1)',
                                border: '4px solid #01579b',
                                borderRadius: '10px 10px 0 0',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1.2rem'
                            }} >
                                Suvli idish
                            </Box>

                            {/* Tik quvur (vertikal) */}
                            <Box sx={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                bottom: '100px',
                                height: `${height * 20}px`,
                                width: '20px',
                                backgroundColor: '#795548',
                                zIndex: 9
                            }} />

                            {/* Gorizontal quvur (o'ngga qaragan) */}
                            <Box sx={{
                                position: 'absolute',
                                left: '50%',
                                bottom: `100px`,
                                width: '80px',
                                height: '20px',
                                backgroundColor: '#5d4037',
                                transformOrigin: 'left center',
                                zIndex: 11,
                                borderRadius: '10px',
                                transform: `rotate(${-angle}deg)`,
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    left: '0',
                                    top: '0',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: '#795548',
                                    zIndex: 12
                                }
                            }} />

                            {/* Suv chiqishi (gorizontal quvur oxiridan) */}
                            {isFlowing && (
                                <Box sx={{
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(30px)',
                                    bottom: `calc(150px)`,
                                    width: '16px',
                                    height: '16px',
                                    background: 'radial-gradient(circle, #4fc3f7, #0288d1)',
                                    borderRadius: '50%',
                                    zIndex: 15,
                                    animation: 'pulse 0.3s infinite alternate',
                                    boxShadow: '0 0 8px rgba(33,150,243,0.8)',
                                    '@keyframes pulse': {
                                        '0%': {
                                            transform: 'translateX(30px) scale(1)',
                                            opacity: 0.8
                                        },
                                        '100%': {
                                            transform: 'translateX(30px) scale(1.3)',
                                            opacity: 1
                                        }
                                    }
                                }} />
                            )}

                            {/* Suv traektoriyasi */}
                            {isFlowing && (
                                <Box sx={{
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(40px)',
                                    bottom: `calc(100px + ${height * 20}px + 10px)`,
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 5
                                }}>
                                    {/* Dotted egri chiziq */}
                                    <svg
                                        width="100%"
                                        height="100%"
                                        style={{ position: 'absolute', top: 0, left: 0 }}
                                    >
                                        <path
                                            d={`
                        M 0 0
                        Q ${distance * 10 / 2} ${-distance * 10 / 4}
                        ${distance * 10} 0
                      `}
                                            fill="none"
                                            stroke="#4fc3f7"
                                            strokeWidth="3"
                                            strokeDasharray="6,4"
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                    {/* Suv tomchilari */}
                                    {waterDrops.map((drop) => (
                                        <Box
                                            key={drop.id}
                                            sx={{
                                                position: 'absolute',
                                                left: `${drop.x * 10}px`,
                                                bottom: `${drop.y * 10}px`,
                                                width: `${drop.size}px`,
                                                height: `${drop.size}px`,
                                                background: 'radial-gradient(circle, rgba(255,255,255,0.8), #4fc3f7)',
                                                borderRadius: '50%',
                                                animation: `drop-fall ${drop.delay}ms forwards`,
                                                opacity: 0,
                                                boxShadow: '0 0 4px rgba(33,150,243,0.6)',
                                                '@keyframes drop-fall': {
                                                    '0%': {
                                                        opacity: 0,
                                                        transform: 'translateY(10px)'
                                                    },
                                                    '20%': { opacity: 1 },
                                                    '80%': { opacity: 1 },
                                                    '100%': {
                                                        opacity: 0,
                                                        transform: 'translateY(-10px)'
                                                    }
                                                }
                                            }}
                                        />
                                    ))}
                                </Box>
                            )}

                            {/* Suv izi (agar suv erga tushgan bo'lsa) */}
                            {distance > 0 && !isFlowing && (
                                <Box sx={{
                                    position: 'absolute',
                                    left: `calc(50% + ${40 + distance * 10}px)`,
                                    bottom: '100px',
                                    width: '40px',
                                    height: '10px',
                                    backgroundColor: 'rgba(2,136,209,0.3)',
                                    borderRadius: '50%',
                                    zIndex: 6
                                }} />
                            )}

                            {/* Er */}
                            <Box sx={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                right: '0',
                                height: '100px',
                                background: 'linear-gradient(to bottom, #7cb342, #558b2f)',
                                zIndex: 1,
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    right: '0',
                                    height: '20px',
                                    background: 'linear-gradient(to bottom, rgba(124,179,66,0.8), rgba(85,139,47,0.9))',
                                    borderRadius: '0 0 50% 50% / 0 0 100% 100%'
                                }
                            }} />

                            {/* Balandlik ko'rsatkichi */}
                            <Box sx={{
                                position: 'absolute',
                                left: '60px',
                                bottom: '100px',
                                top: `${500 - height * 20 - 100}px`,
                                width: '4px',
                                background: 'linear-gradient(to bottom, red, #d32f2f)',
                                zIndex: 8,
                                borderRadius: '2px'
                            }} />
                            <Box sx={{
                                position: 'absolute',
                                left: '50px',
                                top: `${500 - height * 20 - 120}px`,
                                width: '30px',
                                height: '30px',
                                backgroundColor: '#d32f2f',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                zIndex: 9,
                                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                            }}>
                                {height}
                            </Box>
                            <Typography sx={{
                                position: 'absolute',
                                left: '85px',
                                top: `${500 - height * 20 - 115}px`,
                                color: '#d32f2f',
                                fontWeight: 'bold',
                                zIndex: 9,
                                fontSize: '14px'
                            }}>
                                metr
                            </Typography>

                        </Box>
                    </div>
                </Paper>
            </Box>
        </Box>
    );
};

export default FluidPressure;