"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Input,
  Space,
  Table,
  InputNumber,
  Form,
  message,
} from "antd";
import type { TableProps } from "antd";

interface DataType {
  id: string;
  title: string;
  content: number;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title?: "string";
  inputType: "number" | "text";
  record: DataType;
  index: number;
}

export default function Page() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const [editingId, setEditingId] = useState("");
  const isEditing = (record: DataType) => record.id === editingId;

  const onEdit = (record: Partial<DataType> & { id: React.Key }) => {
    form.setFieldsValue({ title: "", content: "", ...record });
    setEditingId(record.id as string);
  };

  const cancel = () => {
    setEditingId("");
  };

  const onSave = async (id: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;

      const newData: DataType[] = [...dataSource.list];
      const index = newData.findIndex((item) => id === item.id);

      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      await fetch(`http://localhost:3000/api/articles/${id}`, {
        method: "PATCH",
        body: JSON.stringify(row),
      });
      setEditingId("");
      messageApi.success("修改成功");
      queryData();
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const onDelete = async (id: React.Key) => {
    await fetch(`http://localhost:3000/api/articles/${id}`, {
      method: "DELETE",
    });
    messageApi.success("删除成功");
    queryData();
  };

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      editable: true,
    },
    {
      title: "内容",
      dataIndex: "content",
      editable: true,
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button
              onClick={() => onSave(record.id)}
              style={{ marginInlineEnd: 8 }}
            >
              保存
            </Button>
            <Button title="Sure to cancel?" onClick={cancel}>
              <a>取消</a>
            </Button>
            <Button danger onClick={() => onDelete(record.id)}>
              删除
            </Button>
          </Space>
        ) : (
          <Space>
            <Button onClick={() => onEdit(record)}>编辑</Button>
            <Button danger onClick={() => onDelete(record.id)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  const mergedColumns: TableProps<DataType>["columns"] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const [dataSource, setDataSource] = useState({
    list: [],
    total: 0,
  });

  const [inputValue, setInputValue] = useState("");

  const onAdd = async () => {
    if (!inputValue) {
      messageApi.error("请先输入内容");
      return;
    }

    await fetch("http://localhost:3000/api/articles", {
      method: "POST",
      body: JSON.stringify({
        title: "训练营",
        content: inputValue,
      }),
    });
    messageApi.success("添加成功");
    setInputValue("");
    queryData();
  };

  const onSearch = () => {
    setParams({
      ...params,
      pageNum: 1,
      query: inputValue,
    });
  };

  const onClear = () => {
    setInputValue("");
    setParams({ ...params, pageNum: 1, query: "" });
  };

  const [params, setParams] = useState({
    pageNum: 1,
    pageSize: 3,
    query: "",
  });

  const pagination = {
    showTotal: (total: number) => `共 ${total} 条`,
    current: params.pageNum,
    pageSize: params.pageSize,
    total: dataSource.total,
    onChange: (page: number, pageSize: number) => {
      setParams({
        ...params,
        pageNum: page,
        pageSize: pageSize,
      });
    },
  };

  const queryData = async () => {
    await fetch(
      `http://localhost:3000/api/articles?pageNum=${params.pageNum}&pageSize=${params.pageSize}&query=${params.query}`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result, 123);

        setDataSource({
          list: result.data.list,
          total: result.data.total,
        });
      })
      .catch((error) => console.log("error", error));
  };

  const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  useEffect(() => {
    queryData();
  }, [params]);

  return (
    <div className="w-screen mt-20 flex justify-center">
      {contextHolder}
      <Card
        className="w-200"
        title={
          <Space>
            <Input
              placeholder="请输入内容"
              className="!w-100"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button onClick={onSearch}>搜索</Button>
            <Button onClick={onClear}>重置</Button>
          </Space>
        }
        extra={
          <Button type="primary" onClick={onAdd}>
            添加
          </Button>
        }
      >
        <Form form={form} component={false}>
          <Table
            rowKey="id"
            columns={mergedColumns}
            dataSource={dataSource.list}
            pagination={pagination}
            components={{
              body: { cell: EditableCell },
            }}
          />
        </Form>
      </Card>
    </div>
  );
}
