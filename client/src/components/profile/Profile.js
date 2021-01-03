import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';

function Profile({ match, getProfileById, profile:{profile, loading}, auth }) {

    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById])

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : 
            <Fragment>
                <Link to='/profiles' className="btn btn-light">Back</Link>  
                {auth.isAuthenticated && auth.loading === false && auth.user.user._id === profile.user._id && (
                <Link to="/edit-profile" className="btn btn-dark">
                    Edit
                </Link>)
                }
            </Fragment>}
        </Fragment>
    )
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
