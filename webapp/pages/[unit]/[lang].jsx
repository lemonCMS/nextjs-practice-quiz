import React from 'react'
import MultipleChoice from '../../components/multiple-choice'
import Container from "@material-ui/core/Container";

class Lang extends React.Component {
    static async getInitialProps({ctx}) {
        console.log({ctx});

        return {
            manual: typeof ctx.query.manual !== 'undefined' && ctx.query.manual === 'true',
            limit: typeof ctx.query.limit !== 'undefined' ? parseInt(ctx.query.limit, 10) : 5,
            unit: parseInt(ctx.query.unit, 10),
            lang: ctx.query.lang,
        };
    }

    render() {
        console.log(this.props);
        const {manual, limit, lang, unit} = this.props;

        return (<>
            <Container>
                <MultipleChoice
                    question={lang}
                    answer={lang === 'nl' ? 'en' : 'nl'}
                    manual={manual}
                    limit={limit}
                    unit={unit}
                />
            </Container>
        </>);
    }
}

export default Lang
