//changed
import React, {useState} from 'react';
//import logo from './logo.svg';
//<img src={logo} className="App-logo" alt="logo" />
import './App.css';
import {v1} from "uuid";
import TodoList from "./TodoList/TodoList";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'active' | 'complete' | 'all'


function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'TypeScript', isDone: false},
        {id: v1(), title: 'React', isDone: true},
    ])

    let [filter, setFilter] = useState<FilterType>('all')


    if(filter === 'active'){
        tasks = tasks.filter(t => !t.isDone)
    }
    if(filter === 'complete'){
        tasks = tasks.filter(t => t.isDone)
    }

    function removeTask(id: string) {
        let newTasks = tasks.filter(tl => tl.id !== id)
        setTasks(newTasks)
    }
    
    function changeFilter(value: FilterType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList
                tasks={tasks}
                removeTask={removeTask}
                changeFilter={changeFilter}

            />
        </div>
    );
}

export default App;
