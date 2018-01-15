const initialState = {
  formFields: [
    {
      type: 'text',
      label: 'Name',
      value: 'My Name',
      disabled: false,
      placeholder: 'Enter your name',
    },
    {
      type: 'email',
      label: 'Email',
      value: 'abc@abc.com',
      disabled: false,
      placeholder: 'Enter your email',
    }
  ],
  processing: false
};

export default function reducer(state = initialState, action) {

  switch (action.type) {

  case 'CREATE_USER_PENDING':
    return {
      ...state,
      processing: true
    };

  case 'CREATE_USER_SUCCESS':
    return {
      ...state,
      processing: false
      // formFields: action.payload // use if it is network request
    };

  case 'CREATE_USER_FILURE':
    return {
      ...state,
      processing: false,
      error: true
    };

  case 'REMOVE_FORM_FIELD': {
    return {
      ...state,
      formFields: state.formFields.filter((formField, index) => index !== action.payload)
    };
  }

  case 'ADD_FORM_FIELD':
    return {
      ...state,
      formFields: state.formFields.concat(action.payload)
    };

  case 'UPDATE_FORM_FIELD': {
    const newArrary = state.formFields.map(
      (formField, index) => {
        if (index === action.payload.index) return { ...formField, value: action.payload.value };
        return formField;
      }
    );
    return {
      ...state,
      formFields: newArrary
    };
  }

  default:
    return state;
  }

}

export function createUser() {
  return (dispatch) => {
    dispatch({ type: 'CREATE_USER_PENDING' });
    // you can use any network opration here
    setTimeout(() => dispatch({ type: 'CREATE_USER_SUCCESS' }), 2000);
  };
}

export function removeField(index) {
  return (dispatch) => {
    dispatch({ type: 'REMOVE_FORM_FIELD', payload: index });
  };
}

export function updateValue(index, value) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_FORM_FIELD', payload: { index, value } });
  };
}
