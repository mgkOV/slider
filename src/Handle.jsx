import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Handle extends React.Component {
  state = {
    clickFocused: false,
  }

  setClickFocus(focused) {
    this.setState({ clickFocused: focused });
  }

  handleMouseDown = () => {
    if (document.activeElement !== this.handle) {
      this.setClickFocus(true);
    }
  }

  handleBlur = () => {
    this.setClickFocus(false);
  }

  handleKeyDown = () => {
    this.setClickFocus(false);
  }

  clickFocus() {
    this.setClickFocus(true);
    this.focus();
  }

  focus() {
    this.handle.focus();
  }

  blur() {
    this.handle.blur();
  }

  render() {
    const {
      prefixCls, vertical, offset, style, disabled, min, max, value, tabIndex, ...restProps,
    } = this.props;

    const className = classNames(
      this.props.className,
      {
        [`${prefixCls}-handle-click-focused`]: this.state.clickFocused,
      }
    );

    const postionStyle = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    const elStyle = {
      ...style,
      ...postionStyle,
    };
    let ariaProps = {};
    if (value !== undefined) {
      ariaProps = {
        ...ariaProps,
        'aria-valuemin': min,
        'aria-valuemax': max,
        'aria-valuenow': value,
        'aria-disabled': !!disabled,
      };
    }
    return (
      <div
        ref={node => (this.handle = node)}
        role="slider"
        tabIndex= {tabIndex || 0}
        {...ariaProps}
        {...restProps}
        className={className}
        style={elStyle}
        onMouseDown={this.handleMouseDown}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

Handle.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  vertical: PropTypes.bool,
  offset: PropTypes.number,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  tabIndex: PropTypes.number,
};
