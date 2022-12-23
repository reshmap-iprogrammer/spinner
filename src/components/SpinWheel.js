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
import { useSearchParams } from 'react-router-dom';


function SpinWheel() {
  const [queryParameters] = useSearchParams()

  alert("userData", queryParameters.get("msidin"))
  const [selectedItem, setSelectedItem] = useState(null);
  const [spinnerValues, setSpinnerValues] = useState()
  const [showModal, setModal] = useState(false);
  const [howToPlayModal, setHowToPlayModal] = useState(false);
  const [rewardCount, setRewardCount] = useState()

  let timer;
  useEffect(() => {
    spinWheelApi();
    getRewardCount();
    return () => {
      clearTimeout(timer);
    }
  }, []);


  const spinWheelApi = async () => {
    const response = await getRequestData(route["GET_SPIN"]);
    setSpinnerValues(response?.data?.SpinWheelCouponData)
  }

  const getRewardCount = async () => {  
    const rewardResponse = await getRequestData(route["GET_REWARD_HISTORY"]);
    setRewardCount(rewardResponse?.data?.user_reward_count)
  }

  const selectItem = (props) => {
    if (selectedItem === null) {
      const selectedItem =  rewardCount
      let filteredItem = spinnerValues?.filter((_,i)=> i == selectedItem)
      setRewardCount(filteredItem.map((item, i) => {
        return (
          <>
          <img src={item?.overlay_image} height={120} width={'100%'} className="mb-3"/>
          <p>{item?.description}</p>
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

  const startRotation = () => {
    setTimeout(() => {
      toggle();
    }, 4000);
  }

  const playtoggle = () => {
    setHowToPlayModal(!howToPlayModal)
  }

  const wheelVars = {
    "--nb-item": spinnerValues?.length,
    "--selected-item": selectedItem
  };
  const spinning = selectedItem !== null ? "spinning" : "";

  return (
    <Container>
      <div className='spinToWinHeader'>
        <img src={backIcon} height={25} className="backIconImage" />
        <p className='spinToWinHeaderText'>spin to win</p>
      </div>
      <div className='arrow' id="spinArrow" >
        <img src={spinArrowImage} />
      </div>
      <div className="wheel-container">
        <div
          style={wheelVars}
          onClick={selectItem}
        >
          <div className='spinButton' onClick={startRotation}>
            <p className='spinBtnText text-center' >SPIN</p>
          </div>
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
                      <p className='fw-bold'>{item.title}</p>
                      <span className=''>{item.sub_title}</span>
                    </div>
                  </div>
                </div>
              </>
            ))}
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
      <CommonModal showModal={showModal} toggle={toggle} spinnerValue={rewardCount} image={rewardCount}/>
      <HowToPlayModal howToPlayModal={howToPlayModal} toggle={playtoggle} />
    </Container>
  )
}

export default SpinWheel
