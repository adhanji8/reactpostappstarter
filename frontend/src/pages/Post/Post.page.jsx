import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { SimpleGrid, Container } from "@mantine/core";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import DOMAIN from "../../services/endpoint";

export const PostPage = () => {
  const posts = useLoaderData();

  return (
    <Container>
      <SimpleGrid cols={3}>
        {posts.map((post) => (
          <ArticleCardImage key={post.title} {...post} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  return res.data;
};
