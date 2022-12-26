const baseUrlObj = {
    dev:'',
    stage:'',
    prod:''
}
export const CURRENT_ENVIROMENT = process.env.DEPLOYMENT_ENV

const baseUrl = baseUrlObj[CURRENT_ENVIROMENT]

export const route = { 
    GET_SPIN:  'http://65.0.242.66/api/getSpinWheelCouponBanners',
    GET_REWARDS: 'http://65.0.242.66/api/getSpinWheelRewardHistory',
    GET_REWARD_HISTORY_FLAG: 'http://65.0.242.66/api/getUserRewardHistoryFlag?user_profile_id=9082454538',
    GET_REWARD_HISTORY: 'http://65.0.242.66/api/addSpinTheWheelRewardHistory'
}