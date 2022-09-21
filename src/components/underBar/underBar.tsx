import React from 'react'
import { Layout } from './underBarStyle'
import {AppState, recoilState, Todo} from "../../utils/dataStructure";
import FilterLink from "./FilterLink/filterLink";
import {useRecoilState} from "recoil";

const UnderBar: React.FC = () => {
    const [appState, setAppState] = useRecoilState<AppState>(recoilState)
    const completed: number = appState.todoList.filter(t => t.completed).length
    const backlog: number = appState.todoList.filter(t => !t.completed).length
    let item: string
    if (backlog === 1) {
        item = "item"
    } else {
        item = "items"
    }

    function clearCompleted(): void {
        setAppState({
            todoList: appState.todoList.filter((t: Todo) => !t.completed),
        })
    }

    return (
        <Layout>
            <footer className="footer">
                <span className="todo-count">
                  <strong data-cy="remaining-uncompleted-todo-count">{backlog}</strong>{' '}
                    {item} left
                </span>

                <FilterLink />

                {completed > 0 && (
                    <button
                        onClick={clearCompleted}
                        className="clear-completed"
                        data-cy="clear-completed-button"
                    >
                        Clear completed
                    </button>
                )}
            </footer>
        </Layout>
    )
}

export default UnderBar
