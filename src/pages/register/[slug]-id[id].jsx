import React, { useEffect, useState } from 'react'
import { generatePath, Link, Navigate, useLocation, useParams } from 'react-router-dom'
import Field from '../../components/Field'
import { useForm } from '../../hooks/useForm'
import { courseService } from '../../services/course.service'
import { regexp, required } from '../../utils/validate'
import { currency } from '../../utils/currency'
import { useScrollTop } from '../../hooks/useScrollTop'
import { useFetch } from '../../hooks/useFetch'
import Page404 from '../404'
import Skeleton from '../../components/Skeleton'
import { Select } from '../../components/Select'
import { PATH } from '../../config/path'
import { Checkbox } from '../../components/Checkbox'
import { Button } from '../../components/Button'
import { useAsync } from '../../hooks/useAsync'
import { message } from 'antd'
import { useAuth } from '../../context/AuthContext'


export default function Register() {
    const { id, slug } = useParams()
    const { user } = useAuth()
    const { pathname } = useLocation()
    const { excute: registerService, loading: registerLoading } = useAsync(courseService.register)
    const { data: detail, loading } = useFetch(() => courseService.getCourseDetail(id))
    useScrollTop([id])
    useEffect(() => {
        if (!user) {
            message.warning('Vui lòng đăng nhập trước khi đăng ký khóa học')
        }
    }, [user])

    const { register, validate, values } = useForm({
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
        fb: [
            required(),
            regexp(/(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/,
                'Xin vui lòng nhập đúng địa chỉ facebook')
        ],
        payment: [
            required('Vui lòng chọn hình thức thanh toán')
        ],

    }, {
        name: user?.name,
        email: user?.username
    })
    const [isSuccess, setIsSuccess] = useState(false)

    const onSubmit = async () => {
        try {
            if (validate()) {
                await registerService(id, values)
                setIsSuccess(true)
            }
        } catch (err) {
            console.error(err)
            if (err.response?.data?.message) {
                message.error(err.response.data.message)
            }
        }
    }

    if (loading)
        return <Loading />

    if (!detail) return <Page404 />


    if (!user) {

        return <Navigate to={PATH.signin} state={{ redirect: pathname }} />
    }

    return (
        <main className="register-course" id="main">
            <section>

                {
                    isSuccess ? (
                        <div className="flex text-center gap-10 items-center flex-col container register-success" style={{ margin: '40px auto' }}>
                            <div className="contain max-w-2xl">
                                <div className="main-title">đăng ký thành công</div>
                                <p className='text-xl mw'>
                                    Chào mừng <strong>{values.name}</strong> đã trở thành thành viên mới của Spacedev Team. <br />
                                    <br />
                                    Bây giờ bạn có thể vào <strong>spacedev</strong> để tiến hành học các khóa học online của bạn.
                                </p>
                            </div>
                            <Link to={PATH.profile.course} className="btn main rect">về trang khóa học của tôi</Link>
                        </div>
                    ) : (
                        <div className="container">
                            <div className="wrap container">
                                <div className="main-sub-title">ĐĂNG KÝ</div>
                                <h1 className="main-title">{detail.title}</h1>
                                <div className="main-info">
                                    <div className="date"><strong>Khai giảng:</strong> 15/11/2020</div>
                                    <div className="time"><strong>Thời lượng:</strong> 18 buổi</div>
                                    <div className="time"><strong>Học phí:</strong> {currency(detail.money)} VND</div>
                                </div>
                                <div className="form">
                                    <Field label="Họ và tên" required placeholder="Họ và tên bạn" {...register('name')} />
                                    <Field label="Số điện thoại" required placeholder="Số điện thoại" {...register('phone')} />
                                    <Field label="Email" required placeholder="Email của bạn" {...register('email')} disabled />
                                    <Field label="URL Facebook" placeholder="URL Facebook" {...register('fb')} />
                                    <Field label="Ý kiến cá nhân" placeholder="Mong muốn cá nhân và lịch bạn có thể học." renderInput={(props) => <textarea cols={30} rows={10} {...props} />} {...register('content')} />
                                    <Field
                                        {...register('coin')}
                                        label="Sử dụng COIN"
                                        renderInput={(props) => (
                                            <Checkbox {...props}>Hiện có <strong>300 COIN</strong></Checkbox>
                                        )}
                                    />
                                    <Field
                                        {...register('payment')}
                                        label="Hình thức thanh toán"
                                        renderInput={(props) => <Select
                                            placeholder="Hình thức thanh toán"
                                            options={[
                                                { label: 'Chuyển khoản', value: 'chuyen-khoan' },
                                                { label: 'Thanh toán tiền mặt', value: 'thanh-toan-tien-mat' },
                                            ]}
                                            {...props}
                                        />}
                                    />
                                    <Button loading={registerLoading} onClick={onSubmit} className="btn main rect">đăng ký</Button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </section>


        </main>
    )
}


const Loading = () => {
    return <main className="register-course" id="main">
        <section>
            <div className="container">
                <div className="wrap container">
                    <div className="mb-10 flex justify-center">
                        <Skeleton height={24} width={150} />
                    </div>
                    <h1 className="main-title"><Skeleton height={62} width="100%" /></h1>
                    <div className="main-info">
                        <div className="date"><Skeleton height={24} width={150} /></div>
                        <div className="time"><Skeleton height={24} width={150} /></div>
                        <div className="time"><Skeleton height={24} width={150} /></div>
                    </div>
                    <div className='mb-10 mt-20'>
                        <Skeleton height={58} />
                    </div>
                    <div className='mb-10'>
                        <Skeleton height={58} />
                    </div>
                    <div className='mb-10'>
                        <Skeleton height={58} />
                    </div>
                    <div className='mb-10'>
                        <Skeleton height={58} />
                    </div>
                    <div className='mb-10'>
                        <Skeleton height={58} />
                    </div>
                    <div className='mb-10'>
                        <Skeleton height={58} />
                    </div>
                    <div className='mb-10'>
                        <Skeleton height={58} />
                    </div>
                    <div className='mb-10'>
                        <Skeleton height={58} />
                    </div>
                </div>
            </div>
        </section>
    </main>
}