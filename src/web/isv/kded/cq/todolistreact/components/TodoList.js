import React from 'react'
import styles from './TodoList.less'
// import classnames from 'classnames'

class Header extends React.Component {
  getInputValue (e) {
    if (e.keyCode !== 13) return
    this.props.getInputValue(this.input.value)
    this.input.value = ''
  }

  render () {
    return (
      <div className={styles['header_input']}>
        <span>ToDoList</span>
        <input type='text' className={styles['input_content']} ref={ref => this.input = ref} placeholder={'添加todo'} onKeyDown={this.getInputValue.bind(this)} />
      </div>
    )
  } 
}

class List extends React.Component {
  update (index) {
    this.props.update(index)
  }
  remove (index) {
    this.props.remove(index)
  }
  render () {
    return (
      <div className={styles['start_list']}>
        <div className={styles['list_title']}>
          <h2>{this.props.title}</h2>
          <span className={styles['start_total']}>{this.props.total}</span>
        </div>
        <ul className={styles['list start']}>
          {
            this.props.list.map((item) =>
              <li className={styles['list_li']} key={'li_' + item.id}>
                <input type='checkbox' checked={item.done} onChange={() => { this.update(item.id) }} title={'点击完成'} />
                <p>{item.value}</p>
                <span onClick={() => { this.remove(item.id) }}>移除</span>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

class Button extends React.Component {

  handleClick () {
    this.props.Click && this.props.Click()
  }

  render () {
    return (
      <div className={styles['Button_div']}>
        <button className={styles['button']} onClick={this.handleClick.bind(this)}>保存</button>
      </div>
    )
  }
}

class TodoList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: (this.props.data && this.props.data.list) || []
    }
    this.addList = this.addList.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
    this.Click = this.Click.bind(this)
  }
  addList (value) {
    const list = this.state.list.map(item => item)
    list.push({value, done: false, id: list.length, isRemove: false})
    this.setState({
      list
    })
  }
  update (index) {
    const list = this.state.list.map(item => item)
    list[index].done = !list[index].done
    this.setState({
      list
    })
  }

  remove (index) {
    const list = this.state.list.map(item => item)
    list[index].isRemove = true
    this.setState({
      list
    })
  }
  getShowList () {
    const startList = []
    const doneList = []
    this.state.list.forEach(item => {
      !item.isRemove && (item.done ? doneList.push(item) : startList.push(item))
    })
    return {
      startList,
      doneList
    }
  }

  Click (data) {
    const { model } = this.props
    model && model.invoke('save', data)
  }
  render () {
    const {startList, doneList} = this.getShowList()
    return (
      [<Header getInputValue={this.addList} key='header' />,
        <div key='content'>
          <List
            list={startList}
            total={startList.length}
            title={"正在进行"}
            remove={this.remove}
            update={this.update}
          />
          <List
            list={doneList}
            total={doneList.length}
            title={"已经完成"}
            remove={this.remove}
            update={this.update}
          />
        </div>,
        <Button Click={() => this.Click({startList, doneList})} />]
    )
  }
}

export default TodoList