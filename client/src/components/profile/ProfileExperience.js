import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { title, company, from, to, current, description }
}) => {
  return (
    <Fragment>
      <h3 class="text-dark">{company}</h3>
      <p>
        <Moment format="MMM YYYY">{from}</Moment> -{" "}
        {current ? (
          <span>Current</span>
        ) : (
          <Moment format="MMM YYYY">{to}</Moment>
        )}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </Fragment>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;
