import React from 'react';
import { SummaryRequest } from '../types';

export default React.createContext({
  enabled: false,
  highlights: [],
  showTooltip: false,
  summary: '',
  url: '',
  getSummary: (data: SummaryRequest) => {},
  getHighlights: (url: string) => {},
  loadApp: () => {},
  updateTags: (newTags: Array<string>, highlightId: string) => {},
  setMode: () => {},
  setShowTooltip: (showTooltip: boolean) => {},
  setSummary: (summary: string) => {},
  setUrl: (url: string)  => {}
});