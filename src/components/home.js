import React, {Component} from 'react'
import withAuthorization from './withAuthorization'
import {List, Avatar, Skeleton, Icon} from 'antd'
import {db} from '../firebase'
import {ATHLET_ADD} from "../constants/routes"
import * as f from '../utils/functions'

class HomePage extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      athletes: undefined
    }
  }


  updateAthletes = (athletes) => {
    this.setState({athletes: f.dbValueToArray(athletes, 'birthday')})
  }

  componentDidMount() {
    const {authUser} = this.props
    db.onAthletes(authUser.uid, this.updateAthletes)
  }

  componentWillUnmount() {
    const {authUser} = this.props
    db.offAthletes(authUser.uid, this.updateAthletes)
  }

  render() {
    return <React.Fragment>
      <List
        itemLayout="horizontal"
        locale={{
          emptyText: 'Список пуст'
        }}
        dataSource={this.state.athletes}
        renderItem={item => (
          <List.Item actions={[<a><Icon type="close"/></a>]}>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar size="large" src={item.photo}/>}
                title={item.name}
                description={[item.city, item.birthday, item.passport].join(' ')}
              />
            </Skeleton>
          </List.Item>
        )}
      />

      <div
        onClick={() => this.props.history.push(ATHLET_ADD)}
        className="fab">Добавить спортсмена
      </div>
    </React.Fragment>
  }
}

const authCondition = (authUser) => !!authUser
export default withAuthorization(authCondition)(HomePage)
