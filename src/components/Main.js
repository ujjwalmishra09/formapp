import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from './Input';
import { createUser, updateValue, removeField } from '../reducers/formReducer';

function getStyles() {
  return {
    main: {
      maxWidth: 920,
      margin: 'auto',
      marginTop: 50
    }
  };
}

class Main extends React.Component {
  render() {
    const { formFields, processing } = this.props;
    const { main } = getStyles();

    return (
      <div className="card" style={main}>
        { processing && <p>Please Wait...</p>}
        {
          !processing
          && formFields.map((formField, index) => {
            return (
              <Input
                key={index}
                index={index}
                {...formField}
                onRemove={this.props.removeField}
                onChange={this.props.updateValue}
              />
            );
          })
        }
        {
          !processing && !formFields.length && <p> no form fields found </p>
        }
        {
          !processing && <button type="button" onClick={this.props.createUser}>Save</button>
        }
      </div>
    );
  }
}

Main.propTypes = {
  formFields: PropTypes.array.isRequired,
  processing: PropTypes.bool.isRequired,
  createUser: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
};

export default connect(({ formReducer: { formFields, processing } }) => {
  return {
    formFields,
    processing
  };
}, { createUser, updateValue, removeField })(Main);
