import { useState, useEffect } from 'react'

export function useFileManager() {
  const [files, setFiles] = useState([])
  const [activeFileId, setActiveFileId] = useState(null)
  const [showFilesList, setShowFilesList] = useState(false)

  useEffect(() => {
    loadUserFiles()
  }, [])

  function clearTemporaryFiles() {
    setFiles([])
    setActiveFileId(null)
    setShowFilesList(false)
  }



  // טען קבצים זמניים של המשתמש
  function loadTemporaryFiles() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if (currentUser.userId) {
      const tempFiles = localStorage.getItem(`tempFiles_${currentUser.userId}`)
      if (tempFiles) {
        const parsedTempFiles = JSON.parse(tempFiles)
        setFiles(parsedTempFiles.files || [])
        setActiveFileId(parsedTempFiles.activeFileId)
        setShowFilesList(parsedTempFiles.showFilesList || false)
        return true
      }
    }
    return false
  }

  function loadUserFiles() {
    // נסה לטעון קבצים זמניים קודם
    if (loadTemporaryFiles()) {
      return
    }
    
    // אם אין קבצים זמניים, טען קבצים שמורים
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if (currentUser.savedFiles && currentUser.savedFiles.length > 0) {
      const userFiles = currentUser.savedFiles.map((fileObj, index) => {
        const fileName = Object.keys(fileObj)[0]
        const fileData = fileObj[fileName]
        return {
          id: index,
          name: fileName,
          data: fileData
        }
      })
      setFiles(userFiles)
      setShowFilesList(true)
      if (userFiles.length > 0) {
        setActiveFileId(0)
      }
    }
  }

  function onFileSaved() {
    if (showFilesList && activeFileId !== null) {
      setFiles(prev => prev.filter(file => file.id !== activeFileId))
      const remainingFiles = files.filter(file => file.id !== activeFileId)
      if (remainingFiles.length > 0) {
        setActiveFileId(remainingFiles[0].id)
      } else {
        setShowFilesList(false)
        setActiveFileId(null)
      }
    }
  }

  function onCurrentFileSaved() {
    if (showFilesList && activeFileId !== null) {
      const remainingFiles = files.filter(file => file.id !== activeFileId)
      setFiles(remainingFiles)
      if (remainingFiles.length > 0) {
        const nextFile = remainingFiles[0]
        setActiveFileId(nextFile.id)
        return nextFile.data
      } else {
        setShowFilesList(false)
        setActiveFileId(null)
        return ''
      }
    }
    return ''
  }

  function onAddFile(currentText = '') {
    createNewFile(currentText)
  }

  function createNewFile(currentText = '') {
    const newId = files.length > 0 ? Math.max(...files.map(f => f.id)) + 1 : 0
    const newFileName = `קובץ חדש ${newId + 1}`
    
    if (!showFilesList) {
      if (currentText && currentText !== '') {
        setFiles([{ id: 0, name: 'קובץ נוכחי', data: currentText }, { id: 1, name: newFileName, data: '' }])
        setActiveFileId(1)
      } else {
        setFiles([{ id: 0, name: newFileName, data: '' }])
        setActiveFileId(0)
      }
      setShowFilesList(true)
    } else {
      setFiles(prev => [...prev, { id: newId, name: newFileName, data: '' }])
      setActiveFileId(newId)
    }
  }

  function switchToFile(fileId) {
    setActiveFileId(fileId)
    const file = files.find(f => f.id === fileId)
    return file ? file.data : ''
  }

  function updateFileData(textData) {
    if (showFilesList && activeFileId !== null) {
      setFiles(prev => prev.map(file =>
        file.id === activeFileId ? { ...file, data: textData } : file
      ))
    }
  }

  function onTextLoad(textData) {
    const hasContent = (textData?.text && textData.text !== '') ||
      (textData?.textSegments && textData.textSegments.length > 0)

    if (hasContent) {
      loadFileToNewTab(textData)
    }
    return textData
  }

  function loadFileToNewTab(textData) {
    const newId = files.length > 0 ? Math.max(...files.map(f => f.id)) + 1 : 0
    const newFileName = `טקסט חדש ${newId + 1}`
    
    setFiles(prev => [...prev, { 
      id: newId, 
      name: newFileName,
      data: textData 
    }])
    setActiveFileId(newId)
    
    if (!showFilesList) {
      setShowFilesList(true)
    }
    return textData
  }

  const activeFile = showFilesList ? files.find(f => f.id === activeFileId) : null

  return {
    files,
    activeFileId,
    showFilesList,
    activeFile,
    onFileSaved,
    onCurrentFileSaved,
    onAddFile,
    createNewFile,
    switchToFile,
    updateFileData,
    onTextLoad,
    loadFileToNewTab,
    loadUserFiles,
    clearTemporaryFiles
  }
}