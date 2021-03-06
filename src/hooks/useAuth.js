import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authorizeUser, SET_SESSION_ERROR, setSessionError } from '../actions/authActions';
import { getSignUpUser, getLoginUser } from '../services/authServices';
import { useHistory } from 'react-router-dom';

export const useAuth = (type) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = { email, userName, password };
    
    if(password !== retypePassword) {
      dispatch(setSessionError({ message: 'Passwords must match', status: 400 }));
    } else {
      return dispatch(authorizeUser(user, (type === 'signUp') ? getSignUpUser : getLoginUser))
        .then(res => {
          if(res.type === SET_SESSION_ERROR) {
            throw new Error(res.payload.message);
          } else {
            history.push(type === 'login' ? '/profile' : `/newuser?friendcode=${res.friendCode}&username=${res.userName}`);
          }
        });
    }
  };

  return { userName, setUserName, email, setEmail, password, setPassword, retypePassword, setRetypePassword, handleSubmit, hidePassword, setHidePassword };
};
