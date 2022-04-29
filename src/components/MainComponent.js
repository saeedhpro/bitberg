import {
    Grid,
    Tooltip,
    Container,
    TextField,
    Dialog,
    useTheme, IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment, List, Button
} from "@mui/material";
import Logo from "../assets/images/logo.jpg";
import DarkLogo from "../assets/images/dark-logo.jpg";
import {useEffect, useState} from "react";
import {getPriceList} from "../services/prices";
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import CoinSelectItem from "./CoinSelectItem"
import {useSelector} from "react-redux";

const MainComponent = () => {
    const isDark = useSelector(state => state.mode.isDark)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [list, setList] = useState([])
    const [prices, setPrices] = useState([])
    const [coin, setCoin] = useState(null)
    const [openList, setOpenList] = useState(false);
    const [price, setPrice] = useState("0");
    const [unit, setUnit] = useState("0");
    const [forBuy, setForBuy] = useState(true);

    const handleClickOpen = () => {
        setOpenList(prevState => !prevState);
    };

    const onCoinItemClicked = (item) => {
        setCoin(item)
        setTimeout(() => {
            handleClickOpen()
        }, 150)
    }

    const filter = e => {
        const val = e.target.value
        const list = prices.filter(i => i[0].includes(val) || i[1].name.includes(val))
        setList(list)
    }

    const toDecimal = (number) => {
        let val = number
        if (number[number.length - 1] === ".") {
            val = number
        } else if (number === "") {
            val = "0"
        } else {
            val = number.toString().split('.')
            if (val[1]) {
                val = parseInt(val[0]) + '.' + val[1]
            } else {
                val = parseInt(val[0])
            }
        }
        return val
    }

    const calcPriceValue = (unit) => {
        if (coin) {
            const buy = forBuy ? toDecimal(coin[1].buy.toString().replaceAll(',', '')) : toDecimal(coin[1].sell.toString().replaceAll(',', ''))
            const price = buy * parseFloat(unit)
            setPrice(price)
        }
    }

    const calcUnitValue = (price) => {
        if (coin) {
            const buy = forBuy ? toDecimal(coin[1].buy.toString().replaceAll(',', '')) : toDecimal(coin[1].sell.toString().replaceAll(',', ''))
            const unit = buy / parseFloat(price)
            setUnit(unit)
        }
    }

    const onUnitChange = (e) => {
        const re = /^\d*(?:[.,]\d*)?$/;
        let number = e.target.value.toString()
        let val = toDecimal(number)
        if (re.test(val.toString())) {
            setUnit(val)
            setTimeout(() => {
                calcPriceValue(val)
            }, 200)
        }
    }

    const onPriceChange = (e) => {
        const re = /^\d*(?:[.,]\d*)?$/;
        let number = e.target.value.toString()
        let val = toDecimal(number)
        if (re.test(val.toString())) {
            setPrice(val)
            setTimeout(() => {
                calcUnitValue(val)
            }, 200)
        }
    }

    const toggleForBuy = () => {
        setForBuy(prevState => !prevState)
        setTimeout(() => {
            calcPriceValue(unit)
        }, 200)
    }

    useEffect(() => {
        getPriceList()
            .then(items => {
                const list = Object.entries(items)
                const coin = list.find(i => i[0] === "BTC")
                setPrices(list)
                if (coin) {
                    setCoin(coin)
                }
            })
    }, [])

    useEffect(() => {
        setList(prices)
    }, [prices])

    useEffect(() => {
        calcPriceValue(unit)
    }, [coin])

    return (
        <div className={"main-component " + (isDark ? "is-dark" : "")}>
            <Dialog
                open={openList}
                fullScreen={fullScreen}
                onClose={handleClickOpen}
                dir={"rtl"}
                className={"choose-coin " + (isDark ? "is-dark" : "")}
            >
                <div
                    className={"coin-select-modal"}
                >
                    <div className={"choose-coin-header"}>
                        <div className={"choose-coin-title"}>انتخاب ارز</div>
                        <IconButton onClick={handleClickOpen}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div className={"content-box"}>
                        <div className={"search-box"}>
                            <FormControl
                                dir={"rtl"}
                                fullWidth sx={{margin: '0', marginTop: '16px'}}>
                                <InputLabel htmlFor="search-input">جستجو</InputLabel>
                                <OutlinedInput
                                    dir={"rtl"}
                                    id={"search-input"}
                                    variant="outlined"
                                    label={"جستجو"}
                                    className={"coin-search"}
                                    placeholder={'جستجو'}
                                    sx={{borderRadius: '12px', height: '44px'}}
                                    startAdornment={<InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>}
                                    onChange={filter}
                                />
                            </FormControl>
                        </div>
                    </div>
                    <List
                        height={'100%'}
                        width={'100%'}
                    >
                        {
                            list ? list.map((i) => {
                                return <CoinSelectItem
                                    key={i[0]}
                                    title={i[0]}
                                    icon={i[1].icon}
                                    name={i[1].name}
                                    usd={i[1].usd}
                                    sell={i[1].sell}
                                    buy={i[1].buy}
                                    sellurl={i[1].sellurl}
                                    buyurl={i[1].buyurl}
                                    coin={coin}
                                    onClick={() => onCoinItemClicked(i)}
                                />
                            }) : null
                        }
                    </List>
                </div>
            </Dialog>
            <Container
                maxWidth={"lg"}
                className={"home-page"}
            >
                <Tooltip title="''" placement={"top"}>
                    <img className={"main-logo"} src={isDark ? DarkLogo : Logo} alt="logo"/>
                </Tooltip>
                <Grid
                    container
                    spaceing={24}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{direction: "ltr"}}
                >
                    <Grid item xs={3} sx={{margin: '0 5px'}} spaceing={2}>
                        <div className={"fake-coin-input"} onClick={handleClickOpen}>
                            <TextField fullWidth label="انتخاب ارز" size={"small"}/>
                            {
                                coin ?
                                    (<div className={"fake-input"}>
                                        <img src={coin[1].icon} alt=""/>
                                        <span>{coin[1].name} ({coin[0]})</span>
                                    </div>) : <></>
                            }
                        </div>
                    </Grid>
                    <Grid item xs={3} sx={{margin: '0 5px'}} spaceing={2}>
                        <TextField fullWidth value={unit} onChange={onUnitChange} label="واحد" type={"text"}
                                   size={"small"}/>
                    </Grid>
                    <Grid item xs={3} sx={{margin: '0 5px'}} spaceing={2}>
                        <TextField fullWidth value={price} onChange={onPriceChange} label="تومان" type={"text"}
                                   size={"small"}/>
                    </Grid>
                </Grid>
                <div className={"home-actions-button"}>
                    {
                        forBuy ?
                            <div className={"buy-actions-button"}>
                                <Button variant={"contained"}>در خواست خرید</Button>
                                <Button className={"secondary"} sx={{border: 'unset'}} variant={"outlined"} onClick={toggleForBuy}>فروش</Button>
                            </div>
                            :
                            <div className={"buy-actions-button"}>
                                <Button className={"secondary"} sx={{border: 'unset'}} variant={"outlined"} onClick={toggleForBuy}>خرید</Button>
                                <Button variant={"contained"}>در خواست فروش</Button>
                            </div>
                    }

                </div>
            </Container>
        </div>
    )
}
export default MainComponent;