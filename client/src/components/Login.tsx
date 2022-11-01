import { Alert, Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import { Content } from 'antd/lib/layout/layout';
// this alert type should be shared
type AlertStateObj = { status: 'success' | 'error' | 'warning'; message: string };

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alert, setAlert] = useState<AlertStateObj | null>(null);

  const sendLoginRequest = async () => {
    const data = { email, password };
    console.log(data);
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.status === 200) {
        setAlert({ status: 'success', message: 'You are now logged in!' });
      }
    } catch (err: any) {
      console.error(err.message);
      let message: string;
      if (err.status === 401) {
        message = 'Invalid login credentials';
      } else {
        message = 'An error occured while logging in: ' + err.message;
      }
      setAlert({ status: 'error', message: message });
    }
  };

  return (
    <Content style={{ justifyContent: 'center' }}>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        wrapperCol={{ span: 16, offset: 4 }}
        labelCol={{ span: 16, offset: 4 }}
        autoComplete="off"
        style={{ justifyContent: 'center', textAlign: 'center', width: '100%' }}
      >
        <Form.Item
          style={{ justifySelf: 'center' }}
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button
            type="primary"
            onClick={async () => {
              await sendLoginRequest();
            }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
      {alert ? (
        <Alert message={alert.message} type={alert.status} showIcon style={{ width: '50%', margin: 'auto' }} />
      ) : null}
    </Content>
  );
}
