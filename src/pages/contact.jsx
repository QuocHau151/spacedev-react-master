import React, { useState } from 'react'
import Button from '../components/Button'
import Field from '../components/Field'
import { useForm } from '../hooks/useForm'
import { organizationService } from '../services/organization.service'
import { regexp, required, validate } from '../utils/validate'
import { message } from 'antd'
import { useAsync } from '../hooks/useAsync'
// message.success('Bạn đã gửi liên hệ thành công, chúng tôi sẽ xử lý trong thời gian sớm nhất', 1000000)

export default function Contact() {
    const [isSuccess, setIsSuccess] = useState(false)
    const { loading, excute } = useAsync(organizationService.contact)

    const { register, validate, values, reset } = useForm({
        email: [
            required(),
            regexp('email', 'Xin vui lòng nhập đúng Email')
        ],
        phone: [
            required(),
            regexp('phone', 'Xin vui lòng nhập đúng số điện thoại')
        ],
        name: [
            required()
        ],
        website: [
            regexp('url', 'Xin vui lòng nhập đúng địa chỉ website')
        ],
        title: [
            required()
        ],
        content: [
            required('Xin vui lòng nhập nội dung liên hệ')
        ]
    })

    const onSubmit = async (ev) => {
        try {
            ev.preventDefault()
            if (validate()) {
                await excute(values)
                message.success('Bạn đã gửi liên hệ thành công, chúng tôi sẽ xử lý trong thời gian sớm nhất')
                reset()
                setIsSuccess(true)
            }
        } catch (err) {
            console.error(err.message)
            message.error(err.message)
        }
    }



    return (
        <main className="register-course" id="main">

            <section className="section-1 wrap container">
                {
                    isSuccess ? <>
                        <h2 className="main-title">Liên hệ thành công</h2>
                        <p className="top-des">
                            Thông tin liên hệ của bạn đã được gửi, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất, xin cảm ơn!
                        </p>
                        <div className='flex justify-center mt-10'>
                            <a className='link' href="#" onClick={(ev) => {
                                ev.preventDefault()
                                setIsSuccess(false)
                            }}>Tiếp tục liên hệ</a>
                        </div>
                    </> : <>
                        <h2 className="main-title">HỢP TÁC CÙNG Spacedev</h2>
                        <p className="top-des">
                            Đừng ngần ngại liên hệ với <strong>Spacedev</strong> để cùng nhau tạo ra những sản phẩm giá trị, cũng như
                            việc hợp tác với các đối tác tuyển dụng và công ty trong và ngoài nước.
                        </p>
                        <form className="form" onSubmit={onSubmit}>
                            <Field label="Họ và tên" required placeholder="Họ và tên bạn" {...register('name')} />
                            <Field label="Số điện thoại" required placeholder="Số điện thoại" {...register('phone')} />
                            <Field label="Email" required placeholder="Email của bạn" {...register('email')} />
                            <Field label="Website" placeholder="Đường dẫn website http://" {...register('website')} />
                            <Field label="Tiêu đề" required placeholder="Tiêu đề liên hệ" {...register('title')} />
                            <Field label="Nội dung" required renderInput={(props) => <textarea cols={30} rows={10} {...props} />} {...register('content')} />
                            {/* <button className="btn main rect" >đăng ký</button> */}
                            <Button loading={loading}>đăng ký</Button>
                        </form>
                    </>
                }

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
