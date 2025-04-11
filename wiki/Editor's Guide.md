## Intro to Editing
Before you edit the wiki, it's important to understand some things.
1. The wiki uses Markdown for formatting. If you want to get technical, we use [react-markdown](https://www.npmjs.com/package/react-markdown/), which is built on the CommonMark spec. A simple way to handle formatting is this [Markdown cheat sheet](https://commonmark.org/help/), which is heavily suggested if you don't know Markdown.
2. There are two methods to editing a Recordkeeper-based wiki. You can either directly edit the Markdown files, or use the web editor. The web editor is under heavy development, so you may prefer the first option.

3. If this instance has the web editor enabled, it will require an account to use.

> As of this development build, this doesn't exist yet, though this may have already changed. Check GitHub to confirm one way or another. However, this is how it *will* be made. - Ael

To register/log in, open the sidebar and click on the `Editors` link at the bottom. It will prompt you to enter your email address. Then, check your email and open the link it sends you.

If you are newly registered, you will see a message saying "You don't have permission to edit the wiki!" To solve this, get the instance owner to open the Environment Variables of the instance and add your email to the `EDITORS` array. This will require a reboot to take effect, and once it does, then you will be able to edit the wiki.

## Using the Web Editor
The Web Editor is a simple tool to update pages in your browser. It requires being logged in, as described above.
Simply go to any page and click the pencil icon by the page name. This will open the editor and allow you to change the page. You can also delete the page from here, if you so choose.
### Renaming / Editing Page Paths
These actions are not *currently* supported (though they may be in the future). Please use a terminal or file explorer on the computer hosting the wiki, or if not possible, copying the page contents and then deleting and recreating it.