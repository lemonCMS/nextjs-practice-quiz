import React from 'react'
import MultipleChoice from '../components/multiple-choice'
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
      <Container>
        <MultipleChoice question={'en'} answer={'nl'} manual={manual} limit={limit} />
      </Container>
    </>);
  }
}

export default Index
