//changed
import React, {useState} from 'react';
//import logo from './logo.svg';
//<img src={logo} className="App-logo" alt="logo" />
import './App.css';
import {v1} from "uuid";
import TodoList from "./TodoList/TodoList";
import {AddItemForm} from "./AddItemForm/AddItemForm";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

type TaskStateType = {
    [key: string] : Array<TasksType>
}

export type FilterType = 'active' | 'complete' | 'all'

function App() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: '1st todoList', filter: 'active'},
        {id: todoListID2, title: '2nd todoList', filter: 'complete'}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'React', isDone: true}
        ]
    })

    function removeTask(id: string, todoListID: string) {
        let todoListTask = tasks[todoListID]
        tasks[todoListID] = todoListTask.filter(tl => tl.id !== id)
        setTasks({...tasks})
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList){
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function changeFilter(value: FilterType, todoListID: string) {
        let todoList = todoLists.find(tl=> tl.id === todoListID)
        if(todoList){
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function addTask(text: string, todoListID: string) {
        let task = {id: v1(), title: text, isDone: false}
        let todoListTask = tasks[todoListID]
        tasks[todoListID] = [task, ...todoListTask]
        setTasks({...tasks})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        let todoListTask = tasks[todoListID]
        let task = todoListTask.find(t => t.id === taskId)
        if(task){
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        let todoListTask = tasks[todoListID]
        let task = todoListTask.find(t => t.id === taskId)
        if(task){
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    function removeTodoList(todoListID: string) {
        let filteredTodoList = todoLists.filter( t => t.id !== todoListID)
        setTodoLists(filteredTodoList)
        delete tasks[todoListID]
        setTasks(tasks)
    }

    function addTodoList(text: string) {
        let todoList: TodoListType = {
            id: v1(),
            title: text,
            filter: 'all'
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({
            ...tasks,
            [todoList.id]: []
        })
    }

    return (
        <div className="app">
            <AddItemForm addItem={addTodoList} />
            {
                todoLists.map(tl => {

                    let taskForTodoList = tasks[tl.id]

                    if (tl.filter === 'active') {
                        taskForTodoList = taskForTodoList.filter(t => !t.isDone)
                    }
                    if (tl.filter === 'complete') {
                        taskForTodoList = taskForTodoList.filter(t => t.isDone)
                    }

                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={taskForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
