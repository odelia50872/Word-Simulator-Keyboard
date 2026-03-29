import SaveFile from './SaveFile.jsx'
import EditFont from './EditFont.jsx'
import EditText from './EditText.jsx'
import logo from '../logo.png'

function WordToolbar({ 
  undo,
  textToSave, 
  resetText, 
  onTextLoad, 
  blockedIfDidntChooseFile, 
  onBlockAll,
  isBlocked,
  onFileSaved,
  onStyleChange,
  onAddFile,
  handleChange,
  onSearchCharBtn,
  setSearchChar,
  searchChar,
  onEditAll,
  onEditFromNow,
  editMode,
  capsLockOn,
  toggleBold,
  toggleItalic,
  toggleUnderline,
  isBold,
  isItalic,
  isUnderline,
  currentFont,
  fontSize,
  fontColor,
  onLogout
}) {
  return (
    <div className="word-toolbar">
      <img src={logo} alt="לוגו" className="toolbar-logo" />

      <div className="toolbar-rows">
        <div className="toolbar-row">
          <SaveFile 
            textToSave={textToSave} 
            resetText={resetText} 
            onTextLoad={onTextLoad} 
            onBlockAll={onBlockAll}
            isBlocked={isBlocked}
            onFileSaved={onFileSaved} 
          />
          <div className="toolbar-group">
            <button className={`toolbar-button ${isBold ? 'active' : ''}`} onClick={toggleBold} disabled={isBlocked}>
              <div className="toolbar-icon" style={{fontWeight: 'bold'}}>B</div>
              <div className="toolbar-label">מודגש</div>
            </button>
            <button className={`toolbar-button ${isItalic ? 'active' : ''}`} onClick={toggleItalic} disabled={isBlocked}>
              <div className="toolbar-icon" style={{fontStyle: 'italic'}}>I</div>
              <div className="toolbar-label">נטוי</div>
            </button>
            <button className={`toolbar-button ${isUnderline ? 'active' : ''}`} onClick={toggleUnderline} disabled={isBlocked}>
              <div className="toolbar-icon" style={{textDecoration: 'underline'}}>U</div>
              <div className="toolbar-label">קו תחתון</div>
            </button>
          </div>
          <div className="toolbar-group">
            <button className="toolbar-button" disabled={isBlocked}>
              <div className="toolbar-icon">☰</div>
              <div className="toolbar-label">שמאל</div>
            </button>
            <button className="toolbar-button" disabled={isBlocked}>
              <div className="toolbar-icon">☱</div>
              <div className="toolbar-label">מרכז</div>
            </button>
            <button className="toolbar-button" disabled={isBlocked}>
              <div className="toolbar-icon">☲</div>
              <div className="toolbar-label">ימין</div>
            </button>
            <button className="toolbar-button" disabled={isBlocked}>
              <div className="toolbar-icon">≡</div>
              <div className="toolbar-label">יישר</div>
            </button>
          </div>
          <div className="toolbar-group">
            <button className="toolbar-button" disabled={isBlocked}>
              <div className="toolbar-icon">•</div>
              <div className="toolbar-label">רשימה</div>
            </button>
            <button className="toolbar-button" disabled={isBlocked}>
              <div className="toolbar-icon">1.</div>
              <div className="toolbar-label">מספור</div>
            </button>
            <button className="toolbar-button" disabled={isBlocked}>
              <div className="toolbar-icon">⇥</div>
              <div className="toolbar-label">הקטן</div>
            </button>
            <button className="toolbar-button" disabled={isBlocked}>
              <div className="toolbar-icon">⇤</div>
              <div className="toolbar-label">הגדל</div>
            </button>
          </div>
          <div className="toolbar-group">
            <button className="toolbar-button" disabled={isBlocked}>
              <div className="toolbar-icon">🖨️</div>
              <div className="toolbar-label">הדפסה</div>
            </button>
            <button className="toolbar-button" disabled={isBlocked}>
              <div className="toolbar-icon">📋</div>
              <div className="toolbar-label">העתק</div>
            </button>
            <button className="toolbar-button" disabled={isBlocked}>
              <div className="toolbar-icon">✂️</div>
              <div className="toolbar-label">גזור</div>
            </button>
            <button className="toolbar-button" disabled={isBlocked}>
              <div className="toolbar-icon">📌</div>
              <div className="toolbar-label">הדבק</div>
            </button>
          </div>
        </div>

        <div className="toolbar-row">
          <EditFont 
            onStyleChange={onStyleChange}
            currentFont={currentFont}
            fontSize={fontSize}
            fontColor={fontColor}
            disabled={isBlocked}
          />
          <EditText 
            onEditAll={onEditAll} 
            onEditFromNow={onEditFromNow} 
            editMode={editMode} 
            capsLockOn={capsLockOn}
            disabled={isBlocked} 
          />
          <div className="toolbar-group">
            <button className="toolbar-button" onClick={onAddFile} disabled={isBlocked}>
              <div className="toolbar-icon">📄</div>
              <div className="toolbar-label">קובץ חדש</div>
            </button>
            <button className="toolbar-button" onClick={handleChange} disabled={isBlocked}>
              <div className="toolbar-icon">🔍</div>
              <div className="toolbar-label">חיפוש</div>
            </button>
            <button className="toolbar-button" onClick={undo} disabled={isBlocked}>
              <div className="toolbar-icon">↺</div>
              <div className="toolbar-label">חזור</div>
            </button>
            {onSearchCharBtn && (
              <input
                type="text"
                className="search-input"
                onChange={(e) => setSearchChar(e.target.value)}
                placeholder="הזן תו לחיפוש"
                disabled={isBlocked}
              />
            )}
          </div>
          <div className="toolbar-group">
            <button className="toolbar-button" onClick={onLogout}>
              <div className="toolbar-icon">⏻</div>
              <div className="toolbar-label">התנתק</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordToolbar