// import dotenv from 'dotenv';
// dotenv.config();


chrome.action.onClicked.addListener(async (tabb) => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    await chrome.tabs.sendMessage(tab.id!, {type: 'showPopup', tab });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    sendResponse("Front the background Script");
})

export {} 