# Pix Remote

Pix Server must be running and reachable on the network before the connection can be established.

## Configuration

| Setting       | Description                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| **Server IP** | IP address of the machine running Pix Server. Use `127.0.0.1` if Companion runs on the same machine. |
| **Port**      | Port on which Pix Server accepts connections. (Pix Server > Settings > Network) |

## Actions

All ID fields are integers corresponding to the identifiers used within the project.

### Source

| Action                 | Option    | Description                                      |
| ---------------------- | --------- | ------------------------------------------------ |
| **Source: Quick Play** | Source ID | Immediately plays the source with the given ID.  |
| **Source: Select**     | Source ID | Selects the source with the given ID.            |

### Playlist

| Action              | Option      | Description                                            |
| ------------------- | ----------- | ------------------------------------------------------ |
| **Playlist: Back**  | Playlist ID | Selects the previous source in the playlist with the given ID.         |
| **Playlist: Next**  | Playlist ID | Selects the next source in the playlist with the given ID.               |
| **Playlist: Cut**   | Playlist ID | Performs a cut transition in the playlist with the given ID.             |
| **Playlist: Fade**  | Playlist ID | Performs a fade transition in the playlist with the given ID.            |

### Screen

| Action                    | Option    | Description                                                  |
| ------------------------- | --------- | ------------------------------------------------------------ |
| **Screen: Play**          | Screen ID | Starts playback on the screen with the given ID.                               |
| **Screen: Pause**         | Screen ID | Pauses playback on the screen with the given ID.                           |
| **Screen: Stop**          | Screen ID | Stops playback on the screen with the given ID.                            |
| **Screen: FTB**           | Screen ID | Fades the screen to black with the given ID.                                |
| **Screen: Go To In +10s** | Screen ID | Jumps to a position 10 seconds after the media in point.     |
| **Screen: Go To In +30s** | Screen ID | Jumps to a position 30 seconds after the media in point.     |
| **Screen: Go To Out -30s**| Screen ID | Jumps to a position 30 seconds before the media out point.   |
| **Screen: Go To Out -10s**| Screen ID | Jumps to a position 10 seconds before the media out point.   |

## Presets

Ready-to-use buttons are provided in the following categories :

- **Source** – Quick Play, Select Source.
- **Screen** – Cut transition, Fade transition.
- **Playlist** – Previous Source, Next Source.
