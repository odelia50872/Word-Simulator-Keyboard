import { useState, useEffect } from 'react'

function TextArea(props) {
    const [editMode, setEditMode] = useState('all')
    const [text, setText] = useState('')
    const [textSegments, setTextSegments] = useState([])
    const [capsLockOn, setCapsLockOn] = useState(false)

    function addLetter(letter) {
        let processedLetter = letter
        // טיפול בתווים מיוחדים
        switch (letter) {
            case 'TAB':
                processedLetter = '    ' // 4 רווחים
                break
            case 'ENTER':
                processedLetter = '\n'
                break
            case 'SPACE':
                processedLetter = ' '
                break
            case 'BACKSPACE':
                if (editMode === 'all') {
                    setText(prev => prev.slice(0, -1))
                } else {
                    if (text.length > 0) {
                        setText(prev => prev.slice(0, -1))
                    } else if (textSegments.length > 0) {
                        setTextSegments(prev => {
                            const newSegments = [...prev]
                            const lastSegment = newSegments[newSegments.length - 1]
                            if (lastSegment.text.length > 1) {
                                lastSegment.text = lastSegment.text.slice(0, -1)
                            } else {
                                newSegments.pop()
                            }
                            return newSegments
                        })
                    }
                }
                return
            case 'CAPS LOCK':
                setCapsLockOn(prev => !prev)
                return
            default:
                if (letter.length > 1 && !/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(letter)) {
                    return // איגנור תווים מיוחדים אחרים (אבל לא אימוג'ים)
                }
                // החלת CAPS LOCK על אותיות
                if (capsLockOn && /[a-zA-Z]/.test(processedLetter)) {
                    processedLetter = /[a-z]/.test(processedLetter) ? processedLetter.toUpperCase() : processedLetter.toLowerCase()
                }

        }

        if (editMode === 'all') {
            setText(prev => prev + processedLetter)
        } else {
            const newSegment ={
                text: processedLetter,
                font: props.currentFont,
                size: props.fontSize,
                color: props.fontColor,
                bold: props.isBold,
                italic: props.isItalic,
                underline: props.isUnderline
            }
            setTextSegments(prev => [...prev, newSegment])
        }

    }

    function editAll() {
        setEditMode('all')
        const allText = text + textSegments.map(seg => seg.text).join('')
        setText(allText)
        setTextSegments([])
    }

    function editFromNow() {
        setEditMode('fromNow')
        if (text) {
            const currentSegment = {
                text: text,
                font: props.currentFont,
                size: props.fontSize,
                color: props.fontColor,
                bold: props.isBold,
                italic: props.isItalic,
                underline: props.isUnderline
            }
            setTextSegments(prev => [...prev, currentSegment])
            setText('')
        }
    }

    useEffect(() => {
        if (props.newLetter && !props.isBlocked) {
            addLetter(props.newLetter)
            props.onLetterProcessed?.()
        }
    }, [props.newLetter, props.isBlocked])

    useEffect(() => {
        const fullTextLength = text.length + textSegments.map(seg => seg.text).join('').length
        props.onCursorChange?.(fullTextLength)
    }, [text, textSegments])

    useEffect(() => {
        if (!props.isBlocked) {
            if (props.editAction === 'editAll') {
                editAll()
            } else if (props.editAction === 'editFromNow') {
                editFromNow()
            }
        }
        props.onActionProcessed?.()
    }, [props.editAction, props.isBlocked])

    useEffect(() => {
        if (props.onCapsLockChange) {
            props.onCapsLockChange(capsLockOn)
        }
    }, [capsLockOn])

    useEffect(() => {
        if (props.capsLockOn !== undefined) {
            setCapsLockOn(props.capsLockOn)
        }
    }, [props.capsLockOn])

    useEffect(() => {
        const textData = {
            editMode: editMode,
            text: text,
            textSegments: textSegments,
            currentFont: props.currentFont,
            fontSize: props.fontSize,
            fontColor: props.fontColor
        }
        props.onTextChange?.(textData)
    }, [text, textSegments, editMode, props.currentFont, props.fontSize, props.fontColor])

    useEffect(() => {
        if (props.shouldReset) {
            setText('')
            setTextSegments([])
            setEditMode('all')
            setCapsLockOn(false)
            props.onResetComplete?.()
        }
    }, [props.shouldReset])

    useEffect(() => {
        if (props.loadedText) {
            setText(props.loadedText.text || '')
            setTextSegments(props.loadedText.textSegments || [])
            setEditMode(props.loadedText.editMode || 'all')
            props.onStyleLoad?.(props.loadedText.currentFont, props.loadedText.fontSize, props.loadedText.fontColor)
        }
    }, [props.loadedText])

    useEffect(() => {
        if (props.searchChar) {
            const timer = setTimeout(() => {
                props.onSearchComplete?.()
            }, 4000)
            return () => clearTimeout(timer)
        }
    }, [props.searchChar])

    const highlightText = (text) => {
        if (!props.searchChar || !text.includes(props.searchChar)) {
            return text
        }
        const regex = new RegExp(`(${props.searchChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
        return text.split(regex).map((part, index) =>
            part.toLowerCase() === props.searchChar.toLowerCase() ?
                <span key={index} style={{ background: 'yellow' }}>{part}</span> : part
        )
    }

    const getTextStyle = (segment = null) => ({
        fontFamily: segment ? segment.font : props.currentFont,
        fontSize: `${segment ? segment.size : props.fontSize}px`,
        color: segment ? segment.color : props.fontColor,
        fontWeight: segment ? (segment.bold ? 'bold' : 'normal') : (props.isBold ? 'bold' : 'normal'),
        fontStyle: segment ? (segment.italic ? 'italic' : 'normal') : (props.isItalic ? 'italic' : 'normal'),
        textDecoration: segment ? (segment.underline ? 'underline' : 'none') : (props.isUnderline ? 'underline' : 'none')
    })

    const renderTextWithCursor = () => {
        if (editMode === 'all') {
            const fullText = text + textSegments.map(seg => seg.text).join('')
            const beforeCursor = fullText.slice(0, props.cursorPosition || fullText.length)
            const afterCursor = fullText.slice(props.cursorPosition || fullText.length)

            return (
                <span style={getTextStyle()}>
                    {highlightText(beforeCursor)}
                    {props.showCursor && <span className="cursor">|</span>}
                    {highlightText(afterCursor)}
                </span>
            )
        } else {
            return (
                <>
                    {textSegments.map((segment, index) => (
                        <span key={index} style={getTextStyle(segment)}>
                            {highlightText(segment.text)}
                        </span>
                    ))}
                    <span style={getTextStyle()}>
                        {highlightText(text)}
                        {props.showCursor && <span className="cursor">|</span>}
                    </span>
                </>
            )
        }
    }

    return (
        <>
            <div
                className="text-display"
                tabIndex={0}
            >
                {renderTextWithCursor()}
            </div>
        </>
    );
}

export default TextArea