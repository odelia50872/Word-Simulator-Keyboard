import { useState, useEffect } from 'react'

function EditFont(props) {
    const [currentFont, setCurrentFont] = useState(0)
    const [fontSize, setFontSize] = useState(12)
    const [fontColor, setFontColor] = useState(0)

    const fonts = ['Calibri', 'Arial', 'Times New Roman', 'Segoe UI']
    const colors = ['black', 'red', 'blue', 'green', 'yellow', 'pink']

    useEffect(() => {
        if (props.currentFont) {
            const fontIndex = fonts.indexOf(props.currentFont)
            setCurrentFont(fontIndex >= 0 ? fontIndex : 0)
        }
        if (props.fontSize) {
            setFontSize(props.fontSize)
        }
        if (props.fontColor) {
            const colorIndex = colors.indexOf(props.fontColor)
            setFontColor(colorIndex >= 0 ? colorIndex : 0)
        }
    }, [props.currentFont, props.fontSize, props.fontColor])

    function changeFont(e) {
        const fontIndex = fonts.indexOf(e.target.value)
        setCurrentFont(fontIndex >= 0 ? fontIndex : 0)
        props.onStyleChange?.(e.target.value, fontSize, colors[fontColor])
    }

    function increaseFontSize() {
        const newSize = Math.min(fontSize + 2, 72)
        setFontSize(newSize)
        props.onStyleChange?.(fonts[currentFont], newSize, colors[fontColor])
    }

    function decreaseFontSize() {
        const newSize = Math.max(fontSize - 2, 8)
        setFontSize(newSize)
        props.onStyleChange?.(fonts[currentFont], newSize, colors[fontColor])
    }

    function changeFontSize(e) {
        const newSize = parseInt(e.target.value) || 12
        setFontSize(newSize)
        props.onStyleChange?.(fonts[currentFont], newSize, colors[fontColor])
    }

    function changeFontColor() {
        const newColor = (fontColor + 1) % colors.length
        setFontColor(newColor)
        props.onStyleChange?.(fonts[currentFont], fontSize, colors[newColor])
    }

    return (
        <div className="toolbar-group">
            <select className="font-dropdown" value={fonts[currentFont]} onChange={changeFont} disabled={props.disabled}>
                {fonts.map(font => (
                    <option key={font} value={font}>{font}</option>
                ))}
            </select>
            
            <div style={{display: 'flex', alignItems: 'center'}}>
                <input 
                    type="number" 
                    className="font-size-input" 
                    value={fontSize} 
                    onChange={changeFontSize}
                    min="8"
                    max="72"
                    disabled={props.disabled}
                />
                <div className="font-size-buttons">
                    <button className="font-size-btn" onClick={increaseFontSize} disabled={props.disabled}>▲</button>
                    <button className="font-size-btn" onClick={decreaseFontSize} disabled={props.disabled}>▼</button>
                </div>
            </div>

            <button className="toolbar-button" onClick={changeFontColor} disabled={props.disabled}>
                <div className="toolbar-icon" style={{color: colors[fontColor], fontSize: '20px', fontWeight: 'bold'}}>A</div>
                <div className="toolbar-label">צבע</div>
            </button>
        </div>
    );
}
export default EditFont;