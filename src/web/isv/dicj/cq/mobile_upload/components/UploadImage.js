import React, { useEffect, useState } from 'react'
import { ImageUploader } from 'antd-mobile'





export default (props) => {
    const {
        model,
        data: propsData
    } = props;
    const [fileList, setFileList] = useState([]);
    const [files, setFiles] = useState([]);
    const [showUpload, setShowUpload] = useState(true);
    const [deletable, setDeletable] = useState(true);
    useEffect(() => {
        if (!propsData.data.edite) {
            return
        }
        let button = document.getElementById('tbmain');
        if (button === null) {
            button = document.getElementById('dicj_mtoolbarap');
        }
        const handleClick = () => {
            //TODO 推送苍穹
        };
        button.addEventListener('click', handleClick,{ passive: false });
        return () => {
            button.removeEventListener('click', handleClick);
        };
    }, [files]);
    useEffect(() => {
        if (propsData !== null && propsData.data.images.length > 0) {
            setFiles(propsData.data.images)
        }
        //是否可编辑
        if (propsData !== null && propsData.data.edite !== undefined) {
            setDeletable(propsData.data.edite)
            setShowUpload(propsData.data.edite)
        }

    }, [propsData]);




    const onFileUpload = async (file) => {
        const thumbnailUrl = URL.createObjectURL(file);
        return {
            extra: file.name,
            key: thumbnailUrl,
            url: thumbnailUrl,
        };
    };
    const onChangeFile = (file) => {
        const attachments = [...files, { extra: file[0].extra, key: file[0].key, url: file[0].name }];
        setFiles(attachments);
    }
    // 移除图片
    const onFileDelete = async (file) => {
        const attachments = files.filter((item) => item.url !== file.url);
        setFiles(attachments);
    };







    return (
        <>
            <ImageUploader
                value={files}
                style={{ '--cell-size': '80px' }}
                multiple={true}
                accept="image/jpeg,image/jpg,image/png"
                upload={onFileUpload}
                onChange={setFiles}
                //onDelete={onFileDelete}
                //maxCount={maxCount}
                deletable={deletable}
                showUpload = {showUpload}
                //preview={true}
            >
                {/* <div
                    style={{
                        height: 80,
                        width: 80,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-evenly'
                    }}
                >
                <Icon type="add" ></Icon>
                   <div style={{
                    fonSize: 14,
                    color: '#999999',
                    letterSpacing: 0,
                    textAlign: 'center',
                    lineHeight: 16,
                    fontWeight: 400,
                   }}>點擊上傳</div>
                </div> */}

            </ImageUploader>

        </>
    )
}