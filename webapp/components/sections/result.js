import Box from "@material-ui/core/Box";
import translations from "../data";
import React from "react";
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    margin: theme.spacing(1, 0)
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
  wrong: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
    padding: theme.spacing(1, 1),
    marginBottom: theme.spacing(1),
  },
  good: {
    backgroundColor: "#44AF69",
    color: theme.palette.getContrastText("#44AF69"),
    padding: theme.spacing(1, 1),
    marginBottom: theme.spacing(1),
  },
  inline: {
    display: "inline-flex"
  }
}));

function Result({isManual, indices, choices, questionField, answerField, answers}) {
  const classes = useStyles();
  return indices.map((indice, index) => {
    if (answers[index]) {
      return null;
    }

    return (
      <Card className={classes.card} key={index}>
        <CardContent>
          <Typography component="h2" gutterBottom  className={classes.title}>
            {translations[indice][questionField]}
          </Typography>

          <Typography className={classes.good} component="div">
            <CheckIcon />
            <div className={classes.inline}>
              {translations[indice][answerField]}
            </div>
          </Typography>

          <div className={classes.wrong}>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <ClearIcon />
              </Grid>
              <Grid item>
                {isManual && choices[index]}
                {!isManual && <div>{translations[choices[index]][answerField]}</div>}
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
      );
  })
}

Result.propTypes = {
  indices: PropTypes.array.isRequired,
  choices: PropTypes.array.isRequired,
  questionField: PropTypes.string.isRequired,
  answerField: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired
};

export default Result;