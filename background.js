chrome.commands.onCommand.addListener(onCommand)

var reload = chrome.runtime.reload

async function onCommand(command) {
  let t = (await chromise.tabs.query({active:true,currentWindow:true}))[0]
  if (t) {
    //console.log('command',command,t.url, t.id, t.index)
    var tabs = await chromise.tabs.query({windowId: t.windowId})
    if (command == 'next_tab') {
      if (t.index == tabs.length - 1) {
        var newidx = 0
      } else {
        var newidx = t.index + 1
      }
    } else if (command == 'prev_tab') {
      if (t.index == 0) {
        var newidx = tabs.length-1
      } else {
        var newidx = t.index - 1
      }
    }
    var newt = (await chromise.tabs.query({windowId: t.windowId, index:newidx}))[0]
    var result = await chromise.tabs.update(newt.id,{active:true})
  }
}
