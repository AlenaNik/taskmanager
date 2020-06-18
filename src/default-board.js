import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'and description',
          name: 'start by adding new task',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: 'and description',
          name: 'start by adding new task',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: 'and description',
          name: 'start by adding new task',
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  ]
}
