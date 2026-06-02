export default function ContactUsPage() {
  return (
    <div className="cu-page">
      <div className="gr-title-bar" style={{ maxWidth:560 }}>Contact Us</div>
      <div className="cu-card">
        <div className="cu-row">
          <span className="cu-icon">📞</span>
          <div className="cu-info">
            <div className="cu-label">Phone (Senet Division)</div>
            <div className="cu-value">011-23062354</div>
          </div>
        </div>
        <div className="cu-divider" />
        <div className="cu-row">
          <span className="cu-icon">✉</span>
          <div className="cu-info">
            <div className="cu-label">Email</div>
            <div className="cu-value">
              <a href="mailto:charanjeet8882@gmail.com" className="cu-link">
                charanjeet8882@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="cu-divider" />
        <div className="cu-row">
          <span className="cu-icon">🏛</span>
          <div className="cu-info">
            <div className="cu-label">Organisation</div>
            <div className="cu-value">Office of Development Commissioner (MSME)</div>
            <div className="cu-value" style={{ fontSize:12, color:'#666', marginTop:2 }}>
              Ministry of Micro, Small &amp; Medium Enterprises
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
