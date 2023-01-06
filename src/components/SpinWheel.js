import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap';
import { route } from '../services/ApiRoutes';
import { getRequestData } from '../services/RequestHandler';
import "./index.css";
import infoIcon from '../Assets/images/Icon_Info.svg'
import backIcon from '../Assets/images/Icon_Back.svg'
import { Link } from "react-router-dom";
import CommonModal from './CommonModal';
import HowToPlayModal from './HowToPlayModal';
import './Styles.css'
import spinArrowImage from '../Assets/images/pointer.svg'
import copyIcon from '../Assets/images/Icon_Copy.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import CryptoJS from "crypto-js";
import OfferNotApplicableModal from './OfferNotApplicableModal';
import SystemDownErrorModal from './SystemDownErrorModal';
import ServerDownModal from './ServerDownModal';


function SpinWheel() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [spinnerValues, setSpinnerValues] = useState()
  const [showModal, setModal] = useState(false);
  const [howToPlayModal, setHowToPlayModal] = useState(false);
  const [rewardCount, setRewardCount] = useState();
  const [spinData, setSpinData] = useState('');
  const [flagData, setFlagData] = useState('');
  const [isCopied, setCopied] = useState(false);
  const [offerApplicable, setOfferApplicable] = useState(false);
  const [errorModal, setErrorModal] = useState({firstModal: false, secondModal: false, thirdModal: false});
  const [systemError, setSystemError] = useState(false);
  const [serverDown, setServerDown] = useState(false);
  const [data, setData] = useState();
  const [rewardDesc, setRewardDesc] = useState('');
  const [benefit, setBenefit] = useState('')

  const navigate = useNavigate();

  let msisdn;
  let parentMsisdn;
  let circleId;
  let linkDatas = document.location.href.split('=')?.[1]
  if(linkDatas){
    let linkData = decodeURIComponent(linkDatas);
    let bytes = CryptoJS.AES.decrypt(linkData, 'VE1LLVNFRUQtRU5DLURFQw==')
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      msisdn = JSON.parse(decryptedData.msisdn)
      parentMsisdn = JSON.parse(decryptedData.parentMsisdn)
      circleId = JSON.parse(decryptedData.circleId)
  }


  let timer;
  useEffect(() => {
    spinWheelApi();
    return () => {
      clearTimeout(timer);
    }
  }, []);
  

  const spinWheelApi = async () => {
    const response = await getRequestData(route["GET_SPIN"]);
    try {
      if(response?.status === 200){
        setSpinnerValues(response?.data?.SpinWheelCouponData)
      }
      else{
        if(!errorModal.firstModal){
          //open first modal
          setSystemError(true)
          setErrorModal({ ...errorModal,firstModal: true})
        }else{
          setServerDown(true)
          // open second modal
        }
      }
    } catch (error) {
      if(!errorModal.firstModal){
        //open first modal
        setSystemError(true)
        setErrorModal({ ...errorModal,firstModal: true})
      }else{
        setServerDown(true)
        // open second modal
      }
    }
  }

  const getFlag = async () => {
    const getFlagresponse = await getRequestData(`${route["GET_REWARD_HISTORY_FLAG"]}?user_profile_id=${msisdn}&primary_msisdn=${parentMsisdn}&secondary_msisdn=${msisdn}&circle=${circleId}&name=vaibhav&status=1`);
    try {
      if(getFlagresponse?.status === 200){
        setFlagData(getFlagresponse?.data?.reward_history_flag);
        startRotation(getFlagresponse?.data?.reward_history_flag)
        if(getFlagresponse?.data?.reward_history_flag === 0){
          getRewardCount();
        }
      }else{
        if(!errorModal.secondModal){
          //open first modal
          setSystemError(true)
          setErrorModal({...errorModal, secondModal: true})
        }else{
          setServerDown(true)
          // open second modal
        }
      }
    } catch (error) {
      if(!errorModal.secondModal){
        //open first modal
        setSystemError(true)
        setErrorModal({...errorModal, secondModal: true})
      }else{
        setServerDown(true)
        // open second modal
      }
    }
  }


  const getRewardCount = async () => {
    const rewardResponse = await getRequestData(
      `${route["GET_REWARD_HISTORY"]}?user_profile_id=${msisdn}&spin_id=1&claim_status=0&rank=0`
    );
    try {
      if(rewardResponse?.status === 200) {
        selectItem(rewardResponse?.data?.user_reward_count);
        setRewardCount(rewardResponse?.data?.user_reward_count)
        setSpinData(rewardResponse?.data?.user_reward_count)
      }else{
        if(!errorModal.thirdModal){
          //open first modal
          setSystemError(true)
          setErrorModal({...errorModal, thirdModal: true})
        }else{
          setServerDown(true)
          // open second modal
        }
      }
    } catch (error) {
      if(!errorModal.thirdModal){
        //open first modal
        setSystemError(true)
        setErrorModal({...errorModal, thirdModal: true})
      }else{
        setServerDown(true)
        // open second modal
      }
    }
   
  }


  const selectItem = (rewardCount) => {
    if (selectedItem === null) {
      const selectedItem = rewardCount
      let filteredItem = spinnerValues?.filter((_, i) => i == selectedItem)
      setData(filteredItem?.map((item, i) => {
        return (
          <div key={item.id}>
            <img src={item?.overlay_image} height={120} width={'100%'} className="mb-3 ovelayImage" />
            <div className='overlayWrapper'>
              <p className='descriptionText'>{item?.description}</p>
              <p className='deatilsText'>{item?.detail}</p>
            </div>
            <div className='detailhorizontalLine'></div>
            <div className='d-flex justify-content-between overlayWrapper'>
              <div>
                <p className='descriptionText mb-1'>{item?.coupon_code}</p>
                <p className='deatilsText'>valid till {item?.expiry_date}</p>
              </div>
              <div className='cursor-pointer' >
                <div className='d-flex justify-content-center'>
                  <img src={copyIcon} height={24} width={24} />
                </div>
                <CopyToClipboard text={item?.coupon_code}
                  onCopy={()=>setCopied(true)}>
                  <p className='copyIconText'>{isCopied ? "Copied!" : "tap to copy"}</p>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        )
      }))
      setRewardDesc(filteredItem?.map((item, i) => { 
        return (
          <>
            <p>{item?.description}</p>
          </>
        )
      }))
      setBenefit(spinnerValues?.map((item, i) => { 
        return (
          <>
            <p>{item?.benefit_id}</p>
          </>
        )
      }))
      setSelectedItem(selectedItem);
    } else {
      setSelectedItem(null);
      setTimeout(selectedItem, 500);
    }

  }

  const toggle = () => {
    setModal(!showModal)
    // if(!showModal){
    // play()
    // }
    // setHowToPlayModal(!howToPlayModal)
  }

  function play() {
    var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
    audio.play();
  }

  const startRotation = (key) => {
     if(key === 1) {
       offerNotApplicableModal();
      }else{
      setTimeout(() => {
        toggle();
      }, 4000);
    }
  }

  const playtoggle = () => {
    setHowToPlayModal(!howToPlayModal)
  }

  const offerNotApplicableModal = () => {
    setOfferApplicable(!offerApplicable)
  }

  const systemErrorModal = () => {
    setSystemError(!systemError)
  }

  const serverdownModal = () => {
    setServerDown(!serverDown)
  }

  const wheelVars = {
    "--nb-item": spinnerValues?.length,
    "--selected-item": selectedItem
  };
  const spinning = selectedItem !== null ? "spinning" : "";

  return (
    <Container>
      <div className='spinToWinHeader'>
        <img src={backIcon} height={25} className="backIconImage" onClick={() => navigate(-1)} />
        <p className='spinToWinHeaderText'>spin to win</p>
      </div>
      <div className={flagData === 1 ? 'WheelWrapperdisableSpinner position-relative' : 'disableSpinner position-relative'}>
        <div className= 'arrow' id="spinArrow" >
          <img src={spinArrowImage} />
        </div>
        <div className="wheel-container">
          <div
            style={wheelVars}
            onClick={getFlag}
          >
            {(selectedItem === null || selectedItem < 1)  ? <div className='spinButton' >
              <button className='spinBtnText text-center' >SPIN</button>
            </div> :   <div className='spinButton' >
              <button disabled className='spinBtnText text-center' >SPIN</button>
            </div>}
           
            <div className={`wheelWrapper wheel ${spinning}`}>
              {spinnerValues?.map((item, index) => (
                <>
                  <div
                    className="wheel-item"
                    key={`spinId_${index}`}
                    style={{ "--item-nb": index }}
                    id={`spinId_${index}`}
                  >
                    <div className='contentWrapper'>

                      <div className='text-center'>
                        <img src={item?.logo_image} height={30} width={30} />
                      </div>
                      <div className='textWrapper text-center'>
                        <p className='fw-bold text-truncate text-center' style={{maxWidth: '50px',margin:'0 10px'}}>{item.title}</p>
                        <span className='text-truncate text-center d-block' style={{maxWidth: '55px',margin:'0 10px'}} >{item.sub_title}</span>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>

        </div>
      </div>
      <div className='infoIcon'>
        <div className='infoIconWrapper'>
          <img src={infoIcon} height={20} />
        </div>
        <p><span className='pleaseNoteText'>Please Note - </span> Spin the wheel only once every 48 hours. To spin the wheel again, recharge after 48 hours.</p>
      </div>
      <Container>
        <div onClick={(event) => {
          event.preventDefault();
          // toggle();
          // playModal()
          playtoggle();
        }}>
          <a href='' className='howToPlayText'>how to play</a>
        </div>
        <hr />
        <Link to="rewardHistory" className='howToPlayText'>reward history</Link>
      </Container>
      <CommonModal showModal={showModal} toggle={toggle} spinnerValue={data} benefit={benefit} rewardDesc={rewardDesc} image={rewardCount} spinData={spinData} flagData={flagData} msisdn={msisdn} spinnerValues={spinnerValues}/>
      <HowToPlayModal howToPlayModal={howToPlayModal} toggle={playtoggle} />
      <OfferNotApplicableModal offerApplicable={offerApplicable} toggle={offerNotApplicableModal}/>
      <SystemDownErrorModal systemError={systemError} toggle={systemErrorModal} getFlag={getFlag} spinWheelApi={spinWheelApi} getRewardCount={getRewardCount} errorModal={errorModal} selectItem={selectItem} />
      <ServerDownModal serverDown={serverDown} toggle={serverdownModal}/>
    </Container>
  )
}

export default SpinWheel
