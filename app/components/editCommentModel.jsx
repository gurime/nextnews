import React, { useState } from 'react';

const EditCommentModal = ({ comment, onSave, onCancel }) => {
const [editedContent, setEditedContent] = useState(comment.content);
const handleSave = () => {
onSave(comment.id, editedContent);
};

return (
<div style={{ position: 'relative' }}>
<div className="edit-comment-modal">
<div className="modal-content">
<div className="modal-header">Edit Comment</div>
<textarea
value={editedContent}
onChange={(e) => setEditedContent(e.target.value)}
className="modal-textarea"
rows={5}
cols={50}
/>
<div className="modal-buttons">
<button onClick={handleSave} className="edit-btn">Save</button>
<button onClick={onCancel} className="delete-btn">Cancel</button>
</div>
</div>
</div>
</div>


);
};

export default EditCommentModal;
