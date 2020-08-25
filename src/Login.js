import React from 'react';
import { Button } from '@material-ui/core';

import { auth, provider } from './firebase';

import { useStateProviderValue } from './StateProvider';
import { actionTypes } from './reducer';


function Login() {

    const [{}, dispatch] = useStateProviderValue();


    const signIn = () =>{
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
            .catch((error) => alert(error.message));
    }

    return (
        <div className="Login">
            <div className="Login__container">
                <Button variant="contained" color="primary" onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
