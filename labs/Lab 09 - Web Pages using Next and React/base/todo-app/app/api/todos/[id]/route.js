import todoRepo from "../todos-repo"

export async function GET(request, { params }) {
    try {
        const { id } = params
        const todo = await todoRepo.getTodoById(id)
        return Response.json(todo)
    } catch (err) {
        console.log(err)
        return Response.json({ error: err.message }, { status: 500 })
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params
        const todo = await request.json()
        const updatedTodo = await todoRepo.updateTodoById(id, todo)
        return Response.json(updatedTodo)
    } catch (err) {
        console.log(err)
        return Response.json({ error: err.message }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    const { id } = params
    try {
        const message = await todoRepo.deleteTodoById(id)
        return Response.json(message)
    }
    catch (err) {
        console.log(err)
        return Response.json({ error: err.message }, { status: 500 })
    }
}