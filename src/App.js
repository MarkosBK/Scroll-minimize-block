import { useEffect, useRef, useState } from 'react';
import './App.css';
import useDetectElement from './hooks/use-detect-element';

function BlockItem({minimized}) {
  return (
    <div className="item">
      <span className={`title ${minimized ? 'minimized' : ''}`}>120.000</span>
      <span className={`subtitle ${minimized ? 'hide' : ''}`}>Occaecat nostrud proident ad nulla</span>
      <span className={`content ${minimized ? 'hide' : ''}`}>Occaecat nostrud proident ad nulla cupidatat sint nostrud dolore commodo dolor cupidatat minim ut.</span>
    </div>
  );
}



function App() {
  const anchorRef = useRef()
  const blockRef = useRef()
  const [ct, setCt] = useState(null)
  const onDetectBlock = useDetectElement({
    ref: anchorRef
  })

  useEffect(() => {
    if (onDetectBlock) {
      if (ct) {
        clearTimeout(ct)
      }
      document.body.style.overflowAnchor = null
      blockRef.current.style.flexDirection = 'column'
    } else {
      document.body.style.overflowAnchor = 'none'
      setCt(setTimeout(() => {
        if (!onDetectBlock) {
          blockRef.current.style.flexDirection = 'row'
        }
        setTimeout(() => {
          document.body.style.overflowAnchor = null
        }, 300)
        setCt(null)
      }, 300))
    }
  }, [onDetectBlock])

  return (
    <div className="app">
      <div className="container">
        <div className="anchor" ref={anchorRef}></div>
        <div className="block" ref={blockRef}>
          <div className={`blockTitle ${onDetectBlock ? '' : 'minimized'}`}>
            Occaecat nostrud proident ad nulla cupidatat sint
          </div>
          <div className={`items ${onDetectBlock ? '' : 'minimized'}`}>
            <BlockItem minimized={!onDetectBlock}/>
            <BlockItem minimized={!onDetectBlock}/>
            <BlockItem minimized={!onDetectBlock}/>
          </div>
        </div>

        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
      </div>
    </div>
  );
}

export default App;
