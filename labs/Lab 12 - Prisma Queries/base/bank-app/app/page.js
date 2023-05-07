import { Inter } from 'next/font/google'
import AccountsTable from './accounts/AccountsTable'
import AccountsRepo from './api/accounts-repo'


const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const initialAccounts = await new AccountsRepo().getAccounts()
  // console.log(initialAccounts);
  return (
    <>
      <AccountsTable initialAccounts={initialAccounts}></AccountsTable>
    </>
  )
}
