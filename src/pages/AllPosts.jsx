import React, { useState, useEffect } from 'react'
import blogService from '../appwrite/configuration'
import Container from '../components/Container'
import PostCard from '../components/PostCard'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        blogService.getPosts().then((post) => {
            if (post) {
                setPosts(post.documents)
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <div className='w-full py-8'>
            <Container >
                <div className='flex felx-wrap'>
                    {
                        posts.map((post) =>
                            <div key={post.$id} className='p-2 w-1/4'>
                               {/* <PostCard {...post} /> */}
                               <PostCard post={post} />
                            </div>
                        )
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllPosts