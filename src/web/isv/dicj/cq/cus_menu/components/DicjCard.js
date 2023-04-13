import React, { useEffect, useState } from 'react'
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
    //
    return (
        <Card
            onClick={openView}
            hoverable={true}
            bordered={false}
            className={styles.card_style}
        >
            <div className={styles.card_content}  >
                <Avatar size={72} src='isv/dicj/globalimgs/icons/complaints01.png' />
                <div className={styles.menu_tile}>{data.name}</div>
            </div>
        </Card>

    )
}