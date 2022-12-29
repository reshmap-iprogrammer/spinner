const baseUrlObj = {
    dev:'',
    stage:'',
    prod:''
}
export const CURRENT_ENVIROMENT = process.env.DEPLOYMENT_ENV

const baseUrl = baseUrlObj[CURRENT_ENVIROMENT]

export const route = { 
    GET_SPIN:  'https://vilcmsdev.viapplogs.net/api/getSpinWheelCouponBanners',
    GET_REWARDS: 'https://vilcmsdev.viapplogs.net/api/getSpinWheelRewardHistory',
    GET_REWARD_HISTORY_FLAG: 'https://vilcmsdev.viapplogs.net/api/getUserRewardHistoryFlag',
    GET_REWARD_HISTORY: 'https://vilcmsdev.viapplogs.net/api/addSpinTheWheelRewardHistory',
    CLAIM_REWARDS: 'https://vilcmsdev.viapplogs.net/api/addSpinTheWheelRewardHistory'
}