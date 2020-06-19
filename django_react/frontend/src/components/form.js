import React, {Component} from "react";
import axios from 'axios';
import {api} from './constant';

class Form extends Component {

  constructor(props){
    super(props);
    this.state = {
      id:0,
      name: "",
      email: "",
      document: "",
      phone: ""
    };
  }

  componentDidMount() {
    console.log('in form');
    console.log(this.props.student);
    if (this.props.student) {
      const { id, name, document, email, phone } = this.props.student;
      this.setState({ id, name, document, email, phone });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createStudent = e => {
    e.preventDefault();
    console.log('in create');
    axios.post(api, this.state,{
      headers:{
        Accept:'application/json',
        "Content-Type":'application/json'
      }
    }).then(() => {
      console.log('created');
    });
  };

  editStudent = e => {
    e.preventDefault();
    console.log('in edit');

    axios.put(api + this.state.id + '/', this.state,{
       headers:{
        Accept:'application/json',
        "Content-Type":'application/json'
      }
    })
    .then(() => {
     console.log('updated')
    });
  };


  render() {
    const data = this.props.student.name;

    return (
      <form onSubmit={data ? this.editStudent : this.createStudent}>
        <div className='form-group'>
          <label for="name">Name:</label>
          <input type="text" className='form-control' name="name" onChange={this.onChange} 
          value={this.state.name}/>
        </div>
        <div className='form-group'>
          <label for="email">Email:</label>
          <input type="email" className='form-control' name="email" onChange={this.onChange} 
          value={this.state.email} />
        </div>
        <div className='form-group'>
          <label for="document">Document:</label>
          <input type="text" className='form-control' name="document" onChange={this.onChange} 
          value={this.state.document} />
        </div>
        <div className='form-group'>
          <label for="phone">Phone:</label>
          <input type="text" className='form-control' name="phone" onChange={this.onChange} 
          value={this.state.phone} />
        </div>
        <button type='submit' className='btn btn-primary'>Send</button>
      </form>
    );
  }
}

export default Form;