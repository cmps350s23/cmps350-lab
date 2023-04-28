import todoRepo from './todos-repo'

export async function GET(request) {
    try {
        const todos = await todoRepo.getTodos()
        return Response.json(todos);
    } catch (err) {
        console.log(err);
        return Response.json({ error: err.message }, { status: 500 });
    }
}
export async function POST(request) {
    try {
        console.log('request', request);

        const todo = await request.json()
        const newTodo = await todoRepo.createTodo(todo)
        return Response.json(newTodo, { status: 201 })
    } catch (err) {
        console.log(err)
        return Response.json({ error: err.message }, { status: 500 })
    }
}

export async function DELETE(request) {
    try {
        const message = await todoRepo.deleteAllTodos()
        return Response.json(message)
    } catch (err) {
        console.log(err)
        return Response.json({ error: err.message }, { status: 500 })
    }
}


