import React, { useRef,useEffect, useState } from 'react'
import { Image, Space, ImageViewer } from 'antd-mobile'
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
  //预览图片
  const [preview, setPreview] = useState({
    visible: false,
    defaultIndex: 0,
    images: [],
  })
  const viewerRef = useRef(null);


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




  // 移除图片
  const onFileDelete = async (file) => {
    const attachments = files.filter((item) => item.url !== file.url);
    setFiles(attachments);
    model.invoke('deleteImages', { file: file.fileUid, date: new Date() });
  };


  //预览图片
  const onPreview = (event) => {
    let index = files.findIndex((item) => item.url === event.target.src)
    viewerRef.current.swipeTo(index);
    //修改preview的值
    setPreview({
      visible: true,
      defaultIndex: index,
      images: files.map((item) => item.url),
    })

  }

  //点击上传图片
  const uploadFile = (event) => {

  }

  const handleDeleteImage = (index) => {
    const newImages = [...files];
    newImages.splice(index, 1);
    setFiles(newImages);
  };

  const renderImageItem = (item, index) => {
    return (
      <div className='adm-space-item' key={index}>
        <div className='adm-image-uploader-cell'>
          <Image
          className='adm-image adm-image-uploader-cell-image'
            src={item.url}
            width={80} height={80} fit='cover'
            onClick={onPreview}
            key={`image` + index}
          />
          <span className='adm-image-uploader-delete' style={{
            display: deletable ? 'block' : 'none', position: 'absolute', top: 0,
            right: -8, marginTop: '-8px', verticalAlign: 'middle'
          }} onClick={() => handleDeleteImage(index)}>
            <CloseCircleFill style={{ color: '#999999', fontSize: 14,   top: 0,
             marginTop: '-8px', verticalAlign: 'middle'}} />
          </span>

        </div>

      </div>
    );
  }







  return (
    <div className='adm-space adm-space-wrap adm-space-block adm-space-horizontal adm-image-uploader-space'>
      {files.map((item, index) => (
        renderImageItem(item, index)
      ))}
      <div className='adm-space-item'>
        <div className='adm-image-uploader-cell'>
          <Image
            style={{ display: showUpload ? 'block' : 'none', borderRadius: 4 }}
            key={'upload'} onClick={uploadFile} src={'isv/dicj/avatar_filebutton/avatar_filebutton/img/upload.png'}
            width={80} height={80} fit='cover'>
          </Image>
        </div>

      </div>
      <ImageViewer.Multi
        ref={viewerRef}
        images={preview.images}
        visible={preview.visible}
        defaultIndex={preview.defaultIndex}
        onClose={() => {
          //修改preview的值
          setPreview({
            visible: false,
          })
        }}
      />
    </div>
  )
}