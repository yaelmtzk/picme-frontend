
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

const gStories = [
    {
        _id: 's301',
        txt: 'New ceramic mezuzah prototype. Hand-glazed, inspired by old Jerusalem tiles.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766866659/mwvsdd1luehnp8qmcux8.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1728902400000,
        loc: { city: 'Jerusalem' },

        comments: [
            {
                _id: 'c301',
                byId: 'u02',
                username: 'maya.levine',
                txt: 'This feels so timeless.',
                createdAt: 1728906000000
            },
            {
                _id: 'c302',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'That was exactly the intention 🤍',
                createdAt: 1728907800000
            },
            {
                _id: 'c303',
                byId: 'u28',
                username: 'rav.eitan',
                txt: 'הידור מצווה בצורה עדינה ועמוקה.',
                createdAt: 1728910200000
            },
            {
                _id: 'c304',
                byId: 'u13',
                username: 'chaya.design',
                txt: 'The glaze texture is beautiful.',
                createdAt: 1728913800000
            },
            {
                _id: 'c305',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'Thank you! Took a few failed attempts to get it right.',
                createdAt: 1728915600000
            },
            {
                _id: 'c306',
                byId: 'u30',
                username: 'rabbanit.noa',
                txt: 'יש כאן חיבור עמוק לבית יהודי.',
                createdAt: 1728918600000
            }
        ],

        likedBy: [
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u04', username: 'noam.harel' },
            { byId: 'u05', username: 'sara.gold' },
            { byId: 'u06', username: 'eli.shapira' },
            { byId: 'u07', username: 'rachel.katz' },
            { byId: 'u08', username: 'avi.roth' },
            { byId: 'u09', username: 'tamar.weiss' },
            { byId: 'u10', username: 'levi.benari' },
            { byId: 'u11', username: 'michelle.j' },
            { byId: 'u12', username: 'yonatan.m' },
            { byId: 'u13', username: 'chaya.design' },
            { byId: 'u14', username: 'adam.fried' },
            { byId: 'u15', username: 'esther.k' },
            { byId: 'u16', username: 'moshe.r' },
            { byId: 'u17', username: 'yosef.learns' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u19', username: 'hadas.oz' },
            { byId: 'u20', username: 'danielle.a' },
            { byId: 'u21', username: 'yossi.n' },
            { byId: 'u22', username: 'leah.s' },
            { byId: 'u28', username: 'rav.eitan' },
            { byId: 'u30', username: 'rabbanit.noa' }
        ],

        tags: ['judaica', 'mezuzah', 'design']
    },

    {
        _id: 's302',
        txt: 'Friday cooking. American recipes slowly learning to speak Hebrew.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766866901/jox0xmh8lxs3pborluiy.jpg',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1730505600000,
        loc: { city: 'Jerusalem' },

        comments: [
            {
                _id: 'c311',
                byId: 'u01',
                username: 'daniel.coh',
                txt: 'Looks dangerously good.',
                createdAt: 1730509200000
            },
            {
                _id: 'c312',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'It didn’t survive Shabbat 😅',
                createdAt: 1730511000000
            },
            {
                _id: 'c313',
                byId: 'u24',
                username: 'miriam.k',
                txt: 'מתכון?',
                createdAt: 1730514400000
            },
            {
                _id: 'c314',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'אעלה בסטורי השבוע 🙌',
                createdAt: 1730517000000
            },
            {
                _id: 'c315',
                byId: 'u31',
                username: 'rabbanit.ruth',
                txt: 'אוכל שמחבר בין עולמות.',
                createdAt: 1730519800000
            }
        ],

        likedBy: [
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u07', username: 'rachel.katz' },
            { byId: 'u09', username: 'tamar.weiss' },
            { byId: 'u11', username: 'michelle.j' },
            { byId: 'u12', username: 'yonatan.m' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u20', username: 'danielle.a' },
            { byId: 'u24', username: 'miriam.k' },
            { byId: 'u25', username: 'itay.p' },
            { byId: 'u31', username: 'rabbanit.ruth' }
        ],

        tags: ['food', 'shabbat', 'life']
    },
    {
        _id: 's306',
        txt: 'A quiet walk through Rehavia before sunset. Jerusalem slows you down in the best way.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766867189/r2zmomjmptvvnhv0zej0.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1727604000000,
        loc: { city: 'Jerusalem' },

        comments: [
            {
                _id: 'c361',
                byId: 'u17',
                username: 'yosef.learns',
                txt: 'I miss these streets so much.',
                createdAt: 1727607600000
            },
            {
                _id: 'c362',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'They have a way of holding you.',
                createdAt: 1727609400000
            },
            {
                _id: 'c363',
                byId: 'u09',
                username: 'tamar.weiss',
                txt: 'איזו שלווה בתמונה.',
                createdAt: 1727612400000
            },
            {
                _id: 'c364',
                byId: 'u30',
                username: 'rabbanit.noa',
                txt: 'הליכה היא לפעמים תפילה.',
                createdAt: 1727615400000
            },
            {
                _id: 'c365',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'כן. ממש ככה.',
                createdAt: 1727617200000
            }
        ],

        likedBy: [
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u05', username: 'sara.gold' },
            { byId: 'u07', username: 'rachel.katz' },
            { byId: 'u09', username: 'tamar.weiss' },
            { byId: 'u11', username: 'michelle.j' },
            { byId: 'u12', username: 'yonatan.m' },
            { byId: 'u15', username: 'esther.k' },
            { byId: 'u17', username: 'yosef.learns' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u20', username: 'danielle.a' },
            { byId: 'u22', username: 'leah.s' },
            { byId: 'u24', username: 'miriam.k' },
            { byId: 'u27', username: 'aaron.c' },
            { byId: 'u30', username: 'rabbanit.noa' }
        ],

        tags: ['jerusalem', 'life', 'photography']
    },

    {
        _id: 's307',
        txt: 'Learning Rav Kook tonight. So much compassion woven into his halachic thought.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766867635/jfqwlurzw0asn9rcujgl.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1731207600000,
        loc: {},

        comments: [
            {
                _id: 'c371',
                byId: 'u29',
                username: 'rav.binyamin',
                txt: 'רב קוק ראה את האור גם במקומות הסדוקים.',
                createdAt: 1731211200000
            },
            {
                _id: 'c372',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'That’s exactly what I feel reading him.',
                createdAt: 1731213000000
            },
            {
                _id: 'c373',
                byId: 'u31',
                username: 'rabbanit.ruth',
                txt: 'His Torah makes space for the soul.',
                createdAt: 1731216000000
            },
            {
                _id: 'c374',
                byId: 'u12',
                username: 'yonatan.m',
                txt: 'Any specific sefer you recommend?',
                createdAt: 1731219000000
            },
            {
                _id: 'c375',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'Orot HaTeshuvah has been transformative for me.',
                createdAt: 1731220800000
            }
        ],

        likedBy: [
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u04', username: 'noam.harel' },
            { byId: 'u08', username: 'avi.roth' },
            { byId: 'u10', username: 'levi.benari' },
            { byId: 'u12', username: 'yonatan.m' },
            { byId: 'u16', username: 'moshe.r' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u21', username: 'yossi.n' },
            { byId: 'u23', username: 'ben.z' },
            { byId: 'u26', username: 'shlomit.v' },
            { byId: 'u28', username: 'rav.eitan' },
            { byId: 'u29', username: 'rav.binyamin' },
            { byId: 'u31', username: 'rabbanit.ruth' }
        ],

        tags: ['halachah', 'rav-kook', 'learning']
    },

    {
        _id: 's308',
        txt: 'Testing pigments for a new Havdalah set. Color matters more than I ever realized.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766867623/o7jzlnrpxjizt1kiajcd.jpg',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1729801200000,
        loc: {},

        comments: [
            {
                _id: 'c381',
                byId: 'u13',
                username: 'chaya.design',
                txt: 'These tones feel very grounded.',
                createdAt: 1729804800000
            },
            {
                _id: 'c382',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'I wanted something calm, not dramatic.',
                createdAt: 1729806600000
            },
            {
                _id: 'c383',
                byId: 'u05',
                username: 'sara.gold',
                txt: 'Would totally use this every week.',
                createdAt: 1729809600000
            }
        ],

        likedBy: [
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u03', username: 'shira.avt' }, // self-like is realistic on IG
            { byId: 'u06', username: 'eli.shapira' },
            { byId: 'u08', username: 'avi.roth' },
            { byId: 'u11', username: 'michelle.j' },
            { byId: 'u13', username: 'chaya.design' },
            { byId: 'u15', username: 'esther.k' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u20', username: 'danielle.a' },
            { byId: 'u25', username: 'itay.p' }
        ],

        tags: ['design', 'judaica', 'havdalah']
    },

    {
        _id: 's309',
        txt: 'Some days aliyah feels heroic. Other days it’s just bureaucracy and missing family.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766868181/gox6e4qcnrp0d5gl3ntp.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1728406800000,
        loc: { city: 'Jerusalem' },

        comments: [
            {
                _id: 'c391',
                byId: 'u30',
                username: 'rabbanit.noa',
                txt: 'This is so honest.',
                createdAt: 1728410400000
            },
            {
                _id: 'c392',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'Trying to keep it real.',
                createdAt: 1728412200000
            },
            {
                _id: 'c393',
                byId: 'u31',
                username: 'rabbanit.ruth',
                txt: 'געגוע הוא גם חלק מהבניין.',
                createdAt: 1728415600000
            },
            {
                _id: 'c394',
                byId: 'u02',
                username: 'maya.levine',
                txt: 'We’re always here for you.',
                createdAt: 1728418600000
            }
        ],

        likedBy: [
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u07', username: 'rachel.katz' },
            { byId: 'u09', username: 'tamar.weiss' },
            { byId: 'u12', username: 'yonatan.m' },
            { byId: 'u17', username: 'yosef.learns' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u22', username: 'leah.s' },
            { byId: 'u31', username: 'rabbanit.ruth' }
        ],

        tags: ['aliyah', 'life', 'honesty']
    },

    {
        _id: 's310',
        txt: 'Prepping the house for Tishrei 🍯 Every detail feels like a prayer.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766868816/fghyxpmzbrrclil99epw.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1730000400000,
        loc: {},

        comments: [
            {
                _id: 'c401',
                byId: 'u28',
                username: 'rav.eitan',
                txt: 'הכנה היא כבר עבודת הלב.',
                createdAt: 1730004000000
            },
            {
                _id: 'c402',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'Preparing helps me slow down.',
                createdAt: 1730006400000
            },
            {
                _id: 'c403',
                byId: 'u20',
                username: 'danielle.a',
                txt: 'Your home always feels warm.',
                createdAt: 1730009000000
            }
        ],

        likedBy: [
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u06', username: 'eli.shapira' },
            { byId: 'u10', username: 'levi.benari' },
            { byId: 'u15', username: 'esther.k' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u20', username: 'danielle.a' },
            { byId: 'u28', username: 'rav.eitan' },
            { byId: 'u30', username: 'rabbanit.noa' }
        ],

        tags: ['holidays', 'tishrei', 'home']
    },
    {
        _id: 's311',
        txt: 'Tonight’s writing was about marriage — not the fairytale, but the daily choosing each other.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766869257/kuuyj5nahaqicnk1c63j.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1731603600000,
        loc: {},

        comments: [
            {
                _id: 'c411',
                byId: 'u31',
                username: 'rabbanit.ruth',
                txt: 'שלום בית נבנה בפרטים הקטנים.',
                createdAt: 1731607200000
            },
            {
                _id: 'c412',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'That’s exactly what I’m trying to capture.',
                createdAt: 1731609000000
            },
            {
                _id: 'c413',
                byId: 'u12',
                username: 'yonatan.m',
                txt: 'Looking forward to reading this.',
                createdAt: 1731612000000
            },
            {
                _id: 'c414',
                byId: 'u02',
                username: 'maya.levine',
                txt: 'Your honesty is powerful.',
                createdAt: 1731615600000
            },
            {
                _id: 'c415',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'Means a lot 🤍',
                createdAt: 1731617400000
            }
        ],

        likedBy: [
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u07', username: 'rachel.katz' },
            { byId: 'u09', username: 'tamar.weiss' },
            { byId: 'u12', username: 'yonatan.m' },
            { byId: 'u15', username: 'esther.k' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u22', username: 'leah.s' },
            { byId: 'u30', username: 'rabbanit.noa' },
            { byId: 'u31', username: 'rabbanit.ruth' }
        ],

        tags: ['writing', 'marriage', 'shalom-bayit']
    },

    {
        _id: 's312',
        txt: 'A small watercolor study between client projects. Sometimes the hands need freedom.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766868515/e5ngximexn5edmcyqbti.jpg',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1727104800000,
        loc: {},

        comments: [
            {
                _id: 'c421',
                byId: 'u13',
                username: 'chaya.design',
                txt: 'This feels very you.',
                createdAt: 1727108400000
            },
            {
                _id: 'c422',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'It felt grounding to paint.',
                createdAt: 1727110200000
            },
            {
                _id: 'c423',
                byId: 'u05',
                username: 'sara.gold',
                txt: 'Love the softness.',
                createdAt: 1727113200000
            }
        ],

        likedBy: [
            { byId: 'u05', username: 'sara.gold' },
            { byId: 'u08', username: 'avi.roth' },
            { byId: 'u11', username: 'michelle.j' },
            { byId: 'u13', username: 'chaya.design' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u20', username: 'danielle.a' },
            { byId: 'u24', username: 'miriam.k' }
        ],

        tags: ['art', 'painting', 'process']
    },

    {
        _id: 's313',
        txt: 'Learning about chinuch tonight. Children don’t need perfection — they need presence.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766869639/idtysxjwkezkavyowmux.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1762436400000,
        loc: {},

        comments: [
            {
                _id: 'c431',
                byId: 'u29',
                username: 'rav.binyamin',
                txt: 'חינוך מתחיל בדוגמה אישית.',
                createdAt: 1762440000000
            },
            {
                _id: 'c432',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'That’s been my biggest takeaway.',
                createdAt: 1762442400000
            },
            {
                _id: 'c433',
                byId: 'u17',
                username: 'yosef.learns',
                txt: 'Such an important reminder.',
                createdAt: 1762445400000
            },
            {
                _id: 'c434',
                byId: 'u30',
                username: 'rabbanit.noa',
                txt: 'נוכחות יוצרת ביטחון.',
                createdAt: 1762448400000
            }
        ],

        likedBy: [
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u06', username: 'eli.shapira' },
            { byId: 'u09', username: 'tamar.weiss' },
            { byId: 'u12', username: 'yonatan.m' },
            { byId: 'u17', username: 'yosef.learns' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u29', username: 'rav.binyamin' },
            { byId: 'u30', username: 'rabbanit.noa' }
        ],

        tags: ['education', 'chinuch', 'learning']
    }
    ,

    {
        _id: 's314',
        txt: 'Sketching a new spice box for Havdalah. Form follows ritual.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766869152/i2fgqnvul7gymudov0p6.jpg',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1729501200000,
        loc: {},

        comments: [
            {
                _id: 'c441',
                byId: 'u28',
                username: 'rav.eitan',
                txt: 'הריח מחבר בין גוף לנשמה.',
                createdAt: 1729504800000
            },
            {
                _id: 'c442',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'That’s the idea behind the shape.',
                createdAt: 1729506600000
            },
            {
                _id: 'c443',
                byId: 'u13',
                username: 'chaya.design',
                txt: 'Can’t wait to see the final version.',
                createdAt: 1729509600000
            }
        ],

        likedBy: [
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u06', username: 'eli.shapira' },
            { byId: 'u10', username: 'levi.benari' },
            { byId: 'u13', username: 'chaya.design' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u28', username: 'rav.eitan' }
        ],

        tags: ['judaica', 'design', 'havdalah']
    },

    {
        _id: 's315',
        txt: 'A simple dinner, a full table, quiet gratitude.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766869562/xws1ajte7uvmmjcyqtwq.jpg',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1728301200000,
        loc: { city: 'Jerusalem' },

        comments: [
            {
                _id: 'c451',
                byId: 'u20',
                username: 'danielle.a',
                txt: 'This feels so warm.',
                createdAt: 1728304800000
            },
            {
                _id: 'c452',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'Some nights are just about being together.',
                createdAt: 1728306600000
            },
            {
                _id: 'c453',
                byId: 'u02',
                username: 'maya.levine',
                txt: 'Miss these dinners.',
                createdAt: 1728309600000
            }
        ],

        likedBy: [
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u07', username: 'rachel.katz' },
            { byId: 'u11', username: 'michelle.j' },
            { byId: 'u15', username: 'esther.k' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u20', username: 'danielle.a' }
        ],

        tags: ['life', 'home', 'gratitude']
    },
    {
        _id: 's316',
        txt: 'Learning a little Kabbalah tonight. Not to understand everything — just to soften the heart.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766876231/hbijhvmhp85ogqnqmynl.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1732100400000,
        loc: {},

        comments: [
            {
                _id: 'c461',
                byId: 'u29',
                username: 'rav.binyamin',
                txt: 'הלימוד פועל גם כשהשכל עוד לא תופס.',
                createdAt: 1732104000000
            },
            {
                _id: 'c462',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'That’s comforting to hear.',
                createdAt: 1732105800000
            },
            {
                _id: 'c463',
                byId: 'u31',
                username: 'rabbanit.ruth',
                txt: 'פתיחת הלב היא כבר התחלה.',
                createdAt: 1732108800000
            },
            {
                _id: 'c464',
                byId: 'u12',
                username: 'yonatan.m',
                txt: 'Any recommendations for beginners?',
                createdAt: 1732111800000
            },
            {
                _id: 'c465',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'Slow learning, good teacher, lots of patience.',
                createdAt: 1732113600000
            }
        ],

        likedBy: [
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u06', username: 'eli.shapira' },
            { byId: 'u09', username: 'tamar.weiss' },
            { byId: 'u12', username: 'yonatan.m' },
            { byId: 'u17', username: 'yosef.learns' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u29', username: 'rav.binyamin' },
            { byId: 'u31', username: 'rabbanit.ruth' }
        ],

        tags: ['kabbalah', 'learning', 'inner-work']
    },

    {
        _id: 's317',
        txt: 'Preparing for Shavuot 🌾 Cleaning the studio, clearing the mind.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766876971/d9s9x09uyjjvoz7uooy5.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1730307600000,
        loc: { city: 'Jerusalem' },

        comments: [
            {
                _id: 'c471',
                byId: 'u28',
                username: 'rav.eitan',
                txt: 'הכנה היא חלק מהקבלה.',
                createdAt: 1730311200000
            },
            {
                _id: 'c472',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'Exactly how it feels.',
                createdAt: 1730313000000
            },
            {
                _id: 'c473',
                byId: 'u20',
                username: 'danielle.a',
                txt: 'Your studio always looks peaceful.',
                createdAt: 1730316000000
            },
            {
                _id: 'c474',
                byId: 'u30',
                username: 'rabbanit.noa',
                txt: 'קבלת התורה מתחילה בניקוי הלב.',
                createdAt: 1730319000000
            }
        ],

        likedBy: [
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u06', username: 'eli.shapira' },
            { byId: 'u10', username: 'levi.benari' },
            { byId: 'u15', username: 'esther.k' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u20', username: 'danielle.a' },
            { byId: 'u28', username: 'rav.eitan' },
            { byId: 'u30', username: 'rabbanit.noa' }
        ],

        tags: ['shavuot', 'holidays', 'preparation']
    },

    {
        _id: 's318',
        txt: 'An early chapter from the book — about leaving New York, and realizing comfort isn’t the same as belonging.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766871007/cniimpq8tfzmzqubl6qw.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1763343600000,
        loc: {},

        comments: [
            {
                _id: 'c481',
                byId: 'u02',
                username: 'maya.levine',
                txt: 'This is so brave to share.',
                createdAt: 1763347200000
            },
            {
                _id: 'c482',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'It feels vulnerable, but necessary.',
                createdAt: 1763349000000
            },
            {
                _id: 'c483',
                byId: 'u30',
                username: 'rabbanit.noa',
                txt: 'I recognize myself in this.',
                createdAt: 1763352000000
            },
            {
                _id: 'c484',
                byId: 'u31',
                username: 'rabbanit.ruth',
                txt: 'סיפור אישי שמאיר דרך לרבים.',
                createdAt: 1763355000000
            }
        ],

        likedBy: [
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u07', username: 'rachel.katz' },
            { byId: 'u09', username: 'tamar.weiss' },
            { byId: 'u12', username: 'yonatan.m' },
            { byId: 'u17', username: 'yosef.learns' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u22', username: 'leah.s' },
            { byId: 'u31', username: 'rabbanit.ruth' }
        ],

        tags: ['writing', 'aliyah', 'teshuvah']
    }
    ,

    {
        _id: 's319',
        txt: 'Hands covered in clay, mind completely quiet. Craft is a form of prayer for me.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766870898/iiakqjk42y5dhirjvgsf.jpg',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1729003200000,
        loc: {},

        comments: [
            {
                _id: 'c491',
                byId: 'u13',
                username: 'chaya.design',
                txt: 'I feel this so much.',
                createdAt: 1729006800000
            },
            {
                _id: 'c492',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'It’s where everything slows down.',
                createdAt: 1729008600000
            },
            {
                _id: 'c493',
                byId: 'u05',
                username: 'sara.gold',
                txt: 'Your work always feels intentional.',
                createdAt: 1729011600000
            }
        ],

        likedBy: [
            { byId: 'u05', username: 'sara.gold' },
            { byId: 'u08', username: 'avi.roth' },
            { byId: 'u11', username: 'michelle.j' },
            { byId: 'u13', username: 'chaya.design' },
            { byId: 'u18', username: 'samuel.l' }
        ],

        tags: ['craft', 'ceramics', 'process']
    },

    {
        _id: 's320',
        txt: 'A short teaching I keep returning to: holiness lives in consistency, not intensity.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766875073/orci5kdxcr2aomukm5pr.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1730701200000,
        loc: {},

        comments: [
            {
                _id: 'c501',
                byId: 'u28',
                username: 'rav.eitan',
                txt: 'עבודה יומיומית היא יסוד הקדושה.',
                createdAt: 1730704800000
            },
            {
                _id: 'c502',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'This reframed so much for me.',
                createdAt: 1730706600000
            },
            {
                _id: 'c503',
                byId: 'u12',
                username: 'yonatan.m',
                txt: 'Needed this reminder today.',
                createdAt: 1730709600000
            }
        ],

        likedBy: [
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u06', username: 'eli.shapira' },
            { byId: 'u10', username: 'levi.benari' },
            { byId: 'u12', username: 'yonatan.m' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u28', username: 'rav.eitan' }
        ],

        tags: ['halachah', 'growth', 'daily-life']
    },

    {
        _id: 's321',
        txt: 'Jerusalem mornings hit differently. The light, the quiet, the feeling that the day is already holding you.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766871099/ldy3nxursn4w6xnt5r96.jpg',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1729603200000,
        loc: { city: 'Jerusalem' },

        comments: [
            {
                _id: 'c511',
                byId: 'u06',
                username: 'eli.shapira',
                txt: 'אין כמו אור ירושלמי.',
                createdAt: 1729606800000
            },
            {
                _id: 'c512',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'Every morning feels like a gift.',
                createdAt: 1729608600000
            },
            {
                _id: 'c513',
                byId: 'u22',
                username: 'leah.s',
                txt: 'Miss this city so much.',
                createdAt: 1729611600000
            },
            {
                _id: 'c514',
                byId: 'u31',
                username: 'rabbanit.ruth',
                txt: 'העיר שמחנכת את הנשמה.',
                createdAt: 1729613400000
            }
        ],

        likedBy: [
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u06', username: 'eli.shapira' },
            { byId: 'u09', username: 'tamar.weiss' },
            { byId: 'u15', username: 'esther.k' },
            { byId: 'u22', username: 'leah.s' },
            { byId: 'u31', username: 'rabbanit.ruth' }
        ],

        tags: ['jerusalem', 'daily-life', 'israel']
    },

    {
        _id: 's322',
        txt: 'Working on a new siddur case inspired by ירושלים של מעלה ושל מטה.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766872124/jsg19ktzmyk9uackxhbj.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1730404800000,
        loc: {},

        comments: [
            {
                _id: 'c521',
                byId: 'u13',
                username: 'chaya.design',
                txt: 'The concept sounds beautiful already.',
                createdAt: 1730408400000
            },
            {
                _id: 'c522',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'Trying to translate holiness into form.',
                createdAt: 1730410200000
            },
            {
                _id: 'c523',
                byId: 'u28',
                username: 'rav.eitan',
                txt: 'אשריך שאת מחברת הלכה ואמנות.',
                createdAt: 1730413200000
            }
        ],

        likedBy: [
            { byId: 'u05', username: 'sara.gold' },
            { byId: 'u08', username: 'avi.roth' },
            { byId: 'u11', username: 'michelle.j' },
            { byId: 'u13', username: 'chaya.design' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u28', username: 'rav.eitan' }
        ],

        tags: ['judaica', 'mezuzah', 'design']
    },

    {
        _id: 's323',
        txt: 'Tonight’s learning was about shalom bayit — not as perfection, but as commitment.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766874741/n821zr9brr2jfiqawij4.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1731207600000,
        loc: {},

        comments: [
            {
                _id: 'c531',
                byId: 'u30',
                username: 'rabbanit.noa',
                txt: 'שלום בית נבנה מבחירות קטנות יומיומיות.',
                createdAt: 1731211200000
            },
            {
                _id: 'c532',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'That perspective changed everything for me.',
                createdAt: 1731213000000
            },
            {
                _id: 'c533',
                byId: 'u20',
                username: 'danielle.a',
                txt: 'So important, thank you for sharing.',
                createdAt: 1731216000000
            }
        ],

        likedBy: [
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u06', username: 'eli.shapira' },
            { byId: 'u15', username: 'esther.k' },
            { byId: 'u20', username: 'danielle.a' },
            { byId: 'u30', username: 'rabbanit.noa' }
        ],

        tags: ['shalom-bayit', 'learning', 'marriage']
    },

    {
        _id: 's324',
        txt: 'Recipe from my kitchen tonight — simple lentil soup, Jerusalem winter style 🥣',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766866070/hd1ophielc9outtz294r.jpg',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1729305600000,
        loc: {},

        comments: [
            {
                _id: 'c541',
                byId: 'u05',
                username: 'sara.gold',
                txt: 'Looks comforting!',
                createdAt: 1729309200000
            },
            {
                _id: 'c542',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'Perfect for cold evenings.',
                createdAt: 1729311000000
            },
            {
                _id: 'c543',
                byId: 'u09',
                username: 'tamar.weiss',
                txt: 'Can you share the spices?',
                createdAt: 1729314000000
            },
            {
                _id: 'c544',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'Cumin, turmeric, garlic, and lots of patience 🙂',
                createdAt: 1729315800000
            }
        ],

        likedBy: [
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u05', username: 'sara.gold' },
            { byId: 'u09', username: 'tamar.weiss' },
            { byId: 'u12', username: 'yonatan.m' },
            { byId: 'u18', username: 'samuel.l' }
        ],

        tags: ['food', 'recipe', 'home']
    },

    {
        _id: 's325',
        txt: 'Another page written tonight. Writing about teshuvah feels like walking barefoot — honest, sometimes uncomfortable, always real.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766874435/vsc4j7qjcgeqqfe01huo.jpg',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1731600000000,
        loc: {},

        comments: [
            {
                _id: 'c551',
                byId: 'u30',
                username: 'rabbanit.noa',
                txt: 'Your words give courage.',
                createdAt: 1731603600000
            },
            {
                _id: 'c552',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'That means more than you know.',
                createdAt: 1731605400000
            },
            {
                _id: 'c553',
                byId: 'u31',
                username: 'rabbanit.ruth',
                txt: 'הכנות כזו פותחת לבבות.',
                createdAt: 1731608400000
            }
        ],

        likedBy: [
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u07', username: 'rachel.katz' },
            { byId: 'u12', username: 'yonatan.m' },
            { byId: 'u17', username: 'yosef.learns' },
            { byId: 'u22', username: 'leah.s' },
            { byId: 'u31', username: 'rabbanit.ruth' }
        ],

        tags: ['writing', 'teshuvah', 'personal']
    },

    {
        _id: 's326',
        txt: 'Preparing for Sukkot always reminds me how temporary everything really is — and how much joy can live inside simplicity.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766872116/hk44n47jeezpol6wacb3.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1730008800000,
        loc: { city: 'Jerusalem' },

        comments: [
            {
                _id: 'c561',
                byId: 'u14',
                username: 'moshe.b',
                txt: 'סוכה מחזקת אמונה.',
                createdAt: 1730012400000
            },
            {
                _id: 'c562',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'Every year I feel it deeper.',
                createdAt: 1730014200000
            },
            {
                _id: 'c563',
                byId: 'u26',
                username: 'yael.h',
                txt: 'Love how you put this into words.',
                createdAt: 1730017200000
            }
        ],

        likedBy: [
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u06', username: 'eli.shapira' },
            { byId: 'u14', username: 'moshe.b' },
            { byId: 'u18', username: 'samuel.l' },
            { byId: 'u26', username: 'yael.h' }
        ],

        tags: ['sukkot', 'emunah', 'holidays']
    },

    {
        _id: 's327',
        txt: 'A quiet walk through Nachlaot today. Sometimes photography is just listening with your eyes.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766872893/yfetqt2o9f0plrzjedxm.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1728702000000,
        loc: { city: 'Jerusalem' },

        comments: [
            {
                _id: 'c571',
                byId: 'u09',
                username: 'tamar.weiss',
                txt: 'The colors feel alive.',
                createdAt: 1728705600000
            },
            {
                _id: 'c572',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'Jerusalem speaks softly if you slow down.',
                createdAt: 1728707400000
            },
            {
                _id: 'c573',
                byId: 'u21',
                username: 'noam.r',
                txt: 'You captured the soul of the alley.',
                createdAt: 1728710200000
            }
        ],

        likedBy: [
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u09', username: 'tamar.weiss' },
            { byId: 'u11', username: 'michelle.j' },
            { byId: 'u21', username: 'noam.r' },
            { byId: 'u24', username: 'david.ya' }
        ],

        tags: ['photography', 'jerusalem', 'street']
    },

    {
        _id: 's328',
        txt: 'Learning Tanya this week — the idea that the struggle itself is precious is something I wish I knew years ago.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766873234/kjrmenutvinx6mnwk61b.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1730905200000,
        loc: {},

        comments: [
            {
                _id: 'c581',
                byId: 'u28',
                username: 'rav.eitan',
                txt: 'זו יסוד גדול בעבודת ה׳.',
                createdAt: 1730908800000
            },
            {
                _id: 'c582',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'It reframes everything.',
                createdAt: 1730910600000
            },
            {
                _id: 'c583',
                byId: 'u31',
                username: 'rabbanit.ruth',
                txt: 'So empowering, especially for baalei teshuvah.',
                createdAt: 1730913600000
            }
        ],

        likedBy: [
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u06', username: 'eli.shapira' },
            { byId: 'u15', username: 'esther.k' },
            { byId: 'u28', username: 'rav.eitan' },
            { byId: 'u31', username: 'rabbanit.ruth' }
        ],

        tags: ['tanya', 'chasidut', 'learning']
    },

    {
        _id: 's329',
        txt: 'Design sketch for a challah board inspired by the concept of kavod Shabbat.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766872380/ei3wcairo4sfb0zebogo.png',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1727803200000,
        loc: {},

        comments: [
            {
                _id: 'c591',
                byId: 'u13',
                username: 'chaya.design',
                txt: 'This feels both modern and timeless.',
                createdAt: 1727806800000
            },
            {
                _id: 'c592',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'That balance is always the goal.',
                createdAt: 1727808600000
            },
            {
                _id: 'c593',
                byId: 'u08',
                username: 'avi.roth',
                txt: 'Would love to see this in wood.',
                createdAt: 1727811400000
            }
        ],

        likedBy: [
            { byId: 'u05', username: 'sara.gold' },
            { byId: 'u08', username: 'avi.roth' },
            { byId: 'u13', username: 'chaya.design' },
            { byId: 'u18', username: 'samuel.l' }
        ],

        tags: ['shabbat', 'judaica', 'design']
    },

    {
        _id: 's330',
        txt: 'From America to Israel, from confusion to clarity — this chapter of the book feels like closing a circle.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766872586/l9d4wdgqy3qovuimlgql.jpg',
        by: { byId: 'u03', username: 'shira.avt' },
        createdAt: 1732003200000,
        loc: {},

        comments: [
            {
                _id: 'c601',
                byId: 'u18',
                username: 'leah.write',
                txt: 'Your journey gives hope.',
                createdAt: 1732006800000
            },
            {
                _id: 'c602',
                byId: 'u03',
                username: 'shira.avt',
                txt: 'I’m writing it for all of us.',
                createdAt: 1732008600000
            },
            {
                _id: 'c603',
                byId: 'u22',
                username: 'leah.s',
                txt: 'Can’t wait to read this.',
                createdAt: 1732011400000
            },
            {
                _id: 'c604',
                byId: 'u30',
                username: 'rabbanit.noa',
                txt: 'סיפור כזה יכול לשנות חיים.',
                createdAt: 1732013200000
            }
        ],

        likedBy: [
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u07', username: 'rachel.katz' },
            { byId: 'u17', username: 'ruth.b' },
            { byId: 'u22', username: 'leah.s' },
            { byId: 'u30', username: 'rabbanit.noa' }
        ],

        tags: ['aliyah', 'teshuvah', 'writing', 'life-journey']
    }
    ,
    {
        _id: 's401',
        txt: 'Lately I’ve been thinking about how much clarity matters — not just in products, but in life. When things are simple, you can actually see what matters and what doesn’t. סדר ופשטות aren’t aesthetic choices for me, they’re a way to breathe.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766924136/dknare2ogpfliny8ht1p.jpg',
        by: { byId: 'u01', username: 'daniel.coh' },
        createdAt: 1733407200000,
        loc: {},
        comments: [
            { _id: 'c701', byId: 'u02', username: 'maya.levine', txt: 'This resonates so deeply.', createdAt: 1733410800000 },
            { _id: 'c702', byId: 'u06', username: 'danny.nyc', txt: 'Clarity is underrated.', createdAt: 1733412600000 },
            { _id: 'c703', byId: 'u11', username: 'abby.walks', txt: 'Simple doesn’t mean shallow.', createdAt: 1733416200000 },
            { _id: 'c704', byId: 'u18', username: 'leah.write', txt: 'Beautifully said.', createdAt: 1733419800000 }
        ],
        likedBy: [
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u06', username: 'danny.nyc' },
            { byId: 'u08', username: 'itai.runs' },
            { byId: 'u11', username: 'abby.walks' },
            { byId: 'u18', username: 'leah.write' },
            { byId: 'u23', username: 'sam.walker' },
            { byId: 'u31', username: 'rabbanit.ruth' },
            { byId: 'f01', username: 'noam.designs' },
            { byId: 'f02', username: 'product.mindset' },
            { byId: 'f03', username: 'simple.life' }
        ]
    },
    {
        _id: 's402',
        txt: 'Visual storytelling isn’t just about beauty — it’s about honesty. Faith and creativity meet when I allow myself to see the world gently, without rushing to explain everything.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766926191/vw3qyxpbwsrzg0drce4x.png',
        by: { byId: 'u02', username: 'maya.levine' },
        createdAt: 1732154400000,
        loc: {},
        comments: [
            { _id: 'c705', byId: 'u18', username: 'leah.write', txt: 'Faith through images is powerful.', createdAt: 1732158000000 },
            { _id: 'c706', byId: 'u01', username: 'daniel.coh', txt: 'This explains your work perfectly.', createdAt: 1732161600000 },
            { _id: 'c707', byId: 'u25', username: 'rebekah.light', txt: 'So much depth here.', createdAt: 1732165200000 }
        ],
        likedBy: [
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u07', username: 'chani.home' },
            { byId: 'u11', username: 'abby.walks' },
            { byId: 'u18', username: 'leah.write' },
            { byId: 'u25', username: 'rebekah.light' },
            { byId: 'f04', username: 'visual.soul' },
            { byId: 'f05', username: 'faith.and.art' },
            { byId: 'f06', username: 'soft.frames' },
            { byId: 'f07', username: 'story.in.light' },
            { byId: 'f08', username: 'inner.canvas' }
        ]
    },
    {
        _id: 's403',
        txt: 'Morning coffee before work is sometimes the only quiet moment in the day. Between the city job and the noise of raising four kids, that cup reminds me to pause and say  תודה להשם.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766924872/zbjhfbdicceor6i9vcko.jpg',
        by: { byId: 'u04', username: 'yaakov.l' },
        createdAt: 1734609600000,
        loc: {},
        comments: [
            { _id: 'c708', byId: 'u05', username: 'sarit.m', txt: 'I feel this every morning.', createdAt: 1734613200000 },
            { _id: 'c709', byId: 'u08', username: 'itai.runs', txt: 'Those small pauses matter.', createdAt: 1734616800000 }
        ],
        likedBy: [
            { byId: 'u05', username: 'sarit.m' },
            { byId: 'u08', username: 'itai.runs' },
            { byId: 'u10', username: 'matan.k' },
            { byId: 'u24', username: 'nitzan.daily' },
            { byId: 'f09', username: 'coffee.before.life' },
            { byId: 'f10', username: 'city.dad' },
            { byId: 'f11', username: 'morning.pause' },
            { byId: 'f12', username: 'simple.moments' }
        ]
    },

    {
        _id: 's404',
        txt: 'Being a kindergarten teacher means learning every day — patience, joy, and how much wonder fits into a small hand. Between trips and songs, the הילדים remind me what presence really means.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766925153/dwhowrtqq9i2zpg1isvq.jpg',
        by: { byId: 'u05', username: 'sarit.m' },
        createdAt: 1731225600000,
        loc: {},
        comments: [
            { _id: 'c710', byId: 'u09', username: 'rivky.teacher', txt: 'So true. Kids are the best teachers.', createdAt: 1731229200000 },
            { _id: 'c711', byId: 'u13', username: 'rachel.life', txt: 'You do holy work.', createdAt: 1731232800000 }
        ],
        likedBy: [
            { byId: 'u09', username: 'rivky.teacher' },
            { byId: 'u13', username: 'rachel.life' },
            { byId: 'u07', username: 'chani.home' },
            { byId: 'f13', username: 'early.years' },
            { byId: 'f14', username: 'tiny.steps' },
            { byId: 'f15', username: 'kind.gardens' },
            { byId: 'f16', username: 'joy.in.learning' },
            { byId: 'f17', username: 'teacher.heart' }
        ]
    },

    {
        _id: 's405',
        txt: 'Living between Brooklyn and Jerusalem means always carrying two rhythms in my heart. Some days I feel split, other days I feel expanded. Maybe this tension is exactly where growth lives.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766924972/ykdyqi6n3v5zvodcococ.jpg',
        by: { byId: 'u06', username: 'danny.nyc' },
        createdAt: 1733860800000,
        loc: {},
        comments: [
            { _id: 'c712', byId: 'u23', username: 'sam.walker', txt: 'Cities shape us.', createdAt: 1733864400000 },
            { _id: 'c713', byId: 'u11', username: 'abby.walks', txt: 'Beautiful tension.', createdAt: 1733868000000 }
        ],
        likedBy: [
            { byId: 'u11', username: 'abby.walks' },
            { byId: 'u23', username: 'sam.walker' },
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'f18', username: 'between.worlds' },
            { byId: 'f19', username: 'two.homes' },
            { byId: 'f20', username: 'diaspora.notes' },
            { byId: 'f21', username: 'inner.map' }
        ]
    },

    {
        _id: 's406',
        txt: 'Shabbat prep is never just cooking. It’s memory, rhythm, and the quiet joy of making space for everyone to arrive whole. The kitchen fills, and so does my heart.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766924679/jthxqyxiudrwjlcsoqrm.jpg',
        by: { byId: 'u07', username: 'chani.home' },
        createdAt: 1730584800000,
        loc: {},
        comments: [
            { _id: 'c714', byId: 'u21', username: 'ari.cooks', txt: 'This is the real recipe.', createdAt: 1730588400000 },
            { _id: 'c715', byId: 'u25', username: 'rebekah.light', txt: 'Shabbat magic ✨', createdAt: 1730592000000 }
        ],
        likedBy: [
            { byId: 'u21', username: 'ari.cooks' },
            { byId: 'u25', username: 'rebekah.light' },
            { byId: 'u13', username: 'rachel.life' },
            { byId: 'f22', username: 'shabbat.table' },
            { byId: 'f23', username: 'home.warmth' },
            { byId: 'f24', username: 'slow.friday' },
            { byId: 'f25', username: 'bake.and.pray' }
        ]
    },

    {
        _id: 's407',
        txt: 'Running clears my head in ways nothing else does. As a social worker, I carry a lot of other people’s stories, worries, and hopes. The run gives me space to breathe, to pray quietly with my feet, and to come back grounded.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766926284/b81wazllxeef3yqiv3mk.jpg',
        by: { byId: 'u08', username: 'itai.runs' },
        createdAt: 1734206400000,
        loc: {},
        comments: [
            { _id: 'c716', byId: 'u11', username: 'abby.walks', txt: 'Movement as prayer. I love that.', createdAt: 1734210000000 },
            { _id: 'c717', byId: 'u20', username: 'tamar.moves', txt: 'So true — the body remembers.', createdAt: 1734213600000 },
            { _id: 'c718', byId: 'u04', username: 'yaakov.l', txt: 'Running really does reset the soul.', createdAt: 1734217200000 }
        ],
        likedBy: [
            { byId: 'u11', username: 'abby.walks' },
            { byId: 'u20', username: 'tamar.moves' },
            { byId: 'u04', username: 'yaakov.l' },
            { byId: 'u23', username: 'sam.walker' },
            { byId: 'f26', username: 'run.and.listen' },
            { byId: 'f27', username: 'social.runners' },
            { byId: 'f28', username: 'quiet.steps' },
            { byId: 'f29', username: 'pace.and.pause' },
            { byId: 'f30', username: 'moving.forward' }
        ]
    },

    {
        _id: 's408',
        txt: 'Teaching young children means learning patience on a daily basis. Some days it’s letters and numbers, other days it’s helping a child believe they can try again. Education is mostly about trust.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766926540/hsssdahiih5hxrdd5iiv.png',
        by: { byId: 'u09', username: 'rivky.teacher' },
        createdAt: 1731799200000,
        loc: {},
        comments: [
            { _id: 'c719', byId: 'u05', username: 'sarit.m', txt: 'This is exactly it.', createdAt: 1731802800000 },
            { _id: 'c720', byId: 'u13', username: 'rachel.life', txt: 'Teachers change lives.', createdAt: 1731806400000 }
        ],
        likedBy: [
            { byId: 'u05', username: 'sarit.m' },
            { byId: 'u13', username: 'rachel.life' },
            { byId: 'u22', username: 'hadas.reads' },
            { byId: 'f31', username: 'teach.with.heart' },
            { byId: 'f32', username: 'classroom.stories' },
            { byId: 'f33', username: 'early.learning' },
            { byId: 'f34', username: 'gentle.guidance' },
            { byId: 'f35', username: 'teacher.voice' }
        ]
    },

    {
        _id: 's409',
        txt: 'Balancing economics studies with reserve duty isn’t easy. Switching between spreadsheets and uniforms reminds me that theory and reality are never separate. Responsibility shows up in unexpected places.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766926871/pfzdfafte3nhs01ay8lx.png',
        by: { byId: 'u10', username: 'matan.k' },
        createdAt: 1735077600000,
        loc: {},
        comments: [
            { _id: 'c721', byId: 'u06', username: 'danny.nyc', txt: 'Respect for carrying both worlds.', createdAt: 1735081200000 },
            { _id: 'c722', byId: 'u04', username: 'yaakov.l', txt: 'Stay safe.', createdAt: 1735084800000 }
        ],
        likedBy: [
            { byId: 'u06', username: 'danny.nyc' },
            { byId: 'u04', username: 'yaakov.l' },
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'f36', username: 'reserve.life' },
            { byId: 'f37', username: 'student.soldier' },
            { byId: 'f38', username: 'quiet.service' },
            { byId: 'f39', username: 'duty.and.study' }
        ]
    },

    {
        _id: 's410',
        txt: 'Long walks have become my way of thinking and praying at the same time. I don’t always find answers, but I usually find honesty. Sometimes that’s enough.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766928292/rtamlgv1158kv0ssekp4.png',
        by: { byId: 'u11', username: 'abby.walks' },
        createdAt: 1733004000000,
        loc: {},
        comments: [
            { _id: 'c723', byId: 'u18', username: 'leah.write', txt: 'This feels like a poem.', createdAt: 1733007600000 },
            { _id: 'c724', byId: 'u23', username: 'sam.walker', txt: 'Walking thinking club.', createdAt: 1733011200000 }
        ],
        likedBy: [
            { byId: 'u18', username: 'leah.write' },
            { byId: 'u23', username: 'sam.walker' },
            { byId: 'u08', username: 'itai.runs' },
            { byId: 'f40', username: 'slow.steps' },
            { byId: 'f41', username: 'walking.words' },
            { byId: 'f42', username: 'path.and.pause' },
            { byId: 'f43', username: 'inner.walks' },
            { byId: 'f44', username: 'prayer.in.motion' }
        ]
    },

    {
        _id: 's411',
        txt: 'Working with my hands teaches patience better than anything else. Fixing wires and lights reminds me that even small connections matter — when one thing is off, the whole system feels it.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766927025/bvhtymkg95sct5hlbpix.jpg',
        by: { byId: 'u12', username: 'shlomi.fix' },
        createdAt: 1730937600000,
        loc: {},
        comments: [
            { _id: 'c725', byId: 'u26', username: 'ofir.builds', txt: 'Craft teaches humility.', createdAt: 1730941200000 },
            { _id: 'c726', byId: 'u01', username: 'daniel.coh', txt: 'Beautiful metaphor.', createdAt: 1730944800000 }
        ],
        likedBy: [
            { byId: 'u26', username: 'ofir.builds' },
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u14', username: 'moshe.bus' },
            { byId: 'f45', username: 'hands.on.work' },
            { byId: 'f46', username: 'simple.trades' },
            { byId: 'f47', username: 'fix.and.learn' },
            { byId: 'f48', username: 'daily.craft' }
        ]
    },

    {
        _id: 's412',
        txt: 'Some days feel like a balancing act — parenting, marriage, and trying to stay kind to myself in the middle. I don’t always get it right, but showing up still counts.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766927270/tatdsubg5cvm0yqgegcl.jpg',
        by: { byId: 'u13', username: 'rachel.life' },
        createdAt: 1733522400000,
        loc: {},
        comments: [
            { _id: 'c727', byId: 'u07', username: 'chani.home', txt: 'You’re not alone.', createdAt: 1733526000000 },
            { _id: 'c728', byId: 'u25', username: 'rebekah.light', txt: 'Grace over perfection.', createdAt: 1733529600000 }
        ],
        likedBy: [
            { byId: 'u07', username: 'chani.home' },
            { byId: 'u25', username: 'rebekah.light' },
            { byId: 'u05', username: 'sarit.m' },
            { byId: 'f49', username: 'real.life.mom' },
            { byId: 'f50', username: 'trying.my.best' },
            { byId: 'f51', username: 'quiet.courage' },
            { byId: 'f52', username: 'everyday.faith' }
        ]
    },

    {
        _id: 's413',
        txt: 'Driving the same routes every day has its own rhythm. Old music on the radio, familiar faces getting on and off — there’s comfort in routine if you learn how to listen.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766927974/grdmpldbrjtgvstmnhp3.jpg',
        by: { byId: 'u14', username: 'moshe.bus' },
        createdAt: 1730152800000,
        loc: {},
        comments: [
            { _id: 'c729', byId: 'u04', username: 'yaakov.l', txt: 'Those routines keep the city moving.', createdAt: 1730156400000 },
            { _id: 'c730', byId: 'u23', username: 'sam.walker', txt: 'Love the quiet observation.', createdAt: 1730160000000 }
        ],
        likedBy: [
            { byId: 'u04', username: 'yaakov.l' },
            { byId: 'u23', username: 'sam.walker' },
            { byId: 'u12', username: 'shlomi.fix' },
            { byId: 'f53', username: 'city.routes' },
            { byId: 'f54', username: 'old.songs' },
            { byId: 'f55', username: 'daily.drives' },
            { byId: 'f56', username: 'bus.life' }
        ]
    },

    {
        _id: 's414',
        txt: 'Writing sacred texts teaches patience like nothing else. Every letter matters. There’s no rushing when the work itself demands intention, ink, and quiet respect.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766931031/gcxeadfndk04ngniudg3.png',
        by: { byId: 'u15', username: 'eli.scribe' },
        createdAt: 1732665600000,
        loc: {},
        comments: [
            { _id: 'c731', byId: 'u28', username: 'rav.eitan', txt: 'קדושה דרך דיוק.', createdAt: 1732669200000 },
            { _id: 'c732', byId: 'u18', username: 'leah.write', txt: 'Words truly carry weight.', createdAt: 1732672800000 }
        ],
        likedBy: [
            { byId: 'u28', username: 'rav.eitan' },
            { byId: 'u18', username: 'leah.write' },
            { byId: 'u17', username: 'yosef.learns' },
            { byId: 'f57', username: 'holy.letters' },
            { byId: 'f58', username: 'ink.and.silence' },
            { byId: 'f59', username: 'scribe.life' },
            { byId: 'f60', username: 'slow.words' }
        ]
    },

    {
        _id: 's415',
        txt: 'Caring for plants has taught me something quiet about faith. Growth doesn’t rush, and sunlight can’t be forced. There’s trust involved — in the soil, in the process, and in what you don’t see yet.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766928188/vylig5zsk5rmhzcydkrn.jpg',
        by: { byId: 'u16', username: 'noa.plants' },
        createdAt: 1733342400000,
        loc: {},
        comments: [
            { _id: 'c733', byId: 'u25', username: 'rebekah.light', txt: 'This feels like a meditation.', createdAt: 1733346000000 },
            { _id: 'c734', byId: 'u18', username: 'leah.write', txt: 'So gentle and true.', createdAt: 1733349600000 },
            { _id: 'c735', byId: 'u07', username: 'chani.home', txt: 'I needed this reminder.', createdAt: 1733353200000 }
        ],
        likedBy: [
            { byId: 'u25', username: 'rebekah.light' },
            { byId: 'u18', username: 'leah.write' },
            { byId: 'u07', username: 'chani.home' },
            { byId: 'u22', username: 'hadas.reads' },
            { byId: 'f61', username: 'green.faith' },
            { byId: 'f62', username: 'quiet.growth' },
            { byId: 'f63', username: 'rooted.life' },
            { byId: 'f64', username: 'slow.bloom' }
        ]
    },

    {
        _id: 's416',
        txt: 'Learning in the morning and working in the evening keeps me grounded. Torah gives direction, עבודה gives responsibility. Somewhere between the two, life becomes whole.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766932768/uvg1way5omenhjv17ix8.png',
        by: { byId: 'u17', username: 'yosef.learns' },
        createdAt: 1734475200000,
        loc: {},
        comments: [
            { _id: 'c736', byId: 'u15', username: 'eli.scribe', txt: 'A balanced path.', createdAt: 1734478800000 },
            { _id: 'c737', byId: 'u28', username: 'rav.eitan', txt: 'שילוב נכון של עמל ורוח.', createdAt: 1734482400000 }
        ],
        likedBy: [
            { byId: 'u15', username: 'eli.scribe' },
            { byId: 'u28', username: 'rav.eitan' },
            { byId: 'u10', username: 'matan.k' },
            { byId: 'f65', username: 'learning.life' },
            { byId: 'f66', username: 'daily.torah' },
            { byId: 'f67', username: 'steady.paths' },
            { byId: 'f68', username: 'work.and.study' }
        ]
    },

    {
        _id: 's417',
        txt: 'I keep writing small thoughts because they often carry the heaviest meaning. Not everything needs to be loud to be important. Some truths prefer quiet.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766928460/xifajvo3e4fk6emhp6tz.jpg',
        by: { byId: 'u18', username: 'leah.write' },
        createdAt: 1732312800000,
        loc: {},
        comments: [
            { _id: 'c738', byId: 'u11', username: 'abby.walks', txt: 'This is exactly why I read you.', createdAt: 1732316400000 },
            { _id: 'c739', byId: 'u02', username: 'maya.levine', txt: 'Your words stay with me.', createdAt: 1732320000000 }
        ],
        likedBy: [
            { byId: 'u11', username: 'abby.walks' },
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'u25', username: 'rebekah.light' },
            { byId: 'u16', username: 'noa.plants' },
            { byId: 'f69', username: 'quiet.lines' },
            { byId: 'f70', username: 'small.words' },
            { byId: 'f71', username: 'inner.meaning' },
            { byId: 'f72', username: 'soft.truths' }
        ]
    },

    {
        _id: 's418',
        txt: 'Sound has a way of opening space — whether in prayer or in silence. I’m learning that sometimes the most meaningful moments happen between the notes.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766931528/twybp4trpm2dwsdxhsuz.jpg',
        by: { byId: 'u19', username: 'yonatan.sound' },
        createdAt: 1731196800000,
        loc: {},
        comments: [
            { _id: 'c740', byId: 'u21', username: 'ari.cooks', txt: 'Between the notes — beautiful.', createdAt: 1731200400000 },
            { _id: 'c741', byId: 'u30', username: 'rabbanit.noa', txt: 'שקט הוא גם קול.', createdAt: 1731204000000 }
        ],
        likedBy: [
            { byId: 'u21', username: 'ari.cooks' },
            { byId: 'u30', username: 'rabbanit.noa' },
            { byId: 'u06', username: 'danny.nyc' },
            { byId: 'f73', username: 'sound.and.soul' },
            { byId: 'f74', username: 'prayer.space' },
            { byId: 'f75', username: 'listening.deep' },
            { byId: 'f76', username: 'quiet.notes' }
        ]
    },

    {
        _id: 's419',
        txt: 'Movement therapy isn’t about fixing the body — it’s about listening to it. Strength can be gentle, and healing doesn’t need force to be real.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766933315/rp3uxymst0jazn9v6uz8.jpg',
        by: { byId: 'u20', username: 'tamar.moves' },
        createdAt: 1733868000000,
        loc: {},
        comments: [
            { _id: 'c742', byId: 'u08', username: 'itai.runs', txt: 'This aligns so much with my work.', createdAt: 1733871600000 },
            { _id: 'c743', byId: 'u16', username: 'noa.plants', txt: 'Gentleness is powerful.', createdAt: 1733875200000 }
        ],
        likedBy: [
            { byId: 'u08', username: 'itai.runs' },
            { byId: 'u16', username: 'noa.plants' },
            { byId: 'u11', username: 'abby.walks' },
            { byId: 'f77', username: 'gentle.motion' },
            { byId: 'f78', username: 'body.wisdom' },
            { byId: 'f79', username: 'slow.healing' },
            { byId: 'f80', username: 'movement.truth' }
        ]
    },

    {
        _id: 's420',
        txt: 'Cooking slowly is an act of respect — for the ingredients, the tradition, and the people who will sit at the table. Food carries memory when you give it time.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766928536/tngpqbx1rzmc7gyckbfn.jpg',
        by: { byId: 'u21', username: 'ari.cooks' },
        createdAt: 1732838400000,
        loc: {},
        comments: [
            { _id: 'c744', byId: 'u07', username: 'chani.home', txt: 'Time is the secret ingredient.', createdAt: 1732842000000 },
            { _id: 'c745', byId: 'u25', username: 'rebekah.light', txt: 'Food as tradition ❤️', createdAt: 1732845600000 }
        ],
        likedBy: [
            { byId: 'u07', username: 'chani.home' },
            { byId: 'u25', username: 'rebekah.light' },
            { byId: 'u02', username: 'maya.levine' },
            { byId: 'f81', username: 'slow.kitchen' },
            { byId: 'f82', username: 'kosher.roots' },
            { byId: 'f83', username: 'table.stories' },
            { byId: 'f84', username: 'heritage.food' }
        ]
    },

    {
        _id: 's421',
        txt: 'Books have a way of slowing the world down. Even a few pages a day can open a quiet window into someone else’s thoughts — and sometimes back into your own.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766928683/zlgowihrvlc6mcc9rkaw.jpg',
        by: { byId: 'u22', username: 'hadas.reads' },
        createdAt: 1731528000000,
        loc: {},
        comments: [
            { _id: 'c746', byId: 'u18', username: 'leah.write', txt: 'Reading is its own conversation.', createdAt: 1731531600000 },
            { _id: 'c747', byId: 'u09', username: 'rivky.teacher', txt: 'Books really do open doors.', createdAt: 1731535200000 }
        ],
        likedBy: [
            { byId: 'u18', username: 'leah.write' },
            { byId: 'u09', username: 'rivky.teacher' },
            { byId: 'u11', username: 'abby.walks' },
            { byId: 'f85', username: 'pages.and.pause' },
            { byId: 'f86', username: 'reading.life' },
            { byId: 'f87', username: 'quiet.books' },
            { byId: 'f88', username: 'words.and.time' }
        ]
    },

    {
        _id: 's422',
        txt: 'Walking through cities teaches patience. Streets tell stories slowly, if you let them. Thinking doesn’t always need a desk — sometimes it needs distance.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766935084/czsydlavl02masz04mnn.jpg',
        by: { byId: 'u23', username: 'sam.walker' },
        createdAt: 1734720000000,
        loc: {},
        comments: [
            { _id: 'c748', byId: 'u11', username: 'abby.walks', txt: 'Walking thinking forever.', createdAt: 1734723600000 },
            { _id: 'c749', byId: 'u06', username: 'danny.nyc', txt: 'Cities reward attention.', createdAt: 1734727200000 }
        ],
        likedBy: [
            { byId: 'u11', username: 'abby.walks' },
            { byId: 'u06', username: 'danny.nyc' },
            { byId: 'u08', username: 'itai.runs' },
            { byId: 'f89', username: 'city.paces' },
            { byId: 'f90', username: 'urban.walks' },
            { byId: 'f91', username: 'thinking.paths' },
            { byId: 'f92', username: 'slow.cities' }
        ]
    },

    {
        _id: 's423',
        txt: 'Living simply isn’t about giving things up — it’s about noticing what’s already here. The small routines, the quiet mornings, the ordinary days. There’s depth hiding in the everyday if you slow down enough.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766931698/zqtjupyl6uobnivcwhsw.jpg',
        by: { byId: 'u24', username: 'nitzan.daily' },
        createdAt: 1731103200000,
        loc: {},
        comments: [
            { _id: 'c750', byId: 'u11', username: 'abby.walks', txt: 'This is a way of life.', createdAt: 1731106800000 },
            { _id: 'c751', byId: 'u23', username: 'sam.walker', txt: 'The everyday is underrated.', createdAt: 1731110400000 },
            { _id: 'c752', byId: 'u16', username: 'noa.plants', txt: 'Quiet beauty.', createdAt: 1731114000000 },
            { _id: 'c753', byId: 'u18', username: 'leah.write', txt: 'You captured something true.', createdAt: 1731117600000 },
            { _id: 'c754', byId: 'u25', username: 'rebekah.light', txt: 'Slowness is a gift.', createdAt: 1731121200000 }
        ],
        likedBy: [
            { byId: 'u11', username: 'abby.walks' },
            { byId: 'u23', username: 'sam.walker' },
            { byId: 'u16', username: 'noa.plants' },
            { byId: 'u18', username: 'leah.write' },
            { byId: 'u25', username: 'rebekah.light' },
            { byId: 'u07', username: 'chani.home' },
            { byId: 'u22', username: 'hadas.reads' },
            { byId: 'f93', username: 'daily.depth' },
            { byId: 'f94', username: 'ordinary.magic' },
            { byId: 'f95', username: 'simple.days' },
            { byId: 'f96', username: 'quiet.living' },
            { byId: 'f97', username: 'slow.life.club' },
            { byId: 'f98', username: 'soft.time' },
            { byId: 'f99', username: 'minimal.soul' },
            { byId: 'f100', username: 'life.at.ease' }
        ]
    },

    {
        _id: 's424',
        txt: 'Faith isn’t only found in big moments. It shows up in the way we speak, the way we forgive, and the way we keep going even when the day feels heavy. Daily life is where belief learns how to breathe.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766935183/pzdw3sof4cksplblat1j.jpg',
        by: { byId: 'u25', username: 'rebekah.light' },
        createdAt: 1733529600000,
        loc: {},
        comments: [
            { _id: 'c760', byId: 'u13', username: 'rachel.life', txt: 'This speaks to me.', createdAt: 1733533200000 },
            { _id: 'c761', byId: 'u07', username: 'chani.home', txt: 'Amen.', createdAt: 1733536800000 },
            { _id: 'c762', byId: 'u30', username: 'rabbanit.noa', txt: 'אמונה ביומיום.', createdAt: 1733540400000 },
            { _id: 'c763', byId: 'u31', username: 'rabbanit.ruth', txt: 'So much wisdom here.', createdAt: 1733544000000 },
            { _id: 'c764', byId: 'u18', username: 'leah.write', txt: 'You write faith gently.', createdAt: 1733547600000 }
        ],
        likedBy: [
            { byId: 'u13', username: 'rachel.life' },
            { byId: 'u07', username: 'chani.home' },
            { byId: 'u30', username: 'rabbanit.noa' },
            { byId: 'u31', username: 'rabbanit.ruth' },
            { byId: 'u18', username: 'leah.write' },
            { byId: 'u16', username: 'noa.plants' },
            { byId: 'u22', username: 'hadas.reads' },
            { byId: 'f101', username: 'light.daily' },
            { byId: 'f102', username: 'faith.steps' },
            { byId: 'f103', username: 'quiet.belief' },
            { byId: 'f104', username: 'inner.light' },
            { byId: 'f105', username: 'daily.emunah' },
            { byId: 'f106', username: 'soul.notes' },
            { byId: 'f107', username: 'gentle.truth' },
            { byId: 'f108', username: 'living.faith' }
        ]
    },

    {
        _id: 's425',
        txt: 'Working with wood teaches honesty. You can’t rush it, and you can’t fake it. Every cut shows, every joint matters. There’s truth in building something that has to stand on its own.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766928849/xgfbjaieq4bcjcnvnigp.jpg',
        by: { byId: 'u26', username: 'ofir.builds' },
        createdAt: 1732406400000,
        loc: {},
        comments: [
            { _id: 'c770', byId: 'u12', username: 'shlomi.fix', txt: 'Craft speaks truth.', createdAt: 1732410000000 },
            { _id: 'c771', byId: 'u15', username: 'eli.scribe', txt: 'Same with letters.', createdAt: 1732413600000 },
            { _id: 'c772', byId: 'u28', username: 'rav.eitan', txt: 'מלאכה עם נשמה.', createdAt: 1732417200000 },
            { _id: 'c773', byId: 'u01', username: 'daniel.coh', txt: 'Great metaphor.', createdAt: 1732420800000 }
        ],
        likedBy: [
            { byId: 'u12', username: 'shlomi.fix' },
            { byId: 'u15', username: 'eli.scribe' },
            { byId: 'u28', username: 'rav.eitan' },
            { byId: 'u01', username: 'daniel.coh' },
            { byId: 'u17', username: 'yosef.learns' },
            { byId: 'f109', username: 'true.materials' },
            { byId: 'f110', username: 'honest.work' },
            { byId: 'f111', username: 'wood.and.wisdom' },
            { byId: 'f112', username: 'slow.build' },
            { byId: 'f113', username: 'hands.truth' },
            { byId: 'f114', username: 'real.material' },
            { byId: 'f115', username: 'craft.life' },
            { byId: 'f116', username: 'build.true' },
            { byId: 'f117', username: 'makers.path' }
        ]
    },

    {
        _id: 's426',
        txt: 'Halachah lives in real life — not in abstraction. Every question carries a person, a story, and responsibility. Listening carefully is as important as answering correctly.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766936221/xtpac15yjuxcpk52lcse.png',
        by: { byId: 'u28', username: 'rav.eitan' },
        createdAt: 1734907200000,
        loc: {},
        comments: [
            { _id: 'c780', byId: 'u29', username: 'rav.binyamin', txt: 'אמת ורגישות.', createdAt: 1734910800000 },
            { _id: 'c781', byId: 'u30', username: 'rabbanit.noa', txt: 'הלכה חיה.', createdAt: 1734914400000 },
            { _id: 'c782', byId: 'u31', username: 'rabbanit.ruth', txt: 'This is leadership.', createdAt: 1734918000000 },
            { _id: 'c783', byId: 'u17', username: 'yosef.learns', txt: 'Thank you, Rabbi.', createdAt: 1734921600000 }
        ],
        likedBy: [
            { byId: 'u29', username: 'rav.binyamin' },
            { byId: 'u30', username: 'rabbanit.noa' },
            { byId: 'u31', username: 'rabbanit.ruth' },
            { byId: 'u17', username: 'yosef.learns' },
            { byId: 'u15', username: 'eli.scribe' },
            { byId: 'f118', username: 'halacha.today' },
            { byId: 'f119', username: 'living.psak' },
            { byId: 'f120', username: 'community.voice' },
            { byId: 'f121', username: 'listening.rabbi' },
            { byId: 'f122', username: 'wise.words' },
            { byId: 'f123', username: 'halacha.life' },
            { byId: 'f124', username: 'responsible.psak' },
            { byId: 'f125', username: 'modern.halacha' },
            { byId: 'f126', username: 'torah.and.life' },
            { byId: 'f127', username: 'deep.listening' }
        ]
    },

    {
        _id: 's427',
        txt: 'Teaching Halachah today means engaging with complexity honestly. Ethics, technology, and responsibility are not outside the tradition — they demand its deepest attention.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766935845/qc52xef09gaypkmwjrdz.png',
        by: { byId: 'u29', username: 'rav.binyamin' },
        createdAt: 1732662000000,
        loc: {},
        comments: [
            { _id: 'c790', byId: 'u28', username: 'rav.eitan', txt: 'יישר כוח.', createdAt: 1732665600000 },
            { _id: 'c791', byId: 'u31', username: 'rabbanit.ruth', txt: 'So important.', createdAt: 1732669200000 },
            { _id: 'c792', byId: 'u30', username: 'rabbanit.noa', txt: 'הלכה עם אחריות.', createdAt: 1732672800000}
        ],
        likedBy: [
            { byId: 'u28', username: 'rav.eitan' },
            { byId: 'u31', username: 'rabbanit.ruth' },
            { byId: 'u30', username: 'rabbanit.noa' },
            { byId: 'u17', username: 'yosef.learns' },
            { byId: 'u15', username: 'eli.scribe' },
            { byId: 'f128', username: 'ethics.and.torah' },
            { byId: 'f129', username: 'halacha.future' },
            { byId: 'f130', username: 'thinking.psak' },
            { byId: 'f131', username: 'modern.learning' },
            { byId: 'f132', username: 'ethical.torah' },
            { byId: 'f133', username: 'torah.now' },
            { byId: 'f134', username: 'community.study' },
            { byId: 'f135', username: 'deep.psak' },
            { byId: 'f136', username: 'responsible.torah' }
        ]
    },

    {
        _id: 's428',
        txt: 'Teaching Halachah to women means creating space — for questions, growth, and honesty. Law becomes language when it’s taught with care and trust.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766937115/kfg7xy4sgcnb9v4h1uli.jpg',
        by: { byId: 'u30', username: 'rabbanit.noa' },
        createdAt: 1734040800000,
        loc: {},
        comments: [
            { _id: 'c800', byId: 'u31', username: 'rabbanit.ruth', txt: 'So beautifully put.', createdAt: 1734044400000 },
            { _id: 'c801', byId: 'u25', username: 'rebekah.light', txt: 'This matters deeply.', createdAt: 1734048000000 },
            { _id: 'c802', byId: 'u18', username: 'leah.write', txt: 'Language of care.', createdAt: 1734051600000 },
            { _id: 'c803', byId: 'u13', username: 'rachel.life', txt: 'Thank you for this work.', createdAt: 1734055200000 }
        ],
        likedBy: [
            { byId: 'u31', username: 'rabbanit.ruth' },
            { byId: 'u25', username: 'rebekah.light' },
            { byId: 'u18', username: 'leah.write' },
            { byId: 'u13', username: 'rachel.life' },
            { byId: 'u22', username: 'hadas.reads' },
            { byId: 'f137', username: 'women.learn' },
            { byId: 'f138', username: 'halacha.spaces' },
            { byId: 'f139', username: 'learning.together' },
            { byId: 'f140', username: 'living.law' },
            { byId: 'f141', username: 'faith.dialogue' },
            { byId: 'f142', username: 'torah.with.heart' },
            { byId: 'f143', username: 'safe.questions' },
            { byId: 'f144', username: 'learning.faith' },
            { byId: 'f145', username: 'community.growth' }
        ]
    },

    {
        _id: 's429',
        txt: 'Pastoral Halachah begins with listening. When questions are welcomed, tradition becomes a place of safety rather than fear. Wisdom grows where compassion is practiced.',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766933633/kq4tbgiemwa3bk1rhtrg.png',
        by: { byId: 'u31', username: 'rabbanit.ruth' },
        createdAt: 1735252800000,
        loc: {},
        comments: [
            { _id: 'c810', byId: 'u30', username: 'rabbanit.noa', txt: 'So much אמת here.', createdAt: 1735256400000 },
            { _id: 'c811', byId: 'u28', username: 'rav.eitan', txt: 'Listening is everything.', createdAt: 1735260000000 },
            { _id: 'c812', byId: 'u25', username: 'rebekah.light', txt: 'This gives hope.', createdAt: 1735263600000 },
            { _id: 'c813', byId: 'u18', username: 'leah.write', txt: 'Wisdom with kindness.', createdAt: 1735267200000 },
            { _id: 'c814', byId: 'u13', username: 'rachel.life', txt: 'Thank you.', createdAt: 1735270800000 }
        ],
        likedBy: [
            { byId: 'u30', username: 'rabbanit.noa' },
            { byId: 'u28', username: 'rav.eitan' },
            { byId: 'u25', username: 'rebekah.light' },
            { byId: 'u18', username: 'leah.write' },
            { byId: 'u13', username: 'rachel.life' },
            { byId: 'u22', username: 'hadas.reads' },
            { byId: 'f146', username: 'pastoral.voice' },
            { byId: 'f147', username: 'safe.tradition' },
            { byId: 'f148', username: 'listening.faith' },
            { byId: 'f149', username: 'compassionate.law' },
            { byId: 'f150', username: 'wisdom.spaces' },
            { byId: 'f151', username: 'gentle.psak' },
            { byId: 'f152', username: 'faith.with.care' },
            { byId: 'f153', username: 'community.trust' },
            { byId: 'f154', username: 'open.questions' }
        ]
    }
]

_createStories()

async function query(filterBy = {}) {
    var stories = await storageService.query(STORAGE_KEY)

    /* const { txt, minSpeed, sortField, sortDir } = filterBy
  
      if (txt) {
          const regex = new RegExp(filterBy.txt, 'i')
          stories = stories.filter(story => regex.test(story.vendor) || regex.test(story.description))
      }
      if (minSpeed) {
          stories = stories.filter(story => story.speed >= minSpeed)
      }
      if(sortField === 'vendor'){
          stories.sort((story1, story2) => 
              story1[sortField].localeCompare(story2[sortField]) * +sortDir)
      }
      if(sortField === 'speed'){
          stories.sort((story1, story2) => 
              (story1[sortField] - story2[sortField]) * +sortDir)
      }
      
      stories = stories.map(({ _id, txt, by, tags }) => ({ _id, txt, by, tags }))*/

    return stories
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    // throw new Error('Nope')
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
        txt: txt
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