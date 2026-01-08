import {getIconImg} from "../services/image.service.js"

export function UserPreview({user}) {

    return (
        <>
            <section className="avatar">
                <img
                    className="avatar-img big pointer"
                    src={user.imgUrl || getIconImg("avatar")}
                    alt="avatar"
                />
            </section>
            <section className='username-preview'>
                <div>{user.username}</div>
                <span>{user.fullname}</span>
            </section>
        </>


    )
}