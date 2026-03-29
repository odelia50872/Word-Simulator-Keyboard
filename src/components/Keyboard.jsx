import React, { useState } from 'react'

function Keyboard(props) {
    const [currentLanguage, setCurrentLanguage] = useState(0)

    function changeLanguage() {
        setCurrentLanguage(prev => (prev + 1) % 3)
    }

    function handleClick(ch, e) {
        if (ch === 'LANG') {
            changeLanguage()
        } else {
            if (!props.blocked)
                props.onClick?.(ch, e)
        }
    }

    const languages = [
        [
            { keys: ['!', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='], end: 'BACKSPACE' },
            { start: 'TAB', keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '?'] },
            { start: 'CAPS LOCK', keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"], end: 'ENTER' },
            { start: 'SHIFT', keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'], end: 'SHIFT' },
            { keys: ['CTRL', 'ALT', 'SPACE', 'ALT', 'CTRL', 'LANG'] }
        ],
        [
            { keys: ['!', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='], end: 'BACKSPACE' },
            { start: 'TAB', keys: ['/', "'", 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ', '[', ']', '?'] },
            { start: 'CAPS LOCK', keys: ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף', ','], end: 'ENTER' },
            { start: 'SHIFT', keys: ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', '.'], end: 'SHIFT' },
            { keys: ['CTRL', 'ALT', 'SPACE', 'ALT', 'CTRL', 'LANG'] }
        ],
        [
            { keys: ['😂', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘'], end: 'BACKSPACE' },
            { start: 'TAB', keys: ['😜', '😝', '😛', '🤑', '🤓', '🥰', '😏', '😒', '😞', '😕'] },
            { start: 'CAPS LOCK', keys: ['😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😱', '😥'], end: 'ENTER' },
            { start: 'SHIFT', keys: ['👍', '👏', '🙏', '🔥', '❤️', '💛', '💚', '💙'], end: 'SHIFT' },
            { keys: ['CTRL', 'ALT', 'SPACE', 'ALT', 'CTRL', 'LANG'] }
        ]
    ]

    const currentLang = languages[currentLanguage]

    return (
        <div className="keyboard">
            {currentLang.map((row, i) => (
                <div key={i} className="keyboard-row">
                    {row.start && <button className={`key ${row.start.toLowerCase().replace(' ', '-')}-key`} onClick={(e) => handleClick(row.start, e)} type="button">{row.start}</button>}
                    {row.keys.map((key, j) => <button key={`${key}-${j}`} className={key === 'SPACE' ? 'key space-key' : 'key'} onClick={(e) => handleClick(key, e)} type="button">{key}</button>)}
                    {row.end && <button className={`key ${row.end.toLowerCase()}-key`} onClick={(e) => handleClick(row.end, e)} type="button">{row.end}</button>}
                </div>
            ))}
        </div>
    )
}

export default Keyboard