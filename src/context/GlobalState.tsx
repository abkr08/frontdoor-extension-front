import React, { useReducer, PropsWithChildren } from 'react';
import axios from 'axios';
import { Highlight, SummaryRequest } from '../types';

import HighlightContext from './HighlightContext';
import { highlightReducer,
  SET_SUMMARY, SET_HIGHLIGHTS, LOAD_APP, UPDATE_TAGS,
  SET_MODE, TOGGLE_TOOLTIP_VISIBILITY, SET_SUMMARY_TEXT , SET_URL
} from './reducers';
const baseUrl = 'http://localhost:3000';
const GlobalState = (props: PropsWithChildren) => {
    const initialState = {
        enabled: false,
        highlights: [],
				showTooltip: false,
				summary: '',
        url: '',
     };


  const [state, dispatch] = useReducer(highlightReducer, initialState);

const	getSummary = async (data: SummaryRequest) => {
	try {
		const apiURL = `${baseUrl}/summarize`;
		const response = await axios.post(apiURL, data);
		dispatch({ type: SET_SUMMARY, highlight: response.data, showTooltip: true });
} catch (error) {
		console.log(error);
}
}

const loadApp = () => {
	dispatch({ type: LOAD_APP });
}

const setMode = () => {
	dispatch({ type: SET_MODE });
}

const setShowTooltip = (showTooltip: boolean) => dispatch({type: TOGGLE_TOOLTIP_VISIBILITY, showTooltip });
const setSummary = (summary: string) => ({type: SET_SUMMARY_TEXT, summary });

const getHighlights = async (url: string) => {
	const apiURL = `${baseUrl}/highlight/all`;
	const response = await axios.post(apiURL, { url });
	dispatch({ type: SET_HIGHLIGHTS, highlights: response.data });
}

const updateTags = async (newTags: Array<string>, highlightId: string) => {
  const highlight = state.highlights.find((h: Highlight) => h.id === highlightId);

  if (highlight) {
    try {
      const apiURL = `${baseUrl}/highlight`;
      const data = {
        id: highlightId,
        tags: newTags,
      };
      const response = await axios.put(apiURL, data);
      dispatch({ type: UPDATE_TAGS, updatedHighlight: response.data });
    } catch(error) {
      console.log(error);
    }
  }
}

const setUrl = (url: string) => dispatch({ type: SET_URL, url });

  return (
    <HighlightContext.Provider
      value={{
        enabled: state.enabled,
        highlights: state.highlights,
        showTooltip: state.showTooltip,
        summary: state.summary,
        url: state.url,
        getHighlights: getHighlights,
        getSummary: getSummary,
				loadApp: loadApp,
				updateTags: updateTags,
        setMode: setMode,
        setShowTooltip: setShowTooltip,
        setSummary: setSummary,
        setUrl: setUrl
      }}
    >
      {props.children}
    </HighlightContext.Provider>
  );
};

export default GlobalState;
