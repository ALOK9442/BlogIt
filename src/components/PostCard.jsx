import React from 'react'
import blogService from '../appwrite/configuration'
function PostCard({ $id, title, featureImage }) {
    return (
        <link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={blogService.getFilePreview(featureImage)} alt={title} className='rounded-xl' />
                </div>
                <h2  className='text-xl font-bold'>{title}</h2>
            </div>
        </link>
    )
}

export default PostCard