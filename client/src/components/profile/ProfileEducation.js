import React from 'react';
import Moment from 'react-moment';

function ProfileEducation({ education: { school, degree, fieldofstudy, to, from, description } }) {
    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <p>
                <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now' : <Moment format='YYYY/MM/DD'></Moment>}
            </p>
            <p>
                <strong>Degree: </strong>{degree}
            </p>
            <p>
                <strong>Field of study: </strong>{fieldofstudy}
            </p>
            <p>
                <strong>Description: </strong>{description}
            </p>
        </div>
    )
}

export default ProfileEducation;
