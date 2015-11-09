'use strict';

import React from 'react';

// Components
import Form from 'dashboard/component/form/Form';

export default function ({ onSubmit, onUsernameChange, onPasswordChange, email, password, errors = [] }) {
    const errorsString = errors.map(function (error, index) {
        const key = `form-error-${index}`;
        
        return (
            <li key={key}>{error}</li>
        );
    });

    return (
        <Form className="center-vertically" key="login-form" onSubmit={onSubmit}>
            <ul className="error no-bullet">
                {errorsString}
            </ul>
            <input placeholder="e-mail" className="form-control" key="input-username" type="text" name="email" onChange={onUsernameChange} value={email} />
            <input placeholder="password" className="form-control" key="input-password" type="password" name="password" onChange={onPasswordChange} value={password} />
            <input type="submit" className="btn btn-primary" />
        </Form>
    )

}