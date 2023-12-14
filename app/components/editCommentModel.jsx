import React, { useState } from 'react';

const EditCommentModal = ({ comment, onSave, onCancel }) => {
const [editedContent, setEditedContent] = useState(comment.content);
const handleSave = () => {
onSave(comment.id, editedContent);
};

return (
<div className="edit-comment-modal">
<textarea
value={editedContent}
onChange={(e) => setEditedContent(e.target.value)}/>
<button onClick={handleSave}>Save</button>
<button onClick={onCancel}>Cancel</button>
</div>
);
};

export default EditCommentModal;
