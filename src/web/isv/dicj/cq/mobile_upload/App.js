import React from 'react'
import Index from './components/Index'
import eventBus from '../../../../../../util/eventBus'


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
            <Index
                model={model}
                data={data}
            />
        )
    }
}
//导出组件
export default Root