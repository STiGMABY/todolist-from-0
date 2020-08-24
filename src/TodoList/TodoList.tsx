//changed
import React from "react";
import {FilterType, TasksType} from "../App";

type PropsType = {
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
}

function TodoList(props: PropsType) {

    const deleteHandler = (id: string) => removeTask(id)


    const {tasks, removeTask, changeFilter} = props

    return (
        <div>
            <div>
                <ul>
                    {
                        tasks.map(e => {


                            return (
                                <li key={e.id}>
                                    <input type='checkbox' checked={e.isDone}/>
                                    <span>{e.title}</span>
                                    <button onClick={()=>deleteHandler(e.id)}>Del</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div>
                <button onClick={ ()=> {changeFilter('all')} }>All</button>
                <button onClick={ ()=> {changeFilter('complete')} }>Complete</button>
                <button onClick={ ()=> {changeFilter('active')} }>Active</button>
            </div>
        </div>
    )
}

export default TodoList