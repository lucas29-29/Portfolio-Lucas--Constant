<script lang="ts" setup>
import {Project} from "~/types/project";
import {Lang} from "~/types/lang";

const {path} = useRoute()

useHead({
	link: [{
		rel: 'canonical',
		href: 'https://rigetheo.netlify.app' + path
	}]
})

definePageMeta({middleware: 'project'})

const props = defineProps<{
	lang: Lang
}>()

const cover = computed(() => {
	return `url("/images${path}.webp") no-repeat center / cover`
})

const {data: content} = await useAsyncData('project', () => queryContent<Project>().where({
	_path: path,
	_locale: props.lang
}).findOne(), {watch: [() => props.lang]})

useSeoMeta({
	title: content.value!.title,
	description: content.value!.description,
})

const {
	data: related,
	execute
} = await useAsyncData('related', () => queryContent<Project>('projects').where({_locale: props.lang}).only(['title', 'type', '_path']).findSurround(path, {
	before: 3,
	after: 3
}), {
	immediate: false,
	transform: (projects): Project[] =>
		(projects.filter((project) => {
			return project !== null;
		}) as Project[]),
	watch: [() => props.lang]
})

onBeforeMount(() => {
	setTimeout(() => {
		execute()
	}, 1000)
})
</script>

<template>
	<div id="project" class="page">
		<AppEffect/>
		<AppHeader/>

		<main>
			<AppSection id="project__hero" desktop>
				<div class="cell cell--triple-column">
					<div class="overlay"></div>
					<nuxt-img :alt="content!.title" :src="`/images${path}.webp`" preload sizes="xs:640 md:100vw"/>
					<h1>{{ content!.title }}</h1>
					<template v-if="content!.type">
						<span class="project-type">{{ content!.type }}</span>
					</template>
				</div>
			</AppSection>

			<AppSection id="project__details" desktop>
				<div class="cell cell--mobile">
				</div>
				<div class="cell cell--double-column details">
					<h2>DETAILS</h2>
					<p>{{ content!.description }}</p>
					<LinkText :label="content!.link[0]" :link="content!.link[1]" external/>
				</div>
				<div class="cell stack">
					<h2>STACK</h2>
					<ul>
						<li v-for="tech in content!.stack">
							{{ tech }}
						</li>
					</ul>
				</div>
			</AppSection>

			<AppSection id="project__description">
				<div class="cell cell--triple-column">
					<ContentRenderer :value="content" class="content"/>
				</div>
			</AppSection>

			<AppSection v-if="related" id="project__related">
				<div class="cell cell--triple-column content">
					<h2>AUTRES PROJETS</h2>
					<div class="projects">
						<LinkProject v-for="project in related" :key="project._path" v-bind="project"/>
					</div>
				</div>
			</AppSection>
		</main>

		<AppFooter/>
	</div>
</template>

<style lang="scss">
@use "sass:color";

#project {
	grid-template-rows: space(20) 300px repeat(3, auto) space(20);

	&__hero {
		.cell--triple-column {
			position: relative;
			background: var(--background);
			font-family: 'PP Formula Condensed', sans-serif;
			justify-content: center;

			.overlay {
				position: absolute;
				inset: 0;
				z-index: 1;
				background: linear-gradient(to right, color.adjust($dark, $alpha: -0.2), color.adjust($dark, $alpha: -1));
			}

			img {
				position: absolute;
				inset: 0;
				object-fit: cover;
				width: 100%;
				height: 100%;
			}

			h1 {
				z-index: 1;
				display: block;
				font-size: 3rem;
				font-weight: bold;
				color: $light;
			}

			.project-type {
				position: absolute;
				z-index: 1;
				top: space(6);
				right: space(6);
				color: $light;
				padding: space(2) space(4);
				background: color.adjust($dark, $alpha: -0.5);
				border-radius: space(10);
				backdrop-filter: blur(space(2));
				font-size: 0.875rem;
				font-family: 'Strawford', sans-serif;
			}
		}


	}

	&__details {
		.details {
			p {
				flex-grow: 1;
			}
		}

		.stack {
			justify-content: space-between;
		}
	}

	&__description {
		.content {
			display: flex;
			flex-direction: column;
			gap: space(6);

			img {
				max-width: 100%;
				object-fit: cover;
			}
		}
	}

	&__related {
		.projects {
			display: flex;
			flex-direction: column;
			gap: var(--main-space);

			.project-link {
				flex-grow: 1;
			}
		}
	}
}

@media screen and (min-width: $md) {
	#project {
		grid-template-rows: space(20) 300px 300px repeat(2, auto) space(20);

		&__hero {
			.cell--triple-column {
				h1 {
					font-size: 6rem;
				}

				.project-type {
					font-size: 1.125rem;
				}
			}
		}

		&__related {
			.projects {
				flex-direction: row;
			}
		}
	}
}
</style>