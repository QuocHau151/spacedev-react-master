import React from 'react'

export const Teacher = ({ title, description, avatar, website }) => {
    return (
        <div className="teaches">
            <div className="teacher">
                <div className="avatar">
                    <img src={avatar} alt="" />
                </div>
                <div className="info">
                    <div className="name">{title}</div>
                    <div className="title">Founder Spacedev &amp; Fullstack developer</div>
                    <p className="intro" dangerouslySetInnerHTML={{ __html: description }} />
                    {
                        website && <p><strong>Website:</strong> <a href={website} target="_parent">{website}</a></p>
                    }

                </div>
            </div>
        </div>
    )
}
