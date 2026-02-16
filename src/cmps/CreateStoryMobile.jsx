import { useState, useRef } from 'react'
import { uploadImgtoCloud } from '../services/upload.service'
import { EmojiTextArea } from '../cmps/EmojiTextArea'
import spinner from '../assets/img/icons/spinner.png'

export function CreateStoryMobile({ onAdd, onClose }) {
    const fileInputRef = useRef(null)
    const [imgUrl, setImgUrl] = useState('')
    const [imgFile, setImgFile] = useState('')
    const [txt, setTxt] = useState('')
    const [next, setNext] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function onSaveStory() {
        try {
            setIsLoading(true)
            const uploadedUrl = await uploadImgtoCloud(imgFile)

            onAdd(txt, uploadedUrl)
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

                <section className={`mobile-create-preview ${next && 'selected-img'}`}>
                    {imgUrl && (
                        <img src={imgUrl} alt="preview" />
                    )}

                </section>

                {next && (
                    <EmojiTextArea txt={txt} setTxt={setTxt} />)}

                {!next &&
                    (
                        <section className="mobile-create-select">
                            <button onClick={handleSelectFile}>
                                {imgUrl ? ('Change picture') : ('Select from device')}
                            </button>
                        </section>
                    )}

                {imgUrl && next && (
                    <section className="mobile-create-caption">

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
