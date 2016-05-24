/**
 * @copyright 2015, Prometheus Research, LLC
 */

import * as React from 'react';
import * as Stylesheet from 'react-stylesheet';
import {button, div} from 'react-dom-stylesheet/component';
import * as CSS from 'react-dom-stylesheet/css';
import {isString} from 'lodash';

let stylesheet = Stylesheet.create({
  Root: button({
    cursor: CSS.cursor.pointer,
    textAlign: CSS.textAlign.left,
    userSelect: CSS.none,
    WebkitUserSelect: CSS.none,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }),
  Caption: div({
    display: CSS.display.inlineBlock,
  }),
  Icon: 'span',
  IconWrapper: div({
    display: CSS.display.inlineBlock,
  }),
});

/**
 * Button component.
 *
 * Button is clickable element with optional icon and/or caption.
 */
export default class ButtonBase extends React.Component {

  static propTypes = {
    /**
     * If button should be rendered as being pressed.
     */
    active: React.PropTypes.bool,

    /**
     * Button size.
     */
    size: React.PropTypes.oneOf(['small', 'normal', 'large']),

    /**
     * Button's icon.
     */
    icon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.node
    ]),

    /**
     * Button's caption.
     */
    children: React.PropTypes.node,
  };

  static defaultProps = {
    size: 'normal',
    attach: {},
    stylesheet,
  };

  render() {
    let {
      children, icon,
      disabled, active, size,
      attach,
      variant,
      stylesheet: {Root, Caption, Icon, IconWrapper},
      ...props
    } = this.props;
    variant = {
      active, disabled,
      attachLeft: attach.left,
      attachRight: attach.right,
      attachTop: attach.top,
      attachBottom: attach.bottom,
      small: size === 'small',
      normal: size === 'normal',
      large: size === 'large',
      ...variant,
    };
    if (isString(icon)) {
      icon = <Icon name={icon} />;
    }
    let caption = null;
    if (children) {
      caption = <Caption>{children}</Caption>;
    }
    return (
      <Root
        {...props}
        disabled={disabled}
        variant={variant}
        aria-pressed={active}
        role="button">
        {icon ?
          <IconWrapper variant={{hasCaption: !!children}}>
            {icon}
          </IconWrapper> :
          null}
        {caption}
      </Root>
    );
  }
}

