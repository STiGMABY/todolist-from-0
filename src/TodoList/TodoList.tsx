//changed
import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterType, TasksType} from "../App";

type PropsType = {
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (text: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterType
}

function TodoList(props: PropsType) {



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
        setError('')

    }

    const addText = () => {
        if(text.trim() !== ''){
            addTask(text)
            setText('')
        }else {
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
                <input
                    className={error ? 'error' : ''}
                    onKeyPress={ onKeyPressHandler }
                    onChange={onChangeHandler}
                    value={text}
                />
                <button onClick={addText}>Add task</button>
                { error &&
                    <div className='error-message'>{error}</div>
                }
            </div>
            <div>
                <ul>
                    {
                        tasks.map(t => {

                            const deleteHandler = (id: string) => removeTask(id)

                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                changeStatus(t.id, e.currentTarget.checked)

                                console.log(t.id + e.currentTarget.checked)
                            }

                            return (
                                <li
                                    className={t.isDone ? 'is-done' : ''}
                                    key={t.id}>
                                    <input
                                        onChange={onChangeHandler}
                                        type='checkbox'
                                        checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <button onClick={()=>deleteHandler(t.id)}>Del</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div>
                <button
                    className={filter === "all" ? 'active-filter' : ''}
                    onClick={ onAllClickHandler }>All</button>
                <button
                    className={filter === "complete" ? 'active-filter' : ''}
                    onClick={ onCompleteClickHandler }>Complete</button>
                <button
                    className={filter === "active" ? 'active-filter' : ''}
                    onClick={ onActiveClickHandler }>Active</button>
            </div>
        </div>
    )
}

export default TodoList