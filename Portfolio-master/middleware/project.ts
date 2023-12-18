import {Project} from "~/types/project";

const lang = useLang()

export default defineNuxtRouteMiddleware(async (to) => {
	try {
		await queryContent<Project>().where({
			_path: to.path,
			_locale: lang.value
		}).findOne()
	} catch (error) {
		return abortNavigation()
	}
})