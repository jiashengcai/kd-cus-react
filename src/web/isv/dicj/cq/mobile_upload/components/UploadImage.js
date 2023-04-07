import React, { useEffect, useState } from 'react'
import { ImageUploader,Dialog } from 'antd-mobile'
import { CloseCircleFill } from 'antd-mobile-icons'
import './index.less';





export default (props) => {
    const {
        model
    } = props;
    const [propsData, setPropsData] = useState(props.data);

    const [files, setFiles] = useState([]);
    //是否可以上传
    const [showUpload, setShowUpload] = useState(true);
    //是否可以删除
    const [deletable, setDeletable] = useState(true);
    useEffect(() => {
        if (propsData?.data != null && propsData.data.images.length > 0) {
            setFiles(propsData.data.images)
        }
        //是否可编辑
        if (propsData?.data != null && propsData.data.edite !== undefined) {
            setDeletable(propsData.data.edite)
            setShowUpload(propsData.data.edite)
        }
    }, [propsData]);    

    /**
     * 
     * @param {手动上传的文件} file 
     * @returns 
     */
    const onFileUpload = async (file) => {
        const fileName = file.name;
        const name = fileName.substring(0, fileName.lastIndexOf('.')) + ".gif";
        var renameFile = new File([file], name, { type: file.type });
        const formData = new FormData();
        formData.append('file', renameFile);
        formData.append('suffix', '.gif');
        // 上传图片到文件服务器
        const response = await fetch('attachment/upload.do', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const data = await response.json();
            const fileInfo = {
                extra: name,
                size: file.size,
                key: data.url,
                url: "attachment/download.do?path="+data.url,
                fileType: 'gif',
                newFile: file.newFile == false ? false : true
            }
            //文件信息保存到单据
            model.invoke('saveImages', { images: [fileInfo], date:new Date() });
            return fileInfo
        } else {
            // 处理上传失败后的逻辑
        }
    };

    // 移除图片
    const onFileDelete = async (file) => {
        const attachments = files.filter((item) => item.url !== file.url);
        setFiles(attachments);
        model.invoke('deleteImages', { file: file.fileUid, date:new Date() });
    };
    const renderDeleteIcon = () => {
        return (
            <CloseCircleFill style={{ color: '#9999', fontSize: 16, marginLeft: '8px', marginTop: '-8px' }}
            />
        );
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
                deletable={deletable}
                onDelete={onFileDelete}
                showUpload={showUpload}
                deleteIcon={renderDeleteIcon()}
            >
                <div
                    style={{
                        width: 80,
                        height: 80,
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        flexDirection: 'xx',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#999999',
                        backgroundImage: 'url(isv/dicj/avatar_filebutton/avatar_filebutton/img/upload.png)',
                        backgroundSize: 'cover'

                    }}
                >
                </div>

            </ImageUploader>

        </>
    )
}