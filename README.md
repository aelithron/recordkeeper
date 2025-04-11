# Recordkeeper
A simple wiki software, based in Markdown.
## Introduction
Recordkeeper was designed for the Not-yet-named Server, a Minecraft SMP.
The name is inspired by the idea of a keeper of stories from eras past, or if you're so inclined, the history buff employee at the local library.
This software is meant to be lightweight and ✨**fast**✨, while still providing the basic features needed for a public wiki.
## Install
**Note: The project is still in development! Do not use it yet, and if you do, expect bugs and breaking.**
Installing Recordkeeper is very simple.
### Installing on Docker (Recommended)
Docker is the easiest way to install Recordkeeper on your server.
#### With Compose
Copy the following Compose file to your server or computer, and name it `compose.yaml`:
```yaml
services:
  recordkeeper:
    image: ghcr.io/aelithron/recordkeeper:latest
    container_name: recordkeeper
    ports:
      - "3000:3000"
    volumes:
      - ./wiki:/app/wiki
    restart: unless-stopped
```
Then, simply run `docker compose up -d` in the directory of the file, and continue to "After Installation" below.
#### Without Compose
Run the following command on your server or computer:
```bash
docker run -d \
  --name recordkeeper \
  -p 3000:3000 \
  -v $(pwd)/wiki:/app/wiki \
  --restart unless-stopped \
  ghcr.io/aelithron/recordkeeper:latest
```
Then, continue to "After Installation" below.
### After Installation
Congrats on installing Recordkeeper! It will create a folder called wiki in your current folder, which will store all of your Markdown files for wiki pages. Also, the server exposes itself on port `3000` by default, though you can change this with the Docker bind. **DO NOT** edit the right side of the volume mount, though you can move the left side if you want.
## Planned Features
- Web-based Markdown page editor
- Email-based authentication for editors
- Downloader (simple script that compiles all of the pages and turns them into a zip file for the user)
- Kubernetes manifests
## Credits
This project uses some [Font Awesome](https://fontawesome.com) and [Twemoji](https://github.com/twitter/twemoji) icons throughout.