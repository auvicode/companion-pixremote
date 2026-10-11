import { CompanionActionDefinitions } from '@companion-module/base'
import { MessageType } from './protocol.js'

export function getActions(instance: any): CompanionActionDefinitions {
	const sendCommand = (command: string, payload: any) => {
		const packet = instance.protocol.encode(MessageType.ClientCommand, { command, payload })
		instance.connection.send(packet)
	}

	return {
		SOURCE_PLAY: {
			name: 'Source: Quick Play',
			options: [
				{
					type: 'number',
					label: 'Source ID',
					id: 'source_id',
					default: 1,
					min: 1,
					max: 1000,
				},
			],
			callback: (action) => {
				sendCommand('IO_QuickPlayIdentifier', { source_id: action.options.source_id })
			},
		},
		SOURCE_SELECT: {
			name: 'Source: Select',
			options: [
				{
					type: 'number',
					label: 'Source ID',
					id: 'source_id',
					default: 1,
					min: 1,
					max: 1000,
				},
			],
			callback: (action) => {
				sendCommand('IO_SelectSourceIdentifier', { source_id: action.options.source_id })
			},
		},
		PLAYLIST_BACK: {
			name: 'Playlist: Back',
			options: [
				{
					type: 'number',
					label: 'Playlist ID',
					id: 'playlist_id',
					default: 1,
					min: 1,
					max: 1000,
				},
			],
			callback: (action) => {
				sendCommand('IO_SelectPreviousSource', { playlist_id: action.options.playlist_id })
			},
		},
		PLAYLIST_NEXT: {
			name: 'Playlist: Next',
			options: [
				{
					type: 'number',
					label: 'Playlist ID',
					id: 'playlist_id',
					default: 1,
					min: 1,
					max: 1000,
				},
			],
			callback: (action) => {
				sendCommand('IO_SelectNextSource', { playlist_id: action.options.playlist_id })
			},
		},
		PLAYLIST_CUT: {
			name: 'Playlist: Cut',
			options: [
				{
					type: 'number',
					label: 'Playlist ID',
					id: 'playlist_id',
					default: 1,
					min: 1,
					max: 1000,
				},
			],
			callback: (action) => {
				sendCommand('IO_CutOnPlaylistIdentifier', { playlist_id: action.options.playlist_id })
			},
		},
		PLAYLIST_FADE: {
			name: 'Playlist: Fade',
			options: [
				{
					type: 'number',
					label: 'Playlist ID',
					id: 'playlist_id',
					default: 1,
					min: 1,
					max: 1000,
				},
			],
			callback: (action) => {
				sendCommand('IO_FadeOnPlaylistIdentifier', { playlist_id: action.options.playlist_id })
			},
		},
		SCREEN_FTB: {
			name: 'Screen: FTB',
			options: [
				{
					type: 'number',
					label: 'Screen ID',
					id: 'screen_id',
					default: 1,
					min: 1,
					max: 1000,
				},
			],
			callback: (action) => {
				sendCommand('IO_MediaFadeToBlackIdentifier', { screen_id: action.options.screen_id })
			},
		},
		SCREEN_PLAY: {
			name: 'Screen: Play',
			options: [
				{
					type: 'number',
					label: 'Screen ID',
					id: 'screen_id',
					default: 1,
					min: 1,
					max: 1000,
				},
			],
			callback: (action) => {
				sendCommand('IO_MediaPlayIdentifier', { screen_id: action.options.screen_id })
			},
		},
		SCREEN_PAUSE: {
			name: 'Screen: Pause',
			options: [
				{
					type: 'number',
					label: 'Screen ID',
					id: 'screen_id',
					default: 1,
					min: 1,
					max: 1000,
				},
			],
			callback: (action) => {
				sendCommand('IO_MediaPauseIdentifier', { screen_id: action.options.screen_id })
			},
		},
		SCREEN_STOP: {
			name: 'Screen: Stop',
			options: [
				{
					type: 'number',
					label: 'Screen ID',
					id: 'screen_id',
					default: 1,
					min: 1,
					max: 1000,
				},
			],
			callback: (action) => {
				sendCommand('IO_MediaStopIdentifier', { screen_id: action.options.screen_id })
			},
		},
		SCREEN_GOTO_IN10: {
			name: 'Screen: Go To In +10s',
			options: [
				{
					type: 'number',
					label: 'Screen ID',
					id: 'screen_id',
					default: 1,
					min: 1,
					max: 1000,
				},
			],
			callback: (action) => {
				sendCommand('IO_MediaGoToIdentifier', { screen_id: action.options.screen_id, position_type: 'in10' })
			},
		},
		SCREEN_GOTO_IN30: {
			name: 'Screen: Go To In +30s',
			options: [
				{
					type: 'number',
					label: 'Screen ID',
					id: 'screen_id',
					default: 1,
					min: 1,
					max: 1000,
				},
			],
			callback: (action) => {
				sendCommand('IO_MediaGoToIdentifier', { screen_id: action.options.screen_id, position_type: 'in30' })
			},
		},
		SCREEN_GOTO_OUT30: {
			name: 'Screen: Go To Out -30s',
			options: [
				{
					type: 'number',
					label: 'Screen ID',
					id: 'screen_id',
					default: 1,
					min: 1,
					max: 1000,
				},
			],
			callback: (action) => {
				sendCommand('IO_MediaGoToIdentifier', { screen_id: action.options.screen_id, position_type: 'out30' })
			},
		},
		SCREEN_GOTO_OUT10: {
			name: 'Screen: Go To Out -10s',
			options: [
				{
					type: 'number',
					label: 'Screen ID',
					id: 'screen_id',
					default: 1,
					min: 1,
					max: 1000,
				},
			],
			callback: (action) => {
				sendCommand('IO_MediaGoToIdentifier', { screen_id: action.options.screen_id, position_type: 'out10' })
			},
		},
	}
}
