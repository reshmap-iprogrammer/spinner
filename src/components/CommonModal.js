import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import infoIcon from '../Assets/images/Icon_Info.svg'
import closeIcon from '../Assets/images/close.svg'
import Loader from './Loader';
import CryptoJS from "crypto-js";
import RewardHistory from './RewardHistory';
import { useNavigate } from 'react-router-dom';

function CommonModal({ showModal, toggle, spinnerValue, flagData, spinnerValues, msisdn, parentMsisdn, loading, setLoading, props,benefit, rewardDesc }) {

  const navigate = useNavigate();

  const rewardData = spinnerValues?.map((item) => item?.reward_type)
  const filterRewardHistoryData = rewardData?.filter((item) => item === '2'|| item === '1')
// console.log('objectbff', rewardDesc)
// console.log('objectbff', benefit[0]?.props?.children?.props?.children)
let dxlclaimStatus;
let decryptedData
  useEffect(() => {
    document.addEventListener("message", function (data) {
      const appData = data?.data
      let AppData = decodeURIComponent(appData);
      let rewardBytes = CryptoJS.AES.decrypt(AppData, "SE1LLVNSRUQtRU5DLURFQw==")
       decryptedData = JSON.parse(rewardBytes.toString(CryptoJS.enc.Utf8))
       alert(type(decryptedData))
      // if(decryptedData !== undefined){
      dxlclaimStatus = localStorage.setItem("dummy", JSON.stringify(decryptedData))
      // } 
      setLoading(false);
      // if(filterRewardHistoryData){
        navigateRewardHistory();
      // }
    }); 
  }, [])

  const navigateRewardHistory = () => {
    if(localStorage.getItem("dummy")){
      setTimeout(() => {
        navigate("/RewardHistory")
      }, 500);
    }
  }

  


  let data = spinnerValues?.map((item) => item?.benefit_id)
  let rewardTypeData = spinnerValues?.map((item) => item?.reward_type)
  // setRewardType(rewardTypeData);
  // console.log('object', rewardType)
  // console.log('object', rewardTypeData)
  let newArr = data?.filter((item) => item !== null)
  const benifitIdObj = Object.assign({}, newArr);
  const rewardTypeObj = Object.assign({}, rewardTypeData)
 let objData = {
		benifitId: 'F68FE6AA294C5C8',
    rewardType: '1'
		} 
// console.log('data', objData)
  const cipherText = CryptoJS.AES.encrypt(JSON.stringify(objData), 'SE1LLVNSRUQtRU5DLURFQw==').toString();
  let encodeToken = encodeURIComponent(cipherText);
  // console.log('object', JSON.stringify(newArr))


  const claimReaward = () => {
    // const obj1 = Object.assign({}, encodeToken);
    if(filterRewardHistoryData){
      if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(encodeToken);
      }
    }
    setLoading(true);
  }

  return (
    <div>
        <Modal className='modalWrapper' isOpen={showModal} toggle={toggle} backdrop="static">
        <div className='closeIconWrapper'>
          <img src={closeIcon} onClick={toggle} height={32} width={32} />
        </div>
        <ModalHeader toggle={toggle} style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: '0px'
        }}>
          <p >Congratulations</p>
        </ModalHeader>
        {flagData === 0 ? <p style={{ textAlign: 'center' }}>here is your reward</p> :
          <p style={{ textAlign: 'center' }}>your reward is being proceed!</p>
        }
        <ModalBody>
          <div className='data'>
            <h5 >{spinnerValue}</h5>
          </div>
          <div className='d-flex justify-content-center'>
            <img src={infoIcon} height={20} />
            {msisdn === parentMsisdn ? <p>This will be reflect in your account within 24 hrs</p> :
            <p>This will be reflect in {msisdn}'s account in 24 hrs</p>
            }
          </div>

          {flagData === 0 ? <><div className='backHomeButton' onClick={claimReaward}>
            <p className='text-center text-white p-3 backHomeText'>{!loading ? 'claim reward' : <Loader />}</p>
          </div></> : <>
            <div className='backHomeButton'  onClick={() => navigate(-2)}>
              <p className='text-center text-white p-3 backHomeText'>back home</p>
            </div>
          </>}
          <p style={{ textAlign: 'center' }}>you may also view this later in reward history</p>
        </ModalBody>
      </Modal>
     
    </div>
  )
}

export default CommonModal