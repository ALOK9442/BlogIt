import React, { useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'


function RTEditor({ name, control, label, defaultValue = "", ...rest }) {


    return (
        <div className='w-full'>
            {
                label && <p className='inline-block mb-1 pl-1'>
                    {label}
                </p>
            }
            <Controller
                name={name || "content"}
                control={control}
                render={(({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        init={
                            {
                                initialValue: defaultValue,
                                height: 500,
                                menubar: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                    'anchor',
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }
                        }
                        onEditorChange={onChange}
                    />
                ))}
            />
        </div>
    )
}

export default RTEditor