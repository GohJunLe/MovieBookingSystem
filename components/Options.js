import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import Option from './Option';
import PropTypes from 'prop-types'


const { width } = Dimensions.get('window');
const optionWith = (width - 0) / 3 - 10;

export default class Options extends Component {

  static propTypes = {  
    values: PropTypes.array.isRequired,  
    chosen: PropTypes.number,
    onChoose: PropTypes.func.isRequired,
  }

  render() {
    const { values, chosen, onChoose } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(scrollView) => { this._scrollView = scrollView; }}          
          horizontal={true}         
          decelerationRate={0.1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          snapToInterval={optionWith}
          style={styles.options}
        >
          {values.map((value, index) =>
            <View style={{ width: optionWith }} key={index}>
              <Option
                value={value}
                isChosen={index === chosen}
                onChoose={() => onChoose(index)}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  options: {
    flexDirection: 'row',
    marginRight: -10,
  },
});
