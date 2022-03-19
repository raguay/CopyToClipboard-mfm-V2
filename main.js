var copyToClipboard = {
  extMan: null,
  fs: null,
  init: function(extManager) {
    //
    // This function adds all the commands for working with copyToClipboard and 
    // setting up references to variables that are used.
    //
    copyToClipboard.extMan = extManager;
    copyToClipboard.fs = extManager.getLocalFS();
    copyToClipboard.extMan.getCommands().addCommand('Copy Name to Clipboard', '', 'Copy the file or directory name to the clipboard.', copyToClipboard.copyNameToClipboard);
    copyToClipboard.extMan.getCommands().addCommand('Copy Directory to Clipboard', '', 'Copy the file or directory parent directory to the clipboard.', copyToClipboard.copyDirectoryToClipboard);
    copyToClipboard.extMan.getCommands().addCommand('Copy Path to Clipboard', '', 'Copy the file or directory full path to the clipboard.', copyToClipboard.copyPathToClipboard);
  },
  installKeyMaps: function() {
    copyToClipboard.extMan.getExtCommand('addKeyboardShort').command('normal', false, false, false, 'n', copyToClipboard.copyNameToClipboard);
  },
  copyNameToClipboard: async function() {
    //
    // First, get the current cursor:
    //
    const cursor = copyToClipboard.extMan.getExtCommand('getCursor').command();
    await copyToClipboard.fs.setClipBoard(cursor.entry.name);
  },
  copyDirectoryToClipboard: async function() {
    //
    // First, get the current cursor:
    //
    const cursor = copyToClipboard.extMan.getExtCommand('getCursor').command();
    await copyToClipboard.fs.setClipBoard(cursor.entry.dir);
  },
  copyPathToClipboard: async function() {
    //
    // First, get the current cursor:
    //
    const cursor = copyToClipboard.extMan.getExtCommand('getCursor').command();
    const pth = await copyToClipboard.fs.appendPath(cursor.entry.dir, cursor.entry.name);
    await copyToClipboard.fs.setClipBoard(pth);
  }
};
return (copyToClipboard);

