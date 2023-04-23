import React, {useState} from "react";
import PropTypes from "prop-types";
import "./style/YoutubeEmbed.css";

function YoutubeEmbed({embedId, startTime}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="youtube-collapsible-region">
            <div className="youtube-collapsible-header" onClick={toggleOpen}>
                <a href={`https://youtu.be/${embedId}&t=${startTime}`} target="_blank"
                       rel="noopener noreferrer">
                    {`https://youtu.be/${embedId}&t=${startTime}`}
                </a>
                <div className={`youtube-arrow ${isOpen ? 'open' : ''}`}>&#9658;</div>
            </div>
            {isOpen && <div className="youtube-video-responsive">
                <iframe
                    src={`https://www.youtube.com/embed/${embedId}?start=${startTime}`}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            </div>}
        </div>
    );
}

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
};

export default YoutubeEmbed;