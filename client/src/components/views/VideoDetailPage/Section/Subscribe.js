import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Subscribe = (props) => {
    const[subscribeNumber,setSubscribeNumber] = useState(0)
    const [subscribed, setSubscribed] = useState(false)
    useEffect(()=> {
        let variable = {userTo:props.userTo}
        
        axios.post('/api/subscribe/subscribeNumber',variable)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(response.data.subscribeNumber)
                }else{
                    alert('구독자 수 정보를 받아오지 못했습니다.')
                }
            })

            let subscribedVariable = {userTo:props.userTo, userFrom:localStorage.getItem('userId')}

        axios.post('/api/subscribe/subscribed',subscribedVariable)
            .then(response => {
                if(response.data.success){
                    setSubscribed(response.data.setSubscribed)
                }else{
                    alert('정보를 받아오지 못했습니다.')
                }
            })
    },[])

    const onSubscribe = () => {
        let subscribedVariable = {userTo:props.userTo, userFrom:localStorage.getItem('userId')}


        if(subscribed){
            axios.post('/api/subscribe/unSubscribe',subscribedVariable)
                .then(response => {
                    if(response.data.success){
                        setSubscribeNumber(subscribeNumber - 1);
                        setSubscribed(!subscribed)
                    }else{
                        alert('구독 취소 하는데 실패 했습니다.')
                    }
                })
        }else{
            axios.post('/api/subscribe/subscribe',subscribedVariable)
                .then(response => {
                    if(response.data.success){
                        setSubscribeNumber(subscribeNumber + 1);
                        setSubscribed(!subscribed)
                    }else{
                        alert('구독 하는데 실패 했습니다.')
                    }
                })
        }
    }

    return(
        <div>
            <button style={{
                backgroundColor:`${subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius:'4px',
                color: 'white', padding: '10px 16px',
                fontWeight:'500', fontSize: '1rem', textTransform:'uppercase'
            }} 
            onClick ={onSubscribe}
            >
                {subscribeNumber} {subscribed ? 'Subscribed': 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe