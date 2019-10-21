import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import NextLink from "next/dist/client/link";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React, {useEffect, useState} from "react";

export default function({lang, limit, manual, store, children}) {
  const [star, setStar] = useState(null);
  const key = `star-${lang}-${limit}-${manual}`;

  useEffect(() => {
    store.getItem(key).then((value) => {
      setStar(parseInt(value, 10));
    });
  });

  const showStar = () => {
    switch(star) {
      case 0:
        return <StarBorderIcon />;
      case 1:
        return <StarHalfIcon />;
      case 2:
        return <StarIcon />;
      default:
        return null;
    }
  };

  return (
    <ListItem button>
      {showStar()}
      <NextLink href={`/${lang}?limit=${limit}&manual=${manual}`}>
        <ListItemText primary={children} />
      </NextLink>
    </ListItem>
  );
}