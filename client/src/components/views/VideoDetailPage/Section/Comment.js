import axios from 'axios';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';

const Comment = (props) => {

    const user = useSelector(state => state.user);
    const videoId = props.postId;
    const [commentValue, setCommentValue] = useState('')
    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId,
        }
        axios.post('/api/comment/saveComment',variables)
            .then(response=>{
                if(response.data.success){
                    props.refreshFunction(response.data.result)
                    setCommentValue('')
                }else{
                    alert('댓글을 저장하지 못했습니다.')
                }
            })
    }


    return(
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/* 댓글리스트 */}
            {props.commentList && props.commentList.map((comment,index)=>(
                (!comment.responseTo && 
                    <SingleComment refreshFunction={props.refreshFunction} key={index} comment={comment} postId={videoId} />

                    )

            ))}


            {/* 루트 댓글 펌  */}
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea style={{width:'100%', borderRadius:'5px'}}
                onChange={handleClick}
                value={commentValue}
                placeholder="댓글을 입력해 주세요"
                />
                <br />
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit} >Submit</button>
            </form>
        </div>
    )
}

export default Comment