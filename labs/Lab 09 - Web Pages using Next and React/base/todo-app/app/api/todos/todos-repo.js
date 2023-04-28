// generate the todo model for reading and writing to the data/todos.json file
// call the class TodoRepo
import path from 'path'
import { promises as fs } from 'fs'

const dataPath = path.join(process.cwd(), 'data/todos.json')

class TodoRepo {
    async getTodos() {
        const todos = await fs.readFile(dataPath, 'utf8')
        return JSON.parse(todos)
    }
    //explain selected code
    async getTodoById(id) {
        const todos = await this.getTodos()
        const todo = todos.find((todo) => todo.id == id)

        if (!todo)
            return { error: `No todo with id : ${id}` }

        return todo
    }

    async createTodo(todo) {
        const todos = await this.getTodos()
        const newTodo = {
            id: Math.max(...todos.map((todo) => todo.id)) + 1,
            ...todo,
        }
        todos.push(newTodo)
        await fs.writeFile(dataPath, JSON.stringify(todos, null, 2))
        return newTodo
    }
    async updateTodoById(id, updatedTodo) {
        const todos = await this.getTodos()
        let index = todos.findIndex((todo) => todo.id == id)

        if (index == -1)
            return { error: `Unable to update as there is No todo with id : ${id}` }

        todos[index] = { ...todos[index], ...updatedTodo }

        await fs.writeFile(dataPath, JSON.stringify(todos, null, 2))
        return { message: `Todo with id : ${id} is updated` }
    }
    async deleteTodoById(id) {
        const todos = await this.getTodos()
        const index = todos.findIndex((todo) => todo.id == id)
        if (index === -1)
            return { error: `No todo with id : ${id}` }

        todos.splice(index, 1)
        await fs.writeFile(dataPath, JSON.stringify(todos, null, 2))
        return { message: `Todo with id : ${id} deleted` }
    }

    async deleteAllTodos() {
        // clear all the todos
        await fs.writeFile(dataPath, JSON.stringify([]))
        return { message: `All todos deleted` }
    }
}

export default new TodoRepo()
