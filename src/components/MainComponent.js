import {
    Grid,
    Tooltip,
    Container,
    TextField,
    Dialog,
    useTheme, IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment, List
} from "@mui/material";
import Logo from "../assets/images/logo.jpg";
import {useEffect, useState} from "react";
import {getPriceList} from "../services/prices";
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import CoinSelectItem from "./CoinSelectItem"

const MainComponent = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [list, setList] = useState([])
    const [prices, setPrices] = useState([])
    const [coin, setCoin] = useState(null)
    const [openList, setOpenList] = useState(false);
    const [price, setPrice] = useState("0");
    const [unit, setUnit] = useState("0");

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

    const onUnitChange = (e) => {
        const re = /^\d+(\.\d{0,9})?$/;
        console.log(e.target.value)
        if (e.target.value === '' || re.test(e.target.value)) {
            let number = parseFloat(e.target.value.toString())
            if (!number) {
                number = 0.0
            }
            // console.log(number)
            setUnit(number.toString())
        }
    }

    const onPriceChange = (e) => {
        const re = /^\d+(\.\d{0,9})?$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setPrice(e.target.value.toString())
        }
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
    }, [price])

    return (
        <div className={"main-component"}>
            <Dialog
                open={openList}
                fullScreen={fullScreen}
                onClose={handleClickOpen}
                dir={"rtl"}
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
                    <img className={"main-logo"} src={Logo} alt="logo"/>
                </Tooltip>
                <Grid
                    container
                    spaceing={24}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{direction: "ltr"}}
                >
                    <Grid item xs={3} spaceing={2}>
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
                    <Grid item xs={3} spaceing={2}>
                        <TextField fullWidth value={unit} onChange={onUnitChange} label="واحد" type={"text"} size={"small"}/>
                    </Grid>
                    <Grid item xs={3} spaceing={2}>
                        <TextField fullWidth value={price} onChange={onPriceChange} label="تومان" type={"text"} size={"small"}/>
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}
export default MainComponent;