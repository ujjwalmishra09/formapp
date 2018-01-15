
/*
 * smple data for input
 * {
 *   type: 'text',
 *   label: 'name',
 *   value: 'My Name',
 *   disabled: false,
 *   placeholder: 'Enter your name',
 * }
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {

  constructor(props) {
    super(props);
    this.onRemove = this.onRemove.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onRemove() {
    const { onRemove, index } = this.props;
    if (typeof onRemove === 'function') onRemove(index);
  }

  onChange(e) {
    const { onChange, index } = this.props;
    if (typeof onChange === 'function') onChange(index, e.target.value);
  }

  render() {
    const { type, label, value, disabled, placeholder } = this.props;

    if (!type || !label) return null;

    return (
      <div className="input">
        <div className="form-group">
          <label style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            {label}
            <div>
              <span
                className="glyphicon glyphicon-remove"
                style={{ color: 'red' }}
                onClick={this.onRemove}
                aria-hidden="true"
              />
            </div>
          </label>
          <input
            className="form-control"
            type={type}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

Input.defaultProps = {
  disabled: false,
  placeholder: 'Please enter some value',
};

Input.propTypes = {
  index: PropTypes.number,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onRemove: PropTypes.func,
  onChange: PropTypes.func
};
