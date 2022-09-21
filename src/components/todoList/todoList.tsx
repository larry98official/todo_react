import React, {ReactElement} from 'react'
import { useLocation } from 'react-router-dom'
import { Layout } from './todoListStyle'
import {AppState, recoilState, Todo} from "../../utils/dataStructure";
import Item from "./item/item";
import {useRecoilState} from "recoil";

const TodoList: React.FC = () => {
    const { pathname } = useLocation()
    const [appState, setAppState] = useRecoilState<AppState>(recoilState)

    function toggleAllCheckbox(e: React.ChangeEvent<HTMLInputElement>): void {
        setAppState({ todoList: appState.todoList.map((t: Todo): Todo => ({ ...t, completed: e.target.checked })) })
    }

    return (
        <Layout>
            <section className="main">
                <input
                    id="toggle-all"
                    className="toggle-all"
                    type="checkbox"
                    onChange={toggleAllCheckbox}
                    data-cy="toggle-all-btn"
                    data-testid="toggle-all-btn"
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list" data-testid="todo-list">
                    {appState.todoList
                        .filter((t: Todo): boolean => {
                            switch (pathname) {
                                case '/':
                                    return true
                                case '/active':
                                    return !t.completed
                                case '/completed':
                                    return t.completed
                                default:
                                    return true
                            }
                        })
                        .map((t: Todo): ReactElement => {
                            return <Item key={t.id} todo={t} />
                        })}
                </ul>
            </section>
        </Layout>
    )
}

export default TodoList
