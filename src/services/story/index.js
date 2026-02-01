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
