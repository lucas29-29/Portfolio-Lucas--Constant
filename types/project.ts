import type {MarkdownParsedContent} from '@nuxt/content/dist/runtime/types'

enum ProjectType {
	personal = 'Projet personnel',
	professional = 'Projet professionel',
	school = 'Projet d\'école'
}

export interface Project extends MarkdownParsedContent {
	title: string
	type: ProjectType
	description: string
	link: string
	stack: string[]
}