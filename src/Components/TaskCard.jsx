import { FaTrash } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";

function TaskCard({ task, changeStatus,deleteTask }) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true); 
    await deleteTask(task._id);
    setDeleting(false); 
  };
    return (
      <div className="border p-4 mb-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <div className="flex justify-between mt-2">
          {task.status !== 'To Do' && (
            <button
              className="text-xs bg-purple-400 px-2 py-1 rounded hover:bg-purple-600 text-white"
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
              className="text-xs bg-pink-400 px-2 py-1 rounded hover:bg-pink-600 text-white"
              onClick={() => changeStatus(task._id, 'Done')}
            >
              Done
            </button>
          )}
          <button className="cursor-pointer flex items-center gap-1" onClick={handleDelete}>
          <FaTrash />
          {deleting && <FaSpinner className="animate-spin text-pink-500" />}
             </button>
        </div>
      </div>
    );
  }
  
  export default TaskCard;
  