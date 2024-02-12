import React from 'react';
import { TextField } from '@mui/material';

function SearchBar() {
  return (
    <div style={{ textAlign: 'center' }}>
      <TextField label="Search" variant="outlined" />
    </div>
  );
}

export default SearchBar;
