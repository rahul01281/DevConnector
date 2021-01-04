import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/post';

function CommentItem({
    postId,
    comment: {_id, text, name, avatar, user, date},
    auth,
    deleteComment
}) {
    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {!auth.loading && user === auth.user.user._id && (
                <button className="btn btn-danger" onClick={e => deleteComment(postId, _id)} type="button">
                    <i className="fas fa-times"></i>
                </button>
            )}
          </div>
        </div>
    )
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);