const { DEV, VITE_LOCAL } = import.meta.env

import { createDispatchHook } from 'react-redux'
import { getRandomIntInclusive, makeId } from '../util.service'

import { storyService as local } from './story.service.local'
import { storyService as remote } from './story.service.remote'

export function getEmptyStory() {
	return {
        _id: '',
		txt: '',
		imgUrl: '',
        by: {},
        createdAt: '',
        loc: {},
        comments: [],
        likedBy:[],
        tags: []
	}
}

    // {
    //     _id: '01',
    //     txt: 'Best trip ever',
    //     imgUrl: 'trip.jpg',
    //     by: {
    //         byId: 'u01',
    //         username: 'daniel.coh',
    //     },
    //     createdAt: 1765788862000,
    //     loc: {},
    //     comments: [
    //         {
    //             byId: 'u02',
    //      :       username: 'maya.levine',
    //             txt: 'Is that in the South? Looks familiar'
    //         }
    //     ],
    //     likedBy: [],
    //     tags: ['trip', 'outdoor', 'fun']

    // }

export function getDefaultFilter() {
    return {
        txt: '',
        tags: []
    }
}

const service = (VITE_LOCAL === 'true') ? local : remote
export const storyService = { getEmptyStory, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.storyService = storyService
