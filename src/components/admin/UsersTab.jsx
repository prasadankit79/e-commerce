import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const mockUsers = [
  { name: 'Ankit Prasad', email: 'ankit@example.com' },
  { name: 'Priya Sharma', email: 'priya@example.com' },
];

const UsersTab = () => (
  <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
    <Typography variant="h6" gutterBottom>Users</Typography>
    <List>
      {mockUsers.map((user, index) => (
        <ListItem key={index}>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default UsersTab;
