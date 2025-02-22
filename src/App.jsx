import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [fields, updateFields] = useState({
    name: { label: 'Full name', value: 'Chuck Norris', isEditing: false, inputRef: useRef(null) },
    address: { label: 'Address', value: '1600 Freedom Avenue NW', isEditing: false, inputRef: useRef(null) },
    phone: { label: 'Phone', value: '+1-212-456-7890', isEditing: false, inputRef: useRef(null) },
  });
  const [lastEditedFieldKey, setLastEditedFieldKey] = useState(null);

  useEffect(() => {
    // When a new field is set to isEditing, focus on its input
    if (lastEditedFieldKey && fields[lastEditedFieldKey].inputRef.current) {
      fields[lastEditedFieldKey].inputRef.current.focus();
    }
  }, [lastEditedFieldKey, fields]);

  const toggleEditForField = (fieldKey) => {
    const isSelectedFieldInEditingMode = fields[fieldKey].isEditing;
    // If the value of the field is being edited, set it as the last edited field so that its input is focused
    if (!isSelectedFieldInEditingMode) {
      setLastEditedFieldKey(fieldKey);
    }

    // Invert the current value of isEditing for the changed field
    updateFields((fields) => ({
      ...fields,
      [fieldKey]: { ...fields[fieldKey], isEditing: !isSelectedFieldInEditingMode },
    }));
  };

  const handleFieldValueChange = (e, fieldKey) => {
    const { value } = e.target;
    updateFields((fields) => ({
      ...fields,
      [fieldKey]: { ...fields[fieldKey], value },
    }));
  };

  const renderField = (key) => {
    const field = fields[key];
    return field.isEditing ? (
      <input type="text" value={field.value} onChange={(e) => handleFieldValueChange(e, key)} ref={field.inputRef} />
    ) : (
      <span className="form-field-value-text">{field.value}</span>
    );
  };

  const renderButton = (key) => {
    const isInEditMode = fields[key].isEditing ? 'Save' : 'Edit';
    return (
      <button className="btn" onClick={() => toggleEditForField(key)} type="button">
        {isInEditMode}
      </button>
    );
  };

  return (
    <div>
      <h1>Your profile</h1>
      <form className="form-container">
        {Object.entries(fields).map(([key, field]) => (
          <div className="form-field" key={key}>
            <div className="form-field-label">{field.label}:</div>
            <div className="form-field-value">{renderField(key)}</div>
            <div className="form-field-actions">{renderButton(key)}</div>
          </div>
        ))}
      </form>
    </div>
  );
}

export default App;
