import App from 'next/app';
import React from 'react'
import Router from 'next/router';

import '../src/assets/scss/index.scss'

import nProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress


Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => {
	nProgress.done();
	document.body.scrollTop = document.documentElement.scrollTop = 0; // scroll to top on change route
});
Router.events.on('routeChangeError', () => nProgress.done());


export default class _app extends App {
  static async getInitialProps({ Component, router, ctx }) {

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }

  }
  render() {
    const { Component, pageProps } = this.props
    return (
        <Component {...pageProps} />
    )
  }
}