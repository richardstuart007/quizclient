import React from 'react'
import {
  makeStyles,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Avatar
} from '@material-ui/core'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  AddCircleOutlineOutlined,
  SubjectOutlined,
  ViewList
} from '@material-ui/icons'
import { format } from 'date-fns'
import './index.css'

const drawerWidth = 240

const useStyles = makeStyles(theme => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3)
    },
    root: {
      display: 'flex'
    },
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    active: {
      background: '#f4f4f4'
    },
    title: {
      padding: theme.spacing(2)
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    date: {
      flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2)
    }
  }
})

export default function Layout({ children }) {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color='secondary' />,
      path: '/Notes'
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlineOutlined color='secondary' />,
      path: '/Create'
    },
    {
      text: 'QuestionList',
      icon: <ViewList color='secondary' />,
      path: '/QuestionList'
    },
    {
      text: 'Quiz',
      icon: <ViewList color='secondary' />,
      path: '/Quiz'
    },
    {
      text: 'DataEntry',
      icon: <ViewList color='secondary' />,
      path: '/DataEntry'
    },
    {
      text: 'TestRoute1',
      icon: <ViewList color='secondary' />,
      path: '/TestRoute1'
    },
    {
      text: 'TestRoute2',
      icon: <ViewList color='secondary' />,
      path: '/TestRoute2'
    },
    {
      text: 'TestRoute3',
      icon: <ViewList color='secondary' />,
      path: '/TestRoute3'
    },
    {
      text: 'Mtable',
      icon: <ViewList color='secondary' />,
      path: '/Mtable'
    },
    {
      text: 'Register',
      icon: <ViewList color='secondary' />,
      path: '/Register'
    }
  ]

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar
        position='fixed'
        className={classes.appBar}
        elevation={0}
        color='primary'
      >
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>Mario</Typography>
          <Avatar className={classes.avatar} src='./mario-av.png' />
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{ paper: classes.drawerPaper }}
        anchor='left'
      >
        <div>
          <Typography variant='h5' className={classes.title}>
            Quiz
          </Typography>
        </div>

        {/* links/list section */}
        <List>
          {menuItems.map(item => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}
