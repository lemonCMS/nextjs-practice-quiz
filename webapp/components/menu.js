import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import React, {useState} from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import NextLink from "next/link";
import StarIcon from '@material-ui/icons/Star';
import localforage from "localforage";
import MenuItem from './menu-item';

const store = localforage.createInstance({
  name: "stars"
});

export default function () {
  const [dummy, triggerDummy] = useState(false);

  const clearStars = () => {
    store.clear().then(()=> {
      triggerDummy(true);
    });
  };

  return (
    <>
      <List>
        <ListSubheader disableSticky={true}>
          Engels, meerkeuze
        </ListSubheader>
        <Divider />
        <MenuItem lang={'en'} limit={'5'} manual={false} store={store}>
          5 vragen
        </MenuItem>
        <MenuItem lang={'en'} limit={'10'} manual={false} store={store}>
          10 vragen
        </MenuItem>
        <MenuItem lang={'en'} limit={'15'} manual={false} store={store}>
          15 vragen
        </MenuItem>
        <MenuItem lang={'en'} limit={'20'} manual={false} store={store}>
          20 vragen
        </MenuItem>
        <MenuItem lang={'en'} limit={'25'} manual={false} store={store}>
          25 vragen
        </MenuItem>
        <MenuItem lang={'en'} limit={'30'} manual={false} store={store}>
          30 vragen
        </MenuItem>
        <Divider />
        <ListSubheader disableSticky={true}>
          Engels, openvragen
        </ListSubheader>
        <Divider />
        <MenuItem lang={'en'} limit={'5'} manual={true} store={store}>
          5 vragen
        </MenuItem>
        <MenuItem lang={'en'} limit={'10'} manual={true} store={store}>
          10 vragen
        </MenuItem>
        <MenuItem lang={'en'} limit={'15'} manual={true} store={store}>
          15 vragen
        </MenuItem>
        <MenuItem lang={'en'} limit={'20'} manual={true} store={store}>
          20 vragen
        </MenuItem>
        <MenuItem lang={'en'} limit={'25'} manual={true} store={store}>
          25 vragen
        </MenuItem>
        <MenuItem lang={'en'} limit={'30'} manual={true} store={store}>
          30 vragen
        </MenuItem>
        <Divider />
        <ListSubheader disableSticky={true}>
          Nederlands, meerkeuze
        </ListSubheader>
        <Divider />
        <MenuItem lang={'nl'} limit={'5'} manual={false} store={store}>
          5 vragen
        </MenuItem>
        <MenuItem lang={'nl'} limit={'10'} manual={false} store={store}>
          10 vragen
        </MenuItem>
        <MenuItem lang={'nl'} limit={'15'} manual={false} store={store}>
          15 vragen
        </MenuItem>
        <MenuItem lang={'nl'} limit={'20'} manual={false} store={store}>
          20 vragen
        </MenuItem>
        <MenuItem lang={'nl'} limit={'25'} manual={false} store={store}>
          25 vragen
        </MenuItem>
        <MenuItem lang={'nl'} limit={'30'} manual={false} store={store}>
          30 vragen
        </MenuItem>
        <Divider />
        <ListSubheader disableSticky={true}>
          Engels, openvragen
        </ListSubheader>
        <Divider />
        <MenuItem lang={'nl'} limit={'5'} manual={true} store={store}>
          5 vragen
        </MenuItem>
        <MenuItem lang={'nl'} limit={'10'} manual={true} store={store}>
          10 vragen
        </MenuItem>
        <MenuItem lang={'nl'} limit={'15'} manual={true} store={store}>
          15 vragen
        </MenuItem>
        <MenuItem lang={'nl'} limit={'20'} manual={true} store={store}>
          20 vragen
        </MenuItem>
        <MenuItem lang={'nl'} limit={'25'} manual={true} store={store}>
          25 vragen
        </MenuItem>
        <MenuItem lang={'nl'} limit={'30'} manual={true} store={store}>
          30 vragen
        </MenuItem>
        <Divider />
        <Divider />
        <ListItem button>
          <ListItemText secondary={'Sterren weggooien'} onClick={clearStars}/>
        </ListItem>
        <Divider />
        <Divider />
      </List>
    </>
  );
}