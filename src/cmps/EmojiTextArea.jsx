import EmojiPicker from "emoji-picker-react"
import { getIconImg } from '../services/image.service.js'
import { useRef, useState, useEffect } from "react"


export function EmojiTextArea({ placeholderTxt = '', txt, setTxt }) {
    const [open, setOpen] = useState(false)

    const textareaRef = useRef(null)
    const pickerRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(ev) {
            if (
                open &&
                !pickerRef.current?.contains(ev.target) &&
                !buttonRef.current?.contains(ev.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    function onEmojiClick(emojiData) {
        const textarea = textareaRef.current
        const start = textarea.selectionStart
        const end = textarea.selectionEnd

        const newText =
            txt.slice(0, start) +
            emojiData.emoji +
            txt.slice(end)

        setTxt(newText)
        setOpen(false)

        requestAnimationFrame(() => {
            textarea.focus()
            textarea.selectionStart =
                textarea.selectionEnd =
                start + emojiData.emoji.length;
        })
    }

    return (
        <div
            className="emoji-text-area"
            style={{ position: "relative" }}>
            <img
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                onMouseDown={e => e.preventDefault()}
                title="Emoji"
                src={getIconImg('smiley')} alt="smiley" />

            <textarea
                ref={textareaRef}
                value={txt}
                onChange={e => setTxt(e.target.value)}
                placeholder={placeholderTxt}
            />

            {open && (
                <div className="emoji-wrapper"
                    style={{
                        position: 'absolute',
                        bottom: '50px',
                        left: 0,
                        zIndex: 20,
                        height: '260px',
                        width: '320px',
                        overflow: 'visible',
                    }}

                    ref={pickerRef}
                >
                    <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        categories={[]}
                        searchDisabled={true}
                        previewConfig={{ showPreview: false }}
                        
                    />
                </div>
            )}
        </div>
    )
}

