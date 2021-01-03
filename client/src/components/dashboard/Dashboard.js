import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Spinner from '../layout/Spinner';
import Experience from './Experience';
import Education from './Education';

function Dashboard({ getCurrentProfile, auth:{user}, profile:{profile, loading}, deleteAccount }) {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return(
        loading && profile === null ? <Spinner /> :
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome { user && user.user.name }
            </p>
            {profile !== null ? 
            <Fragment>
                <DashboardActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteAccount() }>
                        <i className="fas fa-user-minus" /> Delete my Account
                    </button>
                </div>
            </Fragment> : 
            <Fragment>
                <p>You have not yet set up a profile.</p>    
                <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
            </Fragment>}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount }) (Dashboard);
