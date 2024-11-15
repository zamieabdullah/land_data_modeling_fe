import { api } from "./config";

export const LandDataAPI = {
    async getRecentStateData(state) {
        const response = await api.get('/curr-state', {
            params: {
                state: state
            }
        })

        return response.data;
    },

    async getRecentMonthlyStateData(state) {
        const response = await api.get('/state', {
            params: {
                state: state
            }
        })

        return response.data;
    }
}