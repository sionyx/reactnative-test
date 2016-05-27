'use strict';
'use babel';

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  Menu,
  Navigator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions/sideMenuActions'

import MainPage from './mainpage';
import ReadPage from './readpage';
import RubricsMenu from './rubricsmenu';

export default class NewsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpened: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { menuOpened } = nextProps.sideMenu
    this.setState({
      menuOpened: menuOpened,
    });
  }

  render() {
    var self = this;

    var NavigationBarRouteMapper = {
      LeftButton: function(route, navigator, index, navState) {
        if (index > 0) {
          var previousRoute = navState.routeStack[index - 1];
          return (
            <TouchableOpacity onPress={ () => navigator.pop() } style={styles.navbarLeftButton}>
              <Image
                source={require('./resources/back.png')}
                style={styles.navbarButtonIcon} />
            </TouchableOpacity>
          );
        }

        if (route.navBarHandler && route.navBarHandler.LeftButtonIcon) {
          var content;
          switch (route.navBarHandler.LeftButtonIcon) {
            case 'sidebar':
              content = (
                <Image
                source={require('./resources/side_menu.png')}
                style={styles.navbarButtonIcon} />
              )
              break;
            default:
              console.error('Wrong icon for right button. Supported icons: sidebar');
          }

          return (
            <TouchableOpacity onPress={ () => route.navBarHandler.LeftButtonHandler() } style={styles.navbarLeftButton}>
              { content }
            </TouchableOpacity>
          )
        }
        return null;
      },
      RightButton: function(route, navigator, index, navState) {
        if (route.navBarHandler && route.navBarHandler.RightButtonIcon) {
          var content;
          switch (route.navBarHandler.RightButtonIcon) {
            case 'share':
              content = (
                <Image
                source={require('./resources/share.png')}
                style={styles.navbarButtonIcon} />
              )
              break;
            default:
              console.error('Wrong icon for right button. Supported icons: share');
          }

          return (
            <TouchableOpacity onPress={ () => route.navBarHandler.RightButtonHandler() } style={styles.navbarRightButton}>
              { content }
            </TouchableOpacity>
          );
        }

        return null;
      },
      Title: function(route, navigator, index, navState) {
        return (
          <Text style={[styles.navbarText, styles.navbarTitleText]}>
            { route.navBarHandler.TitleHandler ? route.navBarHandler.TitleHandler() : route.Title }
          </Text>
        );
      }
    }

    return (
      <SideMenu menu={<RubricsMenu />} isOpen={ this.state.menuOpened }>
       <View style={{ flex:1 }}>
         <StatusBar
           backgroundColor="blue"
           barStyle="light-content"
         />
        <Navigator
          initialRoute={{ id: 'Main' }}
          renderScene={ (route, navigator) => this.renderScene(route, navigator) }
          navigationBar={<Navigator.NavigationBar
                            routeMapper={NavigationBarRouteMapper}
                            style={styles.navbar}
                         />}
        />
       </View>
      </SideMenu>
    );
  }

  renderScene(route, navigator) {
    switch (route.id) {
      case 'Read':
        if (!route.navBarHandler) {
          route.navBarHandler = {};
        }
        return (<ReadPage navigator={navigator} navBarHandler={route.navBarHandler} {...route.passProps} />);
      default:
        if (!route.navBarHandler) {
          route.navBarHandler = { LeftButtonIcon: 'sidebar',
                                  LeftButtonHandler: () => { this.props.actions.openSideMenu() } }
        }
        return (<MainPage navigator={navigator} navBarHandler={route.navBarHandler} {...route.passProps} />);
    }
  }
}

var styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#168de2',
  },
  navbarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navbarTitleText: {
    color: 'white',
    fontWeight: '500',
  },
  navbarLeftButton: {
    paddingLeft: 10,
  },
  navbarRightButton: {
    paddingLeft: 10,
  },
  navbarButtonIcon: {
    flex: 1,
    height: 21,
    resizeMode: 'contain',
    margin: 10,
  },
});

function mapStateToProps (state) {
  return {
    sideMenu: state.sideMenuReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsApp)
