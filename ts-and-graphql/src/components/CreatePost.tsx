import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Input, Button, message } from 'antd';

// Define the GraphQL mutation
const CREATE_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $content: String!, $authorId: String!) {
    createPost(title: $title, content: $content , authorId: $authorId) {
      id
      title
      content
    }
  }
`;

const CreatePost: React.FC = () => {
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: () => message.success('Post created successfully'),
    onError: (error) => message.error(`Creation failed! ${error.message}`),
  });

  // Form submit handler
  const onFinish = (values: { title: string; content: string, id: string }) => {
    createPost({ variables: { title: values.title, content: values.content, authorId: values.id } });
  };

  return (
    <Form
      name="createPost"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input the title of the post!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: 'Please input the content of the post!' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Id"
        name="id"
        rules={[{ required: true, message: 'Please input the id of the post!' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePost;
