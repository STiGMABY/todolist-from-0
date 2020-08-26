//changed
import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterType, TasksType} from "../App";

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterType, todoListID: string) => void
    addTask: (text: string, todoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    filter: FilterType
    removeTodoList: (todoListID: string) => void
}

function TodoList(props: PropsType) {

    const onAllClickHandler = () => changeFilter('all', props.id)
    const onCompleteClickHandler = () => changeFilter('complete', props.id)
    const onActiveClickHandler = () => changeFilter('active', props.id)

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            addText()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
        setError('')

    }

    const addText = () => {
        if (text.trim() !== '') {
            addTask(text, props.id)
            setText('')
        } else {
            setError('Enter task name!')
        }

    }

    const {tasks, removeTask, changeFilter, addTask, changeStatus, filter} = props

    let [error, setError] = useState<string | null>(null)

    let [text, setText] = useState('')
    console.log(text)

    return (
        <div>
            <div>
                {props.title}
                <button onClick={removeTodoList}>X</button>
            </div>
            <div>
                <input
                    className={error ? 'error' : ''}
                    onKeyPress={onKeyPressHandler}
                    onChange={onChangeHandler}
                    value={text}
                />
                <button onClick={addText}>Add task</button>
                {error &&
                <div className='error-message'>{error}</div>
                }
            </div>
            <div>
                <ul>
                    {
                        tasks.map(t => {

                            const deleteHandler = (id: string) => removeTask(t.id, props.id)

                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                changeStatus(t.id, e.currentTarget.checked, props.id)
                                console.log(t.id + e.currentTarget.checked)
                            }

                            return (
                                <li
                                    className={t.isDone ? 'is-done' : ''}
                                    key={t.id}
                                >
                                    <input
                                        onChange={onChangeHandler}
                                        type='checkbox'
                                        checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <button onClick={() => deleteHandler(t.id)}>Del</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div>
                <button
                    className={filter === "all" ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={filter === "complete" ? 'active-filter' : ''}
                    onClick={onCompleteClickHandler}>Complete
                </button>
                <button
                    className={filter === "active" ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
            </div>
        </div>
    )
}

export default TodoList