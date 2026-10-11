import { SomeCompanionConfigField } from '@companion-module/base'

export interface PixConfig {
    host?: string
    port?: number
}

export function getConfigFields(): SomeCompanionConfigField[] {
    return [
        {
            type: 'textinput',
            id: 'host',
            label: 'Server IP',
            width: 8,
            default: '',
        },
        {
            type: 'number',
            id: 'port',
            label: 'Port',
            width: 4,
            default: 80,
            min: 1,
            max: 65535,
        },
    ]
}
