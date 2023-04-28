import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const todos = await todoRepo.getTodos()
  return (
    <main>
      <h1>Todo List</h1>
    </main>
  )
}

