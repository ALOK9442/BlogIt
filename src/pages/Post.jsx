import React, { useEffect } from 'react'
import blogService from '../appwrite/configuration'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Container } from '../components'
import { useSelector } from 'react-redux'

function Post() {
    const navigate = useNavigate()
    const { slug } = useParams()
    const [posts, setPosts] = useState([])
    const isAuthor = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if (slug) {
            blogService.getPost(slug).then((post) => {
                setPosts(post)
            }).catch((error) => {
                console.log(error)
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate])

    const deletePost = async () => {
        blogService.deletePost(posts.$id).then((status) => {
            if (status) {
                blogService.deleteFile(posts.featuredImage)
                navigate("/")
            }
        })
    }

    return (
        posts ? (
            <div className='py-8'>
                <Container>
                    <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                        <img
                            src={blogService.getFilePreview(posts.featuredImage)}
                            alt='post.title'
                            className="rounded-xl"
                        />
                        {
                            isAuthor && (
                                <div className="absolute right-6 top-6">
                                    <link to={`/edit/${posts.$id}`} className='p-2'>
                                        <Button bgColor="bg-green-500" className="mr-3">
                                            Edit
                                        </Button>
                                    </link>
                                    <Button bgColor="bg-red-500" onClick={deletePost}>
                                        Delete
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                    <div className="w-full mb-6">
                        <h1 className="text-2xl font-bold">{posts.title}</h1>
                    </div>
                    <div className="browser-css">
                        {parse(posts.content)}
                    </div>
                </Container>
            </div>
        ) : null
    )
}


export default Post