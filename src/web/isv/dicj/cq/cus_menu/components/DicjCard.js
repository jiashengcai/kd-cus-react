import React, { useEffect, useState } from 'react'
import { getDominantColor, RGBToHex,lightenColor } from '../utils/colorThief';

import { Card, Avatar } from "antd";
import styles from './index.less'

export default (props) => {
    const {
        model,
        data
    } = props;

    const openView = (event) => {
        console.log(event);
        model.invoke('openView', { ...data });
    }
    const [bgColor, setBgColor] = useState('');



    //
    return (
        <Card
            onClick={openView}
            hoverable={true}
            bordered={false}
            className={styles.card_style}
            style={{ backgroundColor: bgColor }}
        >
            <div className={styles.card_content}>
                <Avatar
                    size={72}
                    src={data.imageUrl.substring(1)}
                    onLoad={() => {
                        const img = document.querySelector(`.${styles.card_content} img`);
                        getDominantColor(img.src)
                            .then((color) => {
                                const {hex} = RGBToHex(color);
                                const rgbColor = lightenColor(hex);
                                setBgColor(rgbColor);
                            })
                            .catch((error) => {
                                console.error('Error getting dominant color:', error);
                            });
                    }}
                />
                <div className={styles.menu_tile}>{data.name}</div>
            </div>
        </Card>

    )
}