import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./AddItemForm.module.css";

type AddItemFormPropsType = {
    addItem: (text: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [error, setError] = useState<string | null>(null)
    let [text, setText] = useState('')

    const addText = () => {
        if (text.trim() !== '') {
            props.addItem(text.trim())
            setText('')
        } else {
            setError('Enter task name!')
        }
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

    return (
        <div className={s.textInput}>
            <input
                className={error ? 'error' : ''}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeHandler}
                value={text}
            />
            <button onClick={addText}>Add task</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}