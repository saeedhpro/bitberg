import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {useState} from "react";
import Logo from "../assets/images/logo.jpg";
import {Divider, Drawer} from "@mui/material";

const HeaderComponent = () => {
    const [menu, setMenu] = useState(false)
    const toggleMenu = () => {
        setMenu(prevState => !prevState)
    }
    return (
        <AppBar position="static" sx={{bgcolor: "#fff"}} elevation={0}>
            <Container maxWidth="xl">
                <Toolbar>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={toggleMenu}
                            className={"link"}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Box>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            size={"medium"}
                            color={"secondary"}
                            onClick={toggleMenu}
                            className={"link"}
                        >
                            <MenuIcon/>
                            منو
                        </Button>
                        <Button
                            size={"medium"}
                            color={"secondary"}
                            href={"/"}
                            className={"link"}
                        >
                            خانه
                        </Button>
                        <Button
                            size={"medium"}
                            color={"secondary"}
                            href={"/"}
                            className={"link"}
                        >
                            قیمت لحظه ای
                        </Button>
                        <Button
                            size={"medium"}
                            color={"secondary"}
                            href={"/"}
                            className={"link"}
                        >
                            کارمزدها
                        </Button>
                        <Button
                            size={"medium"}
                            color={"secondary"}
                            href={"/"}
                            className={"link"}
                        >
                            پورتفوی
                        </Button>
                    </Box>
                    <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            size={"medium"}
                            color={"primary"}
                            href={"/"}
                            variant={"contained"}
                        >
                            ورود/ثبت نام
                        </Button>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{height: '45px', margin: 'auto 14px auto 0'}}/>
                    <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                        <img alt="logo" className={"logo"} src={Logo}/>
                    </Box>
                </Toolbar>
            </Container>
            <React.Fragment>
                <Drawer
                    anchor={"right"}
                    open={menu}
                    onClose={toggleMenu}
                    elevation={16}
                    className={"drawer"}
                >
                    <button>saeed</button>
                </Drawer>
            </React.Fragment>
        </AppBar>
    )
        ;
};
export default HeaderComponent;