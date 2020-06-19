import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import StudentList from './student_list';

class App extends Component{
	constructor(props){
		super(props);
		this.state={
			students:[]
		}
	}

    componentWillMount = () => {
 
		fetch('api/students')
		.then(res => res.json())
		.then(data => this.setState({students:data}));
    }

	render() {
		if(this.state.students.length > 0){
			console.log('hello')
			var comp = (
				<div><StudentList students={this.state.students} /></div>
			)
		} else {
			var comp = (
				<div>Loading.. </div>
			)
		}

		return (
				<div>
				<br/><br/>
				<h2 style={{textAlign:'center'}}>Django_React_List</h2>
				{comp}
				</div>
			)

	}
}

export default App;