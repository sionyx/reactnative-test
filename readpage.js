import React, { Component } from 'react';
import {
  Image,
  ListView,
  Navigator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import HTMLView from './HTMLView/HTMLView';
import { NativeModules } from 'react-native';

var REQUEST_NEWSCONTENT_URL = 'http://mobs.mail.ru/news/v2/getNewsById?id=';

export default class ReadPage extends Component {
  constructor(props) {
    super(props);
    props.navBarHandler.TitleHandler = () => { return "Новость" }
    props.navBarHandler.RightButtonIcon = 'share'
    props.navBarHandler.RightButtonHandler = () => { this.shareNews() }
  }

  componentWillMount() {
    this.state = {
      newsContent: {},
      loaded: false,
    };
  }

  componentDidMount() {
    StatusBar.setNetworkActivityIndicatorVisible(true);
    this.fetchNewsContent();
  }

  fetchNewsContent() {
    fetch(REQUEST_NEWSCONTENT_URL + this.props.newsid)
      .then((response) => response.json())
      .then((responseData) => {
        StatusBar.setNetworkActivityIndicatorVisible(false);
        this.setState({
          newsContent: responseData,
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    var content = this.state.newsContent;
    return (
      <ScrollView style={styles.contentcontainer}>
        { this.renderImage(content) }
        { this.renderHeader(content) }
        { this.renderText(content) }
      </ScrollView>
    );
  }

  renderImage(content) {
    if (content.image_B) {
      return (
        <Image source={{uri: content.image_B}} style={styles.mainpicture} />
      );
    }
  }

  renderHeader(content) {
    return (
      <TouchableHighlight onPress={ () => this.shareNews() }>
      <View>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.date}>{content.date}</Text>
        <Text style={styles.textPreview}>{content.textPreview}</Text>
      </View>
      </TouchableHighlight>
    );
  }

  renderText(content) {
    return (
      <View style={styles.htmlViewContainer}>
        <HTMLView
          value={content.text}
          stylesheet={styles}
        />
      </View>
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

  shareNews() {
    var title = this.state.newsContent.title;
    var url = this.state.newsContent.url;
    var ShareUrl = NativeModules.ShareUrl;
    ShareUrl.shareUrl(url, {'title': title });
  }

}

const styles = StyleSheet.create({
  contentcontainer: {
    flex: 1,
    paddingTop: 62,
    backgroundColor: '#EEEEEE',
  },
  mainpicture: {
    flex: 1,
    height: 240,
  },
  title: {
    fontSize: 20,
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
  textPreview: {
    fontSize: 17,
    margin: 10,
    textAlign: 'left',
  },
  text: {
    fontSize: 15,
    margin: 10,
    textAlign: 'left',
  },
  htmlViewContainer: {
    marginHorizontal: 10
  }

});
