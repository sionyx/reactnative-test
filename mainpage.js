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
  TouchableHighlight,
  View
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions/mainPageActions'

class MainPage extends Component {
  constructor(props) {
    super(props);
    props.navBarHandler.TitleHandler = () => { return "Картина дня" }
    this.state = {
      hotnewsDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      updated: false
    };
  }

  componentDidMount() {
    this.props.actions.updateMainPage();
  }

  componentWillReceiveProps(nextProps) {
    const { hotnews, loaded } = nextProps.mainPage
    this.setState({
      hotnewsDataSource: this.state.hotnewsDataSource.cloneWithRows(hotnews),
      updated: loaded
    });
  }

  _navigateToReadPage(title, id) {
    this.props.navigator.push({
      id: 'Read',
      passProps: {
        newsid: id
      }
    });
  }

  render() {
    const { hotnewsDataSource, updated } = this.state;
    StatusBar.setNetworkActivityIndicatorVisible(!updated);
    if (!updated) {
      return this.renderLoadingView();
    }

    return (
          <ListView
            dataSource={hotnewsDataSource}
            renderRow={ (news) => this.renderHotNews(news)}
            style={styles.listView}
          />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading news...
        </Text>
      </View>
    );
  }

  renderHotNews(news) {
    return (news.priority == 0)
      ? this.renderNewsImageTemplate(news)
      : this.renderNewsRegularTemplate(news);
  }

  renderNewsImageTemplate (news) {
    return (
      <TouchableHighlight onPress={ () => this._navigateToReadPage(news.title, news.id) }>
        <View style={styles.mainpicturecontainer}>
          <Image
            source={{uri: news.image_B}}
            style={styles.mainpicture}>
            <View style={styles.mainpictureTitleContainer}>
              <Text style={styles.mainpictureTitle}>{news.title}</Text>
            </View>
          </Image>
        </View>
      </TouchableHighlight>
    );
  }
  renderNewsRegularTemplate (news) {
    return (
      <TouchableHighlight onPress={ () => this._navigateToReadPage(news.title, news.id) }>
        <View style={styles.container}>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{news.title}</Text>
            <Text style={styles.date}>{news.date}</Text>
          </View>
          <Image
            source={{uri: news.image_D}}
            style={styles.thumbnail}
          />
        </View>
      </TouchableHighlight>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  rightContainer: {
    flex: 1,
  },
  mainpictureTitleContainer: {
    flex: 1,
    //backgroundColor: 'rgba(0,0,0,0)',
  },
  mainpicturecontainer: {
    flex: 1,
  },
  mainpicture: {
    flex: 1,
    height: 191,
  },
  thumbnail: {
    width: 100,
    height: 80,
    marginRight: 10,
  },
  mainpictureTitle: {
    fontSize: 17,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'left',
    color: 'white',
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  title: {
    fontSize: 17,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 5,
    textAlign: 'left',
  },
  date: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 12,
    textAlign: 'left',
    color: '#CCCCCC',
  },

  listView: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#F5FCFF',
  },
});

function mapStateToProps (state) {
  return {
    mainPage: state.mainPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
