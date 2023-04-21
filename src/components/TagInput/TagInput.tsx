import React, { useState, ReactElement, useContext } from 'react';
import TagsInput from 'react-tagsinput';
import HighlightContext from '../../context/HighlightContext';

import './TagsInput.css';

interface Props {
    tags: Array<string>,
    highlightId: string;
  }

const TagInput: React.FC<Props> = ({
  tags,
  highlightId
}) => {
  const [tagValue, setTagValue] = useState('');
  const context = useContext(HighlightContext);

  const onPaste = (value: string): Array<string> => value.split(/,+/).map(val => val.trim());

  const renderTagComponent = (tag: string, key: number, onRemove: Function, getTagDisplayValue: Function): ReactElement => (
    <span className="tag" key={key}>
      <span className="slds-pill__label" title={getTagDisplayValue(tag)}>{getTagDisplayValue(tag)}</span>
      <span
        onClick={(e) => onRemove(key)}
        data-label={getTagDisplayValue(tag)}
        className="slds-icon_container slds-pill__remove remove-tag"
        title="Remove"
      >
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
      </span>
    </span>
  );

  const renderLayout = (tagComponents: ReactElement, inputComponent: ReactElement): ReactElement => (
    <span>
      {inputComponent}
      {tagComponents}
    </span>
  );

  return (
    <div className="tag-input-container">
      <TagsInput
        value={tags}
        onChange={(newTags: any) => context.updateTags(newTags, highlightId)}
        inputValue={tagValue}
        onChangeInput={(value: string) => value !== ',' && setTagValue(value)}
        inputProps={{
          placeholder: 'Press enter or comma to add a tag',
        }}
        onlyUnique
        addKeys={[13, 188]}
        removeKeys={[]}
        addOnBlur
        addOnPaste
        pasteSplit={onPaste}
        renderTag={(
            {
             tag, key, onRemove, getTagDisplayValue
            }: {tag: string, key: number, onRemove: Function, getTagDisplayValue: Function }) => renderTagComponent(
                tag, key, onRemove, getTagDisplayValue
            )
        }
        renderLayout={renderLayout}
      />
    </div>
  );
};

export default TagInput;
