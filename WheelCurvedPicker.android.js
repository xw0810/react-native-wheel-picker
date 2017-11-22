'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ColorPropType,
  requireNativeComponent,
} from 'react-native';


class WheelCurvedPicker extends Component {

  static propTypes = {
    ...View.propTypes,
    data: PropTypes.array,
    textColor: ColorPropType,
    textSize: PropTypes.number,
    itemStyle: PropTypes.object,
    itemSpace: PropTypes.number,
    onValueChange: PropTypes.func,
    selectedValue: PropTypes.any,
    selectedIndex: PropTypes.number,
    indicator: PropTypes.boolean,
    indicatorSize: PropTypes.number,
    indicatorColor: ColorPropType,
  };

  static defaultProps = {
    itemStyle: { color: "white", fontSize: 26 },
    itemSpace: 20,
  };

  constructor(props) {
    super(props);
    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._stateFromProps(nextProps));
  }

  _stateFromProps = (props) => {
    var selectedIndex = 0;
    var items = [];
    React.Children.forEach(props.children, function (child, index) {
      if (child.props.value === props.selectedValue) {
        selectedIndex = index;
      }
      items.push({ value: child.props.value, label: child.props.label });
    });

    var textSize = props.itemStyle.fontSize;
    var textColor = props.itemStyle.color;

    return { selectedIndex, items, textSize, textColor };
  };

  _onValueChange = (e) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(e.nativeEvent.data);
    }
  };

  render() {
    return <WheelCurvedPickerNative
      {...this.props}
      onValueChange={this._onValueChange}
      data={this.state.items}
      textColor={this.state.textColor}
      textSize={this.state.textSize}
      selectedIndex={parseInt(this.state.selectedIndex)}/>;
  }
}

WheelCurvedPicker.Item = (props) => null;

WheelCurvedPicker.Item.propTypes = {
  value: PropTypes.any, // string or integer basically
  label: PropTypes.string,
};

var WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker', WheelCurvedPicker);

module.exports = WheelCurvedPicker;
