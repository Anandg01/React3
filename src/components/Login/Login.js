import React, { useState, useReducer, useContext } from 'react';
//import { useEffect } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") }
  }
  if (action.type === 'INPUT_BLUR') {
    if (state.value === undefined) {
      return { value: '', isValid: false }
    }
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { vlaue: action.val, isValid: action.val.length > 6 }
  }
  if (action.type === 'INPUT_BLUR') {
    return { vlaue: state.value, isValid: state.isValid }
  }
  return { value: '', isValid: false }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredCollagename, setCollageName] = useState('');

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null
  })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  })

  // useEffect(() => {

  //   const identifier = setTimeout(() => {
  //     console.log("valid check up")
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 &&
  //       enteredCollagename.trim().length
  //     );
  //   }, 500)

  //   return (() => {
  //     clearTimeout(identifier)
  //     console.log('clean up')
  //   })

  // }, [enteredEmail, enteredPassword, enteredCollagename])


  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value })
    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid &&
      enteredCollagename.trim().length
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    const value = event.target.value.trim();

    dispatchPassword({ type: "USER_INPUT", val: value })
    setFormIsValid(
      emailState.isValid && value.length > 6 &&
      enteredCollagename.trim().length
    );
  };

  const clgNameChangeHnd = (event) => {
    const enterdValue = event.target.value;
    setCollageName(enterdValue)
    setFormIsValid(
      emailState.isValid && passwordState.isValid &&
      enterdValue.trim().length
    );
  }

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" })
  };
  const AuthCtx = useContext(AuthContext)

  const submitHandler = (event) => {
    event.preventDefault();
    AuthCtx.onLogIn(emailState.value, passwordState.value);
  };


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-mail"
          type="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <Input
          id="clg-name"
          label="College name"
          type="text"
          isValid={true}
          value={enteredCollagename}
          onChange={clgNameChangeHnd}
          onBlur={() => { }}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
