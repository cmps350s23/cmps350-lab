import React from 'react'
import Link from 'next/link'

export default function Account({ account, onDelete }) {

    return (
        <tr id={'row-' + account.accountNo}>

            <td>{account.accountNo}</td>
            <td>{account.acctType}</td>
            <td>{account.balance}</td>
            <td>{account.ownerId}</td>
            <td>{account.Owner.firstName} {account.Owner.lastName}</td>

            <td>
                {account.balance >= 0 ? <Link href="#" onClick={e => onDelete(account.accountNo)}> <i className="fas fa-trash"></i>Delete</Link> : ''}
                <Link href={
                    {
                        pathname: '/accounts/edit',
                        query: account
                    }
                }> <i className="fas fa-edit"></i> Edit </Link>
            </td>
        </tr >
    )
}
