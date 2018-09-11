import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Repos } from './components/Repos';
import {Bookmarks} from './components/Bookmarks'
export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
            <Route path='/' exact component={Repos} />
            <Route path='/Bookmarks' exact component={Bookmarks} />
      </Layout>
    );
  }
}
