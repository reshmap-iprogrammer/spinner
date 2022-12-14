import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'reactstrap'
import backIcon from '../Assets/images/Icon_Back.svg'
import './Styles.css'
import { useNavigate } from 'react-router-dom';
import infoIcon from '../Assets/images/Icon_Info.svg'
import { getRequestData } from '../services/RequestHandler';
import { route } from '../services/ApiRoutes';
import emptyRewardIcon from '../Assets/images/box-empty-request.svg'
import moment from 'moment';
import ClaimRewardModal from './ClaimRewardModal';
import ClaimPrizeForm from './ClaimPrizeForm';



function RewardHistory({msisdn}) {
    const [getRewards, setRewards] = useState();
    const [showModal, setModal] = useState(false);
    const [rewardData, setRewardData] = useState()
    const navigate = useNavigate();

    const toggle = () => {
        setModal(!showModal)
    }

    useEffect(() => {
        getRewardListApi()
    }, [])

    const getRewardListApi = async () => {
        const response = await getRequestData(
            `${route["GET_REWARDS"]}?user_profile_id=${msisdn}`
        );
        try {
            if(response?.status === 200){
                setRewards(response?.data?.SpinWheelRewardHistoryData)
            }else{
                console.log('object', response?.message)
            }
        } catch (error) {
            console.log('object', error?.message)
        }
    }

    const openRewardModal = (item) => {
        setRewardData(item)
        toggle();
    }

    const backToAppDashboard  = () => {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage('dashboard');
      }
      }
    
    return (
        <>
            <Container className='rewardHistoryWrapper'>
                <div className='backIcon'>
                    <img src={backIcon} height={25} className="backIconImage" onClick={() => navigate(-1)} />
                    <p className='rewardHistoryText'>reward history</p>
                </div>
            </Container>
          {getRewards && <div className="rewardWrappper">
                <Container className='rewardContainer'>
                    <div className='partnerText'>
                        partner
                    </div>
                    <div className='partnerText'>issue date</div>
                </Container>
            </div>}
            {getRewards && getRewards.length && getRewards?.map((item, index) => {
                return (
                    <>
                        <div className='rewardListwrapper' key={item?.id}>
                            <div >
                                <div className=' d-flex justify-content-between rewardList' >
                                    <div className='rowWrapper'>
                                        <div className='reward_logo_image'>
                                            <img src={item?.logo_image} height={32} width={32} />
                                        </div>
                                        <div>
                                            <p className='mb-0'>{item?.slot_name ? item?.slot_name : item?.coupon_code}</p>
                                            <p className='mb-0'>{item?.coupon_code}</p>
                                            {/* <p>{item?.description}</p> */}
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p style={{ marginRight: '20px' }}>{moment(item?.created_at).format('DD MMM, YY')}</p>
                                        <img src={infoIcon} height={20} onClick={() => openRewardModal(item)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}

            {!getRewards && (
                <>
                    {/* display when no records to display */}
                    <div className='noRewardScreen'>
                        <div>
                            <div className='text-center'>
                                <img src={emptyRewardIcon} className="emptyRewardImage" />
                            </div>
                            <p className='text-center noRecordYetText'>no rewards yet? no problem!</p>
                            <p className='text-center rechargeText'>Recharge now and win rewards!</p>
                            <Button size="lg" block color="danger" className='rechargeBtn' onClick={backToAppDashboard}>recharge now</Button>
                        </div>
                    </div>
                </>
            )}
            {/* {getRewards && getRewards?.length ? (
                <>
                    <div className="rewardWrappper">
                        <Container className='rewardContainer'>
                            <div className='partnerText'>
                                partner
                            </div>
                            <div className='partnerText'>issue date</div>
                        </Container>
                    </div>
                    <Container>
                        <div className=' d-flex justify-content-between mt-3'>
                            <div className='rowWrapper'>
                                <div>
                                </div>
                                <div>
                                    <p className='mb-0'>Pizza Hut</p>
                                    <p>200PTM02522w99MAX</p>
                                    
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p style={{ marginRight: '20px' }}>13 sep, 22</p>
                                <img src={infoIcon} height={20} />
                            </div>
                        </div>
                    </Container>
                </>
            ) : (
                <>
                    <div className='noRewardScreen'>
                        <div>
                            <div className='text-center'>
                                <img src={emptyRewardIcon} className="emptyRewardImage" />
                            </div>
                            <p className='text-center noRecordYetText'>no rewards yet? no problem!</p>
                            <p className='text-center rechargeText'>Recharge now and win rewards!</p>
                            <Button size="lg" block color="danger" className='rechargeBtn'>recharge now</Button>
                        </div>
                    </div>
                </>
            )} */}

            <ClaimRewardModal toggle={toggle} showModal={showModal} getRewards={rewardData} />
        </>
    )
}

export default RewardHistory
