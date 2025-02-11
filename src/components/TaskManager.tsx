import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { addOrUpdateTask, deleteTask, fetchTasks } from "@/action/task";
import toast from "react-hot-toast";
interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
  }

export default function TaskManager() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<string|null>(null);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        //mounting stage load//
        loadTasks();
    }, []);

    const loadTasks = async () => {

        const data = await fetchTasks();
        // console.log('data:', data);
        setTasks(data);
    };

    const handleAddOrUpdateTask = async () => {
        //add task//
        if (!title || !description) return toast.error("Add all the filed's");
        setLoading(true);
        const response = await addOrUpdateTask({ title, description }, editingTask!);
        if (response) {
            setTitle("");
            setDescription("");
            setEditingTask(null);
            loadTasks();
        }
        setLoading(false);
    };

    const handleDelete = async (taskId: string) => {
        //delete task//
        setDeleteLoading(taskId);
        const response = await deleteTask(taskId);
        if (response) {
            loadTasks();
        }
        setDeleteLoading(null);
    };
    const handleEdit = (task: Task) => {
        //edit task//
        setTitle(task.title);
        setDescription(task.description)
        setEditingTask(task);
    }
    const handleToggleComplete = async (task: Task) => {
        //complete task initially it is false once it clicked then it become a completed and strike the text and again u cant change the status//
        const updatedTask = { ...task, completed: true };
        await addOrUpdateTask(updatedTask, task);
        loadTasks();
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Task Manager</h1>
            <TaskForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                loading={loading}
                addAndUpdateTask={handleAddOrUpdateTask}
                editingTask={editingTask}
            />
            <TaskList
                handleToggleComplete={handleToggleComplete}
                tasks={tasks}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                deleteLoading={deleteLoading}
            />
        </div>
    );
}
