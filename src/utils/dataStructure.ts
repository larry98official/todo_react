import type { RecoilState } from 'recoil'
import { atom } from 'recoil'

export interface Todo {
    id: string
    bodyText: string
    completed: boolean
}

export type TodoListType = Todo[]

export interface AppState {
    todoList: TodoListType
}

export enum LocalStorageKey {
    APP_STATE = 'APP_STATE',
}

function LoadAppStateFromLocalStorage(): AppState {
    const stringifyJSON: string | null = window.localStorage.getItem(
        LocalStorageKey.APP_STATE
    )
    if (typeof stringifyJSON === 'string') {
        const Loaded: AppState = JSON.parse(stringifyJSON)
        return Loaded
    }

    const BlankAppState: AppState = {
        todoList: [],
    }

    return BlankAppState
}

export const recoilState: RecoilState<AppState> = atom({
    default: LoadAppStateFromLocalStorage(),
    key: 'initialAppState',
})
