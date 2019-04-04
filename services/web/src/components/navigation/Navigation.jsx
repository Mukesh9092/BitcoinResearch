import * as React from 'react'
import { withRouter } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import ChartIcon from '@material-ui/icons/MultilineChart'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import TextIcon from '@material-ui/icons/Textsms'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import * as styles from './styles.scss'

@withRouter
class NavigationComponent extends React.Component {
  state = {
    open: false,
  }

  toggleDrawer = (event) => {
    event.preventDefault()

    this.setState({
      open: !this.state.open,
    })
  }

  closeDrawer = (event) => {
    event.preventDefault()

    this.setState({
      open: false,
    })
  }

  navigateToDashboard = () => {
    this.props.history.push('/')
  }

  navigateToMarkets = () => {
    this.props.history.push('/markets')
  }

  navigateToAbout = () => {
    this.props.history.push('/about')
  }

  render() {
    const {
      location: { pathname },
    } = this.props

    const { open } = this.state

    let title
    let selected

    if (pathname === '/' || pathname.startsWith('/dashboard')) {
      title = 'Dashboard'
      selected = 'dashboard'
    } else if (pathname.startsWith('/chart')) {
      title = 'Chart'
      selected = 'dashboard'
    } else if (pathname.startsWith('/markets')) {
      title = 'Markets'
      selected = 'markets'
    } else if (pathname.startsWith('/about')) {
      title = 'About'
      selected = 'about'
    } else {
      title = 'Not Found'
      selected = 'notfound'
    }

    return [
      <AppBar position="static" className={styles.navigationBar}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>,
      <Drawer anchor="left" open={open} onClose={this.closeDrawer}>
        <div tabIndex={0} role="button" onClick={this.closeDrawer} onKeyDown={this.closeDrawer}>
          <ListItem button selected={selected === 'dashboard'} onClick={this.navigateToDashboard}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button selected={selected === 'markets'} onClick={this.navigateToMarkets}>
            <ListItemIcon>
              <ChartIcon />
            </ListItemIcon>
            <ListItemText primary="Markets" />
          </ListItem>

          <ListItem button selected={selected === 'about'} onClick={this.navigateToAbout}>
            <ListItemIcon>
              <TextIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </div>
      </Drawer>,
    ]
  }
}

export const Navigation = NavigationComponent
