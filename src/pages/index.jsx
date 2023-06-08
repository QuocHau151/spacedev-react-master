import { useEffect, useState } from 'react'
import CourseCard, { CourseCardLoading } from '../components/CourseCard'
import { useScrollTop } from '../hooks/useScrollTop'
import { courseService } from '../services/course.service'
import { Modal } from '../components/Modal'
import { AspectRatio } from '../components/AspectRatio'
import { Testimonial } from '../components/Testimonial'
import { TeamSlider } from '../components/TeamSlider'

export default function Home() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [isOpenVideoModal, setIsOpenVideoModal] = useState(false)

    useScrollTop()

    useEffect(() => {
        setLoading(true)
        courseService.getCourse('?limit=6')
            // .then(res => res.json())
            .then(res => {
                setCourses(res.data)
            })
            .finally(() => {
                setLoading(false)
            })



        
    }, [])
    return (
        <main className="homepage" id="main">
            <Modal visible={isOpenVideoModal} maskClosable={false} onCancel={() => setIsOpenVideoModal(false)}>
                <AspectRatio width={1000} ratio={9 / 16} className="video-src">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/oTsopKtMS_0?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </AspectRatio>
            </Modal>
            <div className="banner jarallax">
                <div className="container">
                    <div className="content">
                        <h2 className="title">Kiến thức</h2>
                        <h2 className="title">mở ra trang mới cuộc đời bạn</h2>
                        <div className="btn main round">KHÓA HỌC</div>
                    </div>
                </div>
                <div className="jarallax-img">
                    <img src="https://spacedev.vn/images/bn-top.jpg" alt="" />
                </div>
            </div>
            <section className="section-1">
                <div className="container">
                    <h2 className="main-title">KHÓA HỌC SPACEDEV</h2>
                    <p className="top-des">
                        Cho dù bạn muốn tìm kiếm công việc, khởi nghiệp, phát triển hoạt động kinh doanh hay chỉ đơn giản là muốn khám phá thế giới, hãy chọn lộ trình học tập mà bạn muốn và bắt đầu câu chuyện thành công của bạn.
                    </p>
                    <div className="textbox" style={{ marginTop: '100px' }}>
                        <h3 className="sub-title">KHÓA HỌC</h3>
                        <h2 className="main-title">OFFLINE</h2>
                    </div>
                    <div className="list row">
                        {
                            loading ? Array.from(Array(6)).map((_, i) => <CourseCardLoading key={i} style={{ marginBottom: 30 }} />) :
                                courses.map(e => <CourseCard key={e.id} {...e} />)
                        }
                    </div>
                </div>
            </section>
            <section className="section-different">
                <div className="container">
                    <div className="row">
                        <div className="titlebox col-md-6 col-sm-12 col-xs-12">
                            <h2 className="main-title white textleft">Những điều <br /><span>đặc biệt</span> tại Spacedev</h2>
                            <div className="videodif" data-src="video/cfd-video-intro.mp4">
                                <img src="https://svtech.com.vn/wp-content/uploads/2020/07/dexus-office-space.jpg" alt="" />
                                <div onClick={() => setIsOpenVideoModal(true)} className="play-btn btn-video-intro">
                                    <img src="/img/play-icon.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="contentbox col-md-6 col-sm-12 col-xs-12">
                            <div className="item">
                                <h4>Cam kết chất lượng</h4>
                                <p>Các khóa học của spacedev được soạn thảo cẩn thận và sắp xếp một cách có trật tự giúp cho việc học trở nên dễ dàng
                                    hơn. Bên cạnh đó các kỹ thuật, công nghệ áp dụng hoàn toàn là các kiến thực thực tế trong các doanh nghiệp đang áp dụng
                                    giúp cho kiến thức trở nên hữu dụng và nhớ lâu hơn, học viên không cần phải nhớ quá nhiều kiến thức để đạt đến khả năng
                                    có thể đi làm được trong các doanh nghiệp lớn.
                                </p>
                            </div>
                            <div className="item">
                                <h4>Lấy học viên làm trung tâm</h4>
                                <p>Với phương châm "Lấy người học làm trung tâm". Khi học viên đến với spacedev sẽ luôn được quan tâm tạo điều kiện tốt nhất để phát triển
                                    các kỹ năng. Mọi ý kiến phản hồi của học viên đều được lắng nghe và phản hồi một cách tiếp thu nhất có thể.
                                </p>
                            </div>
                            <div className="item">
                                <h4>Trung thực và giữ chữ tín</h4>
                                <p>Trong môi trường phát triển đầy cạnh tranh và thay đổi liên tục, spacedev luôn giữ cho mình những tiêu chí quan trọng trong suốt quá
                                    trình hoạt động. Trong đó "trung thực và giữ chữ tín" với khách hàng luôn là tiêu chí hàng đầu spacedev tuân theo dù cho việc đó gây ảnh hưởng
                                    đến hoạt động của spacedev như thế nào.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section class="section-3">
            <div class="container">
                <div class="video">
                    <iframe id="video-intro"
                        src="https://www.youtube-nocookie.com/embed/6t-MjBazs3o?controls=0&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen allowscriptaccess="always"></iframe>

                    <div class="video-src" data-src="video/Spacedev-video-intro.mp4"></div>
                    <div class="play-btn btn-video-intro">
                        <img src="img/play-video-btn.png" alt="">
                    </div>
                </div>
            </div>
        </section> */}
            <Testimonial />
            <TeamSlider />
            <section className="section-action">
                <div className="container">
                    <h3>Bạn đã sẵn sàng trở thành chiến binh tiếp theo của Team Spacedev chưa?</h3>
                    <div className="btn main round bg-white">Đăng ký</div>
                </div>
            </section>
        </main>
    )
}
