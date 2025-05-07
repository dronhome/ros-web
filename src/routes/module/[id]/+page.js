import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const res = await fetch(`/ros-web/data/${params.id}.json`);

	if (!res.ok) {
		throw error(404, `Súbor ${params.id}.json sa nenašiel.`);
	}

	const content = await res.json();

	return {
		content
	};
}
