import React, { useState } from 'react';
import {Comment, Avatar,Button,Input} from 'antd';
import {useSelector} from 'react-redux';
import axios from 'axios';

const {TextArea} = Input;
const SingleComment = (props) => {
    const user = useSelector(state => state.user);

    const[openReply, setOpenReply] =useState(false)

    const[commentValue,setCommentValue] = useState('');

    const onClikcReplyOpen = () => {
        setOpenReply(!openReply);
    }
    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
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

    const actions = [
        <span onClick={onClikcReplyOpen} key='comment-basic-reply-to'>Reply to</span>
    ]
    

    return (
        <div>
            <br />
            <p> replies</p>
            <hr />
            <Comment 
                actions={actions}
                author ={props.comment.writer.name}
                avatar={<Avatar alt src={props.comment.writer.image}/>}
                content={<p>{props.comment.content}</p>} />
            {openReply && 
                        <form style={{display:'flex'}} onSubmit={onSubmit}>
                        <textarea style={{width:'100%', borderRadius:'5px'}}
                        onChange={onHandleChange}
                        value={commentValue}
                        placeholder="댓글을 입력해 주세요"
                        />
                        <br />
                        <button style={{width:'20%', height:'52px'}} onClick={onSubmit} >Submit</button>
                    </form>
            }

        </div>
    )
}

export default SingleComment;