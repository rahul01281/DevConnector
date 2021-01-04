import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';

function Post({ getPost, post: { post, loading }, match }) {

    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);

    return loading || post === null ? <Spinner /> : 
    <Fragment>
        <Link to='/posts' className='btn'>Back to Posts</Link>
        <PostItem post={post} showActions={false} />
    </Fragment>
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
