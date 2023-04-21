import { Highlight } from "../types";

export const LOAD_APP = 'LOAD_APP';
export const SET_HIGHLIGHTS = 'SET_HIGHLIGHTS';
export const SET_MODE = 'SET_MODE';
export const SET_SUMMARY = 'SET_SUMMARY';
export const SET_SUMMARY_TEXT = 'SET_SUMMARY_TEXT';
export const UPDATE_TAGS = 'UPDATE_TAGS';
export const TOGGLE_TOOLTIP_VISIBILITY = 'TOGGLE_TOOLTIP_VISIBILITY';
export const SET_URL = 'SET_URL';


const setHighlights = (highlights: Highlight[], state: any) => {
    return { ...state, highlights: highlights };
}

const setSummary = (highlight: Highlight, state: any) => {
    return { ...state, highlights: [...state.highlights, highlight], summary: highlight.summary, showTooltip: true };
}

const updateTags = (updatedHighlight: Highlight, state: any) => {
    const highlights = [...state.highlights];
    // get highlight
    const idx = state.highlights.findIndex((h: Highlight) => h.id === updatedHighlight.id);
    highlights.splice(idx, 1, updatedHighlight)
    return {...state, highlights }

}

export const highlightReducer = (state: any, action: any) => {
switch (action.type) {
  case LOAD_APP:
      const isEnabledString = localStorage.getItem('extensionEnabled');
      const featureEnabled = isEnabledString && isEnabledString !== 'undefined' ? JSON.parse(isEnabledString) : false;
      const url  = localStorage.getItem('url');
      return {...state, enabled: featureEnabled, url };
  case SET_MODE:
      localStorage.setItem('extensionEnabled', JSON.stringify(!state.enabled));
    return {...state, enabled: !state.enabled};
  case SET_HIGHLIGHTS:
    return setHighlights(action.highlights, state);
  case SET_SUMMARY:
      return setSummary(action.highlight, state);
  case SET_SUMMARY_TEXT:
    return { ...state, summary: action.summary };
  case UPDATE_TAGS:
      return updateTags(action.updatedHighlight, state);
  case TOGGLE_TOOLTIP_VISIBILITY:
    return {...state, showTooltip: action.showTooltip }
  case SET_URL:
    localStorage.setItem('url', action.url);
    return { ...state, url: action.url }
  default:
    return state;
}
};
