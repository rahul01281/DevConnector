import React, { useEffect, Fragment }  from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

function Posts({ getPosts, post: { posts, loading } }) {

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        loading ? <Spinner /> : (
            <Fragment>
                <h1 className="large text-primary">Posts</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Welcome to the community
                </p>
                {/* post form */}
                <div className="posts">
                    {posts.map(post => (
                        <PostItem key={post._id} post={post} />
                    ))}
                </div>
            </Fragment>
        )
    )
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);