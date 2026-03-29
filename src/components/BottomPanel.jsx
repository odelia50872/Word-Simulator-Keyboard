import Keyboard from './Keyboard.jsx'

function BottomPanel({ 
  editMode, 
  capsLockOn, 
  currentFont, 
  fontSize, 
  fontColor, 
  displayLetters, 
  blocked 
}) {
  return (
    <div className="bottom-section">
      <div className="edit-text-section">
        <h3 style={{color: '#ffffff', fontSize: '14px', marginBottom: '16px'}}>מצב עריכה</h3>
        <div style={{fontSize: '12px', color: '#ffffff'}}>
          <div>מצב: {editMode === 'all' ? 'כל הטקסט' : 'מעכשיו'}</div>
          <div style={{color: capsLockOn ? '#ff6b6b' : '#ffffff', marginTop: '8px'}}>
            CAPS: {capsLockOn ? 'פעיל' : 'כבוי'}
          </div>
        </div>
      </div>
      
      <div className="keyboard-section">
        <Keyboard onClick={displayLetters} blocked={blocked} />
      </div>
      
      <div className="edit-font-section">
        <h3 style={{color: '#ffffff', fontSize: '14px', marginBottom: '16px'}}>מידע נוסף</h3>
        <div style={{fontSize: '12px', color: '#ffffff'}}>
          <div>גופן: {currentFont}</div>
          <div>גודל: {fontSize}pt</div>
          <div>צבע: {fontColor}</div>
        </div>
      </div>
    </div>
  )
}

export default BottomPanel