import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import Logo from "../assets/images/logo.jpg";
import DarkLogo from "../assets/images/dark-logo.jpg";
import {Divider, Drawer, List} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LinkItem from "./LinkItem";
import {getPriceList} from "../services/prices";
import {useDispatch, useSelector} from "react-redux";
import {toggleDarkMode} from "../app/mode/modeSlice";

const HeaderComponent = () => {
    const isDark = useSelector(state => state.mode.isDark)
    const dispatch = useDispatch()

    const [prices, setPrices] = useState([])
    const [menu, setMenu] = useState(false)
    const toggleMenu = () => {
        setMenu(prevState => !prevState)
    }
    const onLinkSelected = (link) => {
    }
    useEffect(() => {
        getPriceList()
            .then(items => {
                const list = Object.entries(items)
                setPrices(list)
            })
    }, [])
    return (
        <AppBar position="static" sx={{bgcolor: "#fff"}} elevation={0} className={isDark ? "is-dark" : ""}>
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
                            ??????
                        </Button>
                        <Button
                            size={"medium"}
                            color={"secondary"}
                            href={"/"}
                            className={"link"}
                        >
                            ????????
                        </Button>
                        <Button
                            size={"medium"}
                            color={"secondary"}
                            href={"/"}
                            className={"link"}
                        >
                            ???????? ???????? ????
                        </Button>
                        <Button
                            size={"medium"}
                            color={"secondary"}
                            href={"/"}
                            className={"link"}
                        >
                            ????????????????
                        </Button>
                        <Button
                            size={"medium"}
                            color={"secondary"}
                            href={"/"}
                            className={"link"}
                        >
                            ??????????????
                        </Button>
                    </Box>
                    <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            size={"medium"}
                            color={"primary"}
                            href={"/"}
                            variant={"contained"}
                        >
                            ????????/?????? ??????
                        </Button>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{height: '45px', margin: 'auto 14px auto 0'}}/>
                    <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                        <img alt="logo" className={"logo"} src={isDark ? DarkLogo : Logo}/>
                    </Box>
                </Toolbar>
            </Container>
            <React.Fragment>
                <Drawer
                    anchor={"right"}
                    open={menu}
                    onClose={toggleMenu}
                    elevation={16}
                    className={"drawer " + (isDark ? "is-dark" : "")}
                >
                    <Toolbar>
                        <IconButton onClick={toggleMenu}>
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                    <div className={"logo-container"}>
                        <img src={Logo} alt=""/>
                    </div>
                    <div className={"link-container"}>
                        <List
                            height={'100%'}
                            width={'100%'}
                        >
                            <LinkItem
                                name={'????????'}
                                title={''}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                            <LinkItem
                                name={'??????????????'}
                                title={''}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                            <LinkItem
                                name={'???????? ???????? ????'}
                                title={`${prices.length.toString()} ?????? ??????????????`}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                            <LinkItem
                                name={'?????? ?????? ??????????'}
                                title={'???????? ???????? ????????'}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                            <LinkItem
                                name={'?????????? ???? ???????? ????????'}
                                title={''}
                                icon={''}
                                onClick={() => dispatch(toggleDarkMode())}
                            />
                            <Divider />
                            <LinkItem
                                name={'???????????? ????'}
                                title={''}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                            <LinkItem
                                name={'?????????? ???????? ?????? ??????'}
                                title={''}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                            <LinkItem
                                name={'?????????? ??????'}
                                title={''}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                            <LinkItem
                                name={'???????? ?????? ????????'}
                                title={''}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                            <Divider />
                            <LinkItem
                                name={'???????????? ???? ????????????'}
                                title={''}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                            <LinkItem
                                name={'?????????? ??????????????'}
                                title={''}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                            <LinkItem
                                name={'?????? ????'}
                                title={''}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                            <LinkItem
                                name={'???????? ?????? ??????'}
                                title={''}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                            <LinkItem
                                name={'???????????? ????????????'}
                                title={''}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                            <LinkItem
                                name={'???????????? ?? ????????????'}
                                title={''}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                            <LinkItem
                                name={'???????????? ????'}
                                title={''}
                                icon={''}
                                onClick={() => onLinkSelected('/')}
                            />
                        </List>
                    </div>
                </Drawer>
            </React.Fragment>
        </AppBar>
    )
        ;
};
export default HeaderComponent;