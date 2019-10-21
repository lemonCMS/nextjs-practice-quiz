import Stepper from "./stepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Result from "./result";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core";
import data from '../data';
import localforage from 'localforage';

const store = localforage.createInstance({
  name: "stars"
});

const useStyles = makeStyles(theme => {
  return ({
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(2, 0),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  });
});

function Finished({isManual, reset, activeStep, limit, choices, question, answer, indices, answersManual, answers}) {
  const classes = useStyles();
  const good = answers.reduce((x, y) => x + y);
  const partialGood = answersManual.reduce((x, y) => x + y) - good;

  const key = `star-${question}-${limit}-${isManual}`;

  const percentage = (100 / limit * good);
  if (percentage === 100) {
    store.setItem(key, '2');
  }
  if (percentage >= 50 && percentage < 100) {
    store.setItem(key, '1');
  }
  if (percentage < 50) {
    store.setItem(key, '0');
  }

  return (
    <>
      <Stepper activeStep={activeStep} length={limit} />
      <Paper className={classes.root}>
        <Typography component="p" className={classes.padding}>
          {good} goed van de {limit}
        </Typography>
      </Paper>
      {isManual && partialGood > 0 &&
      <Paper className={classes.root}>
        <Typography component="p" className={classes.padding}>
          je hebt ook {partialGood} al bijna goed!
        </Typography>
      </Paper>}

      <Result
        indices={indices}
        choices={choices}
        questionField={question}
        answerField={answer}
        limit={limit}
        answersManual={answersManual}
        answers={answers}
        isManual={isManual}
      />
      <Box>
        <Button variant="contained" className={classes.button} onClick={() => reset()}>
          Nogmaals
        </Button>
      </Box>
    </>
  );
}

export default Finished;