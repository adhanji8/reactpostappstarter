import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { Paper, Title, Text, rem } from "@mantine/core";

function PostDetailsPage() {
  const post = useLoaderData();

  return (
    <Paper shadow="xs" p="xl" style={{ backgroundImage: `url(${post.image})`, backgroundSize: 'cover' }}>
      <Title>{post.title}</Title>
      <Text>{post.category}</Text>
      <Text>{post.content}</Text>
      <Text>Post: {post.id}</Text>
      <Text>User: {post.userId}</Text>
    </Paper>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default PostDetailsPage;
