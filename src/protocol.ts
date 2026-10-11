export enum MessageType {
	CommandResponse = 0,
	ClientCommand = 1,
	PreviewFrame = 2,
	Metrics = 3,
}

export interface Packet {
	type: MessageType
	json: any
	binary?: Buffer
}

export class PixProtocol {
	private readonly HEADER_SIZE = 12

	public encode(type: MessageType, json: any, binary?: Buffer): Buffer {
		const jsonBuffer = Buffer.from(JSON.stringify(json))
		const jsonLength = jsonBuffer.length
		const binaryLength = binary ? binary.length : 0

		const packet = Buffer.alloc(this.HEADER_SIZE + jsonLength + binaryLength)

		packet.writeUInt32LE(type, 0)
		packet.writeUInt32LE(jsonLength, 4)
		packet.writeUInt32LE(binaryLength, 8)

		jsonBuffer.copy(packet, this.HEADER_SIZE)
		if (binary && binaryLength > 0) {
			binary.copy(packet, this.HEADER_SIZE + jsonLength)
		}

		return packet
	}

	public decode(data: Buffer): Packet | null {
		if (data.length < this.HEADER_SIZE) return null

		const type = data.readUInt32LE(0)
		const jsonLength = data.readUInt32LE(4)
		const binaryLength = data.readUInt32LE(8)

		if (data.length < this.HEADER_SIZE + jsonLength + binaryLength) return null

		const jsonBuffer = data.subarray(this.HEADER_SIZE, this.HEADER_SIZE + jsonLength)
		const binaryBuffer =
			binaryLength > 0
				? data.subarray(this.HEADER_SIZE + jsonLength, this.HEADER_SIZE + jsonLength + binaryLength)
				: undefined

		try {
			const json = JSON.parse(jsonBuffer.toString())
			return { type, json, binary: binaryBuffer }
		} catch (e) {
			console.error('[PixProtocol] Erreur de parsing JSON:', e)
			return null
		}
	}
}
