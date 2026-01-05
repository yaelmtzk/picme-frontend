import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user/user.service.local.js'
import { getIconImg } from '../services/image.service.js'
import { uploadImg } from '../services/upload.service.js'
import { EmojiTextArea } from "../cmps/EmojiTextArea.jsx"
import spinner from '../assets/img/icons/spinner.png'
import spinnerChecked from '../assets/img/icons/spinnerchecked.png'

export function CreateStoryMobile({ onAdd, onClose }) {

    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    const [imgUrl, setImgUrl] = useState('')
    const [imgFile, setImgFile] = useState('')
    const [txt, setTxt] = useState('')
    const [next, setNext] = useState(false)
    const [saved, setSaved] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const user = userService.getLoggedinUser()

    async function onSaveStory() {

        try {
            setIsLoading(true)
            const uploadedUrl = await uploadImg(imgFile)

            onAdd(txt, uploadedUrl)

            // setSaved(true)

        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
            onClose()
        }
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

    if (isLoading) {
        return (
            <div className="mobile-create">
                <main className="mobile-create-body loading">
                    <div>
                        <img className="spinner" src={spinner} alt="Loading" />
                    </div>

                </main>
            </div>
        )
    }

    return (
        <div className="mobile-create">

            {/* TOP BAR */}
            <header className="mobile-create-header">
                <button className="create-close" onClick={onClose}>✕</button>
                <span>New post</span>

                {imgUrl && next && !isLoading ? (
                    <a className="create-share" onClick={onSaveStory}>Share</a>
                ) : (
                    imgUrl && <a className="create-next" onClick={onNextClick}>Next</a>
                )}
            </header>

            <main className={`mobile-create-body ${next && 'selected-img'}`}>

                {/* PREVIEW — always visible */}
                <section className={`mobile-create-preview ${next && 'selected-img'}`}>
                    {imgUrl && (
                        <img src={imgUrl} alt="preview" />
                    )}

                </section>

                {next && (<EmojiTextArea txt={txt} setTxt={setTxt} />)}

                {!next &&
                    (
                        <section className="mobile-create-select">
                            <button onClick={handleSelectFile}>
                                {imgUrl ? ('Change picture') : ('Select from device')}
                            </button>
                        </section>
                    )}

                {/* CAPTION STEP */}
                {imgUrl && next && (
                    <section className="mobile-create-caption">

                        <div className="add-location">
                            <span>Add location</span>
                            <img src={getIconImg("location")} alt="location" />
                        </div>

                    </section>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />

            </main>

        </div>

    )

}
