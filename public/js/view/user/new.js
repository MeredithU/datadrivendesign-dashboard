'use strict';

import React from 'react';

// Components
import Form from 'dashboard/component/form/Form';


export default function ({ user, onRegisterFormSubmit, onUsernameChange, onPasswordChange, onConfirmChange }) {
    return (
        <div>
            <Form onSubmit={onRegisterFormSubmit}>
                <input onChange={onUsernameChange} type="text" name="username" placeholder="Username" value={user.get('username')} />
                <input onChange={onPasswordChange} type="password" name="password" placeholder="Password" value={user.get('password')} />
                <input onChange={onConfirmChange} type="password" name="confirm" placeholder="Confirm" value={user.get('confirm')} />
                <input type="submit" value="Register" />
            </Form>
        </div>
    );
}