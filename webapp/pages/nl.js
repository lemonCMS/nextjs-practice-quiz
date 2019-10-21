import React from 'react'
import MultipleChoice from '../components/multiple-choice'
import Container from "@material-ui/core/Container";

class Index extends React.Component {

  render() {
    return (<>
      <Container>
        <MultipleChoice question={'nl'} answer={'en'} />
      </Container>
    </>);
  }
}

export default Index
