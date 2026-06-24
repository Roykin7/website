# Media — videos

This folder contains the video files migrated from the original `Roykin7/website` repo. They are stored here for reference but are **not currently embedded on any page**.

## Files

- `bukedea.mp4` — ~36 MB. Self-hosted MP4. Plays in modern browsers but is too heavy to ship from GitHub Pages at scale.
- `BHE_3389.MOV` — ~23 MB. QuickTime container. **Does not play natively in browsers.** Requires transcoding to H.264 MP4 or VP9 WebM before web use.

## Recommended path

For production, upload both to **YouTube** (or Vimeo) and embed via `<iframe>` on the relevant page. Reasons:

1. GitHub Pages has a soft 100 GB/month bandwidth limit. Two videos at ~60 MB hit that fast under load.
2. YouTube handles adaptive bitrate (mobile vs broadband), captions, accessibility, and global CDN automatically.
3. The `.MOV` won't play in browsers anyway — needs transcoding regardless. YouTube handles that on upload.
4. Embedded YouTube doesn't count against your Pages bandwidth.

## If self-hosting instead

Install `ffmpeg` (e.g. `winget install Gyan.FFmpeg`), then:

```sh
# Transcode .MOV → web-friendly .mp4
ffmpeg -i BHE_3389.MOV -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k bhe-3389.mp4

# Compress bukedea.mp4 further if needed
ffmpeg -i bukedea.mp4 -c:v libx264 -crf 28 -preset slow -vf "scale=-2:720" -c:a aac -b:a 128k bukedea-720p.mp4
```

Target: <10 MB per video for web. Use `<video controls preload="metadata">` to defer loading until interaction.
