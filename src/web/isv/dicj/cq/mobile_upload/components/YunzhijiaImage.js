import React, { useRef, useEffect, useState } from 'react'
import { Image, ImageViewer, DotLoading } from 'antd-mobile'
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
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false)

  //预览图片
  const [preview, setPreview] = useState({
    visible: false,
    defaultIndex: 0,
    images: [],
  })
  useEffect(() => {
    refresh && setRefresh(false)
  }, [refresh])

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




  //预览图片
  const onPreview = (event) => {
    let index = files.findIndex((item) => item.fileUid === event.target.id)
    viewerRef.current.swipeTo(index);
    //修改preview的值
    setPreview({
      visible: true,
      defaultIndex: index,
      images: files.map((item) => item.url),
    })

  }


  //点击上传图片
  /**
   * 
   * {
      success: true or false 是否成功(string)
      error: 错误信息(string)
      errorCode: 错误码(int)
      data: {
          "localId": "",   // string 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          "localIds": []   // array 多选时，只会通过这个参数返回选定照片的本地ID列表
      }
  }
   */
  const uploadFile = (event) => {
    qing.call('chooseImage', {
      'type': 'photo',
      'needCut': false,
      'isMulti': true,
      'maxSelectCount': 99,
      'showOrigin': false,
      'success': function (result) {
        if (result.success) {
          Promise.all(result.data.localIds.map(item => {
            return new Promise((resolve, reject) => {
              qing.call('uploadImage', {
                localId: item,
                isShowProgressTips: 1,
                success: function (result2) {
                  //serverId:xxxx  //服务端文件id
                  //localId: [xxx] //需要上传的图片的本地ID

                  if (result2.success) {
                    const fileUid = "rc-upload-" + Date.parse(new Date()) + "-" + (Math.floor(Math.random() * 90) + 10)
                    const newFile = { url: 'https://yunzhijia.com/openfile/download/media/' + result2.data.serverId, fileUid: fileUid }
                    resolve(newFile);
                    model.invoke('uploadImageYZJ', { file: { ...result2.data, localId: item, fileUid: fileUid }, date: new Date() });
                  } else {
                    reject(result2);
                  }

                }
              });
            });
          }))
            .then(newFiles => {
              setFiles(prevFiles => [...prevFiles, ...newFiles]);
              setRefresh(true);
              setLoading(false);
            })
            .catch(error => {
              alert(JSON.stringify(error));
              console.log(error);
              setLoading(false);
            });

        }
      }
    });
  }


  //删除图片
  const handleDeleteImage = (index) => {
    model.invoke('deleteImages', { file: files[index].fileUid, date: new Date() });
    const newImages = [...files];
    newImages.splice(index, 1);
    setFiles(newImages);
  };

  const renderImageItem = (item, index) => {
    return (
      <div className='adm-space-item' key={index}>
        <div className='adm-image-uploader-cell'>
          {/* <img src="yzjLocalResource://img?id=xxxxxxx"> */}
          <Image
            className='adm-image adm-image-uploader-cell-image'
            id={item.fileUid}
            src={item.url}
            width={80} height={80} fit='cover'
            onClick={onPreview}
            key={`image` + index}
          />
          <span className='adm-image-uploader-delete' style={{
            display: deletable ? 'block' : 'none', position: 'absolute', top: 0,
            right: -8, marginTop: '-8px', verticalAlign: 'middle'
          }} onClick={() => handleDeleteImage(index)}>
            <CloseCircleFill style={{
              color: '#999999', fontSize: 14, top: 0,
              marginTop: '-8px', verticalAlign: 'middle'
            }} />
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