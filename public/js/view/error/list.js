'use strict';

export default function ({ errors }) {

    const list = errors.map((error) => {
        return (
            <li>{error.message}</li>
        );
    });

    return (
        <ul>
            {list}
        </ul>
    )

}
