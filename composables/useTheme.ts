import {useCookie, useState, watch} from '#imports';
import {Theme} from '~/types/theme';

export default () => {
	let system = Theme.Light

	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		system = Theme.Dark
	}

	const theme = useCookie('theme', {default: () => (system as Theme)});
	const state = useState('theme', () => theme.value);

	watch(state, () => {
			theme.value = state.value
		}, {deep: true}
	);

	return state
}