import { createContext, Dispatch, ReactNode, useContext } from 'react'
import { useImmerReducer } from 'use-immer'
import { DragItem } from '../DragItem'
import { Action } from './actions'
import { AppState, appStateReducer, List, Task } from './appStateReducer'

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [
        { id: 'c2', text: 'Learn Typescript' },
        { id: 'c3', text: 'Learn React-router' },
      ],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Begin to use static typing' }],
    },
  ],
  draggedItem: null,
}

type AppStateContextProps = {
  draggedItem: DragItem | null
  lists: List[]
  getTasksByListId(id: string): Task[]
  dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)

type AppStateProviderProps = {
  children: ReactNode
}

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData)
  const { draggedItem, lists } = state

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || []
  }

  return (
    <AppStateContext.Provider
      value={{ draggedItem, lists, getTasksByListId, dispatch }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  return useContext(AppStateContext)
}
