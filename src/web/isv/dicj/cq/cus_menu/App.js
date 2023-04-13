import React from 'react'
import MenuIndex from './components/MenuIndex'
import eventBus from '../../../../../../util/eventBus'
import 'antd/dist/reset.css';


class Root extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            model: props.model,
            data: props.customProps
        }
    }
    componentDidMount() {
        const { model } = this.state
        this.updateSub = eventBus.sub(model, 'update', (updateProps) => {
            const stateObj = {
                data:updateProps,
            };
            this.setState(stateObj);
        })
    }
    componentWillUnmount() {
        eventBus.unsub(this.updateSub)
    }
    render() {
        const {
            model,
            data
        } = this.state;
        return (
            <MenuIndex className="App"
                model={model}
                data={data}
            />
        )
    }
}
//导出组件
export default Root