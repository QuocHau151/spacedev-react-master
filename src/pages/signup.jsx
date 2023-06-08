import React from "react";
import styled from "styled-components";
import { useForm } from "../hooks/useForm";
import { confirm, minMax, regexp, required } from "../utils/validate";
import { Input } from "../components/Input";
import { message } from "antd";
import { userService } from "../services/user.service";
import Button from "../components/Button";
import { useAsync } from "../hooks/useAsync";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import classNames from "classnames";
const ErrorText = styled.p`
  color: red;
`;

export default function Signup() {
  const { loading: resendEmailLoading, excute: resendEmailService } = useAsync(
    userService.resendEmail,
  );
  const { loading, excute: signupService } = useAsync(userService.signup);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const { values, validate, register } = useForm({
    name: [required()],
    password: [required(), minMax(6, 32)],
    confirmPassword: [required(), confirm("password")],
    username: [required(), regexp("email")],
  });

  const onSubmit = async () => {
    console.log(values);
    if (validate()) {
      try {
        await signupService(values);
        setIsSignupSuccess(true);
      } catch (err) {
        console.error(err);
        if (err.response?.data?.message) {
          message.error(err.response.data.message);
        }
      }
    }
  };

  const onResendEmail = async (ev) => {
    ev.preventDefault();
    try {
      await resendEmailService({
        username: values.username,
      });
      message.success("Email kích hoạt đã được gửi lại thành công");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        message.error(err.response.data.message);
      }
    }
  };

  return (
    <main className="auth" id="main">
      {isSignupSuccess ? (
        <div className="container wrap flex flex-col text-center gap-10">
          <h1 className="text-2xl font-bold">Đăng ký tài khoản thành công</h1>
          <p>
            Vui lòng kiểm tra email để kích hoạt. Nếu bạn không nhận được email, vui lòng bấm{" "}
            <span className="font-bold">"Gửi lại email kích hoạt"</span> bên dưới
          </p>
          <div className="flex justify-center">
            <a
              onClick={onResendEmail}
              href="#"
              className={classNames("link flex gap-2", {
                "opacity-50 pointer-events-none": resendEmailLoading,
              })}>
              {resendEmailLoading && <LoadingOutlined />}
              Gửi lại email kích hoạt
            </a>
          </div>
        </div>
      ) : (
        <div className="wrap">
          <h2 className="title">Đăng ký</h2>
          <Input {...register("username")} className="mb-5" placeholder="Địa chỉ Email" />
          <Input {...register("name")} className="mb-5" placeholder="Họ và tên" />
          <Input
            {...register("password")}
            className="mb-5"
            type="password"
            placeholder="Mật khẩu"
          />
          <Input
            {...register("confirmPassword")}
            className="mb-5"
            type="password"
            placeholder="Nhập lại mật khẩu"
          />

          {/* <input type="text" placeholder="Địa chỉ Email" {...register('username')}/>
                    {errors.username && <ErrorText>{errors.username}</ErrorText>} 
                    <input placeholder="Họ và tên" {...register('name')}/>
                    {errors.name && <ErrorText>{errors.name}</ErrorText>}
                    <input type="password" placeholder="Mật khẩu" {...register('password')}/>
                    {errors.password && <ErrorText>{errors.password}</ErrorText>}
    
                    <input type="password" placeholder="Nhập lại mật khẩu" {...register('confirmPassword')}/>
                    {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>} */}

          <p className="policy">
            Bằng việc đăng kí, bạn đã đồng ý <a href="#">Điều khoản bảo mật</a> của Spacedev
          </p>
          {/* <button className="btn rect main btn-login">Đăng ký</button> */}
          <Button loading={loading} onClick={onSubmit} className="btn-login btn main rect">
            Đăng ký
          </Button>
        </div>
      )}
    </main>
  );
}
