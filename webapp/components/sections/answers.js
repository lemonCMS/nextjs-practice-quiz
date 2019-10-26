import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ListItemText from "@material-ui/core/ListItemText";
import React, {useState} from "react";
import PropTypes from "prop-types";
import translations from '../data';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

class Answers extends React.Component {

  constructor(props) {
    super(props);
    const {activeAnswers} = props;
    this.state = {
      answer: null
    };
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      const answers = shuffle(this.props.activeAnswers);
      this.setState({answers});
    }
  }

  componentDidMount() {
    const answers = shuffle(this.props.activeAnswers);
    this.setState({answers});
  }

  tmpAnswer = (answer) => {
    this.setState({answer})
  };

  list = () => {
    const {answers, answer} = this.state;
    if (typeof answers === 'undefined') {
      return null;
    }
    const {field} = this.props;
    return answers.map((index, key) =>
      (<ListItem button key={key} onClick={() => {
        this.tmpAnswer(index);
      }}>
        <ListItemIcon>
          {answer === index ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
        </ListItemIcon>
        <ListItemText primary={translations[index][field]} />
      </ListItem>)
    );
  };

  render() {
    const {setAnswer} = this.props;
    const {answer} = this.state;
    return (
      <React.Fragment>
        <Grid container spacing={4} direction="column">
          <Grid item>
            {this.list()}
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => (setAnswer(answer))}>
                  volgende
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

Answers.propTypes = {
  activeAnswers: PropTypes.array.isRequired,
  field: PropTypes.string.isRequired,
  setAnswer: PropTypes.func.isRequired
};

export default Answers;