import React, { useEffect, useState } from 'react'
import { generatePath, Link, useParams, useSearchParams } from 'react-router-dom'
import { Accordion } from '../../components/Accordion'
import CourseCard from '../../components/CourseCard'
import { Modal } from '../../components/Modal'
import Skeleton from '../../components/Skeleton'
import { PATH } from '../../config/path'
import { useFetch } from '../../hooks/useFetch'
import { useScrollTop } from '../../hooks/useScrollTop'
import { courseService } from '../../services/course.service'
import { currency } from '../../utils/currency'
import moment from 'moment'
import { Teacher } from '../../components/Teacher'
import Page404 from '../404'



/**
 * dynamic router là router động, thông tin được lưu trên url giúp cho refresh lại không mất trạng thái
 * 
 * param url là giá trị lưu trên url
 * Thường sử dụng cho trang detail của post, product, category,...
 * 
 * search url là giá trị trên url phía sau dấu ?
 * Thường dùng để lưu trữ giá trị của một biến vd: paginate, filter, sort,....
 */

export default function CourseDetail() {
    const { id } = useParams()
    const [isOpenVideoModal, setIsOpenVideoModal] = useState(false)
    useScrollTop([id])


    const { data: detail, loading } = useFetch(() => courseService.getCourseDetail(id), [id])

    const { data: related, loading: relatedLoading } = useFetch(() => courseService.getRelated(id), [id])

    if (loading) {
        return (
            <main className="course-detail" id="main">
                <section className="banner style2" style={{ '--background': '#cde6fb' }}>
                    <div className="container">
                        <div className="info">
                            <h1>
                                <Skeleton width={500} height={64} />
                            </h1>
                            <div className="row">
                                <div className="date">
                                    <Skeleton width={200} height={24} />
                                </div>
                                <div className="time">
                                    <Skeleton width={200} height={24} />
                                </div>
                            </div>
                            <div style={{ marginTop: 40 }}>
                                <Skeleton height={46} width={138} />
                            </div>
                        </div>
                    </div>
                </section >
            </main >
        )
    }

    if (!detail) return <Page404 />
    const registerPath = generatePath(PATH.courseRegister, { slug: detail.slug, id: detail.id })
    const openingTime = moment(detail.opening_time).format('DD/MM/YYYY')
    return (
        <main className="course-detail" id="main">
            <section className="banner style2" style={{ '--background': detail.template_color_banner || '#dce6fb' }}>
                <div className="container">
                    <div className="info">
                        <h1>{detail.title}</h1>
                        <div className="row">
                            <div className="date"><strong>Khai giảng:</strong> {openingTime}</div>
                            <div className="time"><strong>Thời lượng:</strong> {detail.content.length} buổi</div>
                        </div>
                        <Link className="btn white round" style={{ '--color-btn': detail.template_color_btn || '#70b6f1' }} to={registerPath}>đăng ký</Link>
                    </div>
                </div>
                <div className="bottom">
                    <div className="container">
                        <div className="video" onClick={() => setIsOpenVideoModal(true)}>
                            <div className="icon">
                                <img src="/img/play-icon-white.png" alt="" />
                            </div> <span>giới thiệu</span>
                        </div>
                        <div className="money">{currency(detail.money)} VNĐ</div>
                    </div>
                </div>
                <Modal visible={isOpenVideoModal} maskClosable={false} onCancel={() => setIsOpenVideoModal(false)}>
                    <iframe width="800" height="450" src="https://www.youtube.com/embed/oTsopKtMS_0?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </Modal>
            </section >
            <section className="section-2">
                <div className="container">
                    <p className="des">{detail.long_description}</p>
                    <h2 className="title">giới thiệu về khóa học</h2>
                    <div className="cover">
                        <img src="/img/course-detail-img.png" alt="" />
                    </div>
                    <h3 className="title">nội dung khóa học</h3>
                    <Accordion.Group>
                        {
                            detail.content.map((e, i) => <Accordion date={i + 1} key={i} {...e}>{e.content}</Accordion>)
                        }
                    </Accordion.Group>
                    <h3 className="title">yêu cầu cần có</h3>

                    <div className="row row-check">
                        {
                            detail.required.map((e, i) => <div className="col-md-6" key={i}>{e.content}</div>)
                        }
                    </div>
                    <h3 className="title">hình thức học</h3>
                    <div className="row row-check">
                    {
                            detail.benefits.map((e, i) => <div className="col-md-6" key={i}>{e.content}</div>)
                        }
                    </div>
                    <h3 className="title">
                        <div className="date-start">lịch học</div>
                        <div className="sub">*Lịch học và thời gian có thể thống nhất lại theo số đông học viên.</div>
                    </h3>
                    <p>
                        <strong>Ngày bắt đầu: </strong> {openingTime} <br />
                        <strong>Thời gian học: </strong> {detail.schedule}
                    </p>
                    <h3 className="title">Người dạy</h3>
                    <Teacher {...detail.teacher} />
                    {
                        detail.mentor.length > 0 && <>
                            <h3 className="title">Người hướng dẫn</h3>
                            {detail.mentor.map(e => <Teacher key={e.id} {...e} />)}
                        </>
                    }

                    <div className="bottom">
                        <div className="user">
                            <img src="/img/user-group-icon.png" alt="" /> 12 bạn đã đăng ký
                        </div>
                        <Link className="btn main btn-register round" to={registerPath}>đăng ký</Link>
                        <div className="btn-share btn overlay round btn-icon">
                            <img src="/img/facebook.svg" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-4">
                <div className="container">
                    <div className="textbox">
                        <h3 className="sub-title">Khóa học</h3>
                        <h2 className="main-title">Liên quan</h2>
                    </div>
                    <div className="list row">
                        {
                            related && related?.map(e => <CourseCard key={e.id} {...e} />)
                        }
                    </div>
                </div>
            </section>
        </main >
    )
}
