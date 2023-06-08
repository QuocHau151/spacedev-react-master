import React, { useState } from 'react'
import { useEffect } from 'react'
import { ErrorText } from '../Input/style'

export const Select = ({ placeholder, error, options, onChange }) => {
    const [value, setValue] = useState('')
    const [label, setLabel] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const onClose = () => {
            setOpen(false)
        }
        window.addEventListener('click', onClose)

        return () => {
            window.removeEventListener('click', onClose)
        }
    }, [])

    const onOpen = (ev) => {
        ev.stopPropagation()
        setOpen(true)
    }

    const _onChange = (index) => (ev) => {
        ev.preventDefault()
        setValue(options[index].value)
        setLabel(options[index].label)
        onChange({ target: { value: options[index].value } })
    }
    return (
        <>
            <div className="select">
                <div className="head" onClick={onOpen}>{label || placeholder}</div>
                <div className="sub" style={{ display: open ? 'block' : 'none' }}>
                    {
                        options.map((e, i) => <a key={e.value} href="#" onClick={_onChange(i)}>{e.label}</a>)
                    }
                </div>
            </div>
            {error && <ErrorText>{error}</ErrorText>}
        </>
    )
}