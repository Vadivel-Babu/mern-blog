import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import axios from "axios";
const App = () => {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);

  async function deleteTodo(id) {
    await axios.delete(
      "https://658a4e12ba789a962236e2f6.mockapi.io/user/" + id
    );
    getTodo();
  }

  async function addTodo(text) {
    const data = {
      name: text,
    };
    await axios.post("https://658a4e12ba789a962236e2f6.mockapi.io/user", data);
    getTodo();
    setText("");
  }

  async function getTodo() {
    const response = await axios.get(
      "https://658a4e12ba789a962236e2f6.mockapi.io/user"
    );
    console.log(response);
    setTodo(response.data);
  }
  useEffect(() => {
    getTodo();
  }, []);
  return (
    <div className="App">
      <div className="flex gap-2">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          name=""
          id=""
          className="border-2"
        />
        <Button onClick={() => addTodo(text)}>add</Button>
      </div>
      {todo.map((to) => (
        <Card
          size="medium"
          title="Small size card"
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
          key={to.id}
        >
          <p>{to.name}</p>
          <Button className="mt-2" type="primary">
            edit
          </Button>
          <Button
            onClick={() => deleteTodo(to.id)}
            type="primary"
            className="ml-2"
            danger
          >
            delete
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default App;
