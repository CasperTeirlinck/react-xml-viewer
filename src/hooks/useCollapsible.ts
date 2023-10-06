import { useXMLViewerContext } from 'context/xml-viewer-context';
import _isNil from 'lodash/isNil';
import { ReactNode, isValidElement, useEffect, useState } from 'react';

export function useCollapsible(level: number, initialCollapsed: boolean = false) {
  const { collapsible, initalCollapsedDepth } = useXMLViewerContext();
  const [collapsed, setCollapsed] = useState(() =>
    _isNil(initalCollapsedDepth) || !collapsible ? false : level >= initalCollapsedDepth,
  );
  const toggleCollapsed = () => setCollapsed((currentCollapsed) => !currentCollapsed);

  useEffect(() => {
    setCollapsed(
      initialCollapsed || _isNil(initalCollapsedDepth) || !collapsible ? false : level >= initalCollapsedDepth,
    );
  }, [initalCollapsedDepth, level, collapsible]);

  return {
    collapsed,
    buttonProps: !collapsible
      ? {}
      : {
          onClick: toggleCollapsed,
          role: 'button',
          style: { cursor: 'pointer' },
        },
  };
}

/**
 * Check if the children of a tag only contains text and not actually other tags.
 */
export function isTextTag(children?: ReactNode) {
  if (!isValidElement(children)) {
    return false;
  }
  if (!children.props.elements[0]) {
    return false;
  }
  
  return "#text" in children.props.elements[0];
}