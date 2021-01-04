import React, { useEffect, Fragment }  from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';

function Posts({ getPosts, post: { posts, loading } }) {

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <div />
    )
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
