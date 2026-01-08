import { storageService } from '../async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

const gUsers = [
  {
    _id: 'u03',
    username: 'shira.avt',
    fullname: 'Shira Avital',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766429740/euouexswhoqvv941s7wg.png',
    bio: 'Judaica designer | מאמינה בפרטים הקטנים',
    highlights: [
      { txt: 'My art', coverImg: 'https://res.cloudinary.com/picmeapp/image/upload/v1766872380/ei3wcairo4sfb0zebogo.png' },
      { txt: 'Daily', coverImg: 'https://res.cloudinary.com/picmeapp/image/upload/v1766866901/jox0xmh8lxs3pborluiy.jpg' },
      { txt: 'My book', coverImg: 'https://res.cloudinary.com/picmeapp/image/upload/v1766871007/cniimpq8tfzmzqubl6qw.png' }],
    followers: 1340,
    following: 512
  },
  {
    _id: 'u01',
    username: 'daniel.coh',
    fullname: 'Daniel Cohen',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766429746/mjyyjmgpxfqxvck8f8a5.png',
    bio: 'Product thinker | אוהב סדר ופשטות',
    highlights: [],
    followers: 412,
    following: 380
  },
  {
    _id: 'u02',
    username: 'maya.levine',
    fullname: 'Maya Levine',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766429750/gknhxkwwbyauresaoqsi.png',
    bio: 'Visual storytelling | faith & creativity',
    highlights: [],
    followers: 982,
    following: 640
  },
  {
    _id: 'u04',
    username: 'yaakov.l',
    fullname: 'Yaakov Levy',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766429748/ldycswivsd2oqeziurzu.png',
    bio: 'אבא ל־4 | עובד בעירייה | קפה של בוקר',
    highlights: [],
    followers: 184,
    following: 260
  },
  {
    _id: 'u05',
    username: 'sarit.m',
    fullname: 'Sarit Mizrahi',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766429741/shxx2imxyqtpqfjhzzg2.png',
    bio: 'גננת 🌸 אוהבת ילדים וטיולים',
    highlights: [],
    followers: 402,
    following: 310
  },
  {
    _id: 'u06',
    username: 'danny.nyc',
    fullname: 'Daniel Novak',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766429745/xwc72cn0uywcjk0jsa8p.png',
    bio: 'Between Brooklyn & Jerusalem',
    highlights: [],
    followers: 690,
    following: 512
  },
  {
    _id: 'u07',
    username: 'chani.home',
    fullname: 'Chani Rosen',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766429746/jvt8azbhqejm93lfjeeh.png',
    bio: 'Homemaker | Baking | Shabbat vibes ✨',
    highlights: [],
    followers: 955,
    following: 180
  },
  {
    _id: 'u08',
    username: 'itai.runs',
    fullname: 'Itai Shahar',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766429746/mjyyjmgpxfqxvck8f8a5.png',
    bio: 'רץ חובב | עובד סוציאלי',
    highlights: [],
    followers: 271,
    following: 340
  },
  {
    _id: 'u09',
    username: 'rivky.teacher',
    fullname: 'Rivky Stern',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766429741/shxx2imxyqtpqfjhzzg2.png',
    bio: 'Elementary school teacher 📚',
    highlights: [],
    followers: 612,
    following: 298
  },
  {
    _id: 'u10',
    username: 'matan.k',
    fullname: 'Matan Katz',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766429750/frsth2ewqhtviboi4vrs.png',
    bio: 'סטודנט לכלכלה | מילואים',
    highlights: [],
    followers: 198,
    following: 410
  },
  {
    _id: 'u11',
    username: 'abby.walks',
    fullname: 'Abigail Cohen',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766429744/fgka7suexlyeionarqtf.png',
    bio: 'Long walks, short prayers.',
    highlights: [],
    followers: 823,
    following: 601
  },
  {
    _id: 'u12',
    username: 'shlomi.fix',
    fullname: 'Shlomi Biton',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766882409/eeyhvmmdqpjwrpknnrds.png',
    bio: 'חשמלאי | עובד עם הידיים',
    highlights: [],
    followers: 145,
    following: 220
  },
  {
    _id: 'u13',
    username: 'rachel.life',
    fullname: 'Rachel Bernstein',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766882649/wimnyjt2wntj4nivaxn5.png',
    bio: 'Mom. Wife. Trying my best.',
    highlights: [],
    followers: 1203,
    following: 410
  },
  {
    _id: 'u14',
    username: 'moshe.bus',
    fullname: 'Moshe Koren',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766882844/vthot1li8elvufk3mnfu.png',
    bio: 'נהג אוטובוס 🚍 | מוזיקה ישנה',
    highlights: [],
    followers: 93,
    following: 170
  },
  {
    _id: 'u15',
    username: 'eli.scribe',
    fullname: 'Eli Friedman',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766883167/dpucsdsuhds31cpcmqqy.png',
    bio: 'Sofer Stam | דיו, קלף וסבלנות',
    highlights: [],
    followers: 388,
    following: 120
  },
  {
    _id: 'u16',
    username: 'noa.plants',
    fullname: 'Noa Green',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766884280/e7ssatdngehglcgyf196.png',
    bio: 'Plants, sunlight, quiet faith 🌿',
    highlights: [],
    followers: 734,
    following: 505
  },
  {
    _id: 'u17',
    username: 'yosef.learns',
    fullname: 'Yosef Adler',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766884368/zlp7hrgzhj2rucsg9fau.png',
    bio: 'כולל בבוקר | עבודה בערב',
    highlights: [],
    followers: 260,
    following: 198
  },
  {
    _id: 'u18',
    username: 'leah.write',
    fullname: 'Leah Stein',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766885625/dp1zjop87ebw60fq9f85.png',
    bio: 'Writing small thoughts. Big meaning.',
    highlights: [],
    followers: 1102,
    following: 640
  },
  {
    _id: 'u19',
    username: 'yonatan.sound',
    fullname: 'Yonatan Halevi',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766885945/krw62py9a3efjhuxl7m6.png',
    bio: 'סאונד, תפילה ושקט',
    highlights: [],
    followers: 490,
    following: 355
  },
  {
    _id: 'u20',
    username: 'tamar.moves',
    fullname: 'Tamar Ben-David',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766886222/zyaqvrg2js7kpnwhrjxc.png',
    bio: 'Movement therapist | gentle strength',
    highlights: [],
    followers: 615,
    following: 502
  },
  {
    _id: 'u21',
    username: 'ari.cooks',
    fullname: 'Ari Feldman',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766886369/ojwvx1anex6m0tvcdq5m.png',
    bio: 'Kosher cooking | slow food',
    highlights: [],
    followers: 880,
    following: 410
  },
  {
    _id: 'u22',
    username: 'hadas.reads',
    fullname: 'Hadas Peleg',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766886876/blyvdimgfgbqoqfvsw2p.png',
    bio: 'ספרים ',
    highlights: [],
    followers: 301,
    following: 287
  },
  {
    _id: 'u23',
    username: 'sam.walker',
    fullname: 'Samuel Weiss',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766887551/gkno83ruvtmvni0l63vl.png',
    bio: 'Walking cities. Thinking slowly.',
    highlights: [],
    followers: 540,
    following: 490
  },
  {
    _id: 'u24',
    username: 'nitzan.daily',
    fullname: 'Nitzan Mor',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766887911/fdgdotgbtoty5nptxco9.png',
    bio: 'חיים פשוטים, יום יום',
    highlights: [],
    followers: 210,
    following: 265
  },
  {
    _id: 'u25',
    username: 'rebekah.light',
    fullname: 'Rebekah Gold',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766888426/wowrcx82qoamq0cw1sbe.png',
    bio: 'Faith and daily life ✨',
    highlights: [],
    followers: 1345,
    following: 720
  },
  {
    _id: 'u26',
    username: 'ofir.builds',
    fullname: 'Ofir Malka',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766888720/f0cseillpksgktrzzpaf.png',
    bio: 'נגר | עץ ואמת',
    highlights: [],
    followers: 189,
    following: 143
  },
  {
    _id: 'u28',
    username: 'rav.eitan',
    fullname: 'Rabbi Eitan Weiss',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766429748/ldycswivsd2oqeziurzu.png',
    bio: 'רב קהילה ואיש הלכה. עוסק בשאלות של הלכה בחיי היום־יום, חיבור בין מסורת למציאות משתנה, ופסיקה מתוך הקשבה, אחריות ויראת שמיים.',
    highlights: [],
    followers: 18450,
    following: 210
  },
  {
    _id: 'u29',
    username: 'rav.binyamin',
    fullname: 'Rabbi Binyamin Adler',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766918756/vgggmwk5rxzr5lgrpza5.png',
    bio: 'Halachic educator and community rabbi. Writing and teaching contemporary Halachah with a focus on ethics, technology, and the responsibility of psak in a complex world.',
    highlights: [],
    followers: 23120,
    following: 340
  },
  {
    _id: 'u30',
    username: 'rabbanit.noa',
    fullname: 'Rabbanit Noa Feldman',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766918911/dplsuv5sydvmlbpvpudp.png',
    bio: 'רבנית ופוסקת הלכה. עוסקת בלימוד הלכה לנשים, שאלות משפחה וטהרה, ומתוך אמונה עמוקה שההלכה היא שפה חיה של קשר, משמעות וצמיחה.',
    highlights: [],
    followers: 19680,
    following: 415
  },
  {
    _id: 'u31',
    username: 'rabbanit.ruth',
    fullname: 'Rabbanit Ruth Kaplan',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766920714/n1g7atjrsvziopldh2jn.png',
    bio: 'Teaching Halachah as lived wisdom. My work focuses on women’s learning, pastoral Halachah, and creating spaces where questions are welcomed and tradition is honored.',
    highlights: [],
    followers: 21890,
    following: 502
  },
  {
    _id: 'u32',
    username: 'avital.judaica',
    fullname: 'אביטל יהודייקה',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1767020987/frmiziaylddsr5g8ek0p.png',
    bio: 'הידור מצוות עם מותגים אלגנטיים',
    highlights: [
      { txt: 'קולקציה לפסח', coverImg: 'https://res.cloudinary.com/picmeapp/image/upload/v1767020137/hpm7n0v4kjvyb5f22ske.png' }
    ],
    followers: 30623,
    following: 192
  }
]

saveLoggedinUser(gUsers[0])

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
  let usersToReturn = [...gUsers]

  if (filterBy?.username) {
    usersToReturn = usersToReturn.filter(user =>
      user.username.toLowerCase().includes(filterBy.username.toLowerCase()))
  }
  return usersToReturn
}

function getById(userId) {
  return gUsers.find(user => user._id == userId)
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

async function login(id) {
  const users = await getUsers()
  const user = users.find(user => user._id === id)

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
    username: ''
  }
}