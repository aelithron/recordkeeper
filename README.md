# Recordkeeper
A simple wiki software, based in Markdown.
## Introduction
Recordkeeper was designed for the Not-yet-named Server, a Minecraft SMP.
The name is inspired by the idea of a keeper of stories from eras past, or if you're so inclined, the history buff employee at the local library.
This software is meant to be lightweight and ✨**fast**✨, while still providing the basic features needed for a public wiki.
## Install
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
    environment:
      WEBEDITOR: false
      WEBEDITOR_PASSWORD: "<Set a password here>"
    ports:
      - "3000:3000"
    volumes:
      - ./wiki:/app/wiki
    restart: unless-stopped
```
Then, simply run `docker compose up -d` in the directory of the file, and continue to "After Installation" below.
Your `wiki` directory will be in the Compose file's directory.
#### Without Compose
Run the following command on your server or computer:
```bash
docker run -d \
  --name recordkeeper \
  -e WEBEDITOR=false \
  -e WEBEDITOR_PASSWORD="<Set a password here>" \
  -p 3000:3000 \
  -v $(pwd)/wiki:/app/wiki \
  --restart unless-stopped \
  ghcr.io/aelithron/recordkeeper:latest
```
Then, continue to "After Installation" below. Your `wiki` directory will be in your current directory.
### Installing on Kubernetes
This is my (ael's) personally preferred method for installing Recordkeeper!
1. Download the `manifests.yaml` file. You can find it [by clicking here](https://raw.githubusercontent.com/aelithron/recordkeeper/refs/heads/main/manifests.yaml), or in the repo (the link is just to the raw version of the one here in this repo).
2. Make any other needed changes for your setup, such as changing the storage location, setting a different Namespace, or increasing the number of replicas.
3. Run the command `kubectl apply -f (location of your manifest)`.
> Note: if you want to use Recordkeeper with Traefik on Kubernetes, feel free to dm me (@aelithron on discord), i've already configured it but it's a bit too unique to put here.
Finally, continue to "After Installation" below. Your `wiki` directory is at `/usr/share/recordkeeper/wiki` by default.
### After Installation
Congrats on installing Recordkeeper! It will create a folder called `wiki`, which will store all of your Markdown files for wiki pages (location in your installation method's instructions). Also, the server exposes itself on port `3000` by default.
- **Docker Note: DO NOT** edit the right side of the volume mount, Recordkeeper won't be able to find your files! You can move the left side if you want, though.
- **Kubernetes Note: DO NOT** edit the `mountPath` on the container spec! If you alter the storage method, make sure that the mountPath in the Pod is always `/app/wiki`, or Recordkeeper won't be able to find your files! You can alter the host location or storage method if you want, however.
#### Enabling the Web Editor
If enabling the Web Editor, alter your installation method's Environment Variables to contain:
- `WEBEDITOR_PASSWORD` set to a valid password
- `WEBEDITOR` set to `true`
If you are a Kubernetes user enabling the Web Editor: uncomment the Secret and set a (Base64-encoded) password. Also, make sure to set `WEBEDITOR` to `"true"` in the Deployment's spec.
## Planned Features
- Downloader (simple script that compiles all of the pages and turns them into a zip file for the user)
## Credits
This project uses some [Font Awesome](https://fontawesome.com) and [Twemoji](https://github.com/twitter/twemoji) icons throughout.
## Support
if you want support or need to ask any questions, feel free to dm me! @aelithron on discord, i should respond fairly quickly!
(put support at the bottom because the readme explains most things fine, though i don't mind dms, even for simple questions.)