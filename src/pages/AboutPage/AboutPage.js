import React from 'react';
import { iconsSvg } from '../../assets/iconsSvg';
import { iconsSocialMedia } from '../../assets/iconsSocialMedia';

import RogerTakeshita from '../../assets/images/RogerTakeshita.jpeg';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import LinkIcon from '@material-ui/icons/Link';

function AboutPage({ history }) {
    return (
        <div className="container">
            <h1>About Me</h1>
            <div className="about__div">
                <img className="about__img" src={RogerTakeshita} alt="profile-pic" />
                <div className="about__name">Roger Takeshita</div>
                <div className="about__title">
                    <strong>Full-Stack Developer</strong>
                </div>
                <div className="about__technologies">
                    <div>This website was developed using:</div>
                    <div className="about__icons">
                        {iconsSvg.map((icon, idx) => {
                            return (
                                <div key={idx} className="about__icon">
                                    {icon.iconSvgDescription}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="about__social-media">
                    <div>Follow me at:</div>
                    <div className="about__icons">
                        {iconsSocialMedia.map((icon, idx) => {
                            return (
                                <Tooltip
                                    key={idx}
                                    title={icon.name}
                                    TransitionComponent={Zoom}
                                    placement={icon.placement}
                                >
                                    <a rel="noopener noreferrer" href={icon.link} target="_blank">
                                        <img
                                            src={icon.iconSvg}
                                            alt="logo"
                                            className="about__icon-social-media"
                                        />
                                    </a>
                                </Tooltip>
                            );
                        })}
                    </div>
                </div>
                <div className="about__website">
                    <a rel="noopener noreferrer" href="http://www.rogertakeshita.com" target="_blank">
                        www.rogertakeshita.com
                    </a>
                </div>
                <div className="about__repo">
                    <a
                        rel="noopener noreferrer"
                        href="https://github.com/Roger-Takeshita/MyFollowUp"
                        target="_blank"
                    >
                        <LinkIcon />
                        Repo
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
