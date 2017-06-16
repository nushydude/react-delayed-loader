import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './../actions';

import Loader from './loader';

class Posts extends Component {
  componentWillMount() {
    this.props.actionsFetchPosts(1000);
  }

  render() {
    if (!this.props.posts) {
      return <Loader />;
    }

    return (
      <div>
        {
          this.props.posts.map(post => (
            <p key={post.id}>{post.title}</p>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.data,
  error: posts.error,
});

export default connect(mapStateToProps, actions)(Posts);
