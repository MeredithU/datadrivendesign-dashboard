'use strict';

import jquery from 'jquery';

const siteNavBarCollapse = jquery('#site-navbar-collapse');
const navbarButton = jquery('#site-navbar-button');
navbarButton.click(function () {
    siteNavBarCollapse.toggleClass('in');
    navbarButton.toggleClass('active');
});
