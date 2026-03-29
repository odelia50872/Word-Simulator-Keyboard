function EditText(props) {
    return (
        <div className="toolbar-group">
            <button className={`toolbar-button ${props.editMode === 'all' ? 'active' : ''}`} onClick={props.onEditAll} disabled={props.disabled}>
                <div className="toolbar-icon">📋</div>
                <div className="toolbar-label">עריכת כל הטקסט</div>
            </button>
            
            <button className={`toolbar-button ${props.editMode === 'fromNow' ? 'active' : ''}`} onClick={props.onEditFromNow} disabled={props.disabled}>
                <div className="toolbar-icon">✏️</div>
                <div className="toolbar-label">עריכה מעכשיו</div>
            </button>

            <div className="caps-indicator" style={{color: props.capsLockOn ? '#d13438' : '#605e5c'}}>
                CAPS {props.capsLockOn ? 'ON' : 'OFF'}
            </div>
        </div>
    );
}

export default EditText;