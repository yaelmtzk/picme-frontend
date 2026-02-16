import { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux'
import { getIconImg } from '../services/image.service.js'
import { uploadImgtoCloud } from '../services/upload.service.js'
import { EmojiTextArea } from "../cmps/EmojiTextArea.jsx"
import { Modal } from "../cmps/Modal.jsx"
import spinner from '../assets/img/icons/spinner.png'
import spinnerChecked from '../assets/img/icons/spinnerchecked.png'

export function CreateStory({ onClose, onAdd }) {
    const fileInputRef = useRef(null)

    const [imgUrl, setImgUrl] = useState('')
    const [imgFile, setImgFile] = useState('')
    const [txt, setTxt] = useState('')
    const [next, setNext] = useState(false)
    const [saved, setSaved] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const loggedinUser = useSelector(state => state.userModule.user)

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => { document.body.style.overflow = "" }
    }, [])

    useEffect(() => {
        function handleEsc(ev) {
            if (ev.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [])

    async function onSaveStory() {
        try {
            setIsLoading(true)
            let imgData = null
            if (imgFile) {
                imgData = await uploadImgtoCloud(imgFile)
            }
            await onAdd(txt, imgData)
            setSaved(true)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
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

    if (saved) {
        return (
            <Modal onClose={onClose} className="create-modal">
                <button className="create-close" onClick={onClose}>✕</button>

                <div className="create-content" onClick={onContentClick}>
                    <div></div>

                    <div className="create-main">

                        <div className="create-content-main">
                            <img className="checkmark" src={spinnerChecked} />
                            <div>Your post has been shared.</div>
                        </div>
                    </div>
                </div>
            </Modal >
        )
    }

    if (isLoading) {
        return (
            <Modal onClose={onClose} className="create-modal">
                <button className="create-close" onClick={onClose}>✕</button>

                <div className="create-content" onClick={onContentClick}>
                    <div></div>

                    <div className="create-main">

                        <div className="create-content-main">
                            <img className="spinner" src={spinner} alt="Loading…" />
                        </div>
                    </div>
                </div>
            </Modal >
        )
    }

    return (
        <Modal onClose={onClose} className="create-modal">
            <button className="create-close" onClick={onClose}>✕</button>

            <div className="create-content" onClick={onContentClick}>

                <div className="create-header">
                    <div>Create new post</div>

                    {imgUrl && next && !isLoading ?
                        (<a onClick={onSaveStory}>Share</a>)
                        :
                        (imgUrl && <div className="create-next"><a onClick={onNextClick}>Next</a></div>)}

                </div>

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
                                <img className="avatar-img small2" src={loggedinUser.imgUrl ? loggedinUser.imgUrl : getIconImg('avatar')} alt="avatar" />
                                <div className="username small">{loggedinUser.username}</div>
                            </div>

                            <EmojiTextArea txt={txt} setTxt={setTxt} />
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
        </Modal>
    )
}
