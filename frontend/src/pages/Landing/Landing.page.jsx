import { Link } from "react-router-dom";
import { Container } from '@mantine/core';

const Landing = () => {
  return (
    <>
      <Container size="md">
        <h1>Welcome</h1>
        <p>Anyone can see this page. <Link to="/login">Log in</Link> to view private content.</p>
      </Container>
    </>
  );
};

export default Landing;
