import { Suspense } from "react";
import { useLoaderData, Await, defer } from "react-router-dom";
import axios from "axios";
import { Center, Container, Loader, SimpleGrid } from "@mantine/core";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import DOMAIN from "../../services/endpoint";

export const PostPage = () => {
  const data = useLoaderData();

  return (
    <Container>
      <Suspense fallback={<Center><Loader color="blue" size={32} /></Center>}>
        <Await resolve={data.posts} errElement={<p>something went wrong derp!</p>}>
          {(posts) => (
            <SimpleGrid cols={3}>
              {posts.map((post) => (
                <ArticleCardImage key={post.title} {...post} />
              ))}
            </SimpleGrid>
          )}
        </Await>
      </Suspense>
    </Container>
  );
};

export const postsLoader = async () => {
  const postsPromise = axios.get(`${DOMAIN}/api/posts`).then((res)=> res.data);
  return defer({posts: postsPromise});
};