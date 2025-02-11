// services/taskActions.ts
import fetchClient from "@/utils/http";
import { toast } from "react-hot-toast";
interface Task {
    _id?: string;
    title: string;
    description: string;
    completed?: boolean;
}
export const fetchTasks = async () => {
    try {
        const data = await fetchClient("/api/task");
        
        if (!data || !Array.isArray(data)) {
            return []; 
        }

        return data;
        
    } catch (error: unknown) {
        if ((error as any).status === 404) {
            return [];
        } else {
            toast.error("Failed to fetch tasks");
            return [];
        }
    }
};

export const addOrUpdateTask = async (task: Task, editingTask: Task) => {
    try {
        const method = editingTask ? "PUT" : "POST";
        const body = JSON.stringify({ id: editingTask?._id, ...task });

        const response = await fetchClient("/api/task", { method, body });

        if (response) {
            toast.success(editingTask ? "Task updated successfully" : "Task added successfully");
            return response;
        }
    } catch (error) {
        console.log('error:From add or update', error);
        toast.error("Failed to add/update task");
    }
    return null;
};

export const deleteTask = async (taskId: string) => {
    try {
        const response = await fetchClient("/api/task", {
            method: "DELETE",
            body: JSON.stringify({ id: taskId }),
        });

        if (response) {
            toast.success("Task deleted successfully");
            return response;
        }
    } catch (error) {
        console.log('error:From Delete', error);
        toast.error("Failed to delete task");
    }
    return null;
};
