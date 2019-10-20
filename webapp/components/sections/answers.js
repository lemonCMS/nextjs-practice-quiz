import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChevronRightRoundedIcon from "@material-ui/core/SvgIcon/SvgIcon";
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
  // const audioPlayBack = (value) => {
  //   return (
  //     <audio
  //       controls
  //       src={`https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${encodeURIComponent(value)}T&tl=en&client=tw-ob`}>
  //       Your browser does not support the
  //       <code>audio</code> element.
  //     </audio>
  //   );
  // };

  return answers.map((index, key) =>
    (<ListItem button key={key}>
      <ListItemIcon>
        <ChevronRightRoundedIcon />
      </ListItemIcon>
      <ListItemText onClick={() => {
        setAnswer(index);
      }} primary={translations[index][field]} />
      {/*<div>*/}
      {/*  {audioPlayBack(translations[index][field])}*/}
      {/*</div>*/}
    </ListItem>)
  );
}

Answers.propTypes = {
  activeAnswers: PropTypes.array.isRequired,
  field: PropTypes.string.isRequired,
  setAnswer: PropTypes.func.isRequired
};

export default Answers;