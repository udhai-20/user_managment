import { motion } from "framer-motion";
interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
  }  
  interface TaskListProps {
    tasks: Task[]; 
    handleEdit: (task: Task) => void;
    handleDelete: (taskId: string) => void;
    handleToggleComplete: (task: Task) => void;
    deleteLoading: string | null;
  }
const TaskList = ({ 
    tasks, 
    handleEdit, 
    handleDelete, 
    handleToggleComplete, 
    deleteLoading 
}:TaskListProps) => {
    return (
        <div className="w-full max-w-lg mt-6 space-y-4 h-[400px] overflow-y-auto border rounded-lg p-2">
            {tasks?.length === 0 ? (
                <p className="text-gray-500 text-center">No tasks available.</p>
            ) : (
                tasks.map((task) => (
                    <motion.div
                        key={task._id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-4 rounded-lg shadow-md flex justify-between items-center ${
                            task.completed ? "bg-gray-200" : "bg-white"
                        }`}
                    >
                        <div>
                            <h2
                                className={`text-lg font-semibold ${
                                    task.completed ? "line-through text-gray-500" : "text-gray-800"
                                }`}
                            >
                                {task.title}
                            </h2>
                            <p className={`text-gray-500 ${task.completed ? "line-through" : ""}`}>
                                {task.description}
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className={`text-green-500 hover:text-green-700 transition ${
                                    task.completed ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                onClick={() => handleToggleComplete(task)}
                                disabled={task.completed}
                                aria-label="Complete Task"
                            >
                                ✅
                            </button>
                            <button
                                className="text-blue-500 hover:text-blue-700 transition"
                                onClick={() => handleEdit(task)}
                                aria-label="Edit Task"
                            >
                                ✏️
                            </button>
                            <button
                                className="text-red-500 hover:text-red-700 transition"
                                onClick={() => handleDelete(task._id)}
                                disabled={deleteLoading === task._id}
                                aria-label="Delete Task"
                            >
                                {deleteLoading === task._id ? "⏳" : "❌"}
                            </button>
                        </div>
                    </motion.div>
                ))
            )}
        </div>
    );
};

export default TaskList;
