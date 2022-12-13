const baseUrlObj = {
    dev:'',
    stage:'',
    prod:''
}
export const CURRENT_ENVIROMENT = process.env.DEPLOYMENT_ENV

const baseUrl = baseUrlObj[CURRENT_ENVIROMENT]

export const route = {
    GET_SPIN: baseUrl + '/api/getSpinWheelCouponBanners',
    GET_REWARDS: baseUrl + '/api/getSpinWheelRewardHistory?msdin=263547873'
}