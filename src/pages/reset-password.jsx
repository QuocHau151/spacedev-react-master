import Button from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/context/AuthContext'
import { useAsync } from '@/hooks/useAsync'
import { useForm } from '@/hooks/useForm'
import { userService } from '@/services/user.service'
import { handleError } from '@/utils/handleError'
import { setToken } from '@/utils/token'
import { confirm, regexp, required } from '@/utils/validate'
import { message } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function ResetPassword() {

    const [search] = useSearchParams()
    const { getProfile } = useAuth()
    const [isSuccess, setIsSuccess] = useState(false)

    const { excute: sendEmailResetPasswordService, loading: sendEmailResetPasswordLoading } = useAsync(userService.sendEmailResetPassword)
    const { excute: resetPasswordByCodeService, loading: resetPasswordByCodeLoading } = useAsync(userService.resetPasswordByCode)
    const code = search.get('code')

    const resetPasswordForm = useForm({
        password: [
            required(),
        ],
        confirmPassword: [
            required(),
            confirm('password')
        ]
    })
    const sendEmailForm = useForm({
        username: [
            required(),
            regexp('email')
        ]
    })


    const onSendEmail = async () => {
        try {
            if (sendEmailForm.validate()) {
                const res = await sendEmailResetPasswordService(sendEmailForm.values)
                message.success(res.message)
                setIsSuccess(true)
            }
        } catch (err) {
            handleError(err)
        }
    }
    const onResetPassword = async () => {
        try {
            if (resetPasswordForm.validate()) {
                const res = await resetPasswordByCodeService({
                    password: resetPasswordForm.values.password,
                    code
                })
                setToken(res.data)
                getProfile()
            }
        } catch (err) {
            handleError(err)
        }
    }

    return (
        <main className="auth" id="main">
            {
                code ? (
                    <div className="wrap">
                        <h2 className="title">Đặt lại mật khẩu</h2>
                        <Input type="password" className="mb-5" {...resetPasswordForm.register('password')} placeholder="Mật khẩu " />
                        <Input type="password" className="mb-5" {...resetPasswordForm.register('confirmPassword')} placeholder="Nhập lại mật khẩu" />
                        <Button onClick={onResetPassword} loading={resetPasswordByCodeLoading}>Đặt lại mật khẩu</Button>
                    </div>
                ) : (
                    isSuccess ? (
                        <div className='flex flex-col gap-10 text-center max-w-2xl m-auto pt-10 pb-10'>
                            <h1 className='text-2xl font-bold'>Gửi mail lấy lại mật khẩu thành công</h1>
                            <p>Chúng tôi đã gửi cho bạn email lấy lại mật khẩu, xin vui lòng kiểm tra email</p>
                        </div>
                    ) :
                        <div className="wrap">
                            <h2 className="title">Đặt lại mật khẩu</h2>
                            <Input className="mb-5" placeholder="Email" {...sendEmailForm.register('username')} />
                            <Button onClick={onSendEmail} loading={sendEmailResetPasswordLoading}>Đặt lại mật khẩu</Button>
                        </div>

                )
            }
        </main>
    )
}
