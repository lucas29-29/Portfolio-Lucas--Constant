import type {MarkdownParsedContent} from '@nuxt/content/dist/runtime/types'

export interface Home extends MarkdownParsedContent {
	title: string
	description: string
	listen: string
	about: string
	about_text: string
	social: string
	position: string
	position_title: string
	projects: string
	contact: string
	contact_mail: string
	contact_phone: string
}