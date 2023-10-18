import React, { useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { BlogService } from '../appwrite/configuration'
import { Container } from '../components'

function EditPost() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const{slug } = useParams()
    useEffect(() => {  
        if(slug){
        BlogService.getpost(slug).then((post)=>{
            if(post){
                setPosts(post)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    } else {
        // navigate("/404")
        navigate("/")
    }
    },[slug,navigate])

  return (
    posts ? (
        <div className='py-8'>
            <Container>
                <PostForm post={posts} />
            </Container>
        </div>
    ):null
  )
}

export default EditPost