import React, {
    useEffect,
    useState,
    useRef,
    useCallback,
    useMemo,
} from "react";
import SignaturePad from "react-signature-canvas";
import Button from '@kdcloudjs/kdesign'; //https://react.kingdee.design/docs/guide/introduce
import "./SignCanvas.css";



export default function SignCanvas(props) {
    const [imageURL, setImageURL] = useState(null);
    const sigCanvas = useRef({});
    const clear = () => sigCanvas.current.clear();
    const save = () => {
        const image = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
        setImageURL(image);
        const { model } = this.props
        model && model.invoke('save', image)
    }
    const {
        operation,
        model,
        data: propsData
    } = props;
    const canvasProps = { width: 500, height: 200, className: 'signatureCanvas' }
    click = (data) => {
        const { model } = this.props
        model && model.invoke('save', data)
    }
    return (<>
            <Button type="primary">主要按钮</Button>
            <SignaturePad
                ref={sigCanvas}
                canvasProps={canvasProps}
            />
        </>
    )
}