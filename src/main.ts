import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import { getConfigFields, PixConfig } from './config.js'
import { getActions } from './actions.js'
import { getPresets } from './presets.js'
import { PixProtocol, Packet } from './protocol.js'
import { PixConnection } from './connection.js'

import { getFeedbacks } from './feedbacks.js'
import { getVariables } from './variables.js'
import { UpgradeScripts } from './upgrades.js'

class PixRemoteInstance extends InstanceBase<PixConfig> {
    public protocol!: PixProtocol
    public connection!: PixConnection
    public config!: PixConfig

    async init(config: PixConfig): Promise<void> {
        this.config = config
        this.protocol = new PixProtocol()
        this.connection = new PixConnection(this)

        this.updateStatus(InstanceStatus.Connecting)

        this.init_module()
    }

    async destroy(): Promise<void> {
        this.connection.destroy()
        this.log('debug', 'Module Pix Remote détruit')
    }

    async configUpdated(config: PixConfig): Promise<void> {
        this.config = config
        this.init_module()
    }

    getConfigFields() {
        return getConfigFields()
    }

    private init_module() {
        this.setActionDefinitions(getActions(this))
        this.setFeedbackDefinitions(getFeedbacks())
        this.setPresetDefinitions(getPresets())
        this.setVariableDefinitions(getVariables())

        if (this.config.host && this.config.port) {
            this.connection.connect(this.config.host, this.config.port)
        } else {
            this.updateStatus(InstanceStatus.BadConfig, 'IP ou Port manquant')
        }
    }

    onMessageReceived(packet: Packet) {
        this.log('debug', `Message reçu [Type ${packet.type}]: ${JSON.stringify(packet.json)}`)
    }
}

runEntrypoint(PixRemoteInstance, UpgradeScripts)
