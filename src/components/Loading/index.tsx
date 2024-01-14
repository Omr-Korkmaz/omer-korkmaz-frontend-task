import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  return (
    <Box sx={{ display: loading ? 'flex' : 'none' }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
