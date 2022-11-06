import { useReducer } from 'react'
import { AddNewItem } from './AddNewItem'
import { Column } from './Column'
import { addList } from './state/actions'
import { useAppState } from './state/AppStateContext'
import { AppContainer } from './styles'

interface State {
  count: number
}

type Action =
  | {
      type: 'increment'
    }
  | {
      type: 'decrement'
    }

const counterReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

export const App = () => {
  const { lists, dispatch } = useAppState()

  return (
    <AppContainer>
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  )
}
