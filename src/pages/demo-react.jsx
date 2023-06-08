import React from 'react'
import { useId } from 'react'
import { useRef, useEffect, useState } from 'react'
import { Input } from '../components/Input'

/**
 * Cach 1: Lưu trữ giá trị không bị thay đổi mỗi lần component render
 * 
 * Cach 2: Selector HTML DOM
 * 
 * Cach 3: forwardRef
 * 
 * Cach 4: forwardRef va useImperativeHandle -> trả ra 1 thể hiện khác của ref
 */

export const DemoReact = () => {
    const inputPhoneId = useId()
    const inputEmailId = useId()
    
    const inputRef = useRef()
    useEffect(() => {
        inputRef.current.setValue('Dang Thuyen Vuong')
    }, [])

    console.log(inputPhoneId, inputEmailId)
    return (
        <main className="register-course" id="main">
            <section className="section-1 wrap container">
                {/* <div class="main-sub-title">liên hệ</div> */}
                <h2 className="main-title">HỢP TÁC CÙNG Spacedev</h2>
                <p className="top-des">
                    Đừng ngần ngại liên hệ với <strong>Spacedev</strong> để cùng nhau tạo ra những sản phẩm giá trị, cũng như
                    việc hợp tác với các đối tác tuyển dụng và công ty trong và ngoài nước.
                </p>
                <form className="form">
                    <label>
                        <p>Họ và tên<span>*</span></p>
                        <Input ref={inputRef} type="text" placeholder="Họ và tên bạn" />
                    </label>
                    <label>
                        <p>Số điện thoại</p>
                        <input id={inputPhoneId} type="text" placeholder="Số điện thoại" />
                    </label>
                    <label>
                        <p>Email<span>*</span></p>
                        <input id={inputEmailId} type="text" placeholder="Email của bạn" />
                    </label>
                    <label>
                        <p>Website</p>
                        <input type="text" placeholder="Đường dẫn website http://" />
                    </label>
                    <label>
                        <p>Tiêu đề<span>*</span></p>
                        <input type="text" placeholder="Tiêu đề liên hệ" />
                    </label>
                    <label>
                        <p>Nội dung<span>*</span></p>
                        <textarea cols={30} rows={10} defaultValue={""} />
                    </label>
                    <button className="btn main rect">đăng ký</button>
                    {/* COUNT: {count} */}
                    <br />
                    <br />
                </form>
            </section>
            {/* <div class="register-success">
            <div class="contain">
                <div class="main-title">đăng ký thành công</div>
                <p>
                    <strong>Chào mừng Vương Đặng đã trở thành thành viên mới của Spacedev Team.</strong> <br>
                    Cảm ơn bạn đã đăng ký khóa học tại <strong>Spacedev</strong>, chúng tôi sẽ chủ động liên lạc với bạn thông qua facebook
                    hoặc số điện thoại của bạn.
                </p>
            </div>
            <a href="/" class="btn main rect">về trang chủ</a>
        </div> */}
        </main>
    )
}
