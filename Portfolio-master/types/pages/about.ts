import type {MarkdownParsedContent} from '@nuxt/content/dist/runtime/types'

export interface About extends MarkdownParsedContent {
	title: string
	description: string
	experience: string
	experiences: {
		compagny: string
		position: string
		type: string
		from: string
		to: string
		duration: string
	}[]
}