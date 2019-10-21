import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import NextLink from "next/dist/client/link";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles(() => ({
  red: {
    color: red[500]
  },
  orange: {
    color: orange[500]
  },
  green: {
    color: green[500]
  },
}));


export default function ({lang, limit, manual, store, children}) {
  const classes = useStyles();
  const [star, setStar] = useState(null);
  const key = `star-${lang}-${limit}-${manual}`;

  useEffect(() => {
    store.getItem(key).then((value) => {
      setStar(parseInt(value, 10));
    });
  });

  const showStar = () => {
    switch (star) {
      case 0:
        return <StarBorderIcon className={classes.red} />;
      case 1:
        return <StarHalfIcon className={classes.orange} />;
      case 2:
        return <StarIcon className={classes.green} />;
      default:
        return null;
    }
  };

  return (
    <NextLink href={`/${lang}?limit=${limit}&manual=${manual}`}>
      <ListItem button>
        {showStar()}
        <ListItemText primary={children} />
      </ListItem>
    </NextLink>
  );
}