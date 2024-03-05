import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu } from 'antd';
import UsersList from './components/UsersList';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Test from './components/Test'
import 'antd/dist/reset.css';


const App: React.FC = () => {
  return (
    <Router>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="users">
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="post">
          <Link to="/post">Post</Link>
        </Menu.Item>
        <Menu.Item key="test">
          <Link to="/test">test</Link>
        </Menu.Item>
      </Menu>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/post" element={<CreatePost />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;
