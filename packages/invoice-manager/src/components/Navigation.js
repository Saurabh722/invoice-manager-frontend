import * as React from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DehazeSharpIcon from '@mui/icons-material/DehazeSharp';

export default function NavigationDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const menus = [
    {
        label: 'Home',
        link: '/',
    },
    {
        label: 'Create Invoice',
        link: '/invoice',
    },
    {
        label: 'Customer',
        link: '/customer',
    },
    {
        label: 'Product',
        link: '/product',
    }
  ]

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menus.map(({label, link}) => (
          <ListItem key={link} disablePadding>
            <ListItemButton>
                <Link to={link}>
                    <ListItemText primary={label} />
                </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={'Setting'} />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}><DehazeSharpIcon/></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
