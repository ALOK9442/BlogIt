import React,{useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import blogService from '../appwrite/configuration'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const userData = useSelector.apply((state)=> state.auth.userData)

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            featuredImage: post?.featuredImage || "",
            status: post?.status || "active",
        }
    })

    const navigate = useNavigate()

    const submit = async (data) => {
        if (post) {
            const file = data.$id? blogService.uploadFile(data.featuredImage[0]):null

            if (file) {
                // data.featuredImage = file.$id
                await blogService.deleteFile(data.featuredImage)
            }
            const updatedPost = await blogService.updatePost(
                post.$id,{
                ...data,
                featuredImage:file?file.$id:undefined
            }
                )
                // console.log(updatedPost)
                if(updatedPost){
                    navigate(`/post/${updatedPost.$id}`)
                }
        } else {
            const file  = data.featuredImage? blogService.uploadFile(data.featuredImage[0]):null
            if(file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const createdPost = await blogService.createPost({
                    ...data,
                    userId : userData.$id
                })
                // if(createdPost){
                //     navigate(`/post/${createdPost.$id}`)
                // }
                navigate(createdPost?`/post/${createdPost.$id}`:null)
            }
        }
    }

    const slugTransform = ((value) => {
        if(value&&typeof value === "string"){
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
        }
        return ""
    })

    useEffect(() => {
      const subcription =  watch((value,{name}) =>{
        if(name==="title"){
            setValue("slug",slugTransform(value,{
                shouldValidate:true,
            }))
        }
      })
      return ()=> subcription.unsubscribe()
    }, [watch, setValue, slugTransform])
    
    
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm