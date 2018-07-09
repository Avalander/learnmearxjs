import { partial } from 'ramda'
import h from 'snabbdom/h'


export const svg = partial(h, ['svg'])
export const rect = partial(h, ['rect'])
export const g = partial(h, ['g'])
