import React, {useState, useRef} from "react";
import Fuse from "fuse.js";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  }
}));

function Manual({question, questionField, answerField, setManualAnswer}) {
  const [value, setValue] = useState('');
  const classes = useStyles();
  let inputRef = useRef(null);
  const change = (event) => {
    setValue(String(event.target.value).toLowerCase());
  };

  const next = (event) => {
    event.preventDefault();
    const result = fuse.search(value);
    setManualAnswer(value, value === question[answerField], result.length);
    setValue('');
    inputRef.current.focus();
  };

  const list = [
    {
      text: question[answerField]
    }
  ];

  const options = {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    includeScore: true,
    threshold: 0.8,
    location: 2,
    distance: 0,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
      "text"
    ]
  };
  const fuse = new Fuse(list, options); // "list" is the item array

  return (
    <div>
      <form>
        <TextField
          inputRef={inputRef}
          label="jouw antwoord hier typen"
          className={classes.textField}
          onChange={change}
          value={value}
          margin="normal"
          variant="outlined"
        />
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-end"
        >
          <div>
            <Button type="submit" variant="contained" color="primary" onClick={next}>
              Volgende
            </Button>

          </div>
        </Grid>
      </form>
    </div>
  )
}

export default Manual;
