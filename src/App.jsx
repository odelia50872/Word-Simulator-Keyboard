import './App.css'
import WordToolbar from './components/WordToolbar.jsx'
import BottomPanel from './components/BottomPanel.jsx'
import WordEditor from './pages/WordEditor.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { useTextEditor } from './hooks/useTextEditor.js'
import { useFileManager } from './hooks/useFileManager.js'
import { useState } from 'react'

function App() {
  const textEditor = useTextEditor()
  const fileManager = useFileManager()
  const [isBlocked, setIsBlocked] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [showSignup, setShowSignup] = useState(false)

  function handleUserLogout() {
    localStorage.removeItem('currentUser')
    textEditor.resetText()
  }

  // טען קבצים כשמשתמש נכנס
  function handleUserLogin() {
    textEditor.resetText()
    fileManager.clearTemporaryFiles()
    fileManager.loadUserFiles()
  }

  function onTextLoad(textData) {
    const hasContent = (textData?.text && textData.text !== '') ||
      (textData?.textSegments && textData.textSegments.length > 0)

    if (fileManager.showFilesList) {
      // שמור את הטקסט הנוכחי בקובץ הפעיל
      if (fileManager.activeFileId !== null) {
        fileManager.updateFileData(textToSave)
      }

      if (hasContent) {
        // טען את הקובץ החדש לטאב חדש
        const fileNumber = fileManager.files.length + 1
        const fileName = `קובץ נטען ${fileNumber}`
        fileManager.loadFileToNewTab(textData, fileName)
        textEditor.onLoadedTextChange(textData)
      } else {
        // אם אין תוכן, פתח קובץ חדש ריק
        fileManager.createNewFile('')
        textEditor.resetText()
        textEditor.onLoadedTextChange('')
      }
    } else {
      const processedData = fileManager.onTextLoad(textData)
      textEditor.onLoadedTextChange(processedData)
    }
  }

  const textToSave = fileManager.activeFile?.data || textEditor.currentText

  return (
    <>
      {showSignup && <div className="SignupPage">
        <div className="app-container">
          <Signup showSignupPage={setShowSignup} showLoginPage={setShowLogin} onUserLogin={handleUserLogin} />
        </div>
      </div>}
      {showLogin && <div className="LoginPage">
        <div className="app-container">
          <Login showSignupPage={setShowSignup} showLoginPage={setShowLogin} onUserLogin={handleUserLogin} />
        </div>
      </div>}
      <div className="WordEditorPage">
      </div>
      {!showLogin && !showSignup && <div className="app-container">
        <WordToolbar
          undo={textEditor.undo}
          textToSave={textToSave}
          resetText={textEditor.resetText}
          onTextLoad={onTextLoad}
          onBlockAll={setIsBlocked}
          isBlocked={isBlocked}
          onLogout={() => {
            handleUserLogout()
            setShowLogin(true)
          }}
          onFileSaved={() => {
            // שמור את הטקסט הנוכחי בקובץ הפעיל לפני הסרתו
            if (fileManager.activeFileId !== null) {
              fileManager.updateFileData(textToSave)
            }
            const nextFileData = fileManager.onCurrentFileSaved()
            if (nextFileData && typeof nextFileData === 'object') {
              textEditor.onLoadedTextChange(nextFileData)
            }
            return nextFileData
          }}
          onStyleChange={textEditor.onStyleChange}
          onAddFile={() => {
            // שמור את הטקסט הנוכחי בקובץ הפעיל לפני יצירת קובץ חדש
            if (fileManager.showFilesList && fileManager.activeFileId !== null) {
              fileManager.updateFileData(textToSave)
            }
            // יצור קובץ חדש ריק ועבור אליו
            fileManager.createNewFile('')
            // אפס את הטקסט הפנימי ואת התצוגה
            textEditor.resetText()
            textEditor.onLoadedTextChange('')
          }}
          handleChange={textEditor.handleChange}
          onSearchCharBtn={textEditor.onSearchCharBtn}
          setSearchChar={textEditor.setSearchChar}
          searchChar={textEditor.searchChar}
          onEditAll={textEditor.onEditAll}
          onEditFromNow={textEditor.onEditFromNow}
          editMode={textEditor.editMode}
          capsLockOn={textEditor.capsLockOn}
          toggleBold={textEditor.toggleBold}
          toggleItalic={textEditor.toggleItalic}
          toggleUnderline={textEditor.toggleUnderline}
          isBold={textEditor.isBold}
          isItalic={textEditor.isItalic}
          isUnderline={textEditor.isUnderline}
          currentFont={textEditor.currentFont}
          fontSize={textEditor.fontSize}
          fontColor={textEditor.fontColor}
        />

        <WordEditor textEditor={textEditor} fileManager={fileManager} isBlocked={isBlocked} />

        <BottomPanel
          editMode={textEditor.editMode}
          capsLockOn={textEditor.capsLockOn}
          currentFont={textEditor.currentFont}
          fontSize={textEditor.fontSize}
          fontColor={textEditor.fontColor}
          displayLetters={textEditor.displayLetters}
          blocked={textEditor.blocked}
        />
      </div>}
    </>
  )

}

export default App