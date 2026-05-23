console.log("main.jsで読み込まれている");

const input = document.getElementById("input");
const btn = document.getElementById("btn");
const output = document.getElementById("output");

window.addEventListener("DOMContentLoaded", async () => {
  console.log("読み込みOK");

  const res = await fetch("http://localhost:8080/todos");
  console.log("fetch OK", res);

  const todos = await res.json();
  console.log("データ", todos);

  todos.forEach(todo => {
    createTodoElement(todo);
  });
});

btn.addEventListener("click", async () => {
  
  if (!input.value.trim()) return;

  const newTodo = {
    id: Date.now(),
    title: input.value,
    completed: false
  };

  const res = await fetch("http://localhost:8080/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTodo)
  });

  const savedTodo = await res.json();

  createTodoElement(savedTodo);

  input.value = "";

});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

function createTodoElement(todo) {
  const div = document.createElement("div");
  div.dataset.id = todo.id;

  const span = document.createElement("span");
  span.textContent = todo.title;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  const deletebtn = document.createElement("button");
  deletebtn.textContent = "削除";

  if (todo.completed) {
    span.classList.add("done");
  }

  checkbox.addEventListener("change", async () => {
    await fetch(`http://localhost:8080/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: checkbox.checked
      })
    });

    span.classList.toggle("done");
  });

  deletebtn.addEventListener("click", async () => {
    const id = div.dataset.id;

    const res = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      alert("削除失敗");
      return;
    }

    div.remove();
  });

  div.classList.add("todo-item");
  deletebtn.classList.add("delete-btn");

  const left = document.createElement("div");
  left.classList.add("todo-left");

  left.append(checkbox);
  left.append(span);

  div.append(left);
  div.append(deletebtn);

  output.append(div);
}