import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';
import LogoutBtn from './LogoutBtn';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
   const navigate = useNavigate();
  const[assignTask,setAssignTask]=useState([])
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '' // assuming you will select user ID later
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/signup`);
      // console.log(res.data); 
      const userId = localStorage.getItem("token");
      const user = res.data.find((user) => user.token === userId ) 
      if(user){
        const response = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/task`);
        const userTask = response.data.filter((task)=>task.assignedTo=== user.email)
        setAssignTask(userTask)
        // console.log(response.data[19])
      }else{
        console.log("not found")
         navigate('/login');
      }
      
      // console.log(user.email)
    } catch (err) {
      // console.error("Error fetching tasks:", err);
    }
  };

  const addTask = async () => {
    if (newTask.title.trim() === '' || newTask.description.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please fill out both title and description!',
      });
      return;
    }
    if (newTask.title.trim() === '' || newTask.description.trim() === '') return;
    // console.log(newTask)
    const userId = localStorage.getItem("token");
    Swal.fire({
      title: 'Adding your task...',
      text: 'Please wait💖',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  let response = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/signup`)
  if (response.data){
    const user = response.data.find((user) => user.token === userId);
    
    if (user) {
      // console.log(user.email)
      try {
        const response = await axios.post(`https://backend-of-femhack-production.up.railway.app/api/task`, {
          title: newTask.title,
          description: newTask.description,
          status: 'To Do',
          assignedTo: user.email
        });
        Swal.fire({
          icon: 'success',
          title: 'Task Added!',
          text: 'Your task has been successfully added 💖',
        });
        setNewTask({ title: '', description: '', assignedTo: '' });
        fetchTasks();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.response ? error.response.data : error.message,
        });
      }
      // console.log("User found:", user);
      
    } else {
      console.log("User with matching token not found.");
    }
  } else {
    console.log("No data received from the server.");
  }

    if (!userId) {
      // console.log("User not logged in");
      return;
    }
  

  };

  const changeStatus = async (id, newStatus) => {
    // console.log(`Changing task ${id} status to ${newStatus}`); 
    await axios.put(`https://backend-of-femhack-production.up.railway.app/api/task/${id}`, { status: newStatus });
    fetchTasks();  // Refetch the tasks after status change
  };

  const deleteTask = async (id) => {

    await axios.delete(`https://backend-of-femhack-production.up.railway.app/api/task/${id}`);
    fetchTasks();
  };

  return (
    <div className="bg-pink-50 min-h-screen flex flex-col items-center p-4">
      <div className='flex items-center  justify-between w-full mb-10'>
      <h1 className="text-3xl sm:text-4xl text-pink-500 font-bold ">Task Board</h1>
      <LogoutBtn/> 
      </div>

  {/* add task  */}
      <div className="flex flex-col gap-2 mb-8 md:w-96">
        <h1 className='text-pink-500'>Add New Todo:</h1>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Enter task title"
          className="p-2 rounded border border-pink-300"
        />
        <textarea
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Enter task description"
          className="p-2 rounded border border-pink-300"
        />

        <button
          onClick={addTask}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 mt-2"
        >
          Add Task
        </button>
      </div>

      {/* Task column where my task appear */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {['To Do', 'In Progress', 'Done'].map((stage) => (
          <div key={stage} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">{stage}</h2>
            {assignTask.filter((task) => task.status === stage).map((task) => (
  <TaskCard key={task._id} task={task} changeStatus={changeStatus} deleteTask={deleteTask} />
))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
