import { defaultTheme } from 'contants';
import { XMLViewerContext } from 'context/xml-viewer-context';
import useXMLViewer from 'hooks/useXMLViewer';
import _isEqual from 'lodash/isEqual';
import { useEffect, useMemo, useState } from 'react';
import { ChevronBarContract, ChevronBarExpand } from 'react-bootstrap-icons';
import { Elements } from './Elements';
import { InvalidXml } from './InvalidXml';
import { Theme, XMLViewerProps } from './types';

export default function XMLViewer(props: XMLViewerProps): JSX.Element {
  const {
    theme: customTheme,
    xml,
    collapsible = false,
    indentSize = 2,
    invalidXml,
    initalCollapsedDepth,
  } = props;
  const [theme, setTheme] = useState<Theme>(() => ({ ...defaultTheme, ...customTheme }));
  const [expandedAll, setExpandedAll] = useState<boolean>(false);
  const [collapsedAll, setCollapsedAll] = useState<boolean>(true);
  const { json, valid } = useXMLViewer(xml);
  const context = useMemo(
    () => ({ theme, collapsible, indentSize, initalCollapsedDepth, expandedAll, collapsedAll, setExpandedAll, setCollapsedAll }),
    [theme, collapsible, indentSize, initalCollapsedDepth, expandedAll, collapsedAll],
  );

  useEffect(() => {
    setTheme((currentTheme) => {
      const nextTheme = { ...defaultTheme, ...customTheme };
      return _isEqual(nextTheme, currentTheme) ? currentTheme : nextTheme;
    });
  }, [customTheme]);

  if (!valid) {
    return invalidXml ? invalidXml : <InvalidXml />;
  }

  return (
    <XMLViewerContext.Provider value={context}>
      <div
        className="rxv-container"
        style={{ whiteSpace: 'pre-wrap', fontFamily: theme.fontFamily, overflowWrap: 'break-word' }}
      >
        <div>
          <button className="btn btn-secondary" onClick={() => { setExpandedAll(true); setCollapsedAll(false) }} style={{ marginRight: 10 }}>
            <ChevronBarExpand />
          </button>
          <button className="btn btn-secondary" onClick={() => { setExpandedAll(false); setCollapsedAll(true) }}>
            <ChevronBarContract />
          </button>
        </div>
        <br />
        <Elements elements={json} />
      </div>
    </XMLViewerContext.Provider>
  );
}
