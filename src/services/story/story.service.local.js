
import { storageService } from '../async-storage.service'
import { makeId, loadFromStorage, saveToStorage } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    addStoryComment
}
window.cs = storyService

const gStories =[
    
    {
        "_id": "s301",
        "txt": "New ceramic mezuzah prototype. Hand-glazed, inspired by old Jerusalem tiles.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766866659/mwvsdd1luehnp8qmcux8.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1751472105735,
        "loc": {
            "city": "Jerusalem"
        },
        "comments": [
            {
                "_id": "c301",
                "byId": "u02",
                "username": "maya.levine",
                "txt": "This feels so timeless.",
                "createdAt": 1751473005735
            },
            {
                "_id": "c302",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "That was exactly the intention 🤍",
                "createdAt": 1751473905735
            },
            {
                "_id": "c303",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "הידור מצווה בצורה עדינה ועמוקה.",
                "createdAt": 1751474805735
            },
            {
                "_id": "c304",
                "byId": "u13",
                "username": "chaya.design",
                "txt": "The glaze texture is beautiful.",
                "createdAt": 1751475705735
            },
            {
                "_id": "c305",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "Thank you! Took a few failed attempts to get it right.",
                "createdAt": 1751476605735
            },
            {
                "_id": "c306",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "יש כאן חיבור עמוק לבית יהודי.",
                "createdAt": 1751477505735
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u04",
                "username": "noam.harel"
            },
            {
                "byId": "u05",
                "username": "sara.gold"
            },
            {
                "byId": "u06",
                "username": "eli.shapira"
            },
            {
                "byId": "u07",
                "username": "rachel.katz"
            },
            {
                "byId": "u08",
                "username": "avi.roth"
            },
            {
                "byId": "u09",
                "username": "tamar.weiss"
            },
            {
                "byId": "u10",
                "username": "levi.benari"
            },
            {
                "byId": "u11",
                "username": "michelle.j"
            },
            {
                "byId": "u12",
                "username": "yonatan.m"
            },
            {
                "byId": "u13",
                "username": "chaya.design"
            },
            {
                "byId": "u14",
                "username": "adam.fried"
            },
            {
                "byId": "u15",
                "username": "esther.k"
            },
            {
                "byId": "u16",
                "username": "moshe.r"
            },
            {
                "byId": "u17",
                "username": "yosef.learns"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u19",
                "username": "hadas.oz"
            },
            {
                "byId": "u20",
                "username": "danielle.a"
            },
            {
                "byId": "u21",
                "username": "yossi.n"
            },
            {
                "byId": "u22",
                "username": "leah.s"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            }
        ],
        "tags": [
            "judaica",
            "mezuzah",
            "design"
        ]
    },
    {
        "_id": "s302",
        "txt": "Friday cooking. American recipes slowly learning to speak Hebrew.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766866901/jox0xmh8lxs3pborluiy.jpg",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1751477064918,
        "loc": {
            "city": "Jerusalem"
        },
        "comments": [
            {
                "_id": "c311",
                "byId": "u01",
                "username": "daniel.coh",
                "txt": "Looks dangerously good.",
                "createdAt": 1751477964918
            },
            {
                "_id": "c312",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "It didn’t survive Shabbat 😅",
                "createdAt": 1751478864918
            },
            {
                "_id": "c313",
                "byId": "u24",
                "username": "miriam.k",
                "txt": "מתכון?",
                "createdAt": 1751479764918
            },
            {
                "_id": "c314",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "אעלה בסטורי השבוע 🙌",
                "createdAt": 1751480664918
            },
            {
                "_id": "c315",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "אוכל שמחבר בין עולמות.",
                "createdAt": 1751481564918
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u07",
                "username": "rachel.katz"
            },
            {
                "byId": "u09",
                "username": "tamar.weiss"
            },
            {
                "byId": "u11",
                "username": "michelle.j"
            },
            {
                "byId": "u12",
                "username": "yonatan.m"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u20",
                "username": "danielle.a"
            },
            {
                "byId": "u24",
                "username": "miriam.k"
            },
            {
                "byId": "u25",
                "username": "itay.p"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            }
        ],
        "tags": [
            "food",
            "shabbat",
            "life"
        ]
    },
    {
        "_id": "s306",
        "txt": "A quiet walk through Rehavia before sunset. Jerusalem slows you down in the best way.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766867189/r2zmomjmptvvnhv0zej0.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1751491942469,
        "loc": {
            "city": "Jerusalem"
        },
        "comments": [
            {
                "_id": "c361",
                "byId": "u17",
                "username": "yosef.learns",
                "txt": "I miss these streets so much.",
                "createdAt": 1751492842469
            },
            {
                "_id": "c362",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "They have a way of holding you.",
                "createdAt": 1751493742469
            },
            {
                "_id": "c363",
                "byId": "u09",
                "username": "tamar.weiss",
                "txt": "איזו שלווה בתמונה.",
                "createdAt": 1751494642469
            },
            {
                "_id": "c364",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "הליכה היא לפעמים תפילה.",
                "createdAt": 1751495542469
            },
            {
                "_id": "c365",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "כן. ממש ככה.",
                "createdAt": 1751496442469
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u05",
                "username": "sara.gold"
            },
            {
                "byId": "u07",
                "username": "rachel.katz"
            },
            {
                "byId": "u09",
                "username": "tamar.weiss"
            },
            {
                "byId": "u11",
                "username": "michelle.j"
            },
            {
                "byId": "u12",
                "username": "yonatan.m"
            },
            {
                "byId": "u15",
                "username": "esther.k"
            },
            {
                "byId": "u17",
                "username": "yosef.learns"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u20",
                "username": "danielle.a"
            },
            {
                "byId": "u22",
                "username": "leah.s"
            },
            {
                "byId": "u24",
                "username": "miriam.k"
            },
            {
                "byId": "u27",
                "username": "aaron.c"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            }
        ],
        "tags": [
            "jerusalem",
            "life",
            "photography"
        ]
    },
    {
        "_id": "s307",
        "txt": "Learning Rav Kook tonight. So much compassion woven into his halachic thought.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766867635/jfqwlurzw0asn9rcujgl.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1751516738388,
        "loc": {},
        "comments": [
            {
                "_id": "c371",
                "byId": "u29",
                "username": "rav.binyamin",
                "txt": "רב קוק ראה את האור גם במקומות הסדוקים.",
                "createdAt": 1751517638388
            },
            {
                "_id": "c372",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "That’s exactly what I feel reading him.",
                "createdAt": 1751518538388
            },
            {
                "_id": "c373",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "His Torah makes space for the soul.",
                "createdAt": 1751519438388
            },
            {
                "_id": "c374",
                "byId": "u12",
                "username": "yonatan.m",
                "txt": "Any specific sefer you recommend?",
                "createdAt": 1751520338388
            },
            {
                "_id": "c375",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "Orot HaTeshuvah has been transformative for me.",
                "createdAt": 1751521238388
            }
        ],
        "likedBy": [
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u04",
                "username": "noam.harel"
            },
            {
                "byId": "u08",
                "username": "avi.roth"
            },
            {
                "byId": "u10",
                "username": "levi.benari"
            },
            {
                "byId": "u12",
                "username": "yonatan.m"
            },
            {
                "byId": "u16",
                "username": "moshe.r"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u21",
                "username": "yossi.n"
            },
            {
                "byId": "u23",
                "username": "ben.z"
            },
            {
                "byId": "u26",
                "username": "shlomit.v"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u29",
                "username": "rav.binyamin"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            }
        ],
        "tags": [
            "halachah",
            "rav-kook",
            "learning"
        ]
    },
    {
        "_id": "s308",
        "txt": "Testing pigments for a new Havdalah set. Color matters more than I ever realized.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766867623/o7jzlnrpxjizt1kiajcd.jpg",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1751551452673,
        "loc": {},
        "comments": [
            {
                "_id": "c381",
                "byId": "u13",
                "username": "chaya.design",
                "txt": "These tones feel very grounded.",
                "createdAt": 1751552352673
            },
            {
                "_id": "c382",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "I wanted something calm, not dramatic.",
                "createdAt": 1751553252673
            },
            {
                "_id": "c383",
                "byId": "u05",
                "username": "sara.gold",
                "txt": "Would totally use this every week.",
                "createdAt": 1751554152673
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u03",
                "username": "shira.avt"
            },
            {
                "byId": "u06",
                "username": "eli.shapira"
            },
            {
                "byId": "u08",
                "username": "avi.roth"
            },
            {
                "byId": "u11",
                "username": "michelle.j"
            },
            {
                "byId": "u13",
                "username": "chaya.design"
            },
            {
                "byId": "u15",
                "username": "esther.k"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u20",
                "username": "danielle.a"
            },
            {
                "byId": "u25",
                "username": "itay.p"
            }
        ],
        "tags": [
            "design",
            "judaica",
            "havdalah"
        ]
    },
    {
        "_id": "s309",
        "txt": "Some days aliyah feels heroic. Other days it’s just bureaucracy and missing family.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766868181/gox6e4qcnrp0d5gl3ntp.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1751596085326,
        "loc": {
            "city": "Jerusalem"
        },
        "comments": [
            {
                "_id": "c391",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "This is so honest.",
                "createdAt": 1751596985326
            },
            {
                "_id": "c392",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "Trying to keep it real.",
                "createdAt": 1751597885326
            },
            {
                "_id": "c393",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "געגוע הוא גם חלק מהבניין.",
                "createdAt": 1751598785326
            },
            {
                "_id": "c394",
                "byId": "u02",
                "username": "maya.levine",
                "txt": "We’re always here for you.",
                "createdAt": 1751599685326
            }
        ],
        "likedBy": [
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u07",
                "username": "rachel.katz"
            },
            {
                "byId": "u09",
                "username": "tamar.weiss"
            },
            {
                "byId": "u12",
                "username": "yonatan.m"
            },
            {
                "byId": "u17",
                "username": "yosef.learns"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u22",
                "username": "leah.s"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            }
        ],
        "tags": [
            "aliyah",
            "life",
            "honesty"
        ]
    },
    {
        "_id": "s310",
        "txt": "Prepping the house for Tishrei 🍯 Every detail feels like a prayer.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766868816/fghyxpmzbrrclil99epw.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1751650636347,
        "loc": {},
        "comments": [
            {
                "_id": "c401",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "הכנה היא כבר עבודת הלב.",
                "createdAt": 1751651536347
            },
            {
                "_id": "c402",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "Preparing helps me slow down.",
                "createdAt": 1751652436347
            },
            {
                "_id": "c403",
                "byId": "u20",
                "username": "danielle.a",
                "txt": "Your home always feels warm.",
                "createdAt": 1751653336347
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u06",
                "username": "eli.shapira"
            },
            {
                "byId": "u10",
                "username": "levi.benari"
            },
            {
                "byId": "u15",
                "username": "esther.k"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u20",
                "username": "danielle.a"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            }
        ],
        "tags": [
            "holidays",
            "tishrei",
            "home"
        ]
    },
    {
        "_id": "s311",
        "txt": "Tonight’s writing was about marriage — not the fairytale, but the daily choosing each other.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766869257/kuuyj5nahaqicnk1c63j.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1751715105735,
        "loc": {},
        "comments": [
            {
                "_id": "c411",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "שלום בית נבנה בפרטים הקטנים.",
                "createdAt": 1751716005735
            },
            {
                "_id": "c412",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "That’s exactly what I’m trying to capture.",
                "createdAt": 1751716905735
            },
            {
                "_id": "c413",
                "byId": "u12",
                "username": "yonatan.m",
                "txt": "Looking forward to reading this.",
                "createdAt": 1751717805735
            },
            {
                "_id": "c414",
                "byId": "u02",
                "username": "maya.levine",
                "txt": "Your honesty is powerful.",
                "createdAt": 1751718705735
            },
            {
                "_id": "c415",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "Means a lot 🤍",
                "createdAt": 1751719605735
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u07",
                "username": "rachel.katz"
            },
            {
                "byId": "u09",
                "username": "tamar.weiss"
            },
            {
                "byId": "u12",
                "username": "yonatan.m"
            },
            {
                "byId": "u15",
                "username": "esther.k"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u22",
                "username": "leah.s"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            }
        ],
        "tags": [
            "writing",
            "marriage",
            "shalom-bayit"
        ]
    },
    {
        "_id": "s312",
        "txt": "A small watercolor study between client projects. Sometimes the hands need freedom.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766868515/e5ngximexn5edmcyqbti.jpg",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1751789493490,
        "loc": {},
        "comments": [
            {
                "_id": "c421",
                "byId": "u13",
                "username": "chaya.design",
                "txt": "This feels very you.",
                "createdAt": 1751790393490
            },
            {
                "_id": "c422",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "It felt grounding to paint.",
                "createdAt": 1751791293490
            },
            {
                "_id": "c423",
                "byId": "u05",
                "username": "sara.gold",
                "txt": "Love the softness.",
                "createdAt": 1751792193490
            }
        ],
        "likedBy": [
            {
                "byId": "u05",
                "username": "sara.gold"
            },
            {
                "byId": "u08",
                "username": "avi.roth"
            },
            {
                "byId": "u11",
                "username": "michelle.j"
            },
            {
                "byId": "u13",
                "username": "chaya.design"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u20",
                "username": "danielle.a"
            },
            {
                "byId": "u24",
                "username": "miriam.k"
            }
        ],
        "tags": [
            "art",
            "painting",
            "process"
        ]
    },
    {
        "_id": "s313",
        "txt": "Learning about chinuch tonight. Children don’t need perfection — they need presence.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766869639/idtysxjwkezkavyowmux.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1751873799612,
        "loc": {},
        "comments": [
            {
                "_id": "c431",
                "byId": "u29",
                "username": "rav.binyamin",
                "txt": "חינוך מתחיל בדוגמה אישית.",
                "createdAt": 1751874699612
            },
            {
                "_id": "c432",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "That’s been my biggest takeaway.",
                "createdAt": 1751875599612
            },
            {
                "_id": "c433",
                "byId": "u17",
                "username": "yosef.learns",
                "txt": "Such an important reminder.",
                "createdAt": 1751876499612
            },
            {
                "_id": "c434",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "נוכחות יוצרת ביטחון.",
                "createdAt": 1751877399612
            }
        ],
        "likedBy": [
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u06",
                "username": "eli.shapira"
            },
            {
                "byId": "u09",
                "username": "tamar.weiss"
            },
            {
                "byId": "u12",
                "username": "yonatan.m"
            },
            {
                "byId": "u17",
                "username": "yosef.learns"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u29",
                "username": "rav.binyamin"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            }
        ],
        "tags": [
            "education",
            "chinuch",
            "learning"
        ]
    },
    {
        "_id": "s314",
        "txt": "Sketching a new spice box for Havdalah. Form follows ritual.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766869152/i2fgqnvul7gymudov0p6.jpg",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1751968024102,
        "loc": {},
        "comments": [
            {
                "_id": "c441",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "הריח מחבר בין גוף לנשמה.",
                "createdAt": 1751968924102
            },
            {
                "_id": "c442",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "That’s the idea behind the shape.",
                "createdAt": 1751969824102
            },
            {
                "_id": "c443",
                "byId": "u13",
                "username": "chaya.design",
                "txt": "Can’t wait to see the final version.",
                "createdAt": 1751970724102
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u06",
                "username": "eli.shapira"
            },
            {
                "byId": "u10",
                "username": "levi.benari"
            },
            {
                "byId": "u13",
                "username": "chaya.design"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            }
        ],
        "tags": [
            "judaica",
            "design",
            "havdalah"
        ]
    },
    {
        "_id": "s315",
        "txt": "A simple dinner, a full table, quiet gratitude.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766869562/xws1ajte7uvmmjcyqtwq.jpg",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1752072166959,
        "loc": {
            "city": "Jerusalem"
        },
        "comments": [
            {
                "_id": "c451",
                "byId": "u20",
                "username": "danielle.a",
                "txt": "This feels so warm.",
                "createdAt": 1752073066959
            },
            {
                "_id": "c452",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "Some nights are just about being together.",
                "createdAt": 1752073966959
            },
            {
                "_id": "c453",
                "byId": "u02",
                "username": "maya.levine",
                "txt": "Miss these dinners.",
                "createdAt": 1752074866959
            }
        ],
        "likedBy": [
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u07",
                "username": "rachel.katz"
            },
            {
                "byId": "u11",
                "username": "michelle.j"
            },
            {
                "byId": "u15",
                "username": "esther.k"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u20",
                "username": "danielle.a"
            }
        ],
        "tags": [
            "life",
            "home",
            "gratitude"
        ]
    },
    {
        "_id": "s316",
        "txt": "Learning a little Kabbalah tonight. Not to understand everything — just to soften the heart.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766876231/hbijhvmhp85ogqnqmynl.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1752186228183,
        "loc": {},
        "comments": [
            {
                "_id": "c461",
                "byId": "u29",
                "username": "rav.binyamin",
                "txt": "הלימוד פועל גם כשהשכל עוד לא תופס.",
                "createdAt": 1752187128183
            },
            {
                "_id": "c462",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "That’s comforting to hear.",
                "createdAt": 1752188028183
            },
            {
                "_id": "c463",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "פתיחת הלב היא כבר התחלה.",
                "createdAt": 1752188928183
            },
            {
                "_id": "c464",
                "byId": "u12",
                "username": "yonatan.m",
                "txt": "Any recommendations for beginners?",
                "createdAt": 1752189828183
            },
            {
                "_id": "c465",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "Slow learning, good teacher, lots of patience.",
                "createdAt": 1752190728183
            }
        ],
        "likedBy": [
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u06",
                "username": "eli.shapira"
            },
            {
                "byId": "u09",
                "username": "tamar.weiss"
            },
            {
                "byId": "u12",
                "username": "yonatan.m"
            },
            {
                "byId": "u17",
                "username": "yosef.learns"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u29",
                "username": "rav.binyamin"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            }
        ],
        "tags": [
            "kabbalah",
            "learning",
            "inner-work"
        ]
    },
    {
        "_id": "s317",
        "txt": "Preparing for Shavuot 🌾 Cleaning the studio, clearing the mind.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766876971/d9s9x09uyjjvoz7uooy5.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1752310207775,
        "loc": {
            "city": "Jerusalem"
        },
        "comments": [
            {
                "_id": "c471",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "הכנה היא חלק מהקבלה.",
                "createdAt": 1752311107775
            },
            {
                "_id": "c472",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "Exactly how it feels.",
                "createdAt": 1752312007775
            },
            {
                "_id": "c473",
                "byId": "u20",
                "username": "danielle.a",
                "txt": "Your studio always looks peaceful.",
                "createdAt": 1752312907775
            },
            {
                "_id": "c474",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "קבלת התורה מתחילה בניקוי הלב.",
                "createdAt": 1752313807775
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u06",
                "username": "eli.shapira"
            },
            {
                "byId": "u10",
                "username": "levi.benari"
            },
            {
                "byId": "u15",
                "username": "esther.k"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u20",
                "username": "danielle.a"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            }
        ],
        "tags": [
            "shavuot",
            "holidays",
            "preparation"
        ]
    },
    {
        "_id": "s318",
        "txt": "An early chapter from the book — about leaving New York, and realizing comfort isn’t the same as belonging.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766871007/cniimpq8tfzmzqubl6qw.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1752444105735,
        "loc": {},
        "comments": [
            {
                "_id": "c481",
                "byId": "u02",
                "username": "maya.levine",
                "txt": "This is so brave to share.",
                "createdAt": 1752445005735
            },
            {
                "_id": "c482",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "It feels vulnerable, but necessary.",
                "createdAt": 1752445905735
            },
            {
                "_id": "c483",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "I recognize myself in this.",
                "createdAt": 1752446805735
            },
            {
                "_id": "c484",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "סיפור אישי שמאיר דרך לרבים.",
                "createdAt": 1752447705735
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u07",
                "username": "rachel.katz"
            },
            {
                "byId": "u09",
                "username": "tamar.weiss"
            },
            {
                "byId": "u12",
                "username": "yonatan.m"
            },
            {
                "byId": "u17",
                "username": "yosef.learns"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u22",
                "username": "leah.s"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            }
        ],
        "tags": [
            "writing",
            "aliyah",
            "teshuvah"
        ]
    },
    {
        "_id": "s319",
        "txt": "Hands covered in clay, mind completely quiet. Craft is a form of prayer for me.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766870898/iiakqjk42y5dhirjvgsf.jpg",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1752587922061,
        "loc": {},
        "comments": [
            {
                "_id": "c491",
                "byId": "u13",
                "username": "chaya.design",
                "txt": "I feel this so much.",
                "createdAt": 1752588822061
            },
            {
                "_id": "c492",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "It’s where everything slows down.",
                "createdAt": 1752589722061
            },
            {
                "_id": "c493",
                "byId": "u05",
                "username": "sara.gold",
                "txt": "Your work always feels intentional.",
                "createdAt": 1752590622061
            }
        ],
        "likedBy": [
            {
                "byId": "u05",
                "username": "sara.gold"
            },
            {
                "byId": "u08",
                "username": "avi.roth"
            },
            {
                "byId": "u11",
                "username": "michelle.j"
            },
            {
                "byId": "u13",
                "username": "chaya.design"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            }
        ],
        "tags": [
            "craft",
            "ceramics",
            "process"
        ]
    },
    {
        "_id": "s320",
        "txt": "A short teaching I keep returning to: holiness lives in consistency, not intensity.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766875073/orci5kdxcr2aomukm5pr.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1752741656755,
        "loc": {},
        "comments": [
            {
                "_id": "c501",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "עבודה יומיומית היא יסוד הקדושה.",
                "createdAt": 1752742556755
            },
            {
                "_id": "c502",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "This reframed so much for me.",
                "createdAt": 1752743456755
            },
            {
                "_id": "c503",
                "byId": "u12",
                "username": "yonatan.m",
                "txt": "Needed this reminder today.",
                "createdAt": 1752744356755
            }
        ],
        "likedBy": [
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u06",
                "username": "eli.shapira"
            },
            {
                "byId": "u10",
                "username": "levi.benari"
            },
            {
                "byId": "u12",
                "username": "yonatan.m"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            }
        ],
        "tags": [
            "halachah",
            "growth",
            "daily-life"
        ]
    },
    {
        "_id": "s321",
        "txt": "Jerusalem mornings hit differently. The light, the quiet, the feeling that the day is already holding you.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766871099/ldy3nxursn4w6xnt5r96.jpg",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1752905309816,
        "loc": {
            "city": "Jerusalem"
        },
        "comments": [
            {
                "_id": "c511",
                "byId": "u06",
                "username": "eli.shapira",
                "txt": "אין כמו אור ירושלמי.",
                "createdAt": 1752906209816
            },
            {
                "_id": "c512",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "Every morning feels like a gift.",
                "createdAt": 1752907109816
            },
            {
                "_id": "c513",
                "byId": "u22",
                "username": "leah.s",
                "txt": "Miss this city so much.",
                "createdAt": 1752908009816
            },
            {
                "_id": "c514",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "העיר שמחנכת את הנשמה.",
                "createdAt": 1752908909816
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u06",
                "username": "eli.shapira"
            },
            {
                "byId": "u09",
                "username": "tamar.weiss"
            },
            {
                "byId": "u15",
                "username": "esther.k"
            },
            {
                "byId": "u22",
                "username": "leah.s"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            }
        ],
        "tags": [
            "jerusalem",
            "daily-life",
            "israel"
        ]
    },
    {
        "_id": "s322",
        "txt": "Working on a new siddur case inspired by ירושלים של מעלה ושל מטה.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766872124/jsg19ktzmyk9uackxhbj.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1753078881245,
        "loc": {},
        "comments": [
            {
                "_id": "c521",
                "byId": "u13",
                "username": "chaya.design",
                "txt": "The concept sounds beautiful already.",
                "createdAt": 1753079781245
            },
            {
                "_id": "c522",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "Trying to translate holiness into form.",
                "createdAt": 1753080681245
            },
            {
                "_id": "c523",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "אשריך שאת מחברת הלכה ואמנות.",
                "createdAt": 1753081581245
            }
        ],
        "likedBy": [
            {
                "byId": "u05",
                "username": "sara.gold"
            },
            {
                "byId": "u08",
                "username": "avi.roth"
            },
            {
                "byId": "u11",
                "username": "michelle.j"
            },
            {
                "byId": "u13",
                "username": "chaya.design"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            }
        ],
        "tags": [
            "judaica",
            "mezuzah",
            "design"
        ]
    },
    {
        "_id": "s323",
        "txt": "Tonight’s learning was about shalom bayit — not as perfection, but as commitment.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766874741/n821zr9brr2jfiqawij4.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1753262371041,
        "loc": {},
        "comments": [
            {
                "_id": "c531",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "שלום בית נבנה מבחירות קטנות יומיומיות.",
                "createdAt": 1753263271041
            },
            {
                "_id": "c532",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "That perspective changed everything for me.",
                "createdAt": 1753264171041
            },
            {
                "_id": "c533",
                "byId": "u20",
                "username": "danielle.a",
                "txt": "So important, thank you for sharing.",
                "createdAt": 1753265071041
            }
        ],
        "likedBy": [
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u06",
                "username": "eli.shapira"
            },
            {
                "byId": "u15",
                "username": "esther.k"
            },
            {
                "byId": "u20",
                "username": "danielle.a"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            }
        ],
        "tags": [
            "shalom-bayit",
            "learning",
            "marriage"
        ]
    },
    {
        "_id": "s324",
        "txt": "Recipe from my kitchen tonight — simple lentil soup, Jerusalem winter style 🥣",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766866070/hd1ophielc9outtz294r.jpg",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1753455779204,
        "loc": {},
        "comments": [
            {
                "_id": "c541",
                "byId": "u05",
                "username": "sara.gold",
                "txt": "Looks comforting!",
                "createdAt": 1753456679204
            },
            {
                "_id": "c542",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "Perfect for cold evenings.",
                "createdAt": 1753457579204
            },
            {
                "_id": "c543",
                "byId": "u09",
                "username": "tamar.weiss",
                "txt": "Can you share the spices?",
                "createdAt": 1753458479204
            },
            {
                "_id": "c544",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "Cumin, turmeric, garlic, and lots of patience 🙂",
                "createdAt": 1753459379204
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u05",
                "username": "sara.gold"
            },
            {
                "byId": "u09",
                "username": "tamar.weiss"
            },
            {
                "byId": "u12",
                "username": "yonatan.m"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            }
        ],
        "tags": [
            "food",
            "recipe",
            "home"
        ]
    },
    {
        "_id": "s325",
        "txt": "Another page written tonight. Writing about teshuvah feels like walking barefoot — honest, sometimes uncomfortable, always real.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766874435/vsc4j7qjcgeqqfe01huo.jpg",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1753659105735,
        "loc": {},
        "comments": [
            {
                "_id": "c551",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "Your words give courage.",
                "createdAt": 1753660005735
            },
            {
                "_id": "c552",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "That means more than you know.",
                "createdAt": 1753660905735
            },
            {
                "_id": "c553",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "הכנות כזו פותחת לבבות.",
                "createdAt": 1753661805735
            }
        ],
        "likedBy": [
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u07",
                "username": "rachel.katz"
            },
            {
                "byId": "u12",
                "username": "yonatan.m"
            },
            {
                "byId": "u17",
                "username": "yosef.learns"
            },
            {
                "byId": "u22",
                "username": "leah.s"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            }
        ],
        "tags": [
            "writing",
            "teshuvah",
            "personal"
        ]
    },
    {
        "_id": "s326",
        "txt": "Preparing for Sukkot always reminds me how temporary everything really is — and how much joy can live inside simplicity.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766872116/hk44n47jeezpol6wacb3.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1753872350632,
        "loc": {
            "city": "Jerusalem"
        },
        "comments": [
            {
                "_id": "c561",
                "byId": "u14",
                "username": "moshe.b",
                "txt": "סוכה מחזקת אמונה.",
                "createdAt": 1753873250632
            },
            {
                "_id": "c562",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "Every year I feel it deeper.",
                "createdAt": 1753874150632
            },
            {
                "_id": "c563",
                "byId": "u26",
                "username": "yael.h",
                "txt": "Love how you put this into words.",
                "createdAt": 1753875050632
            }
        ],
        "likedBy": [
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u06",
                "username": "eli.shapira"
            },
            {
                "byId": "u14",
                "username": "moshe.b"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            },
            {
                "byId": "u26",
                "username": "yael.h"
            }
        ],
        "tags": [
            "sukkot",
            "emunah",
            "holidays"
        ]
    },
    {
        "_id": "s327",
        "txt": "A quiet walk through Nachlaot today. Sometimes photography is just listening with your eyes.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766872893/yfetqt2o9f0plrzjedxm.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1754095513898,
        "loc": {
            "city": "Jerusalem"
        },
        "comments": [
            {
                "_id": "c571",
                "byId": "u09",
                "username": "tamar.weiss",
                "txt": "The colors feel alive.",
                "createdAt": 1754096413898
            },
            {
                "_id": "c572",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "Jerusalem speaks softly if you slow down.",
                "createdAt": 1754097313898
            },
            {
                "_id": "c573",
                "byId": "u21",
                "username": "noam.r",
                "txt": "You captured the soul of the alley.",
                "createdAt": 1754098213898
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u09",
                "username": "tamar.weiss"
            },
            {
                "byId": "u11",
                "username": "michelle.j"
            },
            {
                "byId": "u21",
                "username": "noam.r"
            },
            {
                "byId": "u24",
                "username": "david.ya"
            }
        ],
        "tags": [
            "photography",
            "jerusalem",
            "street"
        ]
    },
    {
        "_id": "s328",
        "txt": "Learning Tanya this week — the idea that the struggle itself is precious is something I wish I knew years ago.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766873234/kjrmenutvinx6mnwk61b.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1754328595530,
        "loc": {},
        "comments": [
            {
                "_id": "c581",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "זו יסוד גדול בעבודת ה׳.",
                "createdAt": 1754329495530
            },
            {
                "_id": "c582",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "It reframes everything.",
                "createdAt": 1754330395530
            },
            {
                "_id": "c583",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "So empowering, especially for baalei teshuvah.",
                "createdAt": 1754331295530
            }
        ],
        "likedBy": [
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u06",
                "username": "eli.shapira"
            },
            {
                "byId": "u15",
                "username": "esther.k"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            }
        ],
        "tags": [
            "tanya",
            "chasidut",
            "learning"
        ]
    },
    {
        "_id": "s329",
        "txt": "Design sketch for a challah board inspired by the concept of kavod Shabbat.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766872380/ei3wcairo4sfb0zebogo.png",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1754571595530,
        "loc": {},
        "comments": [
            {
                "_id": "c591",
                "byId": "u13",
                "username": "chaya.design",
                "txt": "This feels both modern and timeless.",
                "createdAt": 1754572495530
            },
            {
                "_id": "c592",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "That balance is always the goal.",
                "createdAt": 1754573395530
            },
            {
                "_id": "c593",
                "byId": "u08",
                "username": "avi.roth",
                "txt": "Would love to see this in wood.",
                "createdAt": 1754574295530
            }
        ],
        "likedBy": [
            {
                "byId": "u05",
                "username": "sara.gold"
            },
            {
                "byId": "u08",
                "username": "avi.roth"
            },
            {
                "byId": "u13",
                "username": "chaya.design"
            },
            {
                "byId": "u18",
                "username": "samuel.l"
            }
        ],
        "tags": [
            "shabbat",
            "judaica",
            "design"
        ]
    },
    {
        "_id": "s330",
        "txt": "From America to Israel, from confusion to clarity — this chapter of the book feels like closing a circle.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766872586/l9d4wdgqy3qovuimlgql.jpg",
        "by": {
            "byId": "u03",
            "username": "shira.avt"
        },
        "createdAt": 1754824513898,
        "loc": {},
        "comments": [
            {
                "_id": "c601",
                "byId": "u18",
                "username": "leah.write",
                "txt": "Your journey gives hope.",
                "createdAt": 1754825413898
            },
            {
                "_id": "c602",
                "byId": "u03",
                "username": "shira.avt",
                "txt": "I’m writing it for all of us.",
                "createdAt": 1754826313898
            },
            {
                "_id": "c603",
                "byId": "u22",
                "username": "leah.s",
                "txt": "Can’t wait to read this.",
                "createdAt": 1754827213898
            },
            {
                "_id": "c604",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "סיפור כזה יכול לשנות חיים.",
                "createdAt": 1754828113898
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u07",
                "username": "rachel.katz"
            },
            {
                "byId": "u17",
                "username": "ruth.b"
            },
            {
                "byId": "u22",
                "username": "leah.s"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            }
        ],
        "tags": [
            "aliyah",
            "teshuvah",
            "writing",
            "life-journey"
        ]
    },
    {
        "_id": "s401",
        "txt": "Lately I’ve been thinking about how much clarity matters — not just in products, but in life. When things are simple, you can actually see what matters and what doesn’t. סדר ופשטות aren’t aesthetic choices for me, they’re a way to breathe.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766924136/dknare2ogpfliny8ht1p.jpg",
        "by": {
            "byId": "u01",
            "username": "daniel.coh"
        },
        "createdAt": 1755087350632,
        "loc": {},
        "comments": [
            {
                "_id": "c701",
                "byId": "u02",
                "username": "maya.levine",
                "txt": "This resonates so deeply.",
                "createdAt": 1755088250632
            },
            {
                "_id": "c702",
                "byId": "u06",
                "username": "danny.nyc",
                "txt": "Clarity is underrated.",
                "createdAt": 1755089150632
            },
            {
                "_id": "c703",
                "byId": "u11",
                "username": "abby.walks",
                "txt": "Simple doesn’t mean shallow.",
                "createdAt": 1755090050632
            },
            {
                "_id": "c704",
                "byId": "u18",
                "username": "leah.write",
                "txt": "Beautifully said.",
                "createdAt": 1755090950632
            }
        ],
        "likedBy": [
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u06",
                "username": "danny.nyc"
            },
            {
                "byId": "u08",
                "username": "itai.runs"
            },
            {
                "byId": "u11",
                "username": "abby.walks"
            },
            {
                "byId": "u18",
                "username": "leah.write"
            },
            {
                "byId": "u23",
                "username": "sam.walker"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            },
            {
                "byId": "f01",
                "username": "noam.designs"
            },
            {
                "byId": "f02",
                "username": "product.mindset"
            },
            {
                "byId": "f03",
                "username": "simple.life"
            }
        ]
    },
    {
        "_id": "s402",
        "txt": "Visual storytelling isn’t just about beauty — it’s about honesty. Faith and creativity meet when I allow myself to see the world gently, without rushing to explain everything.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766926191/vw3qyxpbwsrzg0drce4x.png",
        "by": {
            "byId": "u02",
            "username": "maya.levine"
        },
        "createdAt": 1755360105735,
        "loc": {},
        "comments": [
            {
                "_id": "c705",
                "byId": "u18",
                "username": "leah.write",
                "txt": "Faith through images is powerful.",
                "createdAt": 1755361005735
            },
            {
                "_id": "c706",
                "byId": "u01",
                "username": "daniel.coh",
                "txt": "This explains your work perfectly.",
                "createdAt": 1755361905735
            },
            {
                "_id": "c707",
                "byId": "u25",
                "username": "rebekah.light",
                "txt": "So much depth here.",
                "createdAt": 1755362805735
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u07",
                "username": "chani.home"
            },
            {
                "byId": "u11",
                "username": "abby.walks"
            },
            {
                "byId": "u18",
                "username": "leah.write"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "f04",
                "username": "visual.soul"
            },
            {
                "byId": "f05",
                "username": "faith.and.art"
            },
            {
                "byId": "f06",
                "username": "soft.frames"
            },
            {
                "byId": "f07",
                "username": "story.in.light"
            },
            {
                "byId": "f08",
                "username": "inner.canvas"
            }
        ]
    },
    {
        "_id": "s403",
        "txt": "Morning coffee before work is sometimes the only quiet moment in the day. Between the city job and the noise of raising four kids, that cup reminds me to pause and say  תודה להשם.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766924872/zbjhfbdicceor6i9vcko.jpg",
        "by": {
            "byId": "u04",
            "username": "yaakov.l"
        },
        "createdAt": 1755642779204,
        "loc": {},
        "comments": [
            {
                "_id": "c708",
                "byId": "u05",
                "username": "sarit.m",
                "txt": "I feel this every morning.",
                "createdAt": 1755643679204
            },
            {
                "_id": "c709",
                "byId": "u08",
                "username": "itai.runs",
                "txt": "Those small pauses matter.",
                "createdAt": 1755644579204
            }
        ],
        "likedBy": [
            {
                "byId": "u05",
                "username": "sarit.m"
            },
            {
                "byId": "u08",
                "username": "itai.runs"
            },
            {
                "byId": "u10",
                "username": "matan.k"
            },
            {
                "byId": "u24",
                "username": "nitzan.daily"
            },
            {
                "byId": "f09",
                "username": "coffee.before.life"
            },
            {
                "byId": "f10",
                "username": "city.dad"
            },
            {
                "byId": "f11",
                "username": "morning.pause"
            },
            {
                "byId": "f12",
                "username": "simple.moments"
            }
        ]
    },
    {
        "_id": "s404",
        "txt": "Being a kindergarten teacher means learning every day — patience, joy, and how much wonder fits into a small hand. Between trips and songs, the הילדים remind me what presence really means.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766925153/dwhowrtqq9i2zpg1isvq.jpg",
        "by": {
            "byId": "u05",
            "username": "sarit.m"
        },
        "createdAt": 1755935371041,
        "loc": {},
        "comments": [
            {
                "_id": "c710",
                "byId": "u09",
                "username": "rivky.teacher",
                "txt": "So true. Kids are the best teachers.",
                "createdAt": 1755936271041
            },
            {
                "_id": "c711",
                "byId": "u13",
                "username": "rachel.life",
                "txt": "You do holy work.",
                "createdAt": 1755937171041
            }
        ],
        "likedBy": [
            {
                "byId": "u09",
                "username": "rivky.teacher"
            },
            {
                "byId": "u13",
                "username": "rachel.life"
            },
            {
                "byId": "u07",
                "username": "chani.home"
            },
            {
                "byId": "f13",
                "username": "early.years"
            },
            {
                "byId": "f14",
                "username": "tiny.steps"
            },
            {
                "byId": "f15",
                "username": "kind.gardens"
            },
            {
                "byId": "f16",
                "username": "joy.in.learning"
            },
            {
                "byId": "f17",
                "username": "teacher.heart"
            }
        ]
    },
    {
        "_id": "s405",
        "txt": "Living between Brooklyn and Jerusalem means always carrying two rhythms in my heart. Some days I feel split, other days I feel expanded. Maybe this tension is exactly where growth lives.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766924972/ykdyqi6n3v5zvodcococ.jpg",
        "by": {
            "byId": "u06",
            "username": "danny.nyc"
        },
        "createdAt": 1756237881245,
        "loc": {},
        "comments": [
            {
                "_id": "c712",
                "byId": "u23",
                "username": "sam.walker",
                "txt": "Cities shape us.",
                "createdAt": 1756238781245
            },
            {
                "_id": "c713",
                "byId": "u11",
                "username": "abby.walks",
                "txt": "Beautiful tension.",
                "createdAt": 1756239681245
            }
        ],
        "likedBy": [
            {
                "byId": "u11",
                "username": "abby.walks"
            },
            {
                "byId": "u23",
                "username": "sam.walker"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "f18",
                "username": "between.worlds"
            },
            {
                "byId": "f19",
                "username": "two.homes"
            },
            {
                "byId": "f20",
                "username": "diaspora.notes"
            },
            {
                "byId": "f21",
                "username": "inner.map"
            }
        ]
    },
    {
        "_id": "s406",
        "txt": "Shabbat prep is never just cooking. It’s memory, rhythm, and the quiet joy of making space for everyone to arrive whole. The kitchen fills, and so does my heart.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766924679/jthxqyxiudrwjlcsoqrm.jpg",
        "by": {
            "byId": "u07",
            "username": "chani.home"
        },
        "createdAt": 1756550309816,
        "loc": {},
        "comments": [
            {
                "_id": "c714",
                "byId": "u21",
                "username": "ari.cooks",
                "txt": "This is the real recipe.",
                "createdAt": 1756551209816
            },
            {
                "_id": "c715",
                "byId": "u25",
                "username": "rebekah.light",
                "txt": "Shabbat magic ✨",
                "createdAt": 1756552109816
            }
        ],
        "likedBy": [
            {
                "byId": "u21",
                "username": "ari.cooks"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u13",
                "username": "rachel.life"
            },
            {
                "byId": "f22",
                "username": "shabbat.table"
            },
            {
                "byId": "f23",
                "username": "home.warmth"
            },
            {
                "byId": "f24",
                "username": "slow.friday"
            },
            {
                "byId": "f25",
                "username": "bake.and.pray"
            }
        ]
    },
    {
        "_id": "s407",
        "txt": "Running clears my head in ways nothing else does. As a social worker, I carry a lot of other people’s stories, worries, and hopes. The run gives me space to breathe, to pray quietly with my feet, and to come back grounded.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766926284/b81wazllxeef3yqiv3mk.jpg",
        "by": {
            "byId": "u08",
            "username": "itai.runs"
        },
        "createdAt": 1756872656755,
        "loc": {},
        "comments": [
            {
                "_id": "c716",
                "byId": "u11",
                "username": "abby.walks",
                "txt": "Movement as prayer. I love that.",
                "createdAt": 1756873556755
            },
            {
                "_id": "c717",
                "byId": "u20",
                "username": "tamar.moves",
                "txt": "So true — the body remembers.",
                "createdAt": 1756874456755
            },
            {
                "_id": "c718",
                "byId": "u04",
                "username": "yaakov.l",
                "txt": "Running really does reset the soul.",
                "createdAt": 1756875356755
            }
        ],
        "likedBy": [
            {
                "byId": "u11",
                "username": "abby.walks"
            },
            {
                "byId": "u20",
                "username": "tamar.moves"
            },
            {
                "byId": "u04",
                "username": "yaakov.l"
            },
            {
                "byId": "u23",
                "username": "sam.walker"
            },
            {
                "byId": "f26",
                "username": "run.and.listen"
            },
            {
                "byId": "f27",
                "username": "social.runners"
            },
            {
                "byId": "f28",
                "username": "quiet.steps"
            },
            {
                "byId": "f29",
                "username": "pace.and.pause"
            },
            {
                "byId": "f30",
                "username": "moving.forward"
            }
        ]
    },
    {
        "_id": "s408",
        "txt": "Teaching young children means learning patience on a daily basis. Some days it’s letters and numbers, other days it’s helping a child believe they can try again. Education is mostly about trust.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766926540/hsssdahiih5hxrdd5iiv.png",
        "by": {
            "byId": "u09",
            "username": "rivky.teacher"
        },
        "createdAt": 1757204922061,
        "loc": {},
        "comments": [
            {
                "_id": "c719",
                "byId": "u05",
                "username": "sarit.m",
                "txt": "This is exactly it.",
                "createdAt": 1757205822061
            },
            {
                "_id": "c720",
                "byId": "u13",
                "username": "rachel.life",
                "txt": "Teachers change lives.",
                "createdAt": 1757206722061
            }
        ],
        "likedBy": [
            {
                "byId": "u05",
                "username": "sarit.m"
            },
            {
                "byId": "u13",
                "username": "rachel.life"
            },
            {
                "byId": "u22",
                "username": "hadas.reads"
            },
            {
                "byId": "f31",
                "username": "teach.with.heart"
            },
            {
                "byId": "f32",
                "username": "classroom.stories"
            },
            {
                "byId": "f33",
                "username": "early.learning"
            },
            {
                "byId": "f34",
                "username": "gentle.guidance"
            },
            {
                "byId": "f35",
                "username": "teacher.voice"
            }
        ]
    },
    {
        "_id": "s409",
        "txt": "Balancing economics studies with reserve duty isn’t easy. Switching between spreadsheets and uniforms reminds me that theory and reality are never separate. Responsibility shows up in unexpected places.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766926871/pfzdfafte3nhs01ay8lx.png",
        "by": {
            "byId": "u10",
            "username": "matan.k"
        },
        "createdAt": 1757547105735,
        "loc": {},
        "comments": [
            {
                "_id": "c721",
                "byId": "u06",
                "username": "danny.nyc",
                "txt": "Respect for carrying both worlds.",
                "createdAt": 1757548005735
            },
            {
                "_id": "c722",
                "byId": "u04",
                "username": "yaakov.l",
                "txt": "Stay safe.",
                "createdAt": 1757548905735
            }
        ],
        "likedBy": [
            {
                "byId": "u06",
                "username": "danny.nyc"
            },
            {
                "byId": "u04",
                "username": "yaakov.l"
            },
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "f36",
                "username": "reserve.life"
            },
            {
                "byId": "f37",
                "username": "student.soldier"
            },
            {
                "byId": "f38",
                "username": "quiet.service"
            },
            {
                "byId": "f39",
                "username": "duty.and.study"
            }
        ]
    },
    {
        "_id": "s410",
        "txt": "Long walks have become my way of thinking and praying at the same time. I don’t always find answers, but I usually find honesty. Sometimes that’s enough.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766928292/rtamlgv1158kv0ssekp4.png",
        "by": {
            "byId": "u11",
            "username": "abby.walks"
        },
        "createdAt": 1757899207775,
        "loc": {},
        "comments": [
            {
                "_id": "c723",
                "byId": "u18",
                "username": "leah.write",
                "txt": "This feels like a poem.",
                "createdAt": 1757900107775
            },
            {
                "_id": "c724",
                "byId": "u23",
                "username": "sam.walker",
                "txt": "Walking thinking club.",
                "createdAt": 1757901007775
            }
        ],
        "likedBy": [
            {
                "byId": "u18",
                "username": "leah.write"
            },
            {
                "byId": "u23",
                "username": "sam.walker"
            },
            {
                "byId": "u08",
                "username": "itai.runs"
            },
            {
                "byId": "f40",
                "username": "slow.steps"
            },
            {
                "byId": "f41",
                "username": "walking.words"
            },
            {
                "byId": "f42",
                "username": "path.and.pause"
            },
            {
                "byId": "f43",
                "username": "inner.walks"
            },
            {
                "byId": "f44",
                "username": "prayer.in.motion"
            }
        ]
    },
    {
        "_id": "s411",
        "txt": "Working with my hands teaches patience better than anything else. Fixing wires and lights reminds me that even small connections matter — when one thing is off, the whole system feels it.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766927025/bvhtymkg95sct5hlbpix.jpg",
        "by": {
            "byId": "u12",
            "username": "shlomi.fix"
        },
        "createdAt": 1758261228183,
        "loc": {},
        "comments": [
            {
                "_id": "c725",
                "byId": "u26",
                "username": "ofir.builds",
                "txt": "Craft teaches humility.",
                "createdAt": 1758262128183
            },
            {
                "_id": "c726",
                "byId": "u01",
                "username": "daniel.coh",
                "txt": "Beautiful metaphor.",
                "createdAt": 1758263028183
            }
        ],
        "likedBy": [
            {
                "byId": "u26",
                "username": "ofir.builds"
            },
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u14",
                "username": "moshe.bus"
            },
            {
                "byId": "f45",
                "username": "hands.on.work"
            },
            {
                "byId": "f46",
                "username": "simple.trades"
            },
            {
                "byId": "f47",
                "username": "fix.and.learn"
            },
            {
                "byId": "f48",
                "username": "daily.craft"
            }
        ]
    },
    {
        "_id": "s412",
        "txt": "Some days feel like a balancing act — parenting, marriage, and trying to stay kind to myself in the middle. I don’t always get it right, but showing up still counts.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766927270/tatdsubg5cvm0yqgegcl.jpg",
        "by": {
            "byId": "u13",
            "username": "rachel.life"
        },
        "createdAt": 1758633166959,
        "loc": {},
        "comments": [
            {
                "_id": "c727",
                "byId": "u07",
                "username": "chani.home",
                "txt": "You’re not alone.",
                "createdAt": 1758634066959
            },
            {
                "_id": "c728",
                "byId": "u25",
                "username": "rebekah.light",
                "txt": "Grace over perfection.",
                "createdAt": 1758634966959
            }
        ],
        "likedBy": [
            {
                "byId": "u07",
                "username": "chani.home"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u05",
                "username": "sarit.m"
            },
            {
                "byId": "f49",
                "username": "real.life.mom"
            },
            {
                "byId": "f50",
                "username": "trying.my.best"
            },
            {
                "byId": "f51",
                "username": "quiet.courage"
            },
            {
                "byId": "f52",
                "username": "everyday.faith"
            }
        ]
    },
    {
        "_id": "s413",
        "txt": "Driving the same routes every day has its own rhythm. Old music on the radio, familiar faces getting on and off — there’s comfort in routine if you learn how to listen.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766927974/grdmpldbrjtgvstmnhp3.jpg",
        "by": {
            "byId": "u14",
            "username": "moshe.bus"
        },
        "createdAt": 1759015024102,
        "loc": {},
        "comments": [
            {
                "_id": "c729",
                "byId": "u04",
                "username": "yaakov.l",
                "txt": "Those routines keep the city moving.",
                "createdAt": 1759015924102
            },
            {
                "_id": "c730",
                "byId": "u23",
                "username": "sam.walker",
                "txt": "Love the quiet observation.",
                "createdAt": 1759016824102
            }
        ],
        "likedBy": [
            {
                "byId": "u04",
                "username": "yaakov.l"
            },
            {
                "byId": "u23",
                "username": "sam.walker"
            },
            {
                "byId": "u12",
                "username": "shlomi.fix"
            },
            {
                "byId": "f53",
                "username": "city.routes"
            },
            {
                "byId": "f54",
                "username": "old.songs"
            },
            {
                "byId": "f55",
                "username": "daily.drives"
            },
            {
                "byId": "f56",
                "username": "bus.life"
            }
        ]
    },
    {
        "_id": "s414",
        "txt": "Writing sacred texts teaches patience like nothing else. Every letter matters. There’s no rushing when the work itself demands intention, ink, and quiet respect.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766931031/gcxeadfndk04ngniudg3.png",
        "by": {
            "byId": "u15",
            "username": "eli.scribe"
        },
        "createdAt": 1759406799612,
        "loc": {},
        "comments": [
            {
                "_id": "c731",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "קדושה דרך דיוק.",
                "createdAt": 1759407699612
            },
            {
                "_id": "c732",
                "byId": "u18",
                "username": "leah.write",
                "txt": "Words truly carry weight.",
                "createdAt": 1759408599612
            }
        ],
        "likedBy": [
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u18",
                "username": "leah.write"
            },
            {
                "byId": "u17",
                "username": "yosef.learns"
            },
            {
                "byId": "f57",
                "username": "holy.letters"
            },
            {
                "byId": "f58",
                "username": "ink.and.silence"
            },
            {
                "byId": "f59",
                "username": "scribe.life"
            },
            {
                "byId": "f60",
                "username": "slow.words"
            }
        ]
    },
    {
        "_id": "s415",
        "txt": "Caring for plants has taught me something quiet about faith. Growth doesn’t rush, and sunlight can’t be forced. There’s trust involved — in the soil, in the process, and in what you don’t see yet.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766928188/vylig5zsk5rmhzcydkrn.jpg",
        "by": {
            "byId": "u16",
            "username": "noa.plants"
        },
        "createdAt": 1759808493490,
        "loc": {},
        "comments": [
            {
                "_id": "c733",
                "byId": "u25",
                "username": "rebekah.light",
                "txt": "This feels like a meditation.",
                "createdAt": 1759809393490
            },
            {
                "_id": "c734",
                "byId": "u18",
                "username": "leah.write",
                "txt": "So gentle and true.",
                "createdAt": 1759810293490
            },
            {
                "_id": "c735",
                "byId": "u07",
                "username": "chani.home",
                "txt": "I needed this reminder.",
                "createdAt": 1759811193490
            }
        ],
        "likedBy": [
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u18",
                "username": "leah.write"
            },
            {
                "byId": "u07",
                "username": "chani.home"
            },
            {
                "byId": "u22",
                "username": "hadas.reads"
            },
            {
                "byId": "f61",
                "username": "green.faith"
            },
            {
                "byId": "f62",
                "username": "quiet.growth"
            },
            {
                "byId": "f63",
                "username": "rooted.life"
            },
            {
                "byId": "f64",
                "username": "slow.bloom"
            }
        ]
    },
    {
        "_id": "s416",
        "txt": "Learning in the morning and working in the evening keeps me grounded. Torah gives direction, עבודה gives responsibility. Somewhere between the two, life becomes whole.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766932768/uvg1way5omenhjv17ix8.png",
        "by": {
            "byId": "u17",
            "username": "yosef.learns"
        },
        "createdAt": 1760220105735,
        "loc": {},
        "comments": [
            {
                "_id": "c736",
                "byId": "u15",
                "username": "eli.scribe",
                "txt": "A balanced path.",
                "createdAt": 1760221005735
            },
            {
                "_id": "c737",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "שילוב נכון של עמל ורוח.",
                "createdAt": 1760221905735
            }
        ],
        "likedBy": [
            {
                "byId": "u15",
                "username": "eli.scribe"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u10",
                "username": "matan.k"
            },
            {
                "byId": "f65",
                "username": "learning.life"
            },
            {
                "byId": "f66",
                "username": "daily.torah"
            },
            {
                "byId": "f67",
                "username": "steady.paths"
            },
            {
                "byId": "f68",
                "username": "work.and.study"
            }
        ]
    },
    {
        "_id": "s417",
        "txt": "I keep writing small thoughts because they often carry the heaviest meaning. Not everything needs to be loud to be important. Some truths prefer quiet.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766928460/xifajvo3e4fk6emhp6tz.jpg",
        "by": {
            "byId": "u18",
            "username": "leah.write"
        },
        "createdAt": 1760641636347,
        "loc": {},
        "comments": [
            {
                "_id": "c738",
                "byId": "u11",
                "username": "abby.walks",
                "txt": "This is exactly why I read you.",
                "createdAt": 1760642536347
            },
            {
                "_id": "c739",
                "byId": "u02",
                "username": "maya.levine",
                "txt": "Your words stay with me.",
                "createdAt": 1760643436347
            }
        ],
        "likedBy": [
            {
                "byId": "u11",
                "username": "abby.walks"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u16",
                "username": "noa.plants"
            },
            {
                "byId": "f69",
                "username": "quiet.lines"
            },
            {
                "byId": "f70",
                "username": "small.words"
            },
            {
                "byId": "f71",
                "username": "inner.meaning"
            },
            {
                "byId": "f72",
                "username": "soft.truths"
            }
        ]
    },
    {
        "_id": "s418",
        "txt": "Sound has a way of opening space — whether in prayer or in silence. I’m learning that sometimes the most meaningful moments happen between the notes.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766931528/twybp4trpm2dwsdxhsuz.jpg",
        "by": {
            "byId": "u19",
            "username": "yonatan.sound"
        },
        "createdAt": 1761073085326,
        "loc": {},
        "comments": [
            {
                "_id": "c740",
                "byId": "u21",
                "username": "ari.cooks",
                "txt": "Between the notes — beautiful.",
                "createdAt": 1761073985326
            },
            {
                "_id": "c741",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "שקט הוא גם קול.",
                "createdAt": 1761074885326
            }
        ],
        "likedBy": [
            {
                "byId": "u21",
                "username": "ari.cooks"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u06",
                "username": "danny.nyc"
            },
            {
                "byId": "f73",
                "username": "sound.and.soul"
            },
            {
                "byId": "f74",
                "username": "prayer.space"
            },
            {
                "byId": "f75",
                "username": "listening.deep"
            },
            {
                "byId": "f76",
                "username": "quiet.notes"
            }
        ]
    },
    {
        "_id": "s419",
        "txt": "Movement therapy isn’t about fixing the body — it’s about listening to it. Strength can be gentle, and healing doesn’t need force to be real.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766933315/rp3uxymst0jazn9v6uz8.jpg",
        "by": {
            "byId": "u20",
            "username": "tamar.moves"
        },
        "createdAt": 1761514452673,
        "loc": {},
        "comments": [
            {
                "_id": "c742",
                "byId": "u08",
                "username": "itai.runs",
                "txt": "This aligns so much with my work.",
                "createdAt": 1761515352673
            },
            {
                "_id": "c743",
                "byId": "u16",
                "username": "noa.plants",
                "txt": "Gentleness is powerful.",
                "createdAt": 1761516252673
            }
        ],
        "likedBy": [
            {
                "byId": "u08",
                "username": "itai.runs"
            },
            {
                "byId": "u16",
                "username": "noa.plants"
            },
            {
                "byId": "u11",
                "username": "abby.walks"
            },
            {
                "byId": "f77",
                "username": "gentle.motion"
            },
            {
                "byId": "f78",
                "username": "body.wisdom"
            },
            {
                "byId": "f79",
                "username": "slow.healing"
            },
            {
                "byId": "f80",
                "username": "movement.truth"
            }
        ]
    },
    {
        "_id": "s420",
        "txt": "Cooking slowly is an act of respect — for the ingredients, the tradition, and the people who will sit at the table. Food carries memory when you give it time.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766928536/tngpqbx1rzmc7gyckbfn.jpg",
        "by": {
            "byId": "u21",
            "username": "ari.cooks"
        },
        "createdAt": 1761965738388,
        "loc": {},
        "comments": [
            {
                "_id": "c744",
                "byId": "u07",
                "username": "chani.home",
                "txt": "Time is the secret ingredient.",
                "createdAt": 1761966638388
            },
            {
                "_id": "c745",
                "byId": "u25",
                "username": "rebekah.light",
                "txt": "Food as tradition ❤️",
                "createdAt": 1761967538388
            }
        ],
        "likedBy": [
            {
                "byId": "u07",
                "username": "chani.home"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "f81",
                "username": "slow.kitchen"
            },
            {
                "byId": "f82",
                "username": "kosher.roots"
            },
            {
                "byId": "f83",
                "username": "table.stories"
            },
            {
                "byId": "f84",
                "username": "heritage.food"
            }
        ]
    },
    {
        "_id": "s421",
        "txt": "Books have a way of slowing the world down. Even a few pages a day can open a quiet window into someone else’s thoughts — and sometimes back into your own.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766928683/zlgowihrvlc6mcc9rkaw.jpg",
        "by": {
            "byId": "u22",
            "username": "hadas.reads"
        },
        "createdAt": 1762426942469,
        "loc": {},
        "comments": [
            {
                "_id": "c746",
                "byId": "u18",
                "username": "leah.write",
                "txt": "Reading is its own conversation.",
                "createdAt": 1762427842469
            },
            {
                "_id": "c747",
                "byId": "u09",
                "username": "rivky.teacher",
                "txt": "Books really do open doors.",
                "createdAt": 1762428742469
            }
        ],
        "likedBy": [
            {
                "byId": "u18",
                "username": "leah.write"
            },
            {
                "byId": "u09",
                "username": "rivky.teacher"
            },
            {
                "byId": "u11",
                "username": "abby.walks"
            },
            {
                "byId": "f85",
                "username": "pages.and.pause"
            },
            {
                "byId": "f86",
                "username": "reading.life"
            },
            {
                "byId": "f87",
                "username": "quiet.books"
            },
            {
                "byId": "f88",
                "username": "words.and.time"
            }
        ]
    },
    {
        "_id": "s422",
        "txt": "Walking through cities teaches patience. Streets tell stories slowly, if you let them. Thinking doesn’t always need a desk — sometimes it needs distance.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766935084/czsydlavl02masz04mnn.jpg",
        "by": {
            "byId": "u23",
            "username": "sam.walker"
        },
        "createdAt": 1762898064918,
        "loc": {},
        "comments": [
            {
                "_id": "c748",
                "byId": "u11",
                "username": "abby.walks",
                "txt": "Walking thinking forever.",
                "createdAt": 1762898964918
            },
            {
                "_id": "c749",
                "byId": "u06",
                "username": "danny.nyc",
                "txt": "Cities reward attention.",
                "createdAt": 1762899864918
            }
        ],
        "likedBy": [
            {
                "byId": "u11",
                "username": "abby.walks"
            },
            {
                "byId": "u06",
                "username": "danny.nyc"
            },
            {
                "byId": "u08",
                "username": "itai.runs"
            },
            {
                "byId": "f89",
                "username": "city.paces"
            },
            {
                "byId": "f90",
                "username": "urban.walks"
            },
            {
                "byId": "f91",
                "username": "thinking.paths"
            },
            {
                "byId": "f92",
                "username": "slow.cities"
            }
        ]
    },
    {
        "_id": "s423",
        "txt": "Living simply isn’t about giving things up — it’s about noticing what’s already here. The small routines, the quiet mornings, the ordinary days. There’s depth hiding in the everyday if you slow down enough.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766931698/zqtjupyl6uobnivcwhsw.jpg",
        "by": {
            "byId": "u24",
            "username": "nitzan.daily"
        },
        "createdAt": 1763379105735,
        "loc": {},
        "comments": [
            {
                "_id": "c750",
                "byId": "u11",
                "username": "abby.walks",
                "txt": "This is a way of life.",
                "createdAt": 1763380005735
            },
            {
                "_id": "c751",
                "byId": "u23",
                "username": "sam.walker",
                "txt": "The everyday is underrated.",
                "createdAt": 1763380905735
            },
            {
                "_id": "c752",
                "byId": "u16",
                "username": "noa.plants",
                "txt": "Quiet beauty.",
                "createdAt": 1763381805735
            },
            {
                "_id": "c753",
                "byId": "u18",
                "username": "leah.write",
                "txt": "You captured something true.",
                "createdAt": 1763382705735
            },
            {
                "_id": "c754",
                "byId": "u25",
                "username": "rebekah.light",
                "txt": "Slowness is a gift.",
                "createdAt": 1763383605735
            }
        ],
        "likedBy": [
            {
                "byId": "u11",
                "username": "abby.walks"
            },
            {
                "byId": "u23",
                "username": "sam.walker"
            },
            {
                "byId": "u16",
                "username": "noa.plants"
            },
            {
                "byId": "u18",
                "username": "leah.write"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u07",
                "username": "chani.home"
            },
            {
                "byId": "u22",
                "username": "hadas.reads"
            },
            {
                "byId": "f93",
                "username": "daily.depth"
            },
            {
                "byId": "f94",
                "username": "ordinary.magic"
            },
            {
                "byId": "f95",
                "username": "simple.days"
            },
            {
                "byId": "f96",
                "username": "quiet.living"
            },
            {
                "byId": "f97",
                "username": "slow.life.club"
            },
            {
                "byId": "f98",
                "username": "soft.time"
            },
            {
                "byId": "f99",
                "username": "minimal.soul"
            },
            {
                "byId": "f100",
                "username": "life.at.ease"
            }
        ]
    },
    {
        "_id": "s424",
        "txt": "Faith isn’t only found in big moments. It shows up in the way we speak, the way we forgive, and the way we keep going even when the day feels heavy. Daily life is where belief learns how to breathe.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766935183/pzdw3sof4cksplblat1j.jpg",
        "by": {
            "byId": "u25",
            "username": "rebekah.light"
        },
        "createdAt": 1763870064918,
        "loc": {},
        "comments": [
            {
                "_id": "c760",
                "byId": "u13",
                "username": "rachel.life",
                "txt": "This speaks to me.",
                "createdAt": 1763870964918
            },
            {
                "_id": "c761",
                "byId": "u07",
                "username": "chani.home",
                "txt": "Amen.",
                "createdAt": 1763871864918
            },
            {
                "_id": "c762",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "אמונה ביומיום.",
                "createdAt": 1763872764918
            },
            {
                "_id": "c763",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "So much wisdom here.",
                "createdAt": 1763873664918
            },
            {
                "_id": "c764",
                "byId": "u18",
                "username": "leah.write",
                "txt": "You write faith gently.",
                "createdAt": 1763874564918
            }
        ],
        "likedBy": [
            {
                "byId": "u13",
                "username": "rachel.life"
            },
            {
                "byId": "u07",
                "username": "chani.home"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            },
            {
                "byId": "u18",
                "username": "leah.write"
            },
            {
                "byId": "u16",
                "username": "noa.plants"
            },
            {
                "byId": "u22",
                "username": "hadas.reads"
            },
            {
                "byId": "f101",
                "username": "light.daily"
            },
            {
                "byId": "f102",
                "username": "faith.steps"
            },
            {
                "byId": "f103",
                "username": "quiet.belief"
            },
            {
                "byId": "f104",
                "username": "inner.light"
            },
            {
                "byId": "f105",
                "username": "daily.emunah"
            },
            {
                "byId": "f106",
                "username": "soul.notes"
            },
            {
                "byId": "f107",
                "username": "gentle.truth"
            },
            {
                "byId": "f108",
                "username": "living.faith"
            }
        ]
    },
    {
        "_id": "s425",
        "txt": "Working with wood teaches honesty. You can’t rush it, and you can’t fake it. Every cut shows, every joint matters. There’s truth in building something that has to stand on its own.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766928849/xgfbjaieq4bcjcnvnigp.jpg",
        "by": {
            "byId": "u26",
            "username": "ofir.builds"
        },
        "createdAt": 1764370942469,
        "loc": {},
        "comments": [
            {
                "_id": "c770",
                "byId": "u12",
                "username": "shlomi.fix",
                "txt": "Craft speaks truth.",
                "createdAt": 1764371842469
            },
            {
                "_id": "c771",
                "byId": "u15",
                "username": "eli.scribe",
                "txt": "Same with letters.",
                "createdAt": 1764372742469
            },
            {
                "_id": "c772",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "מלאכה עם נשמה.",
                "createdAt": 1764373642469
            },
            {
                "_id": "c773",
                "byId": "u01",
                "username": "daniel.coh",
                "txt": "Great metaphor.",
                "createdAt": 1764374542469
            }
        ],
        "likedBy": [
            {
                "byId": "u12",
                "username": "shlomi.fix"
            },
            {
                "byId": "u15",
                "username": "eli.scribe"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u17",
                "username": "yosef.learns"
            },
            {
                "byId": "f109",
                "username": "true.materials"
            },
            {
                "byId": "f110",
                "username": "honest.work"
            },
            {
                "byId": "f111",
                "username": "wood.and.wisdom"
            },
            {
                "byId": "f112",
                "username": "slow.build"
            },
            {
                "byId": "f113",
                "username": "hands.truth"
            },
            {
                "byId": "f114",
                "username": "real.material"
            },
            {
                "byId": "f115",
                "username": "craft.life"
            },
            {
                "byId": "f116",
                "username": "build.true"
            },
            {
                "byId": "f117",
                "username": "makers.path"
            }
        ]
    },
    {
        "_id": "s426",
        "txt": "Halachah lives in real life — not in abstraction. Every question carries a person, a story, and responsibility. Listening carefully is as important as answering correctly.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766936221/xtpac15yjuxcpk52lcse.png",
        "by": {
            "byId": "u28",
            "username": "rav.eitan"
        },
        "createdAt": 1764881738388,
        "loc": {},
        "comments": [
            {
                "_id": "c780",
                "byId": "u29",
                "username": "rav.binyamin",
                "txt": "אמת ורגישות.",
                "createdAt": 1764882638388
            },
            {
                "_id": "c781",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "הלכה חיה.",
                "createdAt": 1764883538388
            },
            {
                "_id": "c782",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "This is leadership.",
                "createdAt": 1764884438388
            },
            {
                "_id": "c783",
                "byId": "u17",
                "username": "yosef.learns",
                "txt": "Thank you, Rabbi.",
                "createdAt": 1764885338388
            }
        ],
        "likedBy": [
            {
                "byId": "u29",
                "username": "rav.binyamin"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            },
            {
                "byId": "u17",
                "username": "yosef.learns"
            },
            {
                "byId": "u15",
                "username": "eli.scribe"
            },
            {
                "byId": "f118",
                "username": "halacha.today"
            },
            {
                "byId": "f119",
                "username": "living.psak"
            },
            {
                "byId": "f120",
                "username": "community.voice"
            },
            {
                "byId": "f121",
                "username": "listening.rabbi"
            },
            {
                "byId": "f122",
                "username": "wise.words"
            },
            {
                "byId": "f123",
                "username": "halacha.life"
            },
            {
                "byId": "f124",
                "username": "responsible.psak"
            },
            {
                "byId": "f125",
                "username": "modern.halacha"
            },
            {
                "byId": "f126",
                "username": "torah.and.life"
            },
            {
                "byId": "f127",
                "username": "deep.listening"
            }
        ]
    },
    {
        "_id": "s427",
        "txt": "Teaching Halachah today means engaging with complexity honestly. Ethics, technology, and responsibility are not outside the tradition — they demand its deepest attention.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766935845/qc52xef09gaypkmwjrdz.png",
        "by": {
            "byId": "u29",
            "username": "rav.binyamin"
        },
        "createdAt": 1765402452673,
        "loc": {},
        "comments": [
            {
                "_id": "c790",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "יישר כוח.",
                "createdAt": 1765403352673
            },
            {
                "_id": "c791",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "So important.",
                "createdAt": 1765404252673
            },
            {
                "_id": "c792",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "הלכה עם אחריות.",
                "createdAt": 1765405152673
            }
        ],
        "likedBy": [
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u17",
                "username": "yosef.learns"
            },
            {
                "byId": "u15",
                "username": "eli.scribe"
            },
            {
                "byId": "f128",
                "username": "ethics.and.torah"
            },
            {
                "byId": "f129",
                "username": "halacha.future"
            },
            {
                "byId": "f130",
                "username": "thinking.psak"
            },
            {
                "byId": "f131",
                "username": "modern.learning"
            },
            {
                "byId": "f132",
                "username": "ethical.torah"
            },
            {
                "byId": "f133",
                "username": "torah.now"
            },
            {
                "byId": "f134",
                "username": "community.study"
            },
            {
                "byId": "f135",
                "username": "deep.psak"
            },
            {
                "byId": "f136",
                "username": "responsible.torah"
            }
        ]
    },
    {
        "_id": "s428",
        "txt": "Teaching Halachah to women means creating space — for questions, growth, and honesty. Law becomes language when it’s taught with care and trust.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766937115/kfg7xy4sgcnb9v4h1uli.jpg",
        "by": {
            "byId": "u30",
            "username": "rabbanit.noa"
        },
        "createdAt": 1765933085326,
        "loc": {},
        "comments": [
            {
                "_id": "c800",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "So beautifully put.",
                "createdAt": 1765933985326
            },
            {
                "_id": "c801",
                "byId": "u25",
                "username": "rebekah.light",
                "txt": "This matters deeply.",
                "createdAt": 1765934885326
            },
            {
                "_id": "c802",
                "byId": "u18",
                "username": "leah.write",
                "txt": "Language of care.",
                "createdAt": 1765935785326
            },
            {
                "_id": "c803",
                "byId": "u13",
                "username": "rachel.life",
                "txt": "Thank you for this work.",
                "createdAt": 1765936685326
            }
        ],
        "likedBy": [
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u18",
                "username": "leah.write"
            },
            {
                "byId": "u13",
                "username": "rachel.life"
            },
            {
                "byId": "u22",
                "username": "hadas.reads"
            },
            {
                "byId": "f137",
                "username": "women.learn"
            },
            {
                "byId": "f138",
                "username": "halacha.spaces"
            },
            {
                "byId": "f139",
                "username": "learning.together"
            },
            {
                "byId": "f140",
                "username": "living.law"
            },
            {
                "byId": "f141",
                "username": "faith.dialogue"
            },
            {
                "byId": "f142",
                "username": "torah.with.heart"
            },
            {
                "byId": "f143",
                "username": "safe.questions"
            },
            {
                "byId": "f144",
                "username": "learning.faith"
            },
            {
                "byId": "f145",
                "username": "community.growth"
            }
        ]
    },
    {
        "_id": "s429",
        "txt": "Pastoral Halachah begins with listening. When questions are welcomed, tradition becomes a place of safety rather than fear. Wisdom grows where compassion is practiced.",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1766933633/kq4tbgiemwa3bk1rhtrg.png",
        "by": {
            "byId": "u31",
            "username": "rabbanit.ruth"
        },
        "createdAt": 1766473636347,
        "loc": {},
        "comments": [
            {
                "_id": "c810",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "So much אמת here.",
                "createdAt": 1766474536347
            },
            {
                "_id": "c811",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "Listening is everything.",
                "createdAt": 1766475436347
            },
            {
                "_id": "c812",
                "byId": "u25",
                "username": "rebekah.light",
                "txt": "This gives hope.",
                "createdAt": 1766476336347
            },
            {
                "_id": "c813",
                "byId": "u18",
                "username": "leah.write",
                "txt": "Wisdom with kindness.",
                "createdAt": 1766477236347
            },
            {
                "_id": "c814",
                "byId": "u13",
                "username": "rachel.life",
                "txt": "Thank you.",
                "createdAt": 1766478136347
            }
        ],
        "likedBy": [
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u18",
                "username": "leah.write"
            },
            {
                "byId": "u13",
                "username": "rachel.life"
            },
            {
                "byId": "u22",
                "username": "hadas.reads"
            },
            {
                "byId": "f146",
                "username": "pastoral.voice"
            },
            {
                "byId": "f147",
                "username": "safe.tradition"
            },
            {
                "byId": "f148",
                "username": "listening.faith"
            },
            {
                "byId": "f149",
                "username": "compassionate.law"
            },
            {
                "byId": "f150",
                "username": "wisdom.spaces"
            },
            {
                "byId": "f151",
                "username": "gentle.psak"
            },
            {
                "byId": "f152",
                "username": "faith.with.care"
            },
            {
                "byId": "f153",
                "username": "community.trust"
            },
            {
                "byId": "f154",
                "username": "open.questions"
            }
        ]
    },
    {
        "_id": "s430",
        "txt": "סט הבדלה",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1767020131/sj5e3t3hgvvgre4leggw.png",
        "by": {
            "byId": "u32",
            "username": "avital.judaica"
        },
        "createdAt": 1767024105734,
        "loc": {},
        "comments": [
            {
                "_id": "c810",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "מביא אור לשולחן שבת",
                "createdAt": 1767024105734
            },
            {
                "_id": "c811",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "איזה אוצר",
                "createdAt": 1767024105734
            },
            {
                "_id": "c812",
                "byId": "u25",
                "username": "rebekah.light",
                "txt": "יפייפה",
                "createdAt": 1767024105734
            },
            {
                "_id": "c813",
                "byId": "u18",
                "username": "leah.write",
                "txt": "What a pice of art",
                "createdAt": 1767024105734
            },
            {
                "_id": "c814",
                "byId": "u13",
                "username": "rachel.life",
                "txt": "Combines sofistication and simplicity.",
                "createdAt": 1767024105734
            }
        ],
        "likedBy": [
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u18",
                "username": "leah.write"
            },
            {
                "byId": "u13",
                "username": "rachel.life"
            },
            {
                "byId": "u22",
                "username": "hadas.reads"
            },
            {
                "byId": "f146",
                "username": "pastoral.voice"
            },
            {
                "byId": "f147",
                "username": "safe.tradition"
            },
            {
                "byId": "f148",
                "username": "listening.faith"
            },
            {
                "byId": "f149",
                "username": "compassionate.law"
            },
            {
                "byId": "f150",
                "username": "wisdom.spaces"
            },
            {
                "byId": "f151",
                "username": "gentle.psak"
            },
            {
                "byId": "f152",
                "username": "faith.with.care"
            },
            {
                "byId": "f153",
                "username": "community.trust"
            },
            {
                "byId": "f154",
                "username": "open.questions"
            },
            {
                "byId": "u22",
                "username": "hadas.reads"
            },
            {
                "byId": "f146",
                "username": "pastoral.voice"
            },
            {
                "byId": "f147",
                "username": "safe.tradition"
            },
            {
                "byId": "f148",
                "username": "listening.faith"
            },
            {
                "byId": "f149",
                "username": "compassionate.law"
            },
            {
                "byId": "f150",
                "username": "wisdom.spaces"
            },
            {
                "byId": "f151",
                "username": "gentle.psak"
            },
            {
                "byId": "f152",
                "username": "faith.with.care"
            },
            {
                "byId": "f153",
                "username": "community.trust"
            },
            {
                "byId": "f154",
                "username": "open.questions"
            },
            {
                "byId": "u22",
                "username": "hadas.reads"
            },
            {
                "byId": "f146",
                "username": "pastoral.voice"
            },
            {
                "byId": "f147",
                "username": "safe.tradition"
            },
            {
                "byId": "f148",
                "username": "listening.faith"
            },
            {
                "byId": "f149",
                "username": "compassionate.law"
            },
            {
                "byId": "f150",
                "username": "wisdom.spaces"
            },
            {
                "byId": "f151",
                "username": "gentle.psak"
            },
            {
                "byId": "f152",
                "username": "faith.with.care"
            },
            {
                "byId": "f153",
                "username": "community.trust"
            },
            {
                "byId": "f154",
                "username": "open.questions"
            }
        ]
    },
    {
        "_id": "s501",
        "txt": "קולקציה לפסח ✨",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1767020130/rytyo4vdqxb27hdvch7f.png",
        "by": {
            "byId": "u32",
            "username": "avital.judaica"
        },
        "createdAt": 1751275800000,
        "loc": {},
        "comments": [
            {
                "_id": "c5011",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "כל כך נקי ומכובד. הידור אמיתי.",
                "createdAt": 1751279100000
            },
            {
                "_id": "c5012",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "יפה לראות אסתטיקה שמשרתת מצווה.",
                "createdAt": 1751287320000
            },
            {
                "_id": "c5013",
                "byId": "u18",
                "username": "leah.write",
                "txt": "So calming. Makes the table feel like a story.",
                "createdAt": 1751299260000
            },
            {
                "_id": "c5014",
                "byId": "u02",
                "username": "maya.levine",
                "txt": "Love the composition. Premium vibes!",
                "createdAt": 1751310420000
            }
        ],
        "likedBy": [
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u18",
                "username": "leah.write"
            },
            {
                "byId": "u13",
                "username": "rachel.life"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u21",
                "username": "ari.cooks"
            },
            {
                "byId": "u16",
                "username": "noa.plants"
            },
            {
                "byId": "u07",
                "username": "chani.home"
            },
            {
                "byId": "u15",
                "username": "eli.scribe"
            },
            {
                "byId": "u23",
                "username": "sam.walker"
            },
            {
                "byId": "u11",
                "username": "abby.walks"
            },
            {
                "byId": "u19",
                "username": "yonatan.sound"
            },
            {
                "byId": "f201",
                "username": "elegant.seder"
            },
            {
                "byId": "f202",
                "username": "pesach.table"
            },
            {
                "byId": "f203",
                "username": "silver.notes"
            },
            {
                "byId": "f204",
                "username": "clean.lines"
            },
            {
                "byId": "f205",
                "username": "kosher.style"
            },
            {
                "byId": "f206",
                "username": "white_linen"
            },
            {
                "byId": "f207",
                "username": "matzah.mood"
            },
            {
                "byId": "f208",
                "username": "hiddur.daily"
            },
            {
                "byId": "f209",
                "username": "blue_and_silver"
            },
            {
                "byId": "f210",
                "username": "seder.ready"
            },
            {
                "byId": "f211",
                "username": "shabbat_to_pesach"
            },
            {
                "byId": "f212",
                "username": "tradition.modern"
            },
            {
                "byId": "f213",
                "username": "table_details"
            },
            {
                "byId": "f214",
                "username": "holiday_glow"
            },
            {
                "byId": "f215",
                "username": "minimal_judaica"
            }
        ]
    },
    {
        "_id": "s502",
        "txt": "קערת סדר שמרימה את כל השולחן 🥂",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1767020137/hpm7n0v4kjvyb5f22ske.png",
        "by": {
            "byId": "u32",
            "username": "avital.judaica"
        },
        "createdAt": 1752844500000,
        "loc": {},
        "comments": [
            {
                "_id": "c5021",
                "byId": "u29",
                "username": "rav.binyamin",
                "txt": "Elegant without losing tradition. Beautiful.",
                "createdAt": 1752846600000
            },
            {
                "_id": "c5022",
                "byId": "u21",
                "username": "ari.cooks",
                "txt": "I want this on my seder table 😍",
                "createdAt": 1752853440000
            },
            {
                "_id": "c5023",
                "byId": "u16",
                "username": "noa.plants",
                "txt": "הכסף עם הירוקים—איזה שילוב.",
                "createdAt": 1752860580000
            },
            {
                "_id": "c5024",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "מוסיף כבוד לליל הסדר.",
                "createdAt": 1752870360000
            }
        ],
        "likedBy": [
            {
                "byId": "u29",
                "username": "rav.binyamin"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u21",
                "username": "ari.cooks"
            },
            {
                "byId": "u16",
                "username": "noa.plants"
            },
            {
                "byId": "u07",
                "username": "chani.home"
            },
            {
                "byId": "u13",
                "username": "rachel.life"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u18",
                "username": "leah.write"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u10",
                "username": "matan.k"
            },
            {
                "byId": "u04",
                "username": "yaakov.l"
            },
            {
                "byId": "u22",
                "username": "hadas.reads"
            },
            {
                "byId": "f221",
                "username": "seder_centerpiece"
            },
            {
                "byId": "f222",
                "username": "silver_six"
            },
            {
                "byId": "f223",
                "username": "paschal_mood"
            },
            {
                "byId": "f224",
                "username": "matzah_stack"
            },
            {
                "byId": "f225",
                "username": "family_haggadah"
            },
            {
                "byId": "f226",
                "username": "classic_with_twist"
            },
            {
                "byId": "f227",
                "username": "pesach_night"
            },
            {
                "byId": "f228",
                "username": "holiday_table"
            },
            {
                "byId": "f229",
                "username": "judaica_gallery"
            },
            {
                "byId": "f230",
                "username": "handcrafted_silver"
            },
            {
                "byId": "f231",
                "username": "modern_ornament"
            },
            {
                "byId": "f232",
                "username": "story_of_exodus"
            },
            {
                "byId": "f233",
                "username": "table_ready_now"
            },
            {
                "byId": "f234",
                "username": "kosher_design"
            }
        ]
    },
    {
        "_id": "s503",
        "txt": "כיסוי מצות רקום – עדין ומרשים 🤍",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1767020136/btuehyziqq6ypj1qbxdd.png",
        "by": {
            "byId": "u32",
            "username": "avital.judaica"
        },
        "createdAt": 1754410800000,
        "loc": {},
        "comments": [
            {
                "_id": "c5031",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "Such a gentle design. Feels like kavod.",
                "createdAt": 1754414520000
            },
            {
                "_id": "c5032",
                "byId": "u15",
                "username": "eli.scribe",
                "txt": "הרקמה נראית איכותית ממש.",
                "createdAt": 1754417940000
            },
            {
                "_id": "c5033",
                "byId": "u07",
                "username": "chani.home",
                "txt": "This is EXACTLY my style 😭✨",
                "createdAt": 1754424480000
            },
            {
                "_id": "c5034",
                "byId": "u11",
                "username": "abby.walks",
                "txt": "Minimal and meaningful.",
                "createdAt": 1754431260000
            }
        ],
        "likedBy": [
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            },
            {
                "byId": "u15",
                "username": "eli.scribe"
            },
            {
                "byId": "u07",
                "username": "chani.home"
            },
            {
                "byId": "u11",
                "username": "abby.walks"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u16",
                "username": "noa.plants"
            },
            {
                "byId": "u22",
                "username": "hadas.reads"
            },
            {
                "byId": "u05",
                "username": "sarit.m"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "f239",
                "username": "linen_love"
            },
            {
                "byId": "f240",
                "username": "embroidery_daily"
            },
            {
                "byId": "f241",
                "username": "soft_pesach"
            },
            {
                "byId": "f242",
                "username": "blue_threads"
            },
            {
                "byId": "f243",
                "username": "white_on_white"
            },
            {
                "byId": "f244",
                "username": "hiddur_home"
            },
            {
                "byId": "f245",
                "username": "matzah_cover"
            },
            {
                "byId": "f246",
                "username": "table_textiles"
            },
            {
                "byId": "f247",
                "username": "quiet_luxury"
            },
            {
                "byId": "f248",
                "username": "pesach_pretty"
            }
        ]
    },
    {
        "_id": "s504",
        "txt": "סט הבדלה – גמר שבת עם סטייל 🕯️",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1767020131/sj5e3t3hgvvgre4leggw.png",
        "by": {
            "byId": "u32",
            "username": "avital.judaica"
        },
        "createdAt": 1757018700000,
        "loc": {},
        "comments": [
            {
                "_id": "c5041",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "מהודר מאוד. נותן כבוד להבדלה.",
                "createdAt": 1757021040000
            },
            {
                "_id": "c5042",
                "byId": "u19",
                "username": "yonatan.sound",
                "txt": "The vibe is so calm.",
                "createdAt": 1757026320000
            },
            {
                "_id": "c5043",
                "byId": "u07",
                "username": "chani.home",
                "txt": "Need this for Motzaei Shabbat ✨",
                "createdAt": 1757029800000
            },
            {
                "_id": "c5044",
                "byId": "u15",
                "username": "eli.scribe",
                "txt": "עבודה נקייה ומדויקת.",
                "createdAt": 1757033880000
            }
        ],
        "likedBy": [
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u19",
                "username": "yonatan.sound"
            },
            {
                "byId": "u07",
                "username": "chani.home"
            },
            {
                "byId": "u15",
                "username": "eli.scribe"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u13",
                "username": "rachel.life"
            },
            {
                "byId": "u16",
                "username": "noa.plants"
            },
            {
                "byId": "u21",
                "username": "ari.cooks"
            },
            {
                "byId": "f257",
                "username": "havdalah_mood"
            },
            {
                "byId": "f258",
                "username": "braided_flame"
            },
            {
                "byId": "f259",
                "username": "motzei_shabbat"
            },
            {
                "byId": "f260",
                "username": "spice_box"
            },
            {
                "byId": "f261",
                "username": "silver_set"
            },
            {
                "byId": "f262",
                "username": "blue_candle"
            },
            {
                "byId": "f263",
                "username": "shabbat_ends_softly"
            }
        ]
    },
    {
        "_id": "s505",
        "txt": "מזוזות מודרניות לקיר נקי 🧡",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1767020135/wnbqnek9np9bgkgy2ajk.png",
        "by": {
            "byId": "u32",
            "username": "avital.judaica"
        },
        "createdAt": 1758735600000,
        "loc": {},
        "comments": [
            {
                "_id": "c5051",
                "byId": "u01",
                "username": "daniel.coh",
                "txt": "פשוט, נקי, עובד.",
                "createdAt": 1758738600000
            },
            {
                "_id": "c5052",
                "byId": "u16",
                "username": "noa.plants",
                "txt": "Perfect for a bright entryway.",
                "createdAt": 1758744300000
            },
            {
                "_id": "c5053",
                "byId": "u25",
                "username": "rebekah.light",
                "txt": "So tasteful!",
                "createdAt": 1758749160000
            },
            {
                "_id": "c5054",
                "byId": "u29",
                "username": "rav.binyamin",
                "txt": "Nice balance of modern and sacred.",
                "createdAt": 1758756120000
            }
        ],
        "likedBy": [
            {
                "byId": "u01",
                "username": "daniel.coh"
            },
            {
                "byId": "u16",
                "username": "noa.plants"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u29",
                "username": "rav.binyamin"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u11",
                "username": "abby.walks"
            },
            {
                "byId": "u23",
                "username": "sam.walker"
            },
            {
                "byId": "f275",
                "username": "doorway_detail"
            },
            {
                "byId": "f276",
                "username": "minimal_mezuzah"
            },
            {
                "byId": "f277",
                "username": "clean_entry"
            }
        ]
    },
    {
        "_id": "s506",
        "txt": "פמוטים לשבת – אור קטן שעושה גדול 🕯️🕯️",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1767020128/lwkiw02wxtc37t4dsjcg.png",
        "by": {
            "byId": "u32",
            "username": "avital.judaica"
        },
        "createdAt": 1760198100000,
        "loc": {},
        "comments": [
            {
                "_id": "c5061",
                "byId": "u07",
                "username": "chani.home",
                "txt": "Shabbat vibes ✨",
                "createdAt": 1760200500000
            },
            {
                "_id": "c5062",
                "byId": "u25",
                "username": "rebekah.light",
                "txt": "So elegant.",
                "createdAt": 1760205180000
            },
            {
                "_id": "c5063",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "הדר בעדינות.",
                "createdAt": 1760210100000
            },
            {
                "_id": "c5064",
                "byId": "u05",
                "username": "sarit.m",
                "txt": "מושלם למתנה!",
                "createdAt": 1760215380000
            }
        ],
        "likedBy": [
            {
                "byId": "u07",
                "username": "chani.home"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u05",
                "username": "sarit.m"
            },
            {
                "byId": "u16",
                "username": "noa.plants"
            },
            {
                "byId": "u21",
                "username": "ari.cooks"
            },
            {
                "byId": "f299",
                "username": "shabbat_candles"
            },
            {
                "byId": "f300",
                "username": "light_on_table"
            },
            {
                "byId": "f301",
                "username": "silver_pair"
            },
            {
                "byId": "f302",
                "username": "warm_friday"
            }
        ]
    },
    {
        "_id": "s507",
        "txt": "טלית רקומה – עבודת יד שמרגישים 💙",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1767020135/vmpfv6tdbivwnhaaixul.png",
        "by": {
            "byId": "u32",
            "username": "avital.judaica"
        },
        "createdAt": 1761402900000,
        "loc": {},
        "comments": [
            {
                "_id": "c5071",
                "byId": "u15",
                "username": "eli.scribe",
                "txt": "כבוד לתפילה.",
                "createdAt": 1761406500000
            },
            {
                "_id": "c5072",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "צנוע ומכובד.",
                "createdAt": 1761410700000
            },
            {
                "_id": "c5073",
                "byId": "u11",
                "username": "abby.walks",
                "txt": "Timeless.",
                "createdAt": 1761416100000
            },
            {
                "_id": "c5074",
                "byId": "u02",
                "username": "maya.levine",
                "txt": "Beautiful blue accents.",
                "createdAt": 1761420900000
            }
        ],
        "likedBy": [
            {
                "byId": "u15",
                "username": "eli.scribe"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u11",
                "username": "abby.walks"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u29",
                "username": "rav.binyamin"
            },
            {
                "byId": "f319",
                "username": "tallit_threads"
            },
            {
                "byId": "f320",
                "username": "blue_stripes"
            },
            {
                "byId": "f321",
                "username": "prayer_time"
            }
        ]
    },
    {
        "_id": "s508",
        "txt": "קרש חלה לשולחן שבת – פשוט ויפה 🍞",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1767020132/qeefauypgpdtwzrdiydw.png",
        "by": {
            "byId": "u32",
            "username": "avital.judaica"
        },
        "createdAt": 1761994200000,
        "loc": {},
        "comments": [
            {
                "_id": "c5081",
                "byId": "u21",
                "username": "ari.cooks",
                "txt": "Dream board.",
                "createdAt": 1761997800000
            },
            {
                "_id": "c5082",
                "byId": "u07",
                "username": "chani.home",
                "txt": "חייבת כזה!",
                "createdAt": 1762002600000
            },
            {
                "_id": "c5083",
                "byId": "u25",
                "username": "rebekah.light",
                "txt": "Clean and classy.",
                "createdAt": 1762007100000
            },
            {
                "_id": "c5084",
                "byId": "u20",
                "username": "tamar.moves",
                "txt": "So calming.",
                "createdAt": 1762011900000
            }
        ],
        "likedBy": [
            {
                "byId": "u21",
                "username": "ari.cooks"
            },
            {
                "byId": "u07",
                "username": "chani.home"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u20",
                "username": "tamar.moves"
            },
            {
                "byId": "f336",
                "username": "challah_board"
            },
            {
                "byId": "f337",
                "username": "shabbat_serving"
            },
            {
                "byId": "f338",
                "username": "bread_and_blessing"
            }
        ]
    },
    {
        "_id": "s509",
        "txt": "סט קידוש – כסף וכחול, שילוב מנצח 💙🥂",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1767020134/fthi2q2hbbmxe9p1lgu9.png",
        "by": {
            "byId": "u32",
            "username": "avital.judaica"
        },
        "createdAt": 1762910700000,
        "loc": {},
        "comments": [
            {
                "_id": "c5091",
                "byId": "u04",
                "username": "yaakov.l",
                "txt": "יוקרתי!",
                "createdAt": 1762913700000
            },
            {
                "_id": "c5092",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "הדר בלי רעש.",
                "createdAt": 1762919100000
            },
            {
                "_id": "c5093",
                "byId": "u18",
                "username": "leah.write",
                "txt": "So soft.",
                "createdAt": 1762924500000
            },
            {
                "_id": "c5094",
                "byId": "u22",
                "username": "hadas.reads",
                "txt": "כל הסיפור.",
                "createdAt": 1762929300000
            }
        ],
        "likedBy": [
            {
                "byId": "u04",
                "username": "yaakov.l"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u18",
                "username": "leah.write"
            },
            {
                "byId": "u22",
                "username": "hadas.reads"
            },
            {
                "byId": "f356",
                "username": "kiddush_cup"
            },
            {
                "byId": "f357",
                "username": "blue_gradient"
            }
        ]
    },
    {
        "_id": "s510",
        "txt": "בשמים להבדלה – הפרטים הקטנים שעושים הכל 🌿",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1767020128/xuuylhn6bhpbx2mggrd1.png",
        "by": {
            "byId": "u32",
            "username": "avital.judaica"
        },
        "createdAt": 1763511900000,
        "loc": {},
        "comments": [
            {
                "_id": "c5101",
                "byId": "u19",
                "username": "yonatan.sound",
                "txt": "Love the detail.",
                "createdAt": 1763514900000
            },
            {
                "_id": "c5102",
                "byId": "u31",
                "username": "rabbanit.ruth",
                "txt": "Big presence.",
                "createdAt": 1763520300000
            },
            {
                "_id": "c5103",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "עדין מאוד.",
                "createdAt": 1763525100000
            },
            {
                "_id": "c5104",
                "byId": "u23",
                "username": "sam.walker",
                "txt": "Museum piece.",
                "createdAt": 1763529900000
            }
        ],
        "likedBy": [
            {
                "byId": "u19",
                "username": "yonatan.sound"
            },
            {
                "byId": "u31",
                "username": "rabbanit.ruth"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u23",
                "username": "sam.walker"
            },
            {
                "byId": "f374",
                "username": "besamim_box"
            },
            {
                "byId": "f375",
                "username": "filigree_silver"
            }
        ]
    },
    {
        "_id": "s511",
        "txt": "נר הבדלה קלוע – אור שמסיים שבוע 🌙",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1767020130/qr3edygsev4munliauq4.png",
        "by": {
            "byId": "u32",
            "username": "avital.judaica"
        },
        "createdAt": 1764108900000,
        "loc": {},
        "comments": [
            {
                "_id": "c5111",
                "byId": "u07",
                "username": "chani.home",
                "txt": "That flame 😍",
                "createdAt": 1764111900000
            },
            {
                "_id": "c5112",
                "byId": "u28",
                "username": "rav.eitan",
                "txt": "המבדיל.",
                "createdAt": 1764116700000
            },
            {
                "_id": "c5113",
                "byId": "u25",
                "username": "rebekah.light",
                "txt": "So cozy.",
                "createdAt": 1764120900000
            },
            {
                "_id": "c5114",
                "byId": "u19",
                "username": "yonatan.sound",
                "txt": "Perfect colors.",
                "createdAt": 1764125100000
            }
        ],
        "likedBy": [
            {
                "byId": "u07",
                "username": "chani.home"
            },
            {
                "byId": "u28",
                "username": "rav.eitan"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u19",
                "username": "yonatan.sound"
            },
            {
                "byId": "f392",
                "username": "braided_candle"
            },
            {
                "byId": "f393",
                "username": "blue_flame"
            }
        ]
    },
    {
        "_id": "s512",
        "txt": "הצצה לחנות שלנו – כל המדפים מלאים יופי 😍",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1767020136/jrlv4lfr5rqhi9r2ojzf.png",
        "by": {
            "byId": "u32",
            "username": "avital.judaica"
        },
        "createdAt": 1764916800000,
        "loc": {},
        "comments": [
            {
                "_id": "c5121",
                "byId": "u02",
                "username": "maya.levine",
                "txt": "Dream store!",
                "createdAt": 1764919800000
            },
            {
                "_id": "c5122",
                "byId": "u22",
                "username": "hadas.reads",
                "txt": "המדפים 🥹",
                "createdAt": 1764924600000
            },
            {
                "_id": "c5123",
                "byId": "u25",
                "username": "rebekah.light",
                "txt": "So inviting!",
                "createdAt": 1764929400000
            },
            {
                "_id": "c5124",
                "byId": "u04",
                "username": "yaakov.l",
                "txt": "איפה זה?",
                "createdAt": 1764933600000
            }
        ],
        "likedBy": [
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "u22",
                "username": "hadas.reads"
            },
            {
                "byId": "u25",
                "username": "rebekah.light"
            },
            {
                "byId": "u04",
                "username": "yaakov.l"
            },
            {
                "byId": "f409",
                "username": "store_vibes"
            },
            {
                "byId": "f410",
                "username": "shelves_of_silver"
            }
        ]
    },
    {
        "_id": "s513",
        "txt": "יום עמוס בחנות – איזה כיף לראות אתכם! 🤍",
        "imgUrl": "https://res.cloudinary.com/picmeapp/image/upload/v1767020131/qgqawmwqfjcfilkj4tvd.png",
        "by": {
            "byId": "u32",
            "username": "avital.judaica"
        },
        "createdAt": 1765607400000,
        "loc": {},
        "comments": [
            {
                "_id": "c5131",
                "byId": "u13",
                "username": "rachel.life",
                "txt": "Amazing energy!",
                "createdAt": 1765610400000
            },
            {
                "_id": "c5132",
                "byId": "u30",
                "username": "rabbanit.noa",
                "txt": "קהילה חיה.",
                "createdAt": 1765615200000
            },
            {
                "_id": "c5133",
                "byId": "u29",
                "username": "rav.binyamin",
                "txt": "תורה במרחב חי.",
                "createdAt": 1765620000000
            },
            {
                "_id": "c5134",
                "byId": "u02",
                "username": "maya.levine",
                "txt": "So lively 😄",
                "createdAt": 1765624200000
            }
        ],
        "likedBy": [
            {
                "byId": "u13",
                "username": "rachel.life"
            },
            {
                "byId": "u30",
                "username": "rabbanit.noa"
            },
            {
                "byId": "u29",
                "username": "rav.binyamin"
            },
            {
                "byId": "u02",
                "username": "maya.levine"
            },
            {
                "byId": "f429",
                "username": "busy_store_day"
            },
            {
                "byId": "f430",
                "username": "community_shopping"
            }
        ]
    }

]
_createStories()

async function query(filterBy = {}) {

    const stories = await storageService.query(STORAGE_KEY)
    var filteredStories = [...stories]

    if (filterBy.userId) {
        filteredStories = filteredStories.filter(story => story.by.byId == filterBy.userId)
    }

    return filteredStories.sort((a, b) => b.createdAt - a.createdAt)
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {

    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
    let savedStory

    if (story._id) {
        const storyToSave = { ...story }
        savedStory = await storageService.put(STORAGE_KEY, storyToSave)

    } else {
        let storyToSave = { ...story }
        const user = userService.getLoggedinUser()

        storyToSave._id = makeId()
        // Later, owner is set by the backend
        storyToSave.by = { byId: user._id, username: user.username }
        storyToSave.createdAt = Date.now()

        savedStory = await storageService.post(STORAGE_KEY, storyToSave)
    }
    return savedStory
}

async function addStoryComment(storyId, txt) {
    // Later, this is all done by the backend
    const story = await getById(storyId)
    const user = userService.getLoggedinUser()

    const comment = {
        _id: makeId(),
        byId: user._id,
        username: user.username,
        txt: txt,
        createdAt: Date.now()
    }

    const updatedStory = {
        ...story,
        comments: [...story.comments, comment]
    }

    await storageService.put(STORAGE_KEY, updatedStory)

    return updatedStory
}

export function toggleStoryLike(story, user) {
    const alreadyLiked = story.likedBy.some(u => u.byId === user._id)

    const likedBy = alreadyLiked
        ? story.likedBy.filter(u => u.byId !== user._id)
        : [...story.likedBy, { byId: user._id, username: user.username }]

    return {
        ...story,
        likedBy
    }
}

/////////////////////////////////////////////////////////

function _createStories() {
    let stories = loadFromStorage(STORAGE_KEY)
    if (!stories || !stories.length) {
        stories = gStories
        saveToStorage(STORAGE_KEY, stories)
    }
}