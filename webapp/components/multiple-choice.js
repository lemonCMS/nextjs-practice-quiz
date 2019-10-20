import React from 'react';
import Box from "@material-ui/core/Box";
import {PropTypes} from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {withStyles} from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import Stepper from "./sections/stepper";
import translations from './data';
import Answers from "./sections/answers";
import Result from "./sections/result";
import Button from "@material-ui/core/Button";

const useStyles = theme => {
  return ({
    padding: {
      padding: theme.spacing(0, 7)
    },
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(2, 0),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    list: {
      backgroundColor: theme.palette.background.paper,
    },
  });
};

class MultipleChoice extends React.Component {

  state = {
    activeStep: 0,
    indices: [],
    answers: [],
    choices: [],
    activeQuestion: null,
    activeAnswers: [],
    limit: 10
  };

  componentDidMount() {
    this.setQuestion();
  }

  setQuestion = () => {
    const {indices, limit} = this.state;
    if (indices.length === limit) {
      return;
    }
    let activeQuestion = this.getRandomInt(1, translations.length);
    const activeAnswers = [];
    while (indices.indexOf(activeQuestion) > -1) {
      activeQuestion = this.getRandomInt(1, translations.length);
    }
    indices.push(activeQuestion);
    activeAnswers.push(activeQuestion);
    for (let i = 0; i < 3; i++) {
      let answer = this.getRandomInt(1, translations.length);
      while (answer === activeQuestion || activeAnswers.indexOf(answer) > -1) {
        answer = this.getRandomInt(1, translations.length);
      }
      activeAnswers.push(answer);
    }

    this.setState({
      activeQuestion,
      activeAnswers,
      indices
    });
  };

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min - 1;
  };

  setAnswer = (answer) => {
    const {activeStep, activeQuestion, answers, choices, limit} = this.state;
    if (answer === activeQuestion) {
      answers.push(1);
    } else {
      answers.push(0);
    }
    choices.push(answer);
    this.setState({answers, activeStep: activeStep + 1});

    if (answers.length === limit) {
      this.setState({finished: true, activeStep: activeStep + 1});
      return;
    }

    this.setQuestion();
  };

  reset = (nextLimit = null) => {

    const {limit} = this.state;

    this.setState({
      activeStep: 0,
      indices: [],
      answers: [],
      choices: [],
      activeQuestion: null,
      activeAnswers: [],
      finished: false,
      limit: nextLimit ? nextLimit :  limit
    }, () => {
      this.setQuestion();
    });
  };

  render() {
    const {activeStep, activeAnswers, activeQuestion, finished, answers, indices, choices, limit} = this.state;
    const {classes, answer, question} = this.props;
    const length = translations.length;
    if (activeQuestion === null) {
      return <div>Loading....</div>
    }

    if (finished) {
      const good = answers.reduce((x, y) => x + y);
      return (
        <>
          <Stepper activeStep={activeStep} length={limit} />
          <Paper className={classes.root}>
            <Typography component="p" className={classes.padding}>
              {good} goed van de {limit}
            </Typography>
          </Paper>
          <Result indices={indices} choices={choices} questionField={question} answerField={answer} limit={limit} />
          <Box>
            <Button variant="contained" className={classes.button} onClick={() => this.reset()}>
              Start opnieuw
            </Button>
            <Button variant="contained" className={classes.button} onClick={() => this.reset(15)}>
              Speel met 15 vragen
            </Button>
            <Button variant="contained" className={classes.button} onClick={() => this.reset(20)}>
              Speel met 20 vragen
            </Button>
            <Button variant="contained" className={classes.button} onClick={() => this.reset(length)}>
              Speel met alle vragen
            </Button>
          </Box>
        </>
      );
    }
    return (
      <>
        <Stepper activeStep={activeStep} length={limit} />
        <Paper className={classes.root}>
          <Typography component="p" className={classes.padding}>
            {translations[activeQuestion][question]}
          </Typography>
        </Paper>
        <List component="nav" aria-label="Answers" className={classes.list}>
          <Answers activeAnswers={activeAnswers} field={answer} setAnswer={this.setAnswer} />
        </List>
      </>)
  }
}

MultipleChoice.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired
};
export default withStyles(useStyles)(MultipleChoice);