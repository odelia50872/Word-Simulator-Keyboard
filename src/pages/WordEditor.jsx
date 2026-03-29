import TextArea from '../components/TextArea.jsx'

function WordEditor({ textEditor, fileManager, isBlocked }) {
  function handleTextChange(textData) {
    if (fileManager.showFilesList && fileManager.activeFileId !== null) {
      fileManager.updateFileData(textData)
    } else {
      textEditor.onTextChange(textData)
    }
  }

  return (
    <div className="text-area-full">
      {fileManager.showFilesList ? (
        <div className="files-container">
          <div className="file-tabs">
            {fileManager.files.map(file => (
              <div key={file.id} className={`file-tab ${file.id === fileManager.activeFileId ? 'active' : ''}`}>
                <div className="file-tab-title">{file.name || `קובץ ${file.id + 1}`}</div>
                <div className="file-preview">
                  {file.data?.text || file.data?.textSegments?.map(seg => seg.text).join('') || 'קובץ ריק'}
                </div>
                <button
                  className="switch-file-btn"
                  onClick={() => {
                    const fileData = fileManager.switchToFile(file.id)
                    textEditor.onLoadedTextChange(fileData)
                  }}
                >
                  ערוך קובץ
                </button>
              </div>
            ))}
          </div>
          <div className="active-editor">
            <TextArea
              {...textEditor}
              onTextChange={handleTextChange}
              onResetComplete={() => textEditor.setShouldReset(false)}
              onCursorChange={textEditor.setCursorPosition}
              showCursor={!textEditor.blocked && !isBlocked}
              onCapsLockChange={textEditor.onCapsLockChange}
              isBlocked={isBlocked}
            />
          </div>
        </div>
      ) : (
        <TextArea
          {...textEditor}
          onTextChange={handleTextChange}
          onResetComplete={() => textEditor.setShouldReset(false)}
          onCursorChange={textEditor.setCursorPosition}
          showCursor={!textEditor.blocked && !isBlocked}
          onCapsLockChange={textEditor.onCapsLockChange}
          isBlocked={isBlocked}
        />
      )}
    </div>
  )
}

export default WordEditor