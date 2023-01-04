import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useAppDispatch } from 'hooks/redux';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginFormType } from 'services/userAPI';
import { fetchLogin } from 'store/user/user';
import styles from './Auth.module.scss';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formRef = React.createRef<FormInstance>();
  const [form] = Form.useForm();
  const [disabledSave, setDisabledSave] = useState(true);

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  };

  const navigateFromLogin = () => {
    navigate('/');
  };

  const onFinish = (values: LoginFormType) => {
    dispatch(fetchLogin({ values, navigateFromLogin }));
  };

  return (
    <Card className={styles.form}>
      <Form
        size="large"
        layout="vertical"
        ref={formRef}
        name="login"
        onFinish={onFinish}
        form={form}
        onFieldsChange={handleFormChange}
      >
        <center>
          <h1>Login</h1>
        </center>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              min: 8,
              max: 26,
              whitespace: false,
              message: 'Incorrect email, try another',
              pattern: new RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              ),
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, min: 8, max: 16, whitespace: false, message: 'Incorrect password, try another' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={disabledSave}>
            Log in
          </Button>
          <span className={styles.orSpan}>Or</span>
          <NavLink to="/registration">Register now</NavLink>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
