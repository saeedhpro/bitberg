import {Grid, ListItem, ListItemButton, ListItemIcon} from "@mui/material";

const Link = (props) => {
    return (
        <div
            className={"link-item-wrapper"}
            onClick={props.onClick}
        >
            <ListItem
                sx={{direction: 'rtl', paddingTop: '4px', paddingBottom: '4px'}}
                className={"link-select-item"}
            >
                <ListItemButton
                    className={"link-list-item-clickable"}
                >
                    <Grid container spacing={2}>
                        {
                            props.icon ? <Grid item xs={3}>
                                <ListItemIcon>
                                    <img alt="" src={props.icon} className={"link-item-icon"}/>
                                </ListItemIcon>
                            </Grid> : <></>
                        }
                        <Grid item xs={props.icon ? 9 : 12}>
                            <div className={"title-box"}>
                                <div className={"title"}>
                                    {props.name}
                                </div>
                                <div className={"title"}>
                                    {props.title}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </ListItemButton>
            </ListItem>
        </div>
    )
}

export default Link;