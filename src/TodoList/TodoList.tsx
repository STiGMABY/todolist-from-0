//changed
import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterType, TasksType} from "../App";

type PropsType = {
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (text: string) => void
}

function TodoList(props: PropsType) {

    const deleteHandler = (id: string) => removeTask(id)

    const onAllClickHandler = () => changeFilter('all')
    const onCompleteClickHandler = () => changeFilter('complete')
    const onActiveClickHandler = () => changeFilter('active')

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13){
            addText()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const addText = () => {
        addTask(text)
        setText('')
    }

    const {tasks, removeTask, changeFilter, addTask} = props

    let [text, setText] = useState('')
    console.log(text)

    return (
        <div>
            <div>
                <input
                    onKeyPress={ onKeyPressHandler }
                    onChange={onChangeHandler}
                    value={text}
                />
                <button onClick={addText}>Add task</button>
            </div>
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
                <button onClick={ onAllClickHandler }>All</button>
                <button onClick={ onCompleteClickHandler }>Complete</button>
                <button onClick={ onActiveClickHandler }>Active</button>
            </div>
        </div>
    )
}

export default TodoList