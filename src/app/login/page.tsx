"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Page: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (data.success) {
      messageApi.success(data.message);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="随便填" />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="随便填" />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            className="!bg-purple-500"
            block
            type="primary"
            htmlType="submit"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Page;
