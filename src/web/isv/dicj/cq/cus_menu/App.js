import React from 'react'
import MenuView from './components/MenuView'
import eventBus from '../../../../../../util/eventBus'
import 'antd/dist/reset.css';
import './components/antd.less'

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
            <MenuView className="App"
                model={model}
                data={data.data}
            />
        )
    }
}
//导出组件
export default Root