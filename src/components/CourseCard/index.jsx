import React from 'react'
import { generatePath, Link } from 'react-router-dom'
import { PATH } from '../../config/path'
import Skeleton from '../Skeleton'

export default function CourseCard({ thumbnailUrl, teacher, title, short_description, slug, id }) {
    const path = generatePath(PATH.courseDetail, { slug, id })
    const registerPath = generatePath(PATH.courseRegister, { slug, id })

    return (
        <div className="col-md-4 course">
            <div className="wrap">
                <Link className="cover" to={path}>
                    <img src={thumbnailUrl} alt="" />
                </Link>
                <div className="info">
                    <Link className="name" to={path}>
                        {title}
                    </Link>
                    <p className="des">{short_description}</p>
                </div>
                <div className="bottom">
                    <div className="teacher">
                        <div className="avatar">
                            <img src={teacher.avatar} alt="" />
                        </div>
                        <div className="name">{teacher.title}</div>
                    </div>
                    <Link to={registerPath} className="register-btn">Đăng Ký</Link>
                </div>
            </div>
        </div>
    )
}


export const CourseCardLoading = (props) => {
    return (
        <div className="col-md-4 course" {...props}>
            <div className="wrap">
                <Skeleton height={300} />
                <div className="info">
                    <Skeleton height={30} />
                    <p className="des">
                        <Skeleton height={80} />
                    </p>
                </div>
                <div className="bottom">
                    <div className="teacher">
                        <div className="avatar">
                            <Skeleton height={36} width={36} shap="circle" />
                        </div>
                        <div className="name">
                            <Skeleton height={24} width={150}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}