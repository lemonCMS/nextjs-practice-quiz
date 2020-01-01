import React from 'react'
import Head from "next/head";
import Container from "@material-ui/core/Container";
import Menu from '../components/menu';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

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

class Index extends React.Component {
  render() {
    const {classes} = this.props;
    return (<>
      <Head>
        <title>Hailey test</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Container>
        <Paper className={classes.root}>
          <Typography variant="h3" gutterBottom>
            Unit 2 lesson 4
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Words to know
          </Typography>
        </Paper>
        <Typography paragraph>
          Maak de oefeningen en verdien sterren. Blijf net zolang oefenen tot je alle sterren groen heb gemaakt.
        </Typography>
        <Menu />
      </Container>
    </>);
  }
}

export default withStyles(useStyles)(Index)
