const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { storyService as local } from './story.service.local'
import { storyService as remote } from './story.service.remote'

function getEmptyStory() {
	return {
        _id: '',
		txt: '',
		imgUrl: '',
		tags: [],
	}
}

function getDefaultFilter() {
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
