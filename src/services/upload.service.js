
    export async function uploadImg(file) {
		const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
		const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', UPLOAD_PRESET)

        try {
            const res = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: formData
            })
            const data = await res.json()

            return data.secure_url

        } catch (err) {
            console.log(err)
        }
    }