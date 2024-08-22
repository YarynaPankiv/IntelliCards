
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';


function LinearProgressWithLabel({number}) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={number} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            number,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

export default LinearProgressWithLabel;
