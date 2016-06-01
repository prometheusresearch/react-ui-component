/**
 * @copyright 2016-present, Prometheus Research, LLC
 */

import React from 'react';
import noop from 'lodash/noop';

export default class CheckboxBase extends React.Component {

  static stylesheet = {
    Root: 'div',
    Input: 'input',
    LabelWrapper: 'div',
    Hint: 'div',
    Label: 'div',
  };

  static defaultProps = {
    onChange: noop,
  };

  render() {
    let {value, label, hint, ...props} = this.props;
    let {Root, Input, Label, Hint, LabelWrapper} = this.constructor.stylesheet;
    return (
      <Root>
        <Input
          {...props}
          type="checkbox"
          checked={value}
          onChange={this.onChange}
          />
        {label &&
          <LabelWrapper onClick={this.onClick}>
            <Label>{label}</Label>
            <Hint>{hint}</Hint>
          </LabelWrapper>}
      </Root>
    );
  }

  onClick = _e => {
    if (!this.props.value) {
      this.props.onChange(true);
    }
  };

  onChange = e => {
    this.props.onChange(e.target.checked);
  };
}


