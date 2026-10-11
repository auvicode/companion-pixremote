import { InstanceStatus } from '@companion-module/base'

/**
 * Utilisation du WebSocket.
 */

export class PixConnection {
	private socket: any | undefined
	private instance: any
	private reconnectInterval: NodeJS.Timeout | undefined

	constructor(instance: any) {
		this.instance = instance
	}

	public connect(host: string, port: number) {
		this.destroy()

		const url = `ws://${host}:${port}/companion`
		this.instance.log('debug', `Tentative de connexion à ${url}`)

		try {
			this.socket = new WebSocket(url)

			if (this.socket) {
				this.socket.onopen = () => {
					this.instance.updateStatus(InstanceStatus.Ok)
					this.instance.log('info', 'Connecté au serveur Pix')
					if (this.reconnectInterval) {
						clearInterval(this.reconnectInterval)
						this.reconnectInterval = undefined
					}
				}

				this.socket.onclose = () => {
					this.instance.updateStatus(InstanceStatus.Disconnected)
					this.scheduleReconnect(host, port)
				}

				this.socket.onerror = (event: any) => {
					this.instance.log('error', `Erreur WebSocket: ${event.message || 'Erreur inconnue'}`)
					this.instance.updateStatus(InstanceStatus.ConnectionFailure, event.message)
				}

				this.socket.onmessage = async (event: any) => {
					let buffer: Buffer
					if (event.data instanceof Blob) {
						buffer = Buffer.from(await event.data.arrayBuffer())
					} else if (typeof event.data === 'string') {
						buffer = Buffer.from(event.data)
					} else {
						buffer = Buffer.from(event.data)
					}

					const packet = this.instance.protocol.decode(buffer)
					if (packet) {
						this.instance.onMessageReceived(packet)
					}
				}
			}
		} catch (e: any) {
			this.instance.log('error', `Erreur critique WebSocket: ${e.message}`)
			this.scheduleReconnect(host, port)
		}
	}

	private scheduleReconnect(host: string, port: number) {
		if (!this.reconnectInterval) {
			this.reconnectInterval = setInterval(() => {
				this.connect(host, port)
			}, 5000)
		}
	}

	public send(buffer: Buffer) {
		if (this.socket && this.socket.readyState === 1) { // 1 = OPEN
			this.socket.send(buffer)
		} else {
			this.instance.log('warn', 'WebSocket non connecté, impossible d\'envoyer des données')
		}
	}

	public destroy() {
		if (this.reconnectInterval) {
			clearInterval(this.reconnectInterval)
			this.reconnectInterval = undefined
		}
		if (this.socket) {
			this.socket.close()
			this.socket = undefined
		}
	}
}
