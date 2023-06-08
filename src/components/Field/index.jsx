import React from 'react'
import styled from 'styled-components'

const ErrorP = styled.span`
    color: red;
    position: absolute;
    top: 100%;
    left: 230px;
    font-size: 0.875rem;
    font-style: italic;
`

export default function Field({ label, error, required, type = 'text', renderInput, ...rest }) {
    return (
        <label className='relative'>
            <p>{label}{required && <span>*</span>}</p>
            {
                renderInput ? renderInput?.(rest) : <input type={type} {...rest} />
            }
            {error && <ErrorP>{error}</ErrorP>}
        </label>
    )
}
