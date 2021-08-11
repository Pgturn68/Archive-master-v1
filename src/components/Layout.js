import React from 'react'
import { makeStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router-dom'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { format } from 'date-fns' // Date Package

import Avatar from '@material-ui/core/Avatar'
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex' // Allows Sidebar to Sit Left, Content Right
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`

        },
        toolbar: theme.mixins.toolbar, // Classes Associated with 'toolbar' and Mixes CSS such as Height
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        },
        toplink: {
            textDecoration: "none"
        }
    }
})

export default function Layout( props ) {
    // Hooks
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    
    function HideOnScroll(props) {
        const { children, window } = props;
        // Note that you normally won't need to set the window ref as useScrollTrigger
        // will default to window.
        // This is only being set here because the demo is in an iframe.
        const trigger = useScrollTrigger({ target: window ? window() : undefined });
      
        return (
          <Slide appear={false} direction="down" in={!trigger}>
            {children}
          </Slide>
        );
      }
      
      HideOnScroll.propTypes = {
        children: PropTypes.element.isRequired,
        /**
         * Injected by the documentation to work in an iframe.
         * You won't need it on your project.
         */
        window: PropTypes.func,
      };

    // Array of Menu Items with Icons and Directory Path
    const menuItems = [
        {
            text: 'My Trips',
            icon: <SubjectOutlined color='secondary' />,
            path: '/notes'
        },
        {
            text: 'Add Trip',
            icon: <AddCircleOutlineOutlined color='secondary' />,
            path: '/create'
        }
    ]

    return (
        <div className={classes.root}>
            {/* App Bar */}
            <HideOnScroll {...props}>
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.date}>
                        {/* npm install date-fns */}
                        Today is the { format(new Date(), 'do MMMM Y') }
                    </Typography>
                    <Typography>
                        Avatar
                    </Typography>
                    <Avatar src='/mario-av.png' className={classes.avatar}/>
                </Toolbar>
            </AppBar>
            </HideOnScroll>
            {/* Side Bar */}
            <Drawer
                className={classes.drawer}
                variant='permanent'
                anchor='left'
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <NavLink to="/" className={classes.toplink}>
                    <Typography variant='h5' className={classes.title}>
                        Guilt Trip Logo 
                    </Typography>  
                    </NavLink>
                    
                </div>
            {/* Side Bar List Items */}
                <List>
                    {menuItems.map(item => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                            className={location.pathname == item.path ? classes.active : null} // Gives Active Page a Background
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Toolbar Top and Content Right */}
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {props.children}
            </div>
        </div>
    )
}