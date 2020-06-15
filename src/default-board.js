import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'description',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: 'description',
          name: 'second task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: 'description',
          name: 'and third',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: 'description',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: 'description',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  ]
}
