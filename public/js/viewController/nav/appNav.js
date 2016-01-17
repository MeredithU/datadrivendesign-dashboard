'use strict';

import rx from 'rx';
import React from 'react';
import cx from 'classnames';

import appNavLinksStream from 'turissini/stream/nav/appNavLinks';

export default function ({ contents }) {
    return appNavLinksStream()
        .map((link, index) => {
            const href = link.get('href');
            const text = link.get('text');
            const icon = link.get('icon');

            const key = `app-nav-${text}-${index}`;
            const iconClassName = cx('icon glyphicon', `glyphicon-${icon}`);
            const className= cx('col-xs-12 col-sm-3 block-link text-center app-nav-item');

            return (
                <div className={className} key={key}>
                    <a className="link" href={href}></a>
                    <i className={iconClassName}></i>
                    <span>{text}</span>
                    <span className="link-bottom-border"></span>
                </div>
            )
        })
        .toArray()
        .map((links) => {
            return (
                <nav className="app-nav row">
                    {links}
                </nav>
            )
        })
        .map((navElements) => {
            return (
                <div>
                    {navElements}
                    {contents}
                </div>
            );
        })
}
