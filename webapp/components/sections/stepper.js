import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import React from "react";
import PropTypes from "prop-types";

function StepperMod({length, activeStep}) {
  const steppers = [];

  for (let index = 1; index <= length; index++) {
    steppers.push(
      <Step key={index}>
        <StepLabel>{index}</StepLabel>
      </Step>);
  }

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steppers}
      <Step key={length + 1}>
        <StepLabel>Feedback</StepLabel>
      </Step>
    </Stepper>
  )
}

StepperMod.propTypes = {
  activeStep: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired
};

export default StepperMod;