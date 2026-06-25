export default function CommentsList({ comments = [], onDelete }) {
    return (
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="flex justify-between items-start gap-3 border p-3 rounded bg-white"
            >
              {/* Comment text */}
              <div>
                <p className="text-gray-800">{comment.text}</p>
  
                {/* Username (FIXED) */}
                {comment.username && (
                  <p className="text-xs text-gray-500 mt-1">
                    — {comment.username}
                  </p>
                )}
              </div>
  
              {/* Delete button */}
              <button
                onClick={() => onDelete(comment._id)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    );
  }