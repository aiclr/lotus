'use strict';

function LikeButton() {
    const [liked, setLiked] = React.useState(false);
    if (liked) {
        return 'You liked this!';
    }
    return (
            <button onClick={() => setLiked(true)}>
                Like
            </button>
            );
}

const rootNode = document.getElementById('resume');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(LikeButton));