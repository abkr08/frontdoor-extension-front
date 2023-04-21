export interface SummaryRequest {
	text: string;
  startOffset: number;
  endOffset: number;
  querySelector: string;
  url: string;
}

export interface Highlight {
  id: string;
  text: string;
  url: string;
  user: string;
  summary: string;
  startOffset: number;
  endOffset: number;
  querySelector: string;
  tags: Array<string>;
  createdAt: Date;
}

export interface ToolTipPosition {
	left: number;
	top: number;
}