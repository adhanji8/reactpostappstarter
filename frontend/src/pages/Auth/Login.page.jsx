import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from '@mantine/core';
import classes from './Login.module.css';

export function LoginPage() {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    let email = e.target.email?.value;
    let password = e.target.password?.value;
    if (!email || !password) return;
    loginService(email, password);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>Log In</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onLogin}>
          <TextInput name="email" label="Email" placeholder="Email" required />
          <PasswordInput name="password" label="Password" placeholder="Password" required mt="md" />
          <Button type="submit" mt="xl">
            Log in
          </Button>
          {authLoading ? <h2>Loading...</h2> : null}
        </form>
      </Paper>
    </Container>
  );
}

export default LoginPage;
