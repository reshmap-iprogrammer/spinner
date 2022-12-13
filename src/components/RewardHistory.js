import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'reactstrap'
import backIcon from '../Assets/images/Icon_Back.svg'
import './Styles.css'
import { useNavigate } from 'react-router-dom';
import infoIcon from '../Assets/images/Icon_Info.svg'
import { getRequestData } from '../services/RequestHandler';
import { route } from '../services/ApiRoutes';
import emptyRewardIcon from '../Assets/images/box-empty-request.svg'


function RewardHistory() {
    const [getRewards, setRewards] = useState();

    // useEffect(() => {
    //     getRewardListApi()
    // }, [])

    const getRewardListApi = async () => {
        const response = await getRequestData(route["GET_REWARDS"]);
        console.log('responseObject', response?.data?.SpinWheelRewardHistoryData)
        setRewards(response?.data?.SpinWheelRewardHistoryData)
    }

    const navigate = useNavigate();
    return (
        <>
            <Container className='rewardHistoryWrapper'>
                <div className='backIcon'>
                    <img src={backIcon} height={25} className="backIconImage" onClick={() => navigate(-1)} />
                    <p className='rewardHistoryText'>reward history</p>
                </div>
            </Container>
            {getRewards && getRewards?.length ? (
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
                        <div className='    d-flex justify-content-between mt-3'>
                            <div className='rowWrapper'>
                                <div>
                                    {/* <img src={getRewards.image} height={20} /> */}
                                </div>
                                <div>
                                    <p className='mb-0'>Pizza Hut</p>
                                    <p>200PTM02522w99MAX</p>
                                    {/* <p className='mb-0'>{getRewards?.slot_name}</p> */}
                                    {/* <p>{getRewards?.description}</p> */}
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
                    {/* display when no records to display */}
                    <div className='noRewardScreen'>
                        <div>
                            <div className='text-center'>
                            <img src={emptyRewardIcon} className="emptyRewardImage"/>
                            </div>
                            <p className='text-center noRecordYetText'>no rewards yet? no problem!</p>
                            <p className='text-center rechargeText'>Recharge now and win rewards!</p>
                            <Button size="lg" block color="danger" className='rechargeBtn'>recharge now</Button>
                        </div>
                    </div>
                </>
            )}


        </>
    )
}

export default RewardHistory
