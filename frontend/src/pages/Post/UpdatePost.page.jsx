import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { Title, TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import DOMAIN from "../../services/endpoint";

function UpdatePostPage() {
  const post = useLoaderData();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: post.title,
      category: post.category,
      image: post.image,
      content: post.content,
    },
  });

  const handleSubmit = async (values) => {
    values.id = post.id;
    try {
      const res = await axios.post(`${DOMAIN}/api/posts/update`, values);
      if (res?.data.success) {
        navigate("/posts");
      }
    } catch(error) {
      form.setErrors(error.response.data.errors);
    }
  };

  return (
    <>
      <Title ta="center">Edit Post</Title>
      <Box maw={300} mx="auto" style={{marginTop: "calc(1.875rem * var(--mantine-scale))"}}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Title"
            placeholder="Enter a Title"
            {...form.getInputProps("title")}
          />

          <TextInput
            label="Category"
            placeholder="Enter a Category"
            {...form.getInputProps("category")}
          />
          <TextInput
            label="Image"
            placeholder="Enter an Image"
            {...form.getInputProps("image")}
          />

          <TextInput
            label="Content"
            placeholder="Enter some content"
            {...form.getInputProps("content")}
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </>
  );
}

export default UpdatePostPage;
