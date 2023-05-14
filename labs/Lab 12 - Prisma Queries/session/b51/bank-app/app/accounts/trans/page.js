'use client'
import React, { useEffect } from 'react'
import styles from '../../page.module.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Transaction() {
    const [accounts, setAccounts] = useState([])
    const [transaction, setTransaction] = useState({})
    const router = useRouter()

    async function handleTransaction(e) {
        e.preventDefault()
        const response = await fetch(`/api/accounts/${transaction.accountNo}/trans`, {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: { 'Content-Type': 'application/json' }
        })
        console.log(await response.json());
        router.push('/', { shallow: false })
    }
    useEffect(() => {
        fetch('/api/accounts').then(res => res.json()).then(data => setAccounts(data))
    }, [])

    function handleChange(e) {
        const { name, value } = e.target
        const newTransaction = { ...transaction }
        newTransaction[name] = value
        setTransaction(newTransaction)
        console.log(newTransaction);
    }

    return (
        <>
            <h3>Add Transaction</h3>
            <form id="trans-form" className={styles.form} onSubmit={handleTransaction}>
                <label htmlFor="accountNo">Account No</label>
                <select name="accountNo" id="accountNo" required onChange={handleChange} defaultValue="Select account no">
                    <option disabled>Select account no</option>
                    {accounts.map(acct => <option key={acct.accountNo} value={acct.accountNo}>{acct.accountNo} - {acct.balance}</option>)}
                </select>

                <label htmlFor="type">Transaction Type</label>
                <select name="transType" id="transType" required onChange={handleChange} >
                    <option></option>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdraw">Withdraw</option>
                </select>

                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" name="amount" required onChange={handleChange} />
                <button type="Submit">Submit</button>
            </form>
        </>
    )
}
