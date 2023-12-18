// @ts-ignore
import type {Config} from 'https://edge.netlify.com/';
// @ts-ignore
import * as querystring from 'https://deno.land/std@0.177.0/node/querystring.ts';
// @ts-ignore
import {Spotify} from '../../types/spotify.ts';

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`

// @ts-ignore
const client_id = Deno.env.get("SPOTIFY_CLIENT_ID");
// @ts-ignore
const client_secret = Deno.env.get("SPOTIFY_CLIENT_SECRET");
// @ts-ignore
const refresh_token = Deno.env.get("SPOTIFY_REFRESH_TOKEN");

const getAccessToken = async () => {
	// const basic = encode(`${client_id}:${client_secret}`);
	const basic = btoa(`${client_id}:${client_secret}`)
	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: querystring.stringify({
			grant_type: "refresh_token",
			refresh_token,
		}),
	});

	return response.json();
}

export default async () => {
	const {access_token} = await getAccessToken();

	const response = await fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	if (response.status === 204 || response.status > 400) {
		// @ts-ignore
		return Response.json({
			isConnected: false
		} as Pick<Spotify, 'isConnected'>);

	}

	const track = await response.json();

	// @ts-ignore
	return Response.json({
		title: track.item.name,
		artist: track.item.artists.map((artist: any) => artist.name).join(", "),
		url: track.item.uri,
		isPlaying: track.is_playing,
		isConnected: true
	} as Spotify);
};

export const config: Config = {
	path: "/spotify",
};