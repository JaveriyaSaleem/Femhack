function TaskCard({ task, changeStatus }) {
    return (
      <div className="border p-4 mb-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <div className="flex justify-between mt-2">
          {task.status !== 'To Do' && (
            <button
              className="text-xs bg-blue-300 px-2 py-1 rounded hover:bg-blue-400"
              onClick={() => changeStatus(task._id, 'To Do')}
            >
              To Do
            </button>
          )}
          {task.status !== 'In Progress' && (
            <button
              className="text-xs bg-yellow-300 px-2 py-1 rounded hover:bg-yellow-400"
              onClick={() => changeStatus(task._id, 'In Progress')}
            >
              In Progress
            </button>
          )}
          {task.status !== 'Done' && (
            <button
              className="text-xs bg-green-300 px-2 py-1 rounded hover:bg-green-400"
              onClick={() => changeStatus(task._id, 'Done')}
            >
              Done
            </button>
          )}
        </div>
      </div>
    );
  }
  
  export default TaskCard;
  