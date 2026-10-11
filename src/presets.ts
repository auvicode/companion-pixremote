import { combineRgb, CompanionPresetDefinitions } from '@companion-module/base'

export function getPresets(): CompanionPresetDefinitions {
    const presets: CompanionPresetDefinitions = {}

    presets['Quick Play'] = {
        type: 'button',
        category: 'Source',
        name: 'Quick Play',
        style: {
            text: 'Play Source',
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(72, 100, 110),
            show_topbar: false,
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'SOURCE_PLAY',
                        options: {
                            source_id: 1,
                        },
                    },
                ],
                up: [],
            },
        ],
        feedbacks: [],
    }

    presets['Select Source'] = {
        type: 'button',
        category: 'Source',
        name: 'Select Source',
        style: {
            text: 'Select Source',
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(72, 100, 110),
            show_topbar: false,
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'SOURCE_SELECT',
                        options: {
                            source_id: 1,
                        },
                    },
                ],
                up: [],
            },
        ],
        feedbacks: [],
    }

    presets['Cut transition'] = {
        type: 'button',
        category: 'Screen',
        name: 'Cut transition',
        style: {
            text: 'CUT',
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(104, 64, 105),
            show_topbar: false,
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'PLAYLIST_CUT',
                        options: {
                            playlist_id: 1,
                        },
                    },
                ],
                up: [],
            },
        ],
        feedbacks: [],
    }

    presets['Fade transition'] = {
        type: 'button',
        category: 'Screen',
        name: 'Fade transition',
        style: {
            text: 'FADE',
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(104, 64, 105),
            show_topbar: false,
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'PLAYLIST_FADE',
                        options: {
                            playlist_id: 1,
                        },
                    },
                ],
                up: [],
            },
        ],
        feedbacks: [],
    }
    
    presets['Previous Source'] = {
        type: 'button',
        category: 'Playlist',
        name: 'Previous Source',
        style: {
            text: 'Back',
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(72, 100, 110),
            show_topbar: false,
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'PLAYLIST_BACK',
                        options: {
                            playlist_id: 1,
                        },
                    },
                ],
                up: [],
            },
        ],
        feedbacks: [],
    }
    
    presets['Next Source'] = {
        type: 'button',
        category: 'Playlist',
        name: 'Next Source',
        style: {
            text: 'Next',
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(72, 100, 110),
            show_topbar: false,
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'PLAYLIST_NEXT',
                        options: {
                            playlist_id: 1,
                        },
                    },
                ],
                up: [],
            },
        ],
        feedbacks: [],
    }

    return presets
}
