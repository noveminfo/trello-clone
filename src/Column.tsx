import { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { throttle } from 'throttle-debounce-ts'
import { AddNewItem } from './AddNewItem'
import { Card } from './Card'
import { addTask, moveList } from './state/actions'
import { useAppState } from './state/AppStateContext'
import { ColumnContainer, ColumnTitle } from './styles'
import { useItemDrag } from './utils/useItemDrag'

type ColumnProps = {
  id: string
  text: string
}

export const Column = ({ text, id }: ColumnProps) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)
  const { drag } = useItemDrag({ type: 'COLUMN', id, text })
  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover: throttle(200, () => {
      if (!draggedItem) {
        return
      }
      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) {
          return
        }

        dispatch(moveList(draggedItem.id, id))
      }
    }),
  })

  const tasks = getTasksByListId(id)
  console.log(draggedItem)
  // console.log(ref)
  drag(drop(ref))

  return (
    <ColumnContainer ref={ref}>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  )
}
