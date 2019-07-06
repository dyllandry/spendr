import React from 'react'

export default function Transaction ({
    type = 'type',
    amount = 0
} = {}) {
    return (
        <li>{type}: {amount}</li>
    )
}