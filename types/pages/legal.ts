import type {MarkdownParsedContent} from '@nuxt/content/dist/runtime/types'

export interface Legal extends MarkdownParsedContent {
	title: string
	description: string
}