import { Button, Checkbox, Form, Input, Alert, message } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../index.module.css';
import { Content } from 'antd/lib/layout/layout';
import logo from '../assets/logo_four_squares.png';
import type { AlertStateObj } from './Login';
import { match } from 'assert';

export default function Register(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setConfirmPassword] = useState<string>('');
  const [alert, setAlert] = useState<AlertStateObj | null>(null);

  const sendRegisterRequest = async () => {
    if (password === passwordConfirm) {
      try {
        const response = await axios.post('http://localhost:3001/api/auth/register', {
          email,
          username,
          password,
          acctType: 'artist',
        });
        console.log(response);
        setAlert({ status: 'success', message: 'Account created succesfully, you may now login' });
      } catch (err) {
        console.error(err);
      }
    } else {
      // passwords dont match, display error
      setAlert({ status: 'error', message: `Passwords don't match, please try again.` });
    }
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Content style={{ justifyContent: 'center', textAlign: 'center', marginTop: '5rem' }}>
      <img src={logo} alt="logo" width={200} style={{ marginBottom: '1rem' }} />
      <h1 style={{ fontSize: '3.5rem' }}>Create your free account</h1>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        wrapperCol={{ span: 16, offset: 4 }}
        labelCol={{ span: 16, offset: 4 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ justifyContent: 'center', textAlign: 'center', width: '100%' }}
      >
        <Form.Item
          style={{ justifySelf: 'center' }}
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            className="round-white-input"
            placeholder="Email"
            style={{ width: '600px', height: '50px', borderRadius: '40px' }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          style={{ justifySelf: 'center' }}
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            className="round-white-input"
            placeholder="Username"
            style={{ width: '600px', height: '50px', borderRadius: '40px' }}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password
            className="round-white-input"
            placeholder="Password"
            style={{ width: '600px', height: '50px', borderRadius: '40px' }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item name="confirm password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password
            className="round-white-input"
            placeholder="Confirm Password"
            style={{ width: '600px', height: '50px', borderRadius: '40px' }}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{
              fontSize: '2rem',
              margin: '1rem',
              background: 'black',
              borderColor: 'black',
              width: '400px',
              height: '80px',
            }}
            onClick={async () => {
              await sendRegisterRequest();
            }}
          >
            Sign Up
          </Button>
          <h3>Already have an account?</h3>
          <a href="/login">Login</a>
        </Form.Item>
      </Form>
      {alert ? (
        <Alert message={alert.message} type={alert.status} showIcon style={{ width: '50%', margin: 'auto' }} />
      ) : null}
    </Content>
  );
}
