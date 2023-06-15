import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';

interface EntradaSwitch{
  valorMudou?: (valor: any) => void
}

export default function SwitchListSecondary(props) {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <ListItem>
        <ListItemText id="switch-list-label-Composicao" primary="Composicao" />
        <Switch
          edge="end"
          onChange={e=> props.valorMudou?.(e.target.checked)}
          checked={props.check}
          inputProps={{
            'aria-labelledby': 'switch-list-label-Composicao',
          }}
        />
      </ListItem>
    </List>
  );
}