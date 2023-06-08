// src/components/Box/index.jsx
// import classes from './style.module.css'
// import './style.scss'
// import classes from './style.module.scss'
// import './style.less'
// import classes from './style.module.less'
import styled from 'styled-components'

const BoxStyle = styled.div`
    width: 400px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;

    // .text a{
    //     font-size: 50px;
    //     color: white;
    // }

    .demo {
        font-size: 20px;
        color: white;
    }
`

const TextStyle = styled.p`
    a {
        font-size: 50px;
        color: white;
    }
`

/**
 * 
 * Style
 * 1. inline css
 * 2. css, css module (less, sass)
 * 3. styled-components, emotion
 * 4. taildwincss
 */
// console.log(classes)
export function Box(props) {
    console.log(props)
    return [
        <BoxStyle
            key={1}
            style={{
                background: props.background,
            }}
        >
            <p className="text-9xl text-white">
                <a href="">
                    {props.text}
                </a>
            </p>
            <div className='demo'>
                aaaaaaaaaa
            </div>
        </BoxStyle>,
        <div key={2}>ABC</div>
    ]
}