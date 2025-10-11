import Task from "../models/Task.js"


export const getAllTask = async (req, res) => {
  const { filter = 'today' } = req.query
  const now = new Date()
  let startDate

  switch (filter) {
    case 'today': {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      break
    }
    case 'week': {
      const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0)
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate)
      break
    }
    case 'month': {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      break
    }
    case 'all':
      default: {
        startDate = null
      }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {}
  try {
    const result = await Task.aggregate([
      { $match: query},
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: 'active' } }, { $count: 'count'}],
          completeCount: [{ $match: { status: 'complete' } }, { $count: 'count'}]
        }
      }
    ])
    const tasks = result[0].tasks
    // console.log(tasks)
    const activeCount = result[0].activeCount[0]?.count || 0
    const completeCount = result[0].completeCount[0]?.count || 0
    // console.log('completeCount: ', completeCount)
    // console.log('taskscompleteCount: ', result[0].completeCount[0]?.count)
    // console.log('dữ liệu chuẩn: ', result)

    res.status(200).json({ tasks, activeCount, completeCount })
  } catch (error) {
    console.log('Error when calling API getAllTask: error:', error)
    res.status(500).json({message: 'Server error'})
  }
}

export const createTask = async (req, res) => {
  try {
    const {title} = req.body

    const task = new Task({title})
    const newTask = await task.save()
    res.status(201).json(newTask)

  } catch (error) {
    console.log('Error when calling API getAllTask: error:', error)
    res.status(500).json({message: 'Server error'})
  }
}

export const updateTask = async (req, res) => {
  try {
    const {title, status, completedAt} = req.body
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt
      },
      {
        new: true
      }
    )
    console.log('updatedTask', updatedTask)
    if (!updatedTask) {
      res.status(404).json({message: 'Task does not exist!'})
    }

    res.status(200).json(updatedTask)

  } catch (error) {
    console.log('Error when calling API getAllTask: error:', error)
    res.status(500).json({message: 'Server error'})
  }
}

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id)
    if (!deletedTask) {
      return res.status(404).json({message: 'Task does not exist!'})
    }
    res.status(200).json(deletedTask)
  } catch (error) {
    console.log('Error when calling API getAllTask: error:', error)
    res.status(500).json({message: 'Server error'})
  }
}
