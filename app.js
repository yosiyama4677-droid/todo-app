//expressモジュールの読み込み
const express = require('express')
//expressのインスタンス化
const app = express()

app.use(express.static('public'));

//8080番ポートでサーバーを待ちの状態にする。
//またサーバーが起動したことがわかるようにログを出力する
app.listen(8080, () => {
  console.log("サーバー起動中");
});



const todos = [
    { id: 1, title: 'タスク1', completed: false },
    { id: 2, title: 'タスク2', completed: true },
];

app.use(express.json());

//GETリクエストの設定
//'/get'でアクセスされた時に、JSONとログを出力するようにする
app.get('/todos', (req, res)=> {
    res.json(todos);
});

app.post('/todos',(req, res) => {
    const newTodo = req.body;
    console.log(newTodo);
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id',(req, res) => {
    const todoId = parseInt(req.params.id);
    const updateTodo = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
        todos[todoIndex] = { ...todos[todoIndex], ...updateTodo};
        res.json(todos[todoIndex]);
    } else {
        res.status(404).json({ message: '指定されたToDoが見つかりません'});
    }
});

app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
        const deletedTodo = todos.splice(todoIndex, 1)[0];
        res.json(deletedTodo);
    } else {
        res.status(404).json({ message: '指定されたToDoが見つかりません'});
    }
});