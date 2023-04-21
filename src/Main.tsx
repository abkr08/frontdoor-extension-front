/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, FC } from 'react';
import 'semantic-ui-css/semantic.min.css';

import rangy from "rangy";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-serializer";
import { Radio, Form } from 'semantic-ui-react';

import Tooltip from './components/Tooltip';
import HighlightContext from './context/HighlightContext';

import { SummaryRequest, Highlight, ToolTipPosition } from './types';
import Highlights from './components/Highlights/Highlights';

rangy.init()
const highlighter = rangy.createHighlighter();
highlighter.addClassApplier(
  rangy.createClassApplier("select", {
    ignoreWhiteSpace: true,
    elementTagName: "span",
  })
);

// FC<{ url: string}>

export const TextHighlighter: FC<{ url: string}> = ({ url }) => {
    const context = useContext(HighlightContext);
    const { highlights, enabled, showTooltip, setShowTooltip, summary, setSummary } = context;
    const [toolTipPosition, setTooltipPosition] = useState<ToolTipPosition>({left: 0, top: 0});

    useEffect(() => {
      context.loadApp();
    }, [])

    useEffect(() => {
      // Only set event listeners if the feature is enabled
      if (enabled) {
      // Add event listener for mouseup event on the document
      window.addEventListener('mouseup', handleMouseUp);

      // Add event listener for mousedown event on the document
      window.addEventListener('mousedown', handleWindowClicked);

      // Add eventListener for onscroll
      window.addEventListener('scroll', () => setShowTooltip(false));

      return () => {
        // Add event listener for mouseup event on the document
      window.removeEventListener('mouseup', handleMouseUp);

      // Add event listener for mousedown event on the document
      window.removeEventListener('mousedown', handleWindowClicked);

      // Add eventListener for onscroll
      window.removeEventListener('scroll', () => setShowTooltip(false));
      }
    } else {
      // remove highlights
      const highlights = document.querySelectorAll('.highlight');
      // Remove the highlighting class from each element
      highlights.forEach((highlight) => {
      highlight.classList.remove('highlight');
      highlight.removeAttribute('querySelector');
});
    }
    }, [enabled]);

    useEffect(() => {
      context.setUrl(url);
      const fetchHighlights = async () => {
        await context.getHighlights(url);

        const { highlights } = context;
        highlights.forEach((highlight: Highlight) => {
          rangy.deserializeSelection(highlight.querySelector);
        })
      }

      fetchHighlights();
    }, [url])

    const handleMouseUp = () => {
      const selection = window.getSelection()!.toString().trim();
  
      if (selection) {
        selectText();
      }
    };

    const selectText = () => {
      const range = window.getSelection()!.getRangeAt(0);
      const bounds = range.getBoundingClientRect();
      setTooltipPosition({ left: bounds.left + 50, top: bounds.bottom });
      highlighter.highlightSelection("select");
    };

    const handleWindowClicked = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      const className = element.getAttribute('class');
      setShowTooltip(false);

      // Check if the selected text is clicked
      if (className === 'select') {
        highlightSelection();
        rangy.getSelection().removeAllRanges();
      } else if (className !== 'highlight') {
        if (rangy.getSelection().toString()) {
          highlighter.unhighlightSelection();
        }
      }
    };

    // Add hover event listener to all highlighted elements
    useEffect(() => {
      const highlightedElements = document.getElementsByClassName('highlight');
  
      for (let i = 0; i < highlightedElements.length; i++) {
          const element = highlightedElements[i];
          // Add hover eventListener
          element.addEventListener('mouseenter', handleHoverHighlightedText as EventListener);
      };
    }, [highlights]);

    const handleHoverHighlightedText = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      
      const newTooltipPosition = calculateTooltipPosition(event);
      setTooltipPosition(newTooltipPosition);
  
      const querySelector = element.getAttribute('data-querySelector');
      const highlight = context.highlights.find((s: Highlight) => s.querySelector === querySelector) as unknown as Highlight;
  
      if (highlight) {
        // Show the summary in a tooltip or popover.
        setSummary(highlight.summary);
        setShowTooltip(true);
        
        // hide tooltip on mouseleave
        element.addEventListener('mouseleave', () => {
          setShowTooltip(false);
        });
      }
  
    }

    const calculateTooltipPosition = (event: MouseEvent): ToolTipPosition => {
      const offsetX = 20;
      const offsetY = 10;
  
      const x = event.clientX + offsetX;
      const y = event.clientY + offsetY;

  
      return { left: x, top: y };
    }

    const highlightSelection = async () => {
      // Get selection
      const selection = rangy.getSelection();
      const text = selection.toString();
      const range = selection.getRangeAt(0);
  
      // Set data
      const serializedSelection = rangy.serializeSelection();
      const newSummaryRequest: SummaryRequest = {
        text,
        startOffset: range.startOffset,
        endOffset: range.endOffset,
        querySelector: serializedSelection,
        url,
      };
  
        // Change selection background from blue to yellow to confirm selection
        const selections = document.getElementsByClassName('select');
  
        for (let i = 0; i < selections.length; i++) {
            const element = selections[i];
            element.classList.add('highlight');
            element.classList.remove('select');
            element.setAttribute('data-querySelector', serializedSelection);
        };
  
      // get Summary
      await context.getSummary(newSummaryRequest);
    }
    return (
      <div className='ext-container'>
        { enabled ? (
          <>
            <Highlights />
              {showTooltip && (
                <Tooltip text={summary} position={toolTipPosition}/>
              )}
              </>
            ): (
              <span className='no-highlights'>Feature is disabled.</span>
            )}
            <div className="toggle-button">
              <Form.Field>
                <Radio
                  label={`${enabled ? 'Enabled' : 'Disabled'} on ${url}`}
                  toggle
                  checked={context.enabled}
                  onChange={context.setMode}
                />
                </Form.Field>
              </div>
      </div>
    );
}  

export default TextHighlighter;
