import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';

export default function Register(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [fname, setFname] = useState<string>('');
  const [lname, setLname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setConfirmPassword] = useState<string>('');

  const sendRegisterRequest = async () => {
    if (password === passwordConfirm) {
      try {
        const response = await axios.post('http://localhost:3001/api/auth/register', {
          fname,
          lname,
          email,
          username,
          password,
          acctType: 'artist',
        });
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
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
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>

      <Form.Item
        style={{ justifySelf: 'center' }}
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item label="First Name">
        <Input onChange={(e) => setFname(e.target.value)} />
      </Form.Item>

      <Form.Item label="Last Name">
        <Input onChange={(e) => setLname(e.target.value)} />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirm password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password onChange={(e) => setConfirmPassword(e.target.value)} />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button
          type="primary"
          onClick={async () => {
            await sendRegisterRequest();
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
