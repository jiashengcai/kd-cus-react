import React, {
    useEffect,
    useState,
    useRef,
    useCallback,
    useMemo,
} from "react";
import SignaturePad from "react-signature-canvas"; //签名控件
import {Button, Space, Message, Spin, Typography } from '@kdcloudjs/kdesign'; //https://react.kingdee.design/docs/guide/introduce //第三方基本组件
import style from "./SignCanvas.css"; //样式
import '@kdcloudjs/kdesign/dist/kdesign.css'

export default function SignCanvas(props) {
    const { Text } = Typography
    const {
        operation,
        model,
        data: propsData
    } = props;
    const [userName, setUserName] = useState('')
    const [loading, setLoading] = useState(false)
    const sigCanvas = useRef({});
    const clear = () => {
        Message.warning('已清除')
        return sigCanvas.current.clear();
    };
    const saveImage = () => {
        setLoading(true)
        const image = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
        model && model.invoke('save', image)
    }
    useEffect(() => {
        const {userName } = propsData
        setUserName(userName)
    }, [])
    useEffect(() => {
        //数据更新解除加载中
        if(operation !== "save") return
        setLoading(false)
        loading && Message.success(propsData.message)
    }, [propsData,operation])
    const canvasProps = {className: style.signatureCanvas}

    return (<>
            <Spin name="Spin" type="page" spinning={loading} style={{height: "100%" }}>
                <div className={style.signatureCanvasView}>
                    <Space size={"large"}>
                        <Text>请在下方签名：</Text>
                        <Text mark>{userName}</Text>
                        <Button onClick={saveImage} type="primary">保存</Button>
                        <Button onClick={clear} type="ghost" className={style.buttonBasicLeft}>清空</Button>
                    </Space>
                    <SignaturePad
                        ref={sigCanvas}
                        canvasProps={canvasProps}
                    />
                </div>
            </Spin>

        </>
    )
}
