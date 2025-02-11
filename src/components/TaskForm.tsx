import React from "react";
const TaskForm = ({ title, setTitle, description, setDescription, loading, addOrUpdateTask, editingTask }: { title: string, setTitle: any, description: string, setDescription: any, loading: boolean, addOrUpdateTask: any, editingTask: any }) => {
    return (
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col gap-4 mb-4">
                <input
                    className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    onClick={addOrUpdateTask}
                    disabled={loading}
                >
                    {loading ? "Saving..." : editingTask ? "Update Task" : "Add Task"}
                </button>
            </div>
        </div>
    );
};

export default TaskForm;
