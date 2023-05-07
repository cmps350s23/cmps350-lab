'use client'
import React, { useState, useEffect } from 'react'
import styles from '../../page.module.css'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Edit() {
    const searchParams = useSearchParams()
    const [account, setAccount] = useState(Object.fromEntries(searchParams) || {})
    const [owners, setOwners] = useState([])

    const router = useRouter()

    // checks if the account is in edit mode
    const isEdit = Object.fromEntries(searchParams).acctType !== undefined

    useEffect(() => {
        fetch('/api/owners')
            .then(res => res.json())
            .then(data => setOwners(data))
    }, [])

    function handleChange(e) {
        const newAccount = { ...account }
        newAccount[e.target.name] = e.target.value
        setAccount(newAccount)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        account.balance = Number(account.balance)
        let response
        if (isEdit) {
            console.log('I am in edit');
            delete account.Owner
            response = await fetch(`/api/accounts/${account.accountNo}`, {
                method: 'PUT',
                body: JSON.stringify(account),
                headers: { 'Content-Type': 'application/json' }
            })
        } else {
            console.log('I am in add mode');
            response = await fetch('/api/accounts', {
                method: 'POST',
                body: JSON.stringify(account),
                headers: { 'Content-Type': 'application/json' }
            })
        }
        // console.log(await response.json());
        router.push('/', undefined, { shallow: false })
    }
    return (
        <>

            {isEdit && <h3 className={styles.title}>Edit Account No [ {account.accountNo} ] </h3>}
            {!isEdit && <h3 className={styles.title}>Add New Account</h3>}

            <form id="account-form" className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="ownerId" className={styles.label}>Account No</label>

                <select name="ownerId" id="ownerId" required onChange={handleChange} value={account.ownerId}>
                    <option disabled>Select Owner</option>
                    {owners.map(owner => <option key={owner.id} value={owner.id}>{owner.firstName} - {owner.lastName}</option>)}
                </select>

                <label htmlFor="acctType" className={styles.label}>Account Type</label>
                <select name="acctType" id="acctType" required onChange={handleChange} value={account.acctType}>
                    <option></option>
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                </select>

                <label htmlFor="balance" className={styles.label} >Balance</label>
                <input type="number" name="balance" id="balance" required onChange={handleChange} value={account.balance} />

                <button type="Submit">Submit</button>
            </form>
        </>
    )
}
