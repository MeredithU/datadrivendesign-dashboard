'use strict';


import React from 'react';


class Form extends React.Component {

    constructor () {
        super(...arguments);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit (e) {
        e.preventDefault();
        const el = e.target;

        const inputs = [].slice.call(el.querySelectorAll('*[name]'));
        const values = inputs.reduce(function (val, input) {
                const name = input.getAttribute('name');

                val[name] = input.value;

                return val;

            }, {});

        this.props.onSubmit(values, e);
    }

    render () {

        return (
            <form {...this.props} onSubmit={this.onSubmit}>
                {this.props.children}
            </form>
        );

    }

}

Form.defaultProps = {
    onSubmit: function () {}
};

export default Form;