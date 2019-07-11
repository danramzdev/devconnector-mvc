import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, current, description }
}) => {
  return (
    <Fragment>
      <h3>{school}</h3>
      <p>
        <Moment format="MMM YYYY">{from}</Moment> -{" "}
        {current ? (
          <span>Current</span>
        ) : (
          <Moment format="MMM YYYY">{to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </Fragment>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;
