import { connectDb } from "@/config/database";
import taskModel from "@/models/task.model";
import { verifyToken } from "@/utils/verifyToken";
import { JwtPayload } from "jsonwebtoken";
// Create a Task (Protected)
export async function POST(req: Request) {
    try {
        await connectDb();
        const user = await verifyToken() as JwtPayload; // Verify token
        if (!user) return new Response("Unauthorized to access this route", { status: 401 });

        const { title, description } = await req.json();
        console.log('req:', title,description);
        
        if (!title || !description) return new Response("Title and description are required", { status: 400 });

        const task = await taskModel.create({ title, description, userId: user.id });
        return Response.json(task, { status: 201 });
    }catch (error: unknown) {
        console.error("POST Error:", error);        
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return new Response(errorMessage, { status: 500 });
    }
}

// Get All Tasks (Protected)
export async function GET() {
    try {
        await connectDb();
        const user = await verifyToken() as JwtPayload;
        // console.log('user:', user);
        if (!user) return new Response("Unauthorized to access this route", { status: 401 });

        const tasks = await taskModel.find({ userId: user.id });
        if (!tasks.length) return new Response("No tasks found", { status: 404 });

        return Response.json(tasks, { status: 200 });
    } catch (error: unknown) {
        console.error("GET Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return new Response(errorMessage, { status: 500 });
    }
}

// Update a Task (Protected)
export async function PUT(req: Request) {
    try {
        await connectDb();
        const user = await verifyToken() as JwtPayload;
        if (!user) return new Response("Unauthorized to access this route", { status: 401 });

        const { id, title, description, completed } = await req.json();
        if (!id) return new Response("Task ID is required", { status: 400 });

        const task = await taskModel.findOneAndUpdate(
            { _id: id, userId: user.id },
            { title, description, completed },
            { new: true }
        );

        if (!task) return new Response("Task not found or not authorized", { status: 404 });

        return Response.json(task, { status: 200 });
    } catch (error: unknown) {
        console.error("PUT Error:", error);        
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return new Response(errorMessage, { status: 500 });
    }
}

// Delete a Task (Protected)
export async function DELETE(req: Request) {
    try {
        await connectDb();
        const user = await verifyToken() as JwtPayload;
        if (!user) return new Response("Unauthorized to access this route", { status: 401 });

        const { id } = await req.json();
        if (!id) return new Response("Task ID is required", { status: 400 });

        const task = await taskModel.findOneAndDelete({ _id: id, userId: user.id });
        if (!task) return new Response("Task not found or not authorized", { status: 404 });
        return Response.json("Task Deleted Successfully", { status: 200 });
    }  catch (error: unknown) {
        console.error("DELETE Error:", error);        
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return new Response(errorMessage, { status: 500 });
    }
}
