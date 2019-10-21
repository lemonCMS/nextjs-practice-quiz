import React from 'react';
import {PropTypes} from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {withStyles} from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Stepper from "./sections/stepper";
import translations from './data';
import Answers from "./sections/answers";
import Finished from "./sections/finished";
import Manual from "./sections/manual";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

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
    answersManual: [],
    choices: [],
    activeQuestion: null,
    activeAnswers: []
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.limit !== prevProps.limit ||
      this.props.answer !== prevProps.answer ||
      this.props.manual !== prevProps.manual
    ) {
      this.reset();
    }
  }

  componentDidMount() {
    this.setQuestion();
  }

  setQuestion = () => {
    const {indices} = this.state;
    const {limit} = this.props;

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
    const {activeStep, activeQuestion, answers, answersManual, choices} = this.state;
    const {limit} = this.props;

    if (answer === activeQuestion) {
      answers.push(1);
    } else {
      answers.push(0);
    }
    answersManual.push(0);
    choices.push(answer);
    this.setState({answers, activeStep: activeStep + 1});

    if (answers.length === limit) {
      this.setState({finished: true, activeStep: activeStep + 1});
      return;
    }

    this.setQuestion();
  };

  setManualAnswer = (answer, perfect, fuzzy) => {
    const {activeStep, answersManual, answers, choices} = this.state;
    const {limit} = this.props;

    answersManual.push(fuzzy);
    // console.log({fuzzy, perfect});
    answers.push(perfect ? 1 : 0);
    choices.push(answer);
    this.setState({answers, answersManual, activeStep: activeStep + 1});

    console.log({limit});

    if (answersManual.length === limit) {
      this.setState({answers, answersManual, finished: true, activeStep: activeStep + 1});
      return;
    }

    this.setQuestion();
  };

  reset = (nextLimit = null) => {
    const {limit} = this.props;

    this.setState({
      activeStep: 0,
      indices: [],
      answers: [],
      answersManual: [],
      choices: [],
      activeQuestion: null,
      activeAnswers: [],
      finished: false,
      limit: nextLimit ? nextLimit : limit
    }, () => {
      this.setQuestion();
    });
  };

  render() {
    const {activeStep, activeAnswers, activeQuestion, finished, answers, indices, choices, answersManual} = this.state;
    const {classes, answer, question, manual, limit} = this.props;
    if (activeQuestion === null) {
      return <div>Loading....</div>
    }

    if (finished) {
      return (
        <Finished
          reset={this.reset}
          indices={indices}
          limit={limit}
          choices={choices}
          activeStep={activeStep}
          question={question}
          answer={answer}
          answersManual={answersManual}
          answers={answers}
          isManual={manual}
        />
      );
    }

    return (
      <>
        <Stepper activeStep={activeStep} length={limit} />
        <Paper className={classes.root}>
          <Grid container spacing={4}>
            <Grid item>
              <Tooltip title="Weet jij de vertaling?">
                <HelpOutlineIcon />
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography component="p">
                {translations[activeQuestion][question]}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <List component="nav" aria-label="Answers" className={classes.list}>
          {!manual && <Answers activeAnswers={activeAnswers} field={answer} setAnswer={this.setAnswer} />}
          {manual &&
          <Manual
            answerField={answer}
            questionField={question}
            question={translations[activeQuestion]}
            setManualAnswer={this.setManualAnswer} />
          }
        </List>
      </>)
  }
}

MultipleChoice.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  manual: PropTypes.bool,
  limit: PropTypes.number
};

MultipleChoice.defaultProps = {
  manual: false,
  limit: 5
};
export default withStyles(useStyles)(MultipleChoice);
