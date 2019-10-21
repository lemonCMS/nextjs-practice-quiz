import React from 'react'
import MultipleChoice from '../components/multiple-choice'
import Head from "next/head";
import Container from "@material-ui/core/Container";

class Index extends React.Component {

  static async getInitialProps({ctx}) {
    return {
      manual: typeof ctx.query.manual !== 'undefined' && ctx.query.manual === 'true',
      limit: typeof ctx.query.limit !== 'undefined' ? parseInt(ctx.query.limit, 10) : 5
    };
  }

  render() {
    const {manual, limit} = this.props;

    return (<>
      <Head>
        <title>Engels oefenen</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Container>
        <MultipleChoice question={'en'} answer={'nl'} manual={manual} limit={limit} />
      </Container>
    </>);
  }
}

export default Index
