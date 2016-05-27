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
  View,
  WebView
} from 'react-native';
import HTMLView from './HTMLView/HTMLView';
import { NativeModules } from 'react-native';
import platformStyles from './PlatformStyles';

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

    var HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Hello Static World</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #eeeeee;
      }
      h1 {
        padding: 10px;
        margin: 0;
        text-align: left;
        color: #333;
        font-size: 20px;
      }
      p {
        padding-left: 10px;
        padding-right: 10px;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <img src=${ content.image_B } width='100%' />
    <h1>${ content.title }</h1>
    <p>${ content.textPreview }</p>
    ${content.text}
  </body>
</html>
`;

    return (
       <View style={[styles.contentcontainer, platformStyles.navbarPadding]}>
        <WebView source={{html: HTML}} style={styles.webview} />
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
    backgroundColor: '#EEEEEE',
  },
  webview: {
    flex: 1,
  }
});
