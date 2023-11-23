import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";
import { Button, Container, Paper, SimpleGrid, Title, Text, rem } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import classes from "./PostDetails.module.css";

function PostDetailsPage() {
  const post = useLoaderData();
  const name = post.user.email.split('@')[0];

  return (
    <Container>
      <SimpleGrid cols={2}>
        <div className={classes.post}>
          <Title className={classes.post__title}>{post.title}</Title>
          <Text className={classes.post__user} size="xs">by {name}</Text>
          <Text className={classes.post__category} size="xs">{post.category}</Text>
          <div className={classes.post__content}>
            <Text>{post.content}</Text>
            {
              post.user.isCurrentUser ?
              <Button variant="filled">
                <Link to={`/posts/${post.id}/edit`}>Edit</Link>
              </Button>
              : null
            }
          </div>
        </div>
        <div className={classes.post__image}>
          <Paper shadow="s">
            <img src={post.image} alt="" />
          </Paper>
        </div>
      </SimpleGrid>
    </Container>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default PostDetailsPage;
