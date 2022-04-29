import {Grid, Icon, ListItem, ListItemButton, ListItemIcon} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CoinSelectItem = (props) => {
    return (
        <div
            className={"coin-select-item-wrapper"}
            onClick={props.onClick}
        >
            <ListItem
                className={"coin-select-item"}
            >
                <ListItemButton
                    className={"coin-list-item-clickable " + (props.selected ? "selected" : "")}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <ListItemIcon>
                                <img alt="" src={props.icon} className={"coin-item-icon"}/>
                            </ListItemIcon>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="description-box">
                                <div className={"title-box"}>
                                    <div className={"title"}>
                                        {props.name}
                                    </div>
                                    <div className={"title"}>
                                        {props.title}
                                    </div>
                                </div>
                                <div className={"price-box"}>
                                    <div className={"buy-price"}>
                                        قیمت خرید
                                    </div>
                                    <div className={"buy-price"}>
                                        {props.buy} تومان
                                    </div>
                                </div>
                                {
                                    props.coin && props.coin[0] === props.title ?
                                        <Icon className={"is-item-selected"}><CheckCircleIcon/></Icon> : <></>
                                }
                            </div>
                        </Grid>
                    </Grid>
                </ListItemButton>
            </ListItem>
        </div>
    )
}

export default CoinSelectItem;