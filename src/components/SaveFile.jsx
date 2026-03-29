import { useState } from 'react';

function SaveFile(props) {
    const [currentSavedText, setSavedText] = useState("");
    const [currentButton, setCurrentButton] = useState("saveAs");
    const [showSelect, setShowSelect] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");
    const [fullText, setFullText] = useState(props.textToSave.text || "");
    const [openButton, setOpenButton] = useState(true);
    const [currentFileKey, setCurrentFileKey] = useState(null);
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || '{}');

    function onSaveChange() {
        if ((props.textToSave.text && props.textToSave.text !== "") ||
            (props.textToSave.textSegments && props.textToSave.textSegments.length > 0)) {
            if (currentFileKey !== null && currentUser.savedFiles && currentUser.savedFiles[currentFileKey]) {
                const fileObj = currentUser.savedFiles[currentFileKey]
                const fileName = Object.keys(fileObj)[0]
                fileObj[fileName] = props.textToSave
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                const users = JSON.parse(localStorage.getItem("users"))
                const userIndex = users.findIndex(user => user.userId === currentUser.userId)
                users[userIndex] = currentUser;
                localStorage.setItem("users", JSON.stringify(users))
                setSavedText(`Text updated in ${fileName}!`);
            }
            props.onFileSaved?.();
            props.resetText?.();
            setTimeout(() => { setSavedText(""); }, 2000)
            setCurrentButton("saveAs");
        } else {
            setSavedText("No text to save!");
            setTimeout(() => { setSavedText(""); }, 2000)
        }
        setOpenButton(true);
    }

    function onSaveAsChange() {
        if ((props.textToSave.text && props.textToSave.text !== "") ||
            (props.textToSave.textSegments && props.textToSave.textSegments.length > 0)) {
            const id = currentUser.userId
            let users = JSON.parse(localStorage.getItem("users"));
            const userIndex = users.findIndex(user => user.userId === id);
            const fileNumber = users[userIndex].savedFiles.length + 1;
            const file = { [`Text${fileNumber}`]: props.textToSave }
            users[userIndex].savedFiles.push(file)
            localStorage.setItem("users", JSON.stringify(users))
            localStorage.setItem("currentUser", JSON.stringify(users[userIndex]))
            props.onFileSaved?.();
            props.resetText?.();
            setSavedText(`Text saved as Text${fileNumber}!`);
            setTimeout(() => { setSavedText(""); }, 2000)
        } else {
            setSavedText("No text to save!");
            setTimeout(() => { setSavedText(""); }, 2000)
        }
    }

    function onOpenChange() {
        setOpenButton(false);
        const savedFiles = currentUser.savedFiles ? currentUser.savedFiles.length : 0;
        if (savedFiles > 0) {
            setCurrentButton("save");
            setShowSelect(true);
            props.onBlockAll?.(true);
        }
        else {
            setSavedText("No saved files to open!");
            setTimeout(() => { setSavedText(""); }, 2000)
            setOpenButton(true);
        }
    }

    const handleSelectChange = (e) => {
        if (e.target.value != "choose file") {
            const fileObj = currentUser.savedFiles[e.target.value]
            const fileName = Object.keys(fileObj)[0]
            const savedText = fileObj[fileName]
            setFullText(savedText);
            setCurrentFileKey(e.target.value);
            setCurrentButton("save");
            props.onTextLoad?.(savedText);
            setSelectedFile("choose file");
            setShowSelect(false);
            props.onBlockAll?.(false);
        }
    }
    return (
        <div className="toolbar-group">
            {currentSavedText && <p className="save-indicator">{currentSavedText}</p>}
            
            {showSelect && (
                <select className="font-dropdown" onChange={handleSelectChange} value={selectedFile} style={{ minWidth: '100px' }}>
                    <option value="choose file" >בחר קובץ</option>
                    {currentUser.savedFiles && currentUser.savedFiles.map((fileObj, i) => {
                        const fileName = Object.keys(fileObj)[0]
                        return <option key={i} value={i}>{fileName}</option>
                    })}
                </select>
            )}

            {openButton && (
                <button className="toolbar-button" onClick={onOpenChange}>
                    <div className="toolbar-icon">📁</div>
                    <div className="toolbar-label">פתח</div>
                </button>
            )}

            {currentButton === "saveAs" && (
                <button className="toolbar-button" onClick={onSaveAsChange} disabled={props.isBlocked}>
                    <div className="toolbar-icon">💾</div>
                    <div className="toolbar-label">שמור בשם</div>
                </button>
            )}

            {currentButton === "save" && (
                <button className="toolbar-button" onClick={onSaveChange} disabled={props.isBlocked}>
                    <div className="toolbar-icon">💾</div>
                    <div className="toolbar-label">שמור</div>
                </button>
            )}
        </div>
    );
}


export default SaveFile;
