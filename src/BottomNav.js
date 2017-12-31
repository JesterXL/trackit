import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import {
  BrowserRouter as Router,
  Route,
  Link,
  StaticRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const homeIcon = <FontIcon className="material-icons">home</FontIcon>;
const photoCameraIcon = <FontIcon className="material-icons">photo_camera</FontIcon>;
const settingsIcon = <FontIcon className="material-icons">settings</FontIcon>;

const bottomNavStyles = {
  position: 'fixed',
  bottom: '0px',
  left: '0px',
  right: '0px'
}

const mapStateToProps = state => {
  const path = state.router.location.pathname;
  switch(path) {
    case '/':
    case '':
      return {bottomNavSelectedIndex: 0};
    case '/photo':
      return {bottomNavSelectedIndex: 1};
    case '/settings':
      return {bottomNavSelectedIndex: 2};
    default:
      return {bottomNavSelectedIndex: -1};
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onHomeClick: () => dispatch(push('/')),
    onPhotoClick: () => dispatch(push('/photo')),
    onSettingsClck: () => dispatch(push('/settings'))
  };
}

const BottomNav = ({
  bottomNavSelectedIndex, 
  onHomeClick,
  onPhotoClick,
  onSettingsClck
}) => {
  return (
  <Paper zDepth={1} style={bottomNavStyles}>
    <BottomNavigation selectedIndex={bottomNavSelectedIndex}>
      <BottomNavigationItem
        label="Home"
        icon={homeIcon}
        onClick={() => onHomeClick()}
      />
      <BottomNavigationItem
        label="Photo"
        icon={photoCameraIcon}
        onClick={() => onPhotoClick()}
      />
      <BottomNavigationItem
        label="Settings"
        icon={settingsIcon}
        onClick={() => onSettingsClck()}
      />
    </BottomNavigation>
  </Paper>
)};

const BottomNavConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomNav)

export default BottomNavConnected;