import React from 'react';
import { Typography, Button, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Title>Welcome to Our Blog Management System</Title>
      <Paragraph>
        This is the place to manage your blogs, engage with readers, and discover insights into your posts. Start by exploring our users or dive straight into managing your blogs.
      </Paragraph>
      <Space>
        <Button type="primary" size="large">
          <Link to="/users">View Users</Link>
        </Button>
        {/* If you have a route for managing or viewing blogs, add another Button here */}
        {/* <Button type="primary" size="large">
          <Link to="/blogs">Manage Blogs</Link>
        </Button> */}
      </Space>
    </div>
  );
};

export default Home;

