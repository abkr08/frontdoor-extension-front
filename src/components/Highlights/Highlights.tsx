import React, { useState, useEffect, useContext } from 'react';
import Highlight from './Highlight/Highlight';
import { Highlight as HighlightData } from '../../types';
import HighlightContext from '../../context/HighlightContext';


const Highlights: React.FC = () => {
    const context = useContext(HighlightContext);
    const highlights = context.highlights;
  const [sortedHighlights, setSortedHighlights] = useState<HighlightData[]>([]);
  const [filteredHighlights, setFilteredHighlights] = useState<HighlightData[]>([]);
  const [sortingOrder, setSortingOrder] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string>('');

  useEffect(() => {
    setSortedHighlights(highlights);
    setFilteredHighlights(highlights);
  }, [highlights]);

  const handleSortByDate = () => {
    let sortedData = [...sortedHighlights];
    if (sortingOrder) {
      sortedData = [...sortedHighlights].reverse();
      setSortingOrder(sortingOrder === 'asc' ? 'desc' : 'asc');
    } else {
      sortedData = sortedData.sort((a, b) => {
          // sort highlights by date (newest to oldest)
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setSortingOrder('desc');
    }
    setSortedHighlights(sortedData);
    setFilteredHighlights([...sortedData]);
  };

  const handleFilterByTag = (tag: string) => {
    if (tag === '') {
      setFilteredHighlights([...sortedHighlights]);
    } else {
      setFilteredHighlights([...sortedHighlights].filter(highlight => highlight.tags.includes(tag)));
    }
    setActiveTag(tag);
  };

  return (
    <div className='highlights-container'
      style={ filteredHighlights.length ? { justifyContent: 'flex-start'} : {}}
    >
      { filteredHighlights?.length > 0 ? (
        <>
          <div className='buttons-container'>
            <button onClick={handleSortByDate} className='button'>Sort by Date {sortingOrder && `(${sortingOrder})`}</button>
            <select onChange={(e) => handleFilterByTag(e.target.value)}>
              <option value=''>All Tags</option>
              {/* render options for all tags */}
              {Array.from(new Set(sortedHighlights.flatMap(highlight => highlight.tags)))?.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          { activeTag && <div className='active-tag'>{`Active tag: ${activeTag}`}</div>}
          <div>
            {/* render Highlight components for filteredHighlights */}
            {filteredHighlights.map((highlight, index) => (
              <Highlight key={index} highlight={highlight} />
            ))}
          </div>
      </>
      ) : (
        <span className='no-highlights'>No highlights defined yet.</span>
      )}
      </div>
    
  );
};

export default Highlights;
