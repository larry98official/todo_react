import React, {useEffect} from 'react'
import { Layout } from '../../../AppStyle'
import {AppState, LocalStorageKey, recoilState} from "../../../utils/dataStructure";
import {useRecoilState} from "recoil";
import NewTodoInput from "../../../components/newTodoInput/newTodoInput";
import TodoList from "../../../components/todoList/todoList";
import UnderBar from "../../../components/underBar/underBar";

const Home: React.FC = () => {
  const [appState, setAppState] = useRecoilState<AppState>(recoilState)

  // if appState has changes, save it LocalStorage.
  useEffect((): void => {
    window.localStorage.setItem(
      LocalStorageKey.APP_STATE,
      JSON.stringify(appState) // convert JavaScript Object to string
    )
  }, [appState])


  return (
    <Layout>
      <section className="todoapp">
        <NewTodoInput />
        {appState.todoList.length ? (
          <>
            <TodoList />
            <UnderBar />
          </>
        ) : null}
      </section>
    </Layout>
  )
}

export default Home
