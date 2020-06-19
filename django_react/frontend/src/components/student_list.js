import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {api} from './constant';
import Form from './form';

class StudentList extends Component {

   constructor(props){
    super(props);
    this.state = {
      datatoggle:"",
      datatarget:"",
      toggle:false,
      student:{}
    };
  }

  get_info = (sid) => {
    const st_id = sid;
      fetch('api/students/' + st_id)
      .then(res => res.json())
      .then(data => this.setState({student:data,datatoggle:"modal",datatarget:"#myModal",toggle:true}));
  }

  remove = (sid) => {
    const s_id = sid;
    axios.delete(api + sid + '/')
    .then(() => console.log('deleted'));
  }

  toggler = () => {
    console.log('step1')
    this.setState({student:{},datatoggle:"modal",datatarget:"#myModal",toggle:true});
  }

  closeModal = () => {
    this.setState({student:{},datatoggle:"",datatarget:"",toggle:false});
  }

  render() {
    const students = this.props.students;

    return (
       <div className='container'>

       {this.state.toggle==true ? (
        <div className='container'>
          <div style={{position:'fixed',top:25,left:450,width:480}}>
            <div className="modal-dialog">
              <div className="modal-content">
              
                <div className="modal-header">
                  <h4 className="modal-title">Form</h4>
                  <button type="button" className="close" data-dismiss="modal" onClick={this.closeModal}>
                  &times;</button>
                </div>
                
                <div className="modal-body">
                  <div className='container'>
                    <Form student={this.state.student} />
                  </div>
                </div>
            
                <div className="modal-footer">
                </div>
            
          </div>
        </div>
      </div>
      </div>

        ) : (<div></div>)}

      <br/><br/>
      <table className='table table-dark table-hover'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Document</th>
            <th>Phone</th>
            <th>Registration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.document}</td>
                <td>{student.phone}</td>
                <td>{student.registrationDate}</td>
                <td><button type="button" className="btn btn-secondary" data-toggle={this.state.datatoggle}
                     data-target={this.state.datatarget} onClick={ () => this.get_info(student.id) } >
                  Edit
                </button></td>
                <td><button type='button' className='btn btn-danger' onClick={() => this.remove(student.id)}>
                Remove</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button type="button" className="btn btn-outline-warning" data-toggle={this.state.datatoggle}
      data-target={this.state.datatarget} onClick={this.toggler}>
          Create
      </button>

      </div>
    )
  }
}

export default StudentList;