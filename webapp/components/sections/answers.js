import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import PropTypes from "prop-types";
import translations from '../data';

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

function Answers({activeAnswers, field, setAnswer}) {
  const answers = shuffle(activeAnswers);
  return answers.map((index, key) =>
    (<ListItem button key={key}>
      <ListItemIcon>
        <RadioButtonUncheckedIcon />
      </ListItemIcon>
      <ListItemText onClick={() => {
        setAnswer(index);
      }} primary={translations[index][field]} />
    </ListItem>)
  );
}

Answers.propTypes = {
  activeAnswers: PropTypes.array.isRequired,
  field: PropTypes.string.isRequired,
  setAnswer: PropTypes.func.isRequired
};

export default Answers;