# Pix Remote — API Reference

Command reference to control a Pix Server.
It covers the transport, the wire format, and each command sent.

## Commands

### Sources

| Command                     | Payload                 | Effect                                  |
|-----------------------------|-------------------------|-----------------------------------------|
| `IO_QuickPlayIdentifier`    | `{ source_id: int }`    | Play the given source immediately.      |
| `IO_SelectSourceIdentifier` | `{ source_id: int }`    | Select the given source.  |

### Playlist

| Command                     | Payload                  | Effect                                  |
|-----------------------------|--------------------------|-----------------------------------------|
| `IO_SelectPreviousSource`   | `{ playlist_id: int }`   | Move selection to the previous source.  |
| `IO_SelectNextSource`       | `{ playlist_id: int }`   | Move selection to the next source.      |
| `IO_CutOnPlaylistIdentifier`| `{ playlist_id: int }`   | Cut transition on the playlist.         |
| `IO_FadeOnPlaylistIdentifier`| `{ playlist_id: int }`  | Fade transition on the playlist.        |

### Screen transport

| Command                        | Payload                                         | Effect                               |
|--------------------------------|-------------------------------------------------|--------------------------------------|
| `IO_MediaPlayIdentifier`       | `{ screen_id: int }`                            | Play on the screen.                  |
| `IO_MediaPauseIdentifier`      | `{ screen_id: int }`                            | Pause on the screen.                 |
| `IO_MediaStopIdentifier`       | `{ screen_id: int }`                            | Stop on the screen.                  |
| `IO_MediaFadeToBlackIdentifier`| `{ screen_id: int }`                            | Fade the screen to black.            |
| `IO_MediaGoToIdentifier`       | `{ screen_id: int, position_type: <enum> }`     | Seek to an position. |

`IO_MediaGoToIdentifier` is issued with `position_type` set to `in10`, `in30`, `out30` or `out10`.

## Transport

- WebSocket, endpoint `ws://<host>:<port>/companion`.
- Client config: `host` (Server IP), `port` (default `80`).
- The client reconnects automatically every 5 s while disconnected.

## Wire format

Each message is a single binary frame:

```
[ header 12 bytes ] [ JSON payload ] [ optional binary payload ]
```

Header = three little-endian `UInt32`:

| Offset | Field         | Meaning                          |
|-------:|---------------|----------------------------------|
| 0      | `type`        | message type (see below)         |
| 4      | `jsonLength`  | byte length of the JSON payload  |
| 8      | `binaryLength`| byte length of the binary payload|

- JSON payload: UTF-8 bytes of the JSON object.
- Binary payload: present only when `binaryLength > 0`.

## Message types

| Value | Name              | Direction        |
|------:|-------------------|------------------|
| 0     | `CommandResponse` | server → client  |
| 1     | `ClientCommand`   | client → server  |
| 2     | `PreviewFrame`    | server → client  |
| 3     | `Metrics`         | server → client  |

## Client command envelope

Every command the module sends is a `ClientCommand` (type `1`) with this JSON payload:

```json
{ "command": "<command name>", "payload": { ... } }
```

No binary section is attached on outbound commands.

### Identifier semantics

- `source_id`, `playlist_id`, `screen_id`: integers identifying a source, a playlist, or an output screen on the server. The module UI accepts `1`–`1000`, default `1`.
- `position_type`: string enum, one of `in10`, `in30`, `out30`, `out10` (seek relative to the clip in/out points).

## Inbound messages

`CommandResponse`, `PreviewFrame` and `Metrics` are defined in the protocol and decoded by the client. `PreviewFrame` carries a binary payload alongside its JSON header. These are currently received and logged; they are not yet mapped to Companion feedbacks or variables.
