import { Box, Typography } from '@mui/material'
import PostTable from '../../components/PostTable'

export const Home = () => {
  return (
    <Box
      component="div"
      sx={{
        maxWidth: '1200px',
        marginX: 'auto',
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          my: 5,
          fontWeight: 600,
          fontSize: '40px',
        }}
      >
        Sample Assignment -1 (Blogs)
      </Typography>
      <PostTable />
    </Box>
  )
}
