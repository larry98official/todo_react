import React from 'react';
import {createRef} from 'react'
import { Layout } from './newTodoInputStyle'
import {AppState, recoilState, Todo} from "../../utils/dataStructure";
import {UUID} from "../../utils/functions";
import {useRecoilState} from "recoil";

const NewTodoTextInput: React.FC = () => {
    const [appState, setAppState] = useRecoilState<AppState>(recoilState)
    const textInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>()

    function addTodo(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (textInput.current === null) return
        if (e.key === 'Enter' && textInput.current.value.trim().length > 0) {
            const todo: Todo = {
                bodyText: textInput.current.value,
                completed: false,
                id: UUID(),
            }

            setAppState({ todoList: [todo, ...appState.todoList] })

            // reset text input UI value
            textInput.current.value = ''
        }
    }

    return (
        <Layout>
            <header className="header">
                <h1>todos</h1>
                <input
                    type="text"
                    className="new-todo"
                    placeholder="What needs to be done?"
                    ref={textInput}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => addTodo(e)}
                    data-testid="new-todo-input-text"
                    data-cy="new-todo-input-text"
                    autoFocus
                />
            </header>
        </Layout>
    )
}

export default NewTodoTextInput
