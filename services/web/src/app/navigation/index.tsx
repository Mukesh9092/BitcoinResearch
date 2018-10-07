import * as React from 'react'
import { Link, withRouter } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import * as styles from './styles.scss'

const materialUIStyles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

const MenuLink = (props) => {
  const { to, label, active } = props

  if (active) {
    return (
      <Link to={to} className={styles.active}>
        {label}
      </Link>
    )
  }

  return <Link to={to}>{label}</Link>
}

export const NavigationComponent = withStyles(materialUIStyles)((props) => {
  const {
    classes,
    location: { pathname },
  } = props

  return (
    <div className={styles.navigation}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.grow}>
              News
            </Typography>
            <Button color="inherit">LOGIN</Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  )
})

// <Button raised>Dashboard</Button>
// <Button raised>Markets</Button>
// <Button raised>About</Button>

export const Navigation = withRouter(NavigationComponent)
