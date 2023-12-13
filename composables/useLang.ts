import {useCookie, useState, watch} from '#imports';
import {Lang} from '~/types/lang';

export default () => {
	const lang = useCookie('lang', {default: () => (Lang.Fr as Lang)});
	const state = useState('lang', () => lang.value);

	watch(state, () => {
			lang.value = state.value
		}, {deep: true}
	);

	return state
}