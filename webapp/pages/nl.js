import React from 'react'
import MultipleChoice from '../components/multiple-choice'
import Head from "next/head";
import Container from "@material-ui/core/Container";

class Index extends React.Component {

  render() {
    return (<>
      <Head>
        <title>Hailey test</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Container>
        <MultipleChoice question={'nl'} answer={'en'} />
      </Container>
    </>);
  }
}

export default Index
