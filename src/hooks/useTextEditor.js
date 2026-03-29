import { useState, useEffect, useRef } from 'react'

export function useTextEditor() {
  const [newLetter, setNewLetter] = useState(null)
  const [currentFont, setCurrentFont] = useState('Calibri')
  const [fontSize, setFontSize] = useState(24)
  const [fontColor, setFontColor] = useState('black')
  const [editAction, setEditAction] = useState(null)
  const [editMode, setEditMode] = useState('all')
  const [capsLockOn, setCapsLockOn] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [shouldReset, setShouldReset] = useState(false)
  const [loadedText, setLoadedText] = useState(null)
  const [blocked, setBlocked] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  const [searchChar, setSearchChar] = useState('')
  const [onSearchCharBtn, setOnSearchCharBtn] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [undoStack, setUndoStack] = useState([{
    textData: '',
    font: 'Calibri',
    size: 24,
    color: 'black',
    bold: false,
    italic: false,
    underline: false
  }])
  const shouldSave = useRef(false)

  function undo() {
    if (undoStack.length > 1) {
      const newStack = [...undoStack]
      newStack.pop()
      const previousState = newStack[newStack.length - 1]
      
      // עדכן את כל המצב
      setCurrentText(previousState.textData)
      setCurrentFont(previousState.font)
      setFontSize(previousState.size)
      setFontColor(previousState.color)
      setIsBold(previousState.bold)
      setIsItalic(previousState.italic)
      setIsUnderline(previousState.underline)
      setUndoStack(newStack)
      
      // אלץ עדכון של TextArea
      setLoadedText(previousState.textData)
    }
  }

  function saveToHistory() {
    const currentState = {
      textData: currentText,
      font: currentFont,
      size: fontSize,
      color: fontColor,
      bold: isBold,
      italic: isItalic,
      underline: isUnderline
    }
    setUndoStack(prev => [...prev, currentState])
  }

  function displayLetters(letter) {
    // שמור את המצב הנוכחי לפני השינוי
    if (letter && letter !== 'CAPS LOCK' && letter !== 'SHIFT' && letter !== 'CTRL' && letter !== 'ALT' && letter !== 'LANG') {
      const currentState = {
        textData: currentText,
        font: currentFont,
        size: fontSize,
        color: fontColor,
        bold: isBold,
        italic: isItalic,
        underline: isUnderline
      }
      setUndoStack(prev => {
        const lastState = prev[prev.length - 1]
        if (JSON.stringify(lastState.textData) !== JSON.stringify(currentState.textData)) {
          return [...prev, currentState]
        }
        return prev
      })
    }
    setNewLetter(letter)
  }

  function onLetterProcessed() {
    setNewLetter(null)
  }

  function onCapsLockChange(newState) {
    setCapsLockOn(newState)
  }

  function onStyleChange(font, size, color) {
    saveToHistory()
    setCurrentFont(font)
    setFontSize(size)
    setFontColor(color)
  }

  function onEditAll() {
    setEditAction('editAll')
    setEditMode('all')
  }

  function onEditFromNow() {
    setEditAction('editFromNow')
    setEditMode('fromNow')
  }

  function onActionProcessed() {
    setEditAction(null)
  }

  function onTextChange(textData) {
    setCurrentText(textData)
  }

  // שמור להיסטוריה כשהטקסט משתנה
  useEffect(() => {
    if (shouldSave.current) {
      // שמור את המצב הקודם (לפני השינוי)
      const lastState = undoStack[undoStack.length - 1]
      shouldSave.current = false
    }
  }, [currentText])

  function onLoadedTextChange(textData) {
    setLoadedText(textData)
  }
  
  function resetText() {
    setCurrentText('')
    setLoadedText('')
    setEditMode('all')
    setFontColor('black')
    setFontSize(24)
    setCurrentFont('Calibri')
    setEditAction(null)
    setNewLetter(null)
    setCapsLockOn(false)
    setShouldReset(true)
    setUndoStack([{
      textData: '',
      font: 'Calibri',
      size: 24,
      color: 'black',
      bold: false,
      italic: false,
      underline: false
    }])
  }

  function onStyleLoad(font, size, color) {
    setCurrentFont(font)
    setFontSize(size)
    setFontColor(color)
  }

  function blockedIfDidntChooseFile() {
    setBlocked(prev => !prev)
  }

  function handleChange() {
    setOnSearchCharBtn(true)
  }

  function onSearchComplete() {
    setOnSearchCharBtn(false)
    setSearchChar('')
  }

  function toggleBold() {
    saveToHistory()
    setIsBold(prev => !prev)
    setEditAction('toggleBold')
  }

  function toggleItalic() {
    saveToHistory()
    setIsItalic(prev => !prev)
    setEditAction('toggleItalic')
  }

  function toggleUnderline() {
    saveToHistory()
    setIsUnderline(prev => !prev)
    setEditAction('toggleUnderline')
  }

  return {
    newLetter, currentFont, fontSize, fontColor, editAction, editMode, capsLockOn,
    currentText, shouldReset, loadedText, blocked, cursorPosition, searchChar,
    onSearchCharBtn, isBold, isItalic, isUnderline,
    undo, saveToHistory, displayLetters, onLetterProcessed, onStyleChange, onEditAll, onEditFromNow,
    onActionProcessed, onTextChange, resetText, onStyleLoad, blockedIfDidntChooseFile,
    handleChange, onSearchComplete, toggleBold, toggleItalic, toggleUnderline,
    setCapsLockOn, setShouldReset, setCursorPosition, setSearchChar, onLoadedTextChange,
    onCapsLockChange
  }
}