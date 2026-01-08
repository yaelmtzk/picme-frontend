import { UserPreview } from "./UserPreview"

export function UserList({users, onDetails}) {

    return (
        <ul className="users-list">
            {users && users.length > 0 ? (
                users.slice(0, 5).map(user => (
                    <li
                        key={user._id}
                        className="user-preview"
                        onClick={() => { onDetails(user._id, user.username) }}>

                        <UserPreview user={user}/>

                    </li>
                ))
            ) : null}
        </ul>
    )

}
