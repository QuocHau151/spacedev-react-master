import { AuthRoute } from "./components/AuthRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import { PATH } from "./config/path";
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import Home from "./pages";
import Coin from "./pages/coin";
import Contact from "./pages/contact";
import Course from "./pages/course";
import CourseDetail from "./pages/course/[slug]-id[id]";
import FAQ from "./pages/faq";
import Payment from "./pages/payment";
import MyCoin from "./pages/profile/coin";
import MyCourse from "./pages/profile/course";
import MyPayment from "./pages/profile/payment";
import Profile from "./pages/profile/profile";
import MyProject from "./pages/profile/project";
import Project from "./pages/project";
import Register from "./pages/register/[slug]-id[id]";
import ResetPassword from "./pages/reset-password";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Team from "./pages/team";
import Page404 from "./pages/404";
import Demo from "./pages/demo";
import { DemoReact } from "./pages/demo-react";





export const routes = [
    {
        element: <MainLayout />,
        children: [
            {
                element: <Home />,
                index: true
            },
            {
                element: <Demo />,
                path: '/demo'
            },
            {
                element: <DemoReact />,
                path: '/demo-react'
            },
            {
                element: <Contact />,
                path: PATH.contact
            },
            {
                path: PATH.course,
                children: [
                    {
                        element: <Course />,
                        index: true
                    },
                    {
                        element: <CourseDetail />,
                        path: PATH.courseDetail
                    }
                ]
            },
            {
                element: <Team />,
                path: PATH.team
            },
            {
                element: <Register />,
                path: PATH.courseRegister
            },
            {
                element: <Project />,
                path: PATH.project
            },
            {
                element: <FAQ />,
                path: PATH.faq
            },
            {
                element: <Payment />,
                path: PATH.payment
            },
            {
                element: <Coin />,
                path: PATH.coin
            },
            {
                element: <AuthRoute redirect={PATH.profile.index} />,
                children: [
                    {
                        element: <Signin />,
                        path: PATH.signin
                    },
                    {
                        element: <Signup />,
                        path: PATH.signup
                    },
                    {
                        element: <ResetPassword />,
                        path: PATH.resetPassword
                    }
                ]
            },
            {
                element: <PrivateRoute redirect={PATH.signin} />,
                children: [
                    {
                        element: <ProfileLayout />,
                        path: PATH.profile.index,
                        children: [
                            {
                                element: <Profile />,
                                index: true
                            },
                            {
                                element: <MyCourse />,
                                path: PATH.profile.course
                            },
                            {
                                element: <MyCoin />,
                                path: PATH.profile.coin
                            },
                            {
                                element: <MyProject />,
                                path: PATH.profile.project
                            },
                            {
                                element: <MyPayment />,
                                path: PATH.profile.payment
                            }
                        ]
                    }
                ]
            },
            {
                element: <Page404 />,
                path: '*'
            }
        ]
    }
]