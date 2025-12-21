import { useEffect, useState, useRef } from "react";
import { getIconImg } from '../services/image.service.js'
import { userService } from '../services/user/user.service.local.js'
import {uploadImg} from  '../services/upload.service.js'

export function CreateStory({ onClose, onAdd }) {
    const [imgUrl, setImgUrl] = useState('')
    const [imgFile, setImgFile] = useState('')
    const [txt, setTxt] = useState('')
    const [next, setNext] = useState(false)
    const fileInputRef = useRef(null)

    const user = userService.getLoggedinUser()

    useEffect(() => {
        function handleEsc(ev) {
            if (ev.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [])

    async function onSaveStory() {
        if (!imgUrl) return alert("Please upload an image first")

        const uploadedUrl = await uploadImg (imgFile)

        onAdd(txt, uploadedUrl)

        onClose()
    }

    // async function uploadImg(file) {
    //     const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`
        
    //     const formData = new FormData()
    //     formData.append('file', file)
    //     formData.append('upload_preset', 'picmeapp')

    //     try {
    //         const res = await fetch(UPLOAD_URL, {
    //             method: 'POST',
    //             body: formData
    //         })
    //         const data = await res.json()

    //         console.log('Cloudinary response:', data)
    //         return data.secure_url

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // async function onAddStory() {
    //     const story = getEmptyStory()
    //     try {
    //         const savedStory = await addStory(story)
    //         showSuccessMsg(`Story added (id: ${savedStory._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add story')
    //     }
    // }

    function onOverlayClick() {
        onClose()
    }

    function onContentClick(ev) {
        ev.stopPropagation()
    }

    function handleSelectFile() {
        fileInputRef.current.click()
    }

    function handleFileChange(e) {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => setImgUrl(reader.result)
        reader.readAsDataURL(file)
        setImgFile(file)
    }

    function onNextClick() {
        setNext(true)
    }


    return (
        <div className="create-overlay" onClick={onOverlayClick}>
            <button className="create-close" onClick={onClose}>✕</button>

            <div className="create-content" onClick={onContentClick}>
                {imgUrl && next ?
                    (<div className="create-header">
                        <div>Create new post</div>
                        {next && (<a onClick={onSaveStory}>Share</a>)}
                    </div>) :
                    (<div className="create-next"><a onClick={onNextClick}>Next</a></div>)
                }

                <div className="create-main">
                    {imgUrl ?
                        (<div className="create-preview-img">
                            <img alt="preview-img" src={imgUrl} />

                        </div>)
                        :
                        (<div className="create-content-main">
                            <img className="create-icon" src={getIconImg('createbg')} alt="create icon" />
                            <div>Drag photos and videos here</div>
                            <button onClick={handleSelectFile}>Select from computer</button>
                        </div>)
                    }



                    {next && (
                        <div className="create-text-section">
                            <div className='avatar'>
                                <img className="avatar-img md" src={getIconImg('avatar')} alt="avatar" />
                                <div className="username small">{user.username}</div>
                            </div>

                            <textarea
                                value={txt}
                                onChange={(ev) => setTxt(ev.target.value)}>

                            </textarea>

                        </div>

                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </div>
            </div>
        </div>
    )
}
