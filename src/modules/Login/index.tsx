import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import LoadingFullPage from 'components/common/LoadingFullPage';
import { LOGIN_BODY_TYPE } from 'models/authentication';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { LOGIN_REQUEST } from 'store/reducers/authentication/actionTypes';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type FormDataType = {
  username: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const { is_global_loading } = useAppSelector((state) => state.global);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: {
      username: 'dung+octopus4@101digital.io',
      password: 'Abc@123456',
    },
  });

  const onSubmit = (data: FormDataType) => {
    const loginBody: LOGIN_BODY_TYPE = {
      client_id: 'oO8BMTesSg9Vl3_jAyKpbOd2fIEa',
      client_secret: '0Exp4dwqmpON_ezyhfm0o_Xkowka',
      grant_type: 'password',
      scope: 'openid',
      username: data.username,
      password: data.password,
    };
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        data: loginBody,
        onFailed: (message: string) => {
          setError('username', {
            type: 'custom',
            message,
          });
        },
      },
    });
  };

  return (
    <Container
      sx={{
        maxWidth: { xs: '450px' },
      }}
    >
      <LoadingFullPage isLoading={is_global_loading} />
      <Grid container direction="column">
        <Typography
          sx={{
            fontWeight: 700,
          }}
          variant="h4"
        >
          Login to SimpleInvoice
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" my={2}>
            <Controller
              render={({ field }) => (
                <Grid container direction="column">
                  <InputLabel htmlFor="Username">Username</InputLabel>
                  <TextField
                    {...field}
                    placeholder="Username"
                    autoComplete="username"
                    id="Username"
                    error={!!errors.username}
                    helperText={
                      errors.username && errors.username.type !== 'custom'
                        ? errors.username.message
                        : null
                    }
                  />
                </Grid>
              )}
              name="username"
              control={control}
              rules={{
                required: 'This field is required!',
              }}
            />
            <Controller
              render={({ field }) => (
                <Grid container direction="column" my={2}>
                  <InputLabel htmlFor="Password">Password</InputLabel>
                  <TextField
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    autoComplete="current-password"
                    id="Password"
                    error={!!errors.password}
                    helperText={
                      errors.password ? errors.password.message : null
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              )}
              rules={{
                required: 'This field is required!',
              }}
              name="password"
              control={control}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default Login;
