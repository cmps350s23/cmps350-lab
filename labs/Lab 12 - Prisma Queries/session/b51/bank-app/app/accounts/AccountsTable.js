'use client'
import { React, useState } from 'react'
import Account from './Account'
import styles from '../page.module.css'
import Link from 'next/link'


export default function AccountsTable({ initialAccounts }) {

    const [accounts, setAccounts] = useState(initialAccounts)

    async function handleTypeChange(type) {
        const data = await fetch(`/api/accounts?type=${type}`)
        const filterAccounts = await data.json()
        setAccounts(filterAccounts)
    }

    async function handleDelete(accountNo) {
        if (confirm('Are you sure you want to delete this account?') === false) return

        const response = await fetch(`/api/accounts/${accountNo}`, {
            method: 'DELETE'
        })
        await handleTypeChange('All')
    }
    return (
        <div>
            {console.log(accounts)}
            <label htmlFor="acctType"> Account Type</label>
            <Link href="/accounts/edit" className={styles.addAccount}>Add Account</Link>
            <select id="acctType" className="dropdown" onChange={e => handleTypeChange(e.target.value)}>
                <option value="All">All</option>
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
            </select>
            <table id="accounts" className={styles.table}>
                <thead>
                    <tr>
                        <th>Account No</th>
                        <th>Account Type</th>
                        <th>Balance</th>
                        <th>Owner Id</th>
                        <th>Owner Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        accounts.map(account =>
                            <Account
                                account={account}
                                onDelete={handleDelete}
                                key={account.accountNo}>
                            </Account>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
