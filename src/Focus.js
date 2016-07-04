/**
 * @copyright 2016-present, Prometheus Research, LLC
 */

import invariant from 'invariant';
import React from 'react';
import ReactDOM from 'react-dom';

export let contextTypes = {
  focusable: React.PropTypes.object,
};

export class Focusable extends React.Component {

  static contextTypes = contextTypes;

  constructor(props) {
    super(props);
    this._ref = null;
    this._inputRef = null;
  }

  get input() {
    return ReactDOM.findDOMNode(this._inputRef || this._ref || this);
  }

  get isFocused() {
    return this.input === document.activeElement;
  }

  render() {
    return React.cloneElement(
      React.Children.only(this.props.children), {
        ref: this.onRef,
        inputRef: this.onInputRef,
      }
    );
  }

  onInputRef = _inputRef => {
    this._inputRef = _inputRef;
    if (this.props.inputRef) {
      this.props.inputRef(_inputRef);
    }
  };

  onRef = _ref => {
    this._ref = _ref;
  };

  componentDidMount() {
    if (this.props.focusIndex != null) {
      this.context.focusable.register(this, this.props.focusIndex);
    }
  }

  componentWillUnmount() {
    if (this.props.focusIndex != null) {
      this.context.focusable.unregister(this, this.props.focusIndex);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.focusIndex !== nextProps.focusIndex) {
      if (this.props.focusIndex != null) {
        this.context.focusable.unregister(this, this.props.focusIndex);
      }
      if (nextProps.focusIndex != null) {
        this.context.focusable.register(this, nextProps.focusIndex);
      }
    }
  }

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }
}

export class FocusableList extends React.Component {

  static childContextTypes = contextTypes;

  constructor(props) {
    super(props);
    this.items = {};
  }

  getChildContext() {
    return {
      focusable: this
    };
  }

  render() {
    let {tabIndex, children} = this.props;
    return React.cloneElement(
      React.Children.only(children), {
        tabIndex,
        onKeyDown: this.onKeyDown,
        onFocus: this.onFocus,
      });
  }

  getFocusedIndex() {
    let keys = this.getKeys();
    let focused = keys.find(key => this.items[key].isFocused);
    if (focused === undefined) {
      focused = -1;
    }
    return parseInt(focused, 10);
  }

  getKeys() {
    let keys = Object.keys(this.items);
    keys.sort();
    return keys;
  }

  register = (focusable, focusIndex) => {
    invariant(
      this.items[focusIndex] === undefined,
      'Inconsistent state'
    );
    this.items[focusIndex] = focusable;
  };

  unregister = (focusable, focusIndex) => {
    invariant(
      this.items[focusIndex] === focusable,
      'Inconsistent state'
    );
    delete this.items[focusIndex];
  };

  focusPrev = () => {
    let fromIndex = this.getFocusedIndex();
    let keys = this.getKeys();
    let nextKey;
    if (fromIndex === -1) {
      nextKey = keys[keys.length - 1];
    } else if (fromIndex === 0) {
      nextKey = keys[keys.length - 1];
    } else {
      nextKey = keys[fromIndex - 1];
    }
    if (nextKey !== undefined && nextKey > -1) {
      this.items[nextKey].focus();
      return true;
    } else {
      return false;
    }
  };

  focusNext = () => {
    let fromIndex = this.getFocusedIndex();
    let keys = this.getKeys();
    let nextKey;
    if (fromIndex === -1) {
      nextKey = keys[0];
    } else if (fromIndex === keys.length - 1) {
      nextKey = keys[0];
    } else {
      nextKey = keys[fromIndex + 1];
    }
    if (nextKey !== undefined && nextKey < keys.length) {
      this.items[nextKey].focus();
      return true;
    } else {
      return false;
    }
  };

  onKeyDown = event => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        if (this.focusPrev()) {
          event.preventDefault();
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        if (this.focusNext()) {
          event.preventDefault();
        }
        break;
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  };

  onFocus = () => {
    let focusedIndex = this.getFocusedIndex();
    if (focusedIndex !== -1) {
      return;
    }
    let activeDescendant = this.props.activeDescendant;
    if (activeDescendant && this.items[activeDescendant]) {
      this.items[activeDescendant].focus();
    } else {
      let keys = this.getKeys();
      activeDescendant = keys[0];
      if (activeDescendant && this.items[activeDescendant]) {
        this.items[activeDescendant].focus();
      }
    }
  };
}