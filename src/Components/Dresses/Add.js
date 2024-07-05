import React, { useState, useEffect } from "react";
import { Button, Select, Form, Input } from "antd";

const { Option } = Select;
const { useForm } = Form;
// сост для авторов, выбранного автора, издателей, выбранного издателя, жанро, выбранного жанра
const Add = ({ user, addProduct }) => {

  const [form] = useForm();

  return (
    <>
     
          <h3>Добавление товара</h3>

          <Form
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Наименование"
              name="name"
              rules={[{ required: true, message: "Заполните!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Описание"
              name="description"
              rules={[{ required: true, message: "Заполните!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Цена"
              name="price"
              rules={[
                { required: true, message: "Заполните!" },
                {
                  pattern: /^[0-9]+$/,
                  message: "Только целые положительные числа!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>



            <Form.Item
              label="Количество "
              name="pageCount"
              rules={[
                { required: true, message: "Заполните!" },
                {
                  pattern: /^[0-9]+$/,
                  message: "Только целые положительные числа!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Ссылка на фотографию"
              name="photo"
              rules={[{ required: true, message: "Заполните!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Размер"
              name="authorId"
              rules={[{ required: true, message: " " }]}
            >
              <Select >
                <Option value="">Выберите автора</Option>
                
              </Select>
            </Form.Item>

            <Form.Item
              label="Издательство"
              name="publisherId"
              rules={[{ required: true, message: "Выберите издательство!" }]}
            >
              <Select>
                <Option value="">Выберите издательство</Option>
                
              </Select>
            </Form.Item>
            <Form.Item
              label="Категория"
              name="productTypeId"
              rules={[{ required: true, message: "Выберите категорию!" }]}
            >
              <Select>
                <Option value="">Выберите категорию</Option>
               
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Добавить книгу
              </Button>
            </Form.Item>
          </Form>
    
    </>
  );
};

export default Add;
