import React, { useState } from 'react'
import { ImageUploader, Toast, Dialog } from 'antd-mobile'
import { AddOutline } from 'antd-mobile-icons'
import { Icon } from '@kdcloudjs/kdesign'





export default () => {
    const [videoUrl, setVideoUrl] = useState(null);
    function handleVideoSelect(event) {
        const file = event.target.files[0];
        const videoUrl = URL.createObjectURL(file);
        setVideoUrl(videoUrl);
    }

    return (
        <div>
            {videoUrl && (
                <div>
                    <img src={videoUrl + '#t=0.001'} alt="Video thumbnail" />
                    <video controls>
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                </div>
            )}
            <input type="file" accept="video/*" onChange={handleVideoSelect} />
        </div>
    );
}