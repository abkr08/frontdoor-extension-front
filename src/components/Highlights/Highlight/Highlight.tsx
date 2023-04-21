import React from 'react';
import { Highlight as HighlightData } from '../../../types';
import TagInput from '../../TagInput/TagInput';

import "./Highlight.css";
import { getTimeSince } from '../../../utils/Shared';

interface HighlightProps {
  key: number;
  highlight: HighlightData;
}
const Highlight: React.FC<HighlightProps> = ({ highlight: { text, summary, tags, id, createdAt } }) => {
  return (
    <div className="highlight-container">
      <span className='text'>{getTimeSince(createdAt)}</span>
      <div className='text'>
      <span className='label'>Text</span>
      <p>{text}</p>
      </div>
      <div className='text'>
      <span className='label'>Summary</span>
      <p>{summary}</p>
      </div>
      <div className='tags-container'>
        <TagInput tags={tags} highlightId={id}/>
      </div>
    </div>
  );
};

export default Highlight;
