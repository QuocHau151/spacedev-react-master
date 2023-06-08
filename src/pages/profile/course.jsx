import React, { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { courseService } from '../../services/course.service'
import Skeleton from '../../components/Skeleton'
import moment from 'moment/moment'
import { generatePath, Link } from 'react-router-dom'
import { PATH } from '../../config/path'
export default function MyCourse() {
    const { loading, data: courses } = useFetch(() => courseService.getMyCourse())

    if (loading) return <>
        {
            Array.from(Array(3)).map((_, i) => <div key={i} className="mb-5"><Skeleton height={250} /></div>)
        }
    </>
    return (
        <div className="tab2">
            {
                courses.map(e => (
                    <div key={e.course_id} className="item">
                        <div className="cover">
                            <img src={e.course.thumbnailUrl} alt="" />
                        </div>
                        <div className="info">
                            <a href="#" className="name">
                                {e.course.title}
                            </a>
                            <div className="date">Khai giảng ngày {moment(e.opening_time).format('DD/MM/YYYY')}</div>
                            <div className="row">
                                <div >
                                    <img src="/img/clock.svg" alt="" className="icon" />{e.total_hours} giờ
                                </div>
                                <div >
                                    <img src="/img/play.svg" alt="" className="icon" />{e.video} video
                                </div>
                                <div >
                                    <img src="/img/user.svg" alt="" className="icon" />{e.student} học viên
                                </div>
                            </div>
                            <div className="process">
                                <div className="line">
                                    <div className="rate" style={{ width: `${e.process}%` }} />
                                </div>
                                {e.process}%
                            </div>
                            <Link to={generatePath(PATH.courseDetail, { id: e.course.id, slug: e.course.slug })} className="btn overlay round btn-continue">
                                Tiếp tục học
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
