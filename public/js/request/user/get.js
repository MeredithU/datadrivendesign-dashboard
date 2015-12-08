'use strict';


export default function (user) {

    return {
        path: `/users/${user.get('id')}`
    }

}