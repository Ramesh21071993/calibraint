import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import { connect } from "react-redux";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        // paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    list: {
        marginLeft: 30
    },
    title: {
        float: 'left'
    }
}));


const Dashboard = (props) => {
    const classes = useStyles();

    const { history, places } = props;

    const [placesArray, setPlacesArray] = useState({})
    const [allCheck, setAllCheck] = useState({})
    const [wheatherData, setWheaterData] = useState({})
    const [placesDetails, setPlacesDetails] = useState([])
    const [checked, setChecked] = useState([]);
    const routeTo = (routeName, props) => {
        history.push(routeName, props);
    };

    useEffect(() => {
        let userDetailsString = localStorage.getItem('calibraint_user') || "";
        let userDetails = userDetailsString != '' ? JSON.parse(userDetailsString) : {};
        if (!userDetails.isLogined) {
            routeTo('login', {})
        }
        let wheatherDataString = localStorage.getItem('wheatherData') || "";
        let wheather = wheatherDataString != '' ? JSON.parse(wheatherDataString) : {};
        setWheaterData(wheather)
        let checkedDataString = localStorage.getItem('checkedData') || "";
        let checkedData = checkedDataString != '' ? JSON.parse(checkedDataString) : [];
        setChecked(checkedData)
        
    }, [])

    useEffect(() => {
        setPlacesArray(places)
        let placesArray = [];
        Object.keys(places).map(place => {
            places[place].map((row) => {
                placesArray.push(row)
            })
        })
        setPlacesDetails(placesArray)
    }, [places])

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            if (wheatherData[value]) {
                let wheatherDataCopy = wheatherData;
                delete wheatherDataCopy[value];
                setWheaterData(wheatherDataCopy)
            }
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const handleSave = () => {
        localStorage.setItem('wheatherData', JSON.stringify(wheatherData))
        localStorage.setItem('checkedData', JSON.stringify(checked))
    }

    useEffect(() => {
        checked.forEach(id => {
            if (!wheatherData[id]) {
                axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=3de3f49df51a24ee56ac82d572d18dcd`)
                    .then(res => {
                        const result = res.data;
                        setWheaterData({
                            ...wheatherData,
                            [id]: {
                                name: placesDetails.filter(el => el.id == id)[0]['name'],
                                temp: result['main']['temp'],
                                temp_max: result['main']['temp_max'],
                                temp_min: result['main']['temp_min'],
                                pressure: result['main']['pressure'],
                                humidity: result['main']['humidity'],
                            }
                        })
                    })
            }
        })
    }, [checked])


    useEffect(() => {
        console.log(wheatherData)
    }, [wheatherData])


    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Dashboard
          </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid container item xs={4} md={4} spacing={3}>
                            <div>
                                {
                                    Object.keys(placesArray).map((place, index) => (
                                        <div key={index}>
                                            <Typography className={classes.title} variant="h5" gutterBottom>
                                                {place}
                                            </Typography>
                                            <List className={classes.list}>
                                                {placesArray[place].length > 0 ? placesArray[place].map(value => {
                                                    const labelId = `checkbox-list-label-${value.id}`;
                                                    return (
                                                        <ListItem key={value.id} role={undefined} dense button onClick={() => handleToggle(value.id)}>
                                                            <ListItemIcon>
                                                                <Checkbox
                                                                    edge="start"
                                                                    checked={checked.indexOf(value.id) !== -1}
                                                                    tabIndex={-1}
                                                                    disableRipple
                                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                                />
                                                            </ListItemIcon>
                                                            <ListItemText id={labelId} primary={`${value.name}`} />
                                                        </ListItem>
                                                    );
                                                }) : <ListItem dense button>
                                                        <ListItemText primary={`No Cities found`} />
                                                    </ListItem>}
                                            </List>
                                        </div>
                                    ))
                                }
                                <div>
                                <Button
                                    onClick={(e) => handleSave(e)}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Save
                                </Button>
                            </div>
                            </div>
                        </Grid>
                        <Grid container item xs={8} md={8} spacing={3}>
                            <Grid container spacing={2}>
                                {
                                    Object.keys(wheatherData).map((city, index) => (
                                        <Grid item key={index} xs={12} sm={6} md={4}>
                                            <Card className={classes.card}>
                                                <CardContent className={classes.cardContent}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {wheatherData[city].name}
                                                    </Typography>
                                                    <Typography>
                                                        {`Temp: ${wheatherData[city].temp}`}
                                                    </Typography>
                                                    <Typography>
                                                        {`Max Temp: ${wheatherData[city].temp_max}`}
                                                    </Typography>
                                                    <Typography>
                                                        {`Min Temp: ${wheatherData[city].temp_min}`}
                                                    </Typography>
                                                    <Typography>
                                                        {`Pressure: ${wheatherData[city].pressure}`}
                                                    </Typography>
                                                    <Typography>
                                                        {`Humidity: ${wheatherData[city].humidity}`}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    places: state.wheather.placesArray
});
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
