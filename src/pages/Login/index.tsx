import { Button, Form, Input } from 'antd'
import React from 'react'
import message from 'react-message-popup'

import { ILoginForm, login } from '@/services/login'
import { setToken } from '@/utils/cookie'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const Login: React.FC = () => {
  const onSubmit = async (values: ILoginForm) => {
    const data = await login(values)
    setToken(data.token)
    message.success('登录成功')
  }

  return (
    <div
      style={{
        height: '95vh',
        backgroundImage: 'url(./login-bg.png)',
        backgroundSize: 'cover',
      }}
      className="flex justify-center items-center"
    >
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        style={{ width: '300px', margin: '0 auto' }}
      >
        <div className="flex flex-col">
          <img src="./logo.svg" alt="logo" className="w-12 self-center" />
          <h1 className="text-3xl text-center">掘金后台</h1>
        </div>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login