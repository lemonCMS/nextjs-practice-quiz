import Stepper from "./stepper";
import Result from "./result";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React from "react";
import {Card, CardContent, makeStyles} from "@material-ui/core";
import Router from 'next/router';
import localforage from 'localforage';
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import clsx from "clsx";
import withStyles from "@material-ui/core/styles/withStyles";

const store = localforage.createInstance({
  name: "stars2"
});

const useStyles = theme => {
  return ({
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(2, 0),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    button: {
      margin: theme.spacing(1)
    },
    star: {
      fontSize: '120px',
      textAlign: 'center',
    },
    red: {
      color: red[500]
    },
    orange: {
      color: orange[500]
    },
    green: {
      color: green[500]
    },

    amount: {
      fontSize: '24px',
      textAlign: 'center'
    }
  });
};


class Finished extends React.Component {

  state = {
    star: null
  };

  componentDidMount() {
    console.log('MOUNT');
    const {isManual, limit, question, answersManual, answers} = this.props;
    const good = answers.reduce((x, y) => x + y);
    const partialGood = answersManual.reduce((x, y) => x + y);

    const key = `star-${question}-${limit}-${isManual}`;
    let star = null;
    const percentage = (100 / limit  * good);
    if (percentage === 100) {
      star = 2;
    }
    if (percentage >= 50 && percentage < 100) {
      star = 1;
    }
    if (percentage < 50) {
      star = 0;
    }
    store.setItem(key, star);
    this.setState({star});
  }

  render() {
    const {classes, isManual, reset, activeStep, limit, choices, question, answer, indices, answersManual, answers} = this.props;
    console.log(this.props);
    const {star} = this.state;
    const good = answers.reduce((x, y) => x + y);

    const showStar = () => {
      switch (star) {
        case 0:
          return <StarBorderIcon fontSize={'inherit'} className={clsx(classes.star, classes.red)}/>;
        case 1:
          return <StarHalfIcon fontSize={'inherit'}  className={clsx(classes.star, classes.orange)}/>;
        case 2:
          return <StarIcon fontSize={'inherit'}  className={clsx(classes.star, classes.green)}/>;
        default:
          return null;
      }
    };

    return (
      <>
        <Stepper activeStep={activeStep} length={limit} />
        <Grid container justify="center">
          <Grid item xs={4}>
            <div className={classes.star}>
              {showStar()}
            </div>
            <div className={classes.amount}>
              {good} van de {limit}
            </div>
          </Grid>
        </Grid>

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
          <Button variant="contained" color="primary" className={classes.button} onClick={() => reset()}>
            Nogmaals
          </Button>

          <Button variant="contained" color="default" className={classes.button} onClick={() => {
            Router.push('/').then(() => window.scrollTo(0, 0));
          }}>
            Kies een andere oefening
          </Button>
        </Box>
      </>
    );

  }
}

export default withStyles(useStyles)(Finished);

// function Finished({isManual, reset, activeStep, limit, choices, question, answer, indices, answersManual, answers}) {
//   const classes = useStyles();
//   const good = answers.reduce((x, y) => x + y);
//   const partialGood = answersManual.reduce((x, y) => x + y);
//
//   const key = `star-${question}-${limit}-${isManual}`;
//   let star = null;
//   const percentage = (100 / limit  * good);
//   if (percentage === 100) {
//     star = 2;
//   }
//   if (percentage >= 50 && percentage < 100) {
//     star = 1;
//   }
//   if (percentage < 50) {
//     star = 0;
//   }
//   store.setItem(key, star);
//
//   const showStar = () => {
//     switch (star) {
//       case 0:
//         return <StarBorderIcon fontSize={'inherit'} className={clsx(classes.star, classes.red)}/>;
//       case 1:
//         return <StarHalfIcon fontSize={'inherit'}  className={clsx(classes.star, classes.orange)}/>;
//       case 2:
//         return <StarIcon fontSize={'inherit'}  className={clsx(classes.star, classes.green)}/>;
//       default:
//         return null;
//     }
//   };
//
//   return (
//     <>
//       <Stepper activeStep={activeStep} length={limit} />
//
//       <Grid container justify="center">
//         <Grid item xs={4}>
//           <div className={classes.star}>
//             {showStar()}
//           </div>
//           <div className={classes.amount}>
//             {good} van de {limit}
//           </div>
//         </Grid>
//       </Grid>
//
//       {/*<Paper className={classes.root}>*/}
//       {/*  <Typography component="p" className={classes.padding}>*/}
//       {/*    Je hebt er {good} goed van de {limit}*/}
//       {/*  </Typography>*/}
//       {/*</Paper>*/}
//       {/*{isManual && partialGood > 0 &&*/}
//       {/*<Paper className={classes.root}>*/}
//       {/*  <Typography component="p" className={classes.padding}>*/}
//       {/*    je hebt nog {partialGood} bijna goed!*/}
//       {/*  </Typography>*/}
//       {/*</Paper>}*/}
//
//       <Result
//         indices={indices}
//         choices={choices}
//         questionField={question}
//         answerField={answer}
//         limit={limit}
//         answersManual={answersManual}
//         answers={answers}
//         isManual={isManual}
//       />
//       <Box>
//         <Button variant="contained" color="primary" className={classes.button} onClick={() => reset()}>
//           Nogmaals
//         </Button>
//
//         <Button variant="contained" color="default" className={classes.button} onClick={() => {
//           Router.push('/').then(() => window.scrollTo(0, 0));
//         }}>
//           Kies een andere oefening
//         </Button>
//       </Box>
//     </>
//   );
// }
//
// export default Finished;