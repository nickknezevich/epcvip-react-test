import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  ButtonGroup
} from '@mui/material';
import { useRouter } from 'next/router';

import { PersonSearchIcon as SearchIcon } from '@mui/icons-material/PersonSearch';

export const UserListToolbar = (props) => {
  const router = useRouter();
  const addUser = () => {
      router.push('/users/add')
  };
  return(
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Users
        </Typography>
        <Box sx={{ m: 1 }}>
          {/* <Button color="primary" variant="contained" onClick={addUser}>
            Add Users
          </Button> */}
          <ButtonGroup disableElevation variant="contained">
            <Button>Delete Multiple Users</Button>
            <Button onClick={addUser}>Add Users</Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};
