import { storageService } from '../async-storage.service'
import { gUsers } from './users'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

const users = gUsers

export const userService = {
  login,
  logout,
  signup,
  getUsers,
  getById,
  remove,
  update,
  getLoggedinUser,
  saveLoggedinUser,
  getDefaultFilter
}

async function getUsers(filterBy = {}) {
  let usersToReturn = [...users]

  if (filterBy?.username) {
    usersToReturn = usersToReturn.filter(user =>
      user.username.toLowerCase().includes(filterBy.username.toLowerCase()))
  }
  return usersToReturn
}

function getById(userId) {
  return users.find(user => user._id == userId)
}

function remove(userId) {
  return storageService.remove('user', userId)
}

async function update({ _id, score }) {
  const user = await storageService.get('user', _id)
  user.score = score
  await storageService.put('user', user)

  const loggedinUser = getLoggedinUser()
  if (loggedinUser._id === user._id) saveLoggedinUser(user)

  return user
}

async function login(credentials) {
  const users = await getUsers()
  const user = users.find(user => user.username === credentials.username && user.password === credentials.password)

  if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
  if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  userCred.score = 10000

  const user = await storageService.post('user', userCred)
  return saveLoggedinUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
  user = {
    _id: user._id,
    username: user.username,
    fullname: user.fullname,
    isAdmin: user.isAdmin,
    followers: user.followers,
    following: user.following,
    bio: user.bio,
    highlights: user.highlights,
    imgUrl: user.imgUrl
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))

  return user
}

function getDefaultFilter() {
  return {
    txt: ''
  }
}

// saveLoggedinUser(users[0])