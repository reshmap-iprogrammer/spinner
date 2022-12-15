const baseUrlObj = {
    dev:'',
    stage:'',
    prod:''
}
export const CURRENT_ENVIROMENT = process.env.DEPLOYMENT_ENV

const baseUrl = baseUrlObj[CURRENT_ENVIROMENT]

export const route = { 
    GET_SPIN:  'http://65.0.242.66/api/getSpinWheelCouponBanners',
    GET_REWARDS: 'http://65.0.242.66/api/getSpinWheelRewardHistory?user_profile_id=9082454538',
}