import React, { useState } from 'react';
import { Slider, Button, Card } from '@mui/material';
import { motion } from 'framer-motion';

const pistonWidth = 40;
const containerWidth = 600;

const GidravlikPressSim = () => {
  const [force1, setForce1] = useState(10);
  const [force2, setForce2] = useState(40);
  const [direction, setDirection] = useState(null);
  const [pressed, setPressed] = useState(false);

  const handleSimulate = () => {
    setPressed(true);
    if (force1 > force2) setDirection('right');
    else if (force1 < force2) setDirection('left');
    else setDirection('none');
  };

  const reset = () => {
    setDirection(null);
    setPressed(false);
  };

  const leftDisplacement =
    direction === 'left' ? 100 : direction === 'right' ? -100 : 0;
  const rightDisplacement = -leftDisplacement;

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Gidravlik press simulyatsiyasi</h1>

      <div className="grid grid-cols-2 gap-10 w-full max-w-4xl">
        <Card className="p-4">
          <h2 className="text-xl font-semibold">Quvvatsiz o‘quvchi (2 ml)</h2>
          <Slider
            value={force1}
            onChange={(e, val) => setForce1(val)}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
          <p>F1 kuchi: {force1} N</p>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold">Baquvvat o‘quvchi (8 ml)</h2>
          <Slider
            value={force2}
            onChange={(e, val) => setForce2(val)}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
          <p>F2 kuchi: {force2} N</p>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button variant="contained" color="primary" onClick={handleSimulate}>
          Simulyatsiyani boshlash
        </Button>
        <Button variant="outlined" color="secondary" onClick={reset}>
          Qayta boshlash
        </Button>
      </div>

      <div className="relative w-full max-w-5xl h-72 mt-10 border-2 border-blue-300 rounded-xl bg-blue-50 overflow-hidden">
        {/* Trubka */}
        <div className="absolute top-1/2 w-full h-10 bg-blue-200 -translate-y-1/2 flex justify-between items-center px-4">
          {/* Suv trubkasi vizual */}
          <motion.div
            className="w-1/2 h-full bg-blue-300 rounded-l-full"
            animate={{ width: pressed ? '50%' : '0%' }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="w-1/2 h-full bg-blue-300 rounded-r-full"
            animate={{ width: pressed ? '50%' : '0%' }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Chap piston */}
        <motion.div
          className="absolute bottom-10 left-32 flex flex-col items-center"
          animate={{ x: pressed ? leftDisplacement : 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className="w-10 h-24 bg-gray-400 rounded-t-md border border-black" />
          <div className="w-3 h-12 bg-black" />
          <p className="mt-2">F1: {force1} N</p>
        </motion.div>

        {/* O'ng piston */}
        <motion.div
          className="absolute bottom-10 right-32 flex flex-col items-center"
          animate={{ x: pressed ? rightDisplacement : 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className="w-16 h-24 bg-gray-700 rounded-t-md border border-black" />
          <div className="w-4 h-12 bg-black" />
          <p className="mt-2">F2: {force2} N</p>
        </motion.div>
      </div>

      {pressed && (
        <p className="text-lg font-semibold mt-6">
          Natija: Porshen {
            direction === 'right' ? 'baquvvat o‘quvchi' : direction === 'left' ? 'quvvatsiz o‘quvchi' : 'hech qayerga'
          } tomonga harakatlanadi.
        </p>
      )}
    </div>
  );
};

export default GidravlikPressSim;