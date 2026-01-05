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

            <svg
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                onMouseDown={e => e.preventDefault()}
                fill="#CCD0D5"
                height="24" role="img"
                viewBox="0 0 24 24"
                width="24">
                <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z" />
            </svg>

            <textarea
                ref={textareaRef}
                value={txt}
                onChange={e => setTxt(e.target.value)}
                placeholder={placeholderTxt}
            />

            {open && (
                <div className="emoji-wrapper"
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

