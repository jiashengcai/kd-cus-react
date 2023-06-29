import React, { useEffect, useState } from 'react'
import { ImageUploader, Dialog } from 'antd-mobile'
import { CloseCircleFill } from 'antd-mobile-icons'
import heic2any from 'heic2any'
import './index.less';





export default (props) => {
  const {
    model
  } = props;
  const [propsData, setPropsData] = useState(props.data);
  const [entryKey, setEntryKey] = useState("");
  const [files, setFiles] = useState([]);
  //是否可以上传
  const [showUpload, setShowUpload] = useState(true);
  //是否可以删除
  const [deletable, setDeletable] = useState(true);
  useEffect(() => {
    if (propsData.cardRowData) {
      //卡片分录数据
      let data = propsData.cardRowData.cardAllData.dicj_urllargetext_tag;
      //data 为空跳过
      if (data && data.length !== 0) {
        //如果data最后一个字符是,则去掉
        if (data[data.length - 1] === ',') {
          data = data.substring(0, data.length - 1);
        }
        const resultList = data.split(',').map(item => {
          let url = item.trim();
          //如果url不包含path=，则加上attachment/preview.do?path=
          if (!item.includes('path=')) {
            url = 'attachment/preview.do?path=' + item;
          }
          const key = item;
          return { url, key };
        });
        setFiles(resultList)
      }
      
    } else if (propsData.data?.images != null && propsData.data.images.length > 0) {
      //单据数据
      setFiles(propsData.data.images)
    }


    //是否可编辑
    if (propsData.data.edite !== undefined) {
      setDeletable(propsData.data.edite)
      setShowUpload(propsData.data.edite)
    }
    const key = model.metaData?.ci ? model.metaData.ci.find((item) => item.key === 'entry_key') : "";
    setEntryKey(key?.value);
  }, [propsData]);

  /**
   * 
   * @param {手动上传的文件} file 
   * @returns 
   */
  const onFileUpload = async (file) => {
    const fileName = file.name;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('suffix', fileName.substring(fileName.lastIndexOf('.') + 1));
    // 上传图片到文件服务器
    try {
      const response = await fetch('attachment/upload.do', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('文件上传失败');
      }
      const data = await response.json();
      const fileInfo = {
        extra: fileName,
        size: file.size,
        key: data.url,
        url: 'attachment/preview.do?path=' + data.url,
        fileType: fileName.substring(fileName.lastIndexOf('.') + 1),
        newFile: file.newFile == false ? false : true,
      };
      //文件信息保存到单据
      //判断model.metaData.ci是否为空，不为空就查找key === "entry_key"
      model.invoke('saveImages', { images: [fileInfo], date: new Date(), entryKey: entryKey });
      console.log('文件上传成功:', fileInfo);
      return fileInfo;
    } catch (error) {
      console.error('文件上传失败:', error);
      // 处理上传失败后的逻辑
    }
  };


  // 移除图片
  const onFileDelete = async (file) => {
    const attachments = files.filter((item) => item.url !== file.url);
    setFiles(attachments);
    model.invoke('deleteImages', { ...file, file:file.fileUid, date: new Date() });
  };
  const renderDeleteIcon = () => {
    return (
      <CloseCircleFill style={{ color: '#999999', fontSize: 14, marginLeft: '10px', marginTop: '-10px', verticalAlign: 'middle' }}
      />
    );
  };








  return (
    <>
      <ImageUploader
        value={files}
        style={{ '--cell-size': '80px' }}
        multiple={true}
        accept="image/jpeg,image/jpg,image/png,video/mp4, video/webm, video/ogg"
        upload={onFileUpload}
        onChange={setFiles}
        deletable={deletable}
        onDelete={onFileDelete}
        showUpload={showUpload}
        capture="photo"
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