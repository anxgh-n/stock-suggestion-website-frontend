import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef(null);

  useEffect(() => {
    // Check if the widget is already loaded to prevent it from loading again
    if (!container.current || container.current.querySelector('script')) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `{
      "exchanges": [],
      "dataSource": "SPX500",
      "grouping": "sector",
      "blockSize": "market_cap_basic",
      "blockColor": "change",
      "locale": "in",
      "symbolUrl": "",
      "colorTheme": "dark",
      "hasTopBar": false,
      "isDataSetEnabled": false,
      "isZoomEnabled": true,
      "hasSymbolTooltip": true,
      "isMonoSize": false,
      "width": "60%", 
      "height": "100%" 
    }`;

    container.current.appendChild(script);

    // Cleanup on unmount to avoid duplicate widgets when the component is removed
    return () => {
      if (container.current) {
        container.current.innerHTML = '';  // Remove existing widget content
      }
    };
  }, []);  // Empty dependency array to ensure this only runs once on mount

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ width: '60%', height: '100vh', margin: '0 auto' }}
    >
      <div className="tradingview-widget-container__widget" style={{ width: '100%', height: '100%' }}></div>
      <div className="tradingview-widget-copyright">
        <a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
