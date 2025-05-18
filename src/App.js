import { Route, Routes } from 'react-router-dom'
import HydraulicPress from './pages/HydraulicPress'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ElectromagneticInduction from './pages/ElectromagneticInduction'
import ElectromagneticInduction2 from './pages/ElectromagneticInduction2'
import LaserOptics from './pages/LaserOptics'
import FluidPressure from './pages/FluidPressure'
import ErrorPage from './pages/ErrorPage'

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hydraulic-press" element={<HydraulicPress />} />
                <Route path="/electromagnetic-induction" element={<ElectromagneticInduction />} />
                <Route path="/electromagnetic-induction2" element={<ElectromagneticInduction2 />} />
                <Route path="/laser-optics" element={<LaserOptics />} />
                <Route path="/fluid-pressure" element={<FluidPressure />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App