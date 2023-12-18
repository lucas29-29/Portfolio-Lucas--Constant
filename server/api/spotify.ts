import querystring from "querystring";
import {Spotify} from "types/spotify";


const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`

export default defineEventHandler(async () => {
	const config = useRuntimeConfig()

	const client_id = config.spotifyClientId;
	const client_secret = config.spotifyClientSecret;
	const refresh_token = config.spotifyRefreshToken;

	const getAccessToken = async () => {
		const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
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

	const {access_token} = await getAccessToken();

	const response = await fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	if (response.status === 204 || response.status > 400) {
		return {
			isConnected: false
		} as Pick<Spotify, 'isConnected'>;
	}

	const track = await response.json();

	return {
		title: track.item.name,
		artist: track.item.artists.map((artist: any) => artist.name).join(", "),
		url: track.item.uri,
		isPlaying: track.is_playing,
		isConnected: true
	} as Spotify;
})