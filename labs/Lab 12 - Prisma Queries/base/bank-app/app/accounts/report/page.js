'use client'
import React, { useState, useEffect } from 'react'
import styles from '../../page.module.css'


export default function Edit() {
    const [owners, setOwners] = useState([])
    const [query, setQuery] = useState({})
    const [report, setReport] = useState({})

    useEffect(() => {
        fetch('/api/owners').then(res => res.json()).then(data => setOwners(data))
    }, [])

    function handleChange(e) {
        const newQuery = { ...query }
        newQuery[e.target.name] = e.target.value
        setQuery(newQuery)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        let response

        response = await fetch('/api/accounts/report', {
            method: 'POST',
            body: JSON.stringify(query),
            headers: { 'Content-Type': 'application/json' }
        })
        setReport(await response.json())

    }
    return (
        <>

            <h3 className={styles.title}>Account Report Information</h3>
            <hr></hr>

            <form id="account-form" className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="ownerId" className={styles.label}>Account Owner</label>

                    <select name="ownerId" id="ownerId" required onChange={handleChange} defaultValue="Select Owner">
                        <option disabled>Select Owner</option>
                        {owners.map(owner => <option key={owner.id} value={owner.id}>{owner.firstName} - {owner.lastName}</option>)}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="acctType" className={styles.label}>Which Account</label>
                    <select name="acctType" id="acctType" required onChange={handleChange}>
                        <option></option>
                        <option value="All">All</option>
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <button type="Submit">Generate Report</button>
                </div>

            </form>

            {/* Generate the report here */}
            <p className={styles.title}>Previous transactions</p>
            <hr></hr>
        </>
    )
}
