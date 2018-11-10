import React, {Component} from 'react'
import withAuthorization from './withAuthorization'
import {List, Avatar, Skeleton, Icon} from 'antd'
import {db} from '../firebase'

class HomePage extends Component {
	constructor(props, context) {
		super(props, context)

		this.state = {
			athletes: undefined
		}

		setTimeout(() => {
			this.setState({
				athletes: [{
					"photo": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bB29J5DwlFP8lGJyi2re2PSs7OwTXwL1xe9ka1macGiPXO6L',
					"gender": "female",
					"name": {
						"title": "mrs",
						"first": "heather",
						"last": "graves"
					},
					"email": "heather.graves@example.com",
					"nat": "IE"
				}, {
					"photo": 'http://olympicgamesathens2004.com/wp-content/uploads/2015/08/judo-sport-athens-2004-image-page-4.jpg',
					"gender": "female",
					"name": {
						"title": "mrs",
						"first": "sophie",
						"last": "marchand"
					},
					"email": "sophie.marchand@example.com",
					"nat": "FR"
				}, {
					"photo": "https://www.martialtribes.com/wp-content/uploads/2018/04/Nomura3.jpg",
					"gender": "male",
					"name": {
						"title": "mr",
						"first": "macit",
						"last": "karabulut"
					},
					"email": "macit.karabulut@example.com",
					"nat": "TR"
				}, {
					"photo": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bB29J5DwlFP8lGJyi2re2PSs7OwTXwL1xe9ka1macGiPXO6L',
					"gender": "female",
					"name": {
						"title": "mrs",
						"first": "heather",
						"last": "graves"
					},
					"email": "heather.graves@example.com",
					"nat": "IE"
				}, {
					"photo": 'http://olympicgamesathens2004.com/wp-content/uploads/2015/08/judo-sport-athens-2004-image-page-4.jpg',
					"gender": "female",
					"name": {
						"title": "mrs",
						"first": "sophie",
						"last": "marchand"
					},
					"email": "sophie.marchand@example.com",
					"nat": "FR"
				}, {
					"photo": "https://www.martialtribes.com/wp-content/uploads/2018/04/Nomura3.jpg",
					"gender": "male",
					"name": {
						"title": "mr",
						"first": "macit",
						"last": "karabulut"
					},
					"email": "macit.karabulut@example.com",
					"nat": "TR"
				}, {
					"photo": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bB29J5DwlFP8lGJyi2re2PSs7OwTXwL1xe9ka1macGiPXO6L',
					"gender": "female",
					"name": {
						"title": "mrs",
						"first": "heather",
						"last": "graves"
					},
					"email": "heather.graves@example.com",
					"nat": "IE"
				}, {
					"photo": 'http://olympicgamesathens2004.com/wp-content/uploads/2015/08/judo-sport-athens-2004-image-page-4.jpg',
					"gender": "female",
					"name": {
						"title": "mrs",
						"first": "sophie",
						"last": "marchand"
					},
					"email": "sophie.marchand@example.com",
					"nat": "FR"
				}, {
					"photo": "https://www.martialtribes.com/wp-content/uploads/2018/04/Nomura3.jpg",
					"gender": "male",
					"name": {
						"title": "mr",
						"first": "macit",
						"last": "karabulut"
					},
					"email": "macit.karabulut@example.com",
					"nat": "TR"
				}, {
					"photo": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bB29J5DwlFP8lGJyi2re2PSs7OwTXwL1xe9ka1macGiPXO6L',
					"gender": "female",
					"name": {
						"title": "mrs",
						"first": "heather",
						"last": "graves"
					},
					"email": "heather.graves@example.com",
					"nat": "IE"
				}, {
					"photo": 'http://olympicgamesathens2004.com/wp-content/uploads/2015/08/judo-sport-athens-2004-image-page-4.jpg',
					"gender": "female",
					"name": {
						"title": "mrs",
						"first": "sophie",
						"last": "marchand"
					},
					"email": "sophie.marchand@example.com",
					"nat": "FR"
				}, {
					"photo": "https://www.martialtribes.com/wp-content/uploads/2018/04/Nomura3.jpg",
					"gender": "male",
					"name": {
						"title": "mr",
						"first": "macit",
						"last": "karabulut"
					},
					"email": "macit.karabulut@example.com",
					"nat": "TR"
				}, {
					"photo": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bB29J5DwlFP8lGJyi2re2PSs7OwTXwL1xe9ka1macGiPXO6L',
					"gender": "female",
					"name": {
						"title": "mrs",
						"first": "heather",
						"last": "graves"
					},
					"email": "heather.graves@example.com",
					"nat": "IE"
				}, {
					"photo": 'http://olympicgamesathens2004.com/wp-content/uploads/2015/08/judo-sport-athens-2004-image-page-4.jpg',
					"gender": "female",
					"name": {
						"title": "mrs",
						"first": "sophie",
						"last": "marchand"
					},
					"email": "sophie.marchand@example.com",
					"nat": "FR"
				}, {
					"photo": "https://www.martialtribes.com/wp-content/uploads/2018/04/Nomura3.jpg",
					"gender": "male",
					"name": {
						"title": "mr",
						"first": "macit",
						"last": "karabulut"
					},
					"email": "macit.karabulut@example.com",
					"nat": "TR"
				}]
			})
		}, 300)
	}

	updateAthletes = (athletes) => {
		console.log(athletes)
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
					<List.Item actions={[<a><Icon type="close" /></a>]}>
						<Skeleton avatar title={false} loading={item.loading} active>
							<List.Item.Meta
								avatar={<Avatar size="large" src={item.photo} />}
								title={`Фамилия Имя Отчество`}
								description="Город, 1991, CA123456"
							/>
						</Skeleton>
					</List.Item>
				)}
			/>

			<div className="fab">Добавить спортсмена</div>
		</React.Fragment>
	}
}

const authCondition = (authUser) => !!authUser
export default withAuthorization(authCondition)(HomePage)
