//changed
import React, {ChangeEvent} from "react";
import {FilterType, TasksType} from "../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterType, todoListID: string) => void
    addTask: (text: string, todoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    filter: FilterType
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

function TodoList(props: PropsType) {
    const {tasks, removeTask, changeFilter, changeStatus, filter} = props

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    const addTask = (text: string) => {
        props.addTask(text, props.id)
    }

    const onAllClickHandler = () => changeFilter('all', props.id)
    const onCompleteClickHandler = () => changeFilter('complete', props.id)
    const onActiveClickHandler = () => changeFilter('active', props.id)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <button onClick={removeTodoList}>X</button>
            </h3>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {
                    tasks.map(t => {

                        const deleteHandler = (id: string) => removeTask(t.id, props.id)

                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(t.id, e.currentTarget.checked, props.id)
                            console.log(t.id + e.currentTarget.checked)
                        }

                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return (
                            <li
                                className={t.isDone ? 'is-done' : ''}
                                key={t.id}>
                                <input
                                    onChange={onChangeStatusHandler}
                                    type='checkbox'
                                    checked={t.isDone}/>
                                <EditableSpan title={t.title} onChange={ onChangeTitleHandler }/>
                                <button onClick={() => deleteHandler(t.id)}>Del</button>
                            </li>
                        )
                    })
                }
            </ul>
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