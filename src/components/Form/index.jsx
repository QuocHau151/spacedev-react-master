export const Form = () => {
    const onSubmit = (ev) => {
        ev.preventDefault()
        console.log('onSubmit', ev)
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Form</h1>
            <label>
                username:
                <input />
            </label>
            <button>Submit</button>
        </form>
    )
}