# Intro to Editing
Before you edit the wiki, it's important to understand some things.
1. The wiki uses Markdown for formatting. If you want to get technical, we use [react-markdown](https://www.npmjs.com/package/react-markdown/), which is built on the CommonMark spec. A simple way to handle formatting is this [Markdown cheat sheet](https://commonmark.org/help/), which is heavily suggested if you don't know Markdown.
2. There are two methods to editing a Recordkeeper-based wiki. You can either directly edit the Markdown files, or use the web editor. The web editor is under heavy development, so you may prefer the first option.
3. You may not put folders in folders for the page sidebar. This means `wiki/Characters/Aelithron.md` is valid, but `wiki/Characters/Information/Aelithron.md` is invalid since there are too many folders. The root wiki/ folder doesn't count as a subfolder, as that's where **everything** for the wiki is placed. If using the Web Editor, this means you should not enter a slash into the Folder box.

# Using the Web Editor
If this instance has the web editor enabled, it will require an account to use.

To register/log in, open the sidebar and click on the pencil icon at the top-middle. It will prompt you to enter the wiki's Editor Password. This was entered by the person setting up the wiki, and they should be able to provide it to you. Once you get it, enter it into the bar on the page (be careful to get it right, you can get very easily locked out for a minute if you make a few wrong attempts).
> Error: This page requires a secure connection (HTTPS).
>
> If you see this message when logging in instead of a password prompt, this means you are on an insecure connection.
> It is a security risk to log in this way, so we have blocked it.
> Your web browser will also block authenticating on an insecure connection, so we can't do it anyway.
> Tell the wiki owner to set up TLS (Transport Layer Security), with a reverse proxy/loadbalancer or otherwise.

Once you have entered it, it should redirect you to the Editor Menu (though this doesn't always work). If you are not redirected, click to the sidebar and click the pencil icon once again. If you want to edit an existing page, select it to do so.
## Creating a Page
If you want to create a Page, click the green button near the top of the Editor Menu (the "Edit Pages" screen). It will give you two boxes, one for the name and one for the folder. If you want to create the page `Characters/Aelithron`, for example, you would enter `Aelithron` into the Name (first) box, and `Characters` into the Folder (second) box, then click the "Create" button. If you want to create a page that is not in any folder, leave the Folder box blank. **This is case sensitive!**
## Editing a Page
Now that you have a Page open, you will see the "unparsed Markdown" in the box. If you need access to the Markdown cheat sheet from earlier, click the blue button, and it will open in a new tab. You can edit the page's contents here, and once you click "Save Changes", it will be displayed publicly.
## Deleting a Page
For deleting pages, go back to the Editor from the step before. Click the red button that says "Delete Page' and confirm. Make sure you are deleting the correct page, as there is *no trash can* on the wiki, and deleted pages are **gone forever**.
## Renaming / Editing Page Paths
> Make sure to save before doing this! If you have unsaved content and move a page, it will be forgotten!

Enter the Editor for a page, and click the button at the bottom of the page. It will give you a similar menu to the Create menu, but prefilled with the current page information. Follow the same instructions for the Create menu, then click the Move button. It will redirect you to the new location.