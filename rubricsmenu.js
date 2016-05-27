import React, { Component } from 'react';
import {
  Image,
  ListView,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { NativeModules } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions/mainPageActions'
import platformStyles from './PlatformStyles';

export default class RubricsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      informer: {},
      updated: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { informer, categories, loaded } = nextProps.mainPage
    this.setState({
      categoriesDataSource: this.state.categoriesDataSource.cloneWithRows(categories),
      informer: informer,
      updated: loaded
    });
  }

  render() {
    if (!this.state.updated) {
      return null;
    }

    return (
      <ScrollView style={styles.contentcontainer}>
        { this.renderInfoBlock(this.state.informer) }
        { this.renderCategoriesBlock(this.state.categoriesDataSource) }
      </ScrollView>
    );
  }

  renderInfoBlock(informer) {
    return (
      <Image
        source={{uri: informer.weather.photo }}
        style={styles.infoBlockBG}>
        <View style={[styles.infoBlockOverlay, platformStyles.infoBlockOverlay]}>
          <View style={[styles.infoBlockContent, platformStyles.infoBlockContent]}>
            <Text style={styles.infoBlockCityText}>{ informer.weather.city }</Text>
            <Text style={[styles.infoBlockTemperatureText, platformStyles.infoBlockTemperatureText]}>{ informer.weather.degree }°</Text>
            <Text style={styles.infoBlockWeatherText}>{ informer.weather.description }</Text>
            <View style={styles.currencyRate}>
              <Text style={styles.currencyRateTextBold}>{informer.currency[0].currency} </Text>
              <Text style={styles.currencyRateText}>{informer.currency[0].rate} </Text>
              <Text style={styles.currencyRateTextBold}>{informer.currency[1].currency} </Text>
              <Text style={styles.currencyRateText}>{informer.currency[1].rate} </Text>
              <Text style={styles.currencyRateTextBold}>{informer.currency[2].currency} </Text>
              <Text style={styles.currencyRateText}>{informer.currency[2].rate}</Text>
            </View>
          </View>
        </View>
      </Image>
    );
  }

  renderCategoriesBlock(dataSource) {
    return (
      <ListView
        dataSource={dataSource}
        renderRow={ (category) => this.renderCategory(category)}
        style={styles.listView}
      />
    )
  }

  renderCategory(category) {
    return (
      <View style={styles.categoryItem}>
        <Text style={styles.categoryItemText}>{ category.name }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentcontainer: {
    flex: 1,
    backgroundColor: '#111111',
  },

  infoBlockBG: {
    flex: 1,
  },
  infoBlockOverlay: {
  },
  infoBlockContent: {

  },
  infoBlockCityText: {
    marginLeft: 10,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#00000000',
  },
  infoBlockTemperatureText: {
    fontWeight: '200',
    fontSize: 48,
    marginLeft: 10,
    color: 'white',
    backgroundColor: '#00000000',
  },
  infoBlockWeatherText: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 5,
    color: 'white',
    backgroundColor: '#00000000',
  },
  currencyRate: {
    padding: 10,
    backgroundColor: '#00000066',
    flexDirection: 'row',
  },
  currencyRateTextBold: {
    fontWeight: 'bold',
    fontSize: 11,
    color: 'white',
  },
  currencyRateText: {
    fontSize: 11,
    color: 'white',
  },
  listView: {
    flex: 1,
  },
  categoryItem: {
    backgroundColor: '#00000000',
    borderBottomColor: '#333333',
    borderBottomWidth: 1,
  },
  categoryItemText: {
    color: 'white',
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#00000000',
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

export default connect(mapStateToProps, mapDispatchToProps)(RubricsMenu)
