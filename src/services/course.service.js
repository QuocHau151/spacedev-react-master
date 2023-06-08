import { api, COURSE_API } from '../config/api'


export const courseService = {
    // mock data
    getCourse: (query = '') => {
        return api.get(`${COURSE_API}${query}`)
    },

    getCourseDetail(id) {
        return api.get(`${COURSE_API}/${id}`)
    },

    getRelated(id) {
        return api.get(`${COURSE_API}/related/${id}`)
    },
    register(id, data) {
        return api.post(`${COURSE_API}/register/${id}`, data)
    },
    getMyCourse() {
        return api.get(`${COURSE_API}/my-course`)
    }
}