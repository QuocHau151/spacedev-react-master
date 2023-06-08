import { api, ORGANIZATION_API } from '../config/api'
export const organizationService = {
    contact: (data) => {
        return api.post(`${ORGANIZATION_API}/contact`, data)
    }
}