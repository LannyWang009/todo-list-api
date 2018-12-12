var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var todoList = [
    {
        id: 1,
        todo: "Implement a REST API"
    }
    ,
    {
        id:2,
        todo: "play play play"
    }
];



// GET /api/todos
app.get('/api/todos', function(req, res, next) {
    res.send(todoList)
    // console.log(req.params)

})

// GET /api/todos/:id
app.get('/api/todos/:id', function(req, res, next) {
    var x = req.params.id
    var output = null
    todoList.map(function(element){
        if (parseInt(element.id) == x) {
           output = element
        }
    })
    
    res.json(output)
    // res.send(JSON.stringify()) is the same as res.json()
})

// POST /api/todos
app.post('/api/todos', function(req, res, next){
    // console.log(req.body);
    var newID = todoList.length + 1
    var newTodo = req.body
    newTodo['id'] = newID 
    // console.log(newTodo);
    todoList.push(newTodo);
    // console.log(todoList);
    res.json(todoList);
})


// PUT /api/todos/:id

app.put('/api/todos/:id', function(req, res, next) {
    console.log(req.params.id);
    var ID = req.params.id;
    console.log(ID)
    todoList.map(function(element){
        if (parseInt(element.id) == ID) {
           element['isComplete'] = true;
        }
        console.log(element)
    })
    console.log(todoList)
    res.json(todoList)
})



// DELETE /api/todos/:id

app.delete('/api/todos/:id', function (req, res, next) {
    console.log(req.params.id)
    var ID = req.params.id
    todoList.map(function(element){
        var idx = ID - 1;
        todoList.splice(idx, 1, null)
    })
    console.log(todoList)
    res.json(todoList)
})

app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
})