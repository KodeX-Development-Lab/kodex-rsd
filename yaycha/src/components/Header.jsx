import { useApp } from '../ThemedApp'

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge
} from '@mui/material'

import {
    Menu as MenuIcon,
    Add as AddIcon,
    Search as SearchIcon,
    Notifications as NotiIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { fetchNotis } from '../libs/fetcher';
import { useQuery } from 'react-query';

export default function Header() {
    const navigate = useNavigate();
    const { auth, setShowDrawer, showForm, setShowForm, mode, setMode } = useApp();

    const { isLoading, isError, data } = useQuery(
        ["notis", auth], fetchNotis
    );

    function notiCount() {
        if (!auth) return 0;
        if (isLoading || isError) return 0;
        return data.filter(noti => !noti.read).length;
    }


    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={() => setShowDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>

                <Typography sx={{ flexGrow: 1, ml: 2 }}>Yaycha</Typography>

                <Box>
                    {auth && <IconButton
                        color="inherit"
                        onClick={() => setShowForm(!showForm)}>
                        <AddIcon />
                    </IconButton>}
                    <IconButton
                        color="inherit"
                        onClick={() => navigate("/search")}>
                        <SearchIcon />
                    </IconButton>
                    {
                        auth && (
                            <IconButton
                                color="inherit"
                                onClick={() => navigate("/notis")}>
                                <Badge
                                    color="error"
                                    badgeContent={notiCount()}>
                                    <NotiIcon />
                                </Badge>
                            </IconButton>
                        )}
                    {mode == 'dark' ? (
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={() => setMode("light")}>
                            <LightModeIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={() => setMode("dark")}>
                            <DarkModeIcon />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}