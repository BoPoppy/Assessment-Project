import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import LoadingFullPage from 'components/common/LoadingFullPage';
import { LOGIN_BODY_TYPE } from 'models/authentication';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { LOGIN_REQUEST } from 'store/reducers/authentication/actionTypes';

type FormDataType = {
  username: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const { is_global_loading } = useAppSelector((state) => state.global);
  const { handleSubmit, reset, setValue, control } = useForm<FormDataType>({
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
      payload: loginBody,
    });
  };

  return (
    <Container>
      <LoadingFullPage isLoading={is_global_loading} />
      <Grid container direction="column">
        <Typography>Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column">
            <Controller
              render={({ field }) => <TextField {...field} />}
              name="username"
              control={control}
            />
            <Controller
              render={({ field }) => <TextField {...field} />}
              name="password"
              control={control}
            />
            <Button type="submit">Submit</Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default Login;
