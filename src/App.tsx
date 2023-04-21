import { useState } from 'react';
import Main from './Main';
import GlobalState from './context/GlobalState';

import "./App.css";

function App() {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');

  chrome.runtime.onMessage.addListener((request: { type: string, tab: any }) => {
    if (request.type === 'showPopup') {
      const updatedState = !showPopup;

      const url = new URL(request.tab.url);
      const location = url.hostname;
      setUrl(location);
      setShowPopup(updatedState);
      const body = document.querySelector('body');
      body!.style.marginLeft = updatedState  ? '400px' : '0px';
    }
});

  return showPopup ? (
    <GlobalState>
     <Main url={url}/>
    </GlobalState>
  ) : null;
}

export default App;