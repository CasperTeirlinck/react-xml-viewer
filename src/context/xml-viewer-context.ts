import { defaultTheme } from 'contants';
import { createContext, useContext } from 'react';
import { IXmlViewerContext } from 'types';

const defaultState: IXmlViewerContext = {
  theme: defaultTheme,
  collapsible: false,
  indentSize: 2,
  expandedAll: false,
  collapsedAll: true,
  setExpandedAll: () => {},
  setCollapsedAll: () => {},
};

export const XMLViewerContext = createContext<IXmlViewerContext>(defaultState);
export const useXMLViewerContext = () => useContext(XMLViewerContext);
