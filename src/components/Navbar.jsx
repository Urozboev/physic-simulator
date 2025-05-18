import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import {
    Home as HomeIcon,
    Science as LabIcon,
    Workspaces as PhysicsIcon
} from '@mui/icons-material';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    component={Link}
                    to="/"
                >
                    <PhysicsIcon fontSize="large" />
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Fizika
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton
                        color="inherit"
                        component={Link}
                        to="/"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <HomeIcon />
                        <Typography variant="body1">Bosh sahifa</Typography>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar