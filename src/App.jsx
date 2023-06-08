import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import './assets/css/taildwin.css'
import './assets/css/custom.css'
import { routes } from './routes'


function App() {

 

  const element = useRoutes(routes)

  return (
    element
    // <Routes>
    //   <Route element={<MainLayout user={user} />}>
    //     <Route index element={<Home />} />
    //     <Route path={PATH.contact} element={<Contact />} />
    //     <Route path={PATH.course}>
    //       <Route index element={<Course />} />
    //       <Route path={PATH.courseDetail} element={<CourseDetail />} />
    //     </Route>
    //     <Route path={PATH.team} element={<Team />} />
    //     <Route path={PATH.courseRegister} element={<Register />} />
    //     <Route path={PATH.project} element={<Project />} />
    //     <Route path={PATH.faq} element={<FAQ />} />
    //     <Route path={PATH.payment} element={<Payment />} />
    //     <Route path={PATH.coin} element={<Coin />} />

    //     <Route element={<AuthRoute redirect={PATH.profile.index} user={user} />}>
    //       <Route path={PATH.signin} element={<Signin login={login} />} />
    //       <Route path={PATH.signup} element={<Signup register={login} />} />
    //       <Route path={PATH.resetPassword} element={<ResetPassword />} />
    //     </Route>

    //     <Route element={<PrivateRoute redirect={PATH.signin} user={user} />}>
    //       <Route path={PATH.profile.index} element={<ProfileLayout user={user} />}>
    //         <Route index element={<Profile />} />
    //         <Route path={PATH.profile.course} element={<MyCourse />} />
    //         <Route path={PATH.profile.coin} element={<MyCoin />} />
    //         <Route path={PATH.profile.project} element={<MyProject />} />
    //         <Route path={PATH.profile.payment} element={<MyPayment />} />
    //       </Route>
    //     </Route>
    //     <Route path='*' element={<Page404 />} />
    //   </Route>
    // </Routes>
  )
}

export default App
