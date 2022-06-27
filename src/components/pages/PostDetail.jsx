import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PostForm from './PostForm'


export default function PostDetail({ currentUser }){
    const {id} = useParams()
    const [showForm, setShowForm] = useState(false)
    const [post, setPost] = useState({
        dish: {
            dishName: '',
            restaurant: {
                name: ''
            }
        },
        poster: {
            userName: '',
            _id:'',
        },
    })
    useEffect(() => {
        const fetchData = async () => {
           try{
               const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${id}`)
               console.log('consologing',response.data)
               
            //    const newPost = response.data
               setPost(response.data)
               console.log('what is in post',post)
           }catch(err){
               console.log(err)
           }
        }
        fetchData()
    },[])
    const renderDetail = (
        <div>
            <h1>PostDetail</h1>
            <h3>Posted by: {post.poster.userName ? post.poster.userName : 'anonymous'}</h3>
            <h2>Dish: {post.dish.dishName}</h2>
            <h2>Restaurant: {post.dish.restaurant.name}</h2>
            <h2>Rate: {post.rating}</h2>
            <p>{post.content}</p>
            {post.poster._id === currentUser.id ? <button onClick={()=> setShowForm(!showForm)}>Edit</button>
             : '' } 
        </div>
    )
    return(
        <>
            {showForm ? 'Let us edit' : renderDetail}
            
          
        </>
    )
}