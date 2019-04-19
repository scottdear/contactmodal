import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const API_PATH = 'http://localhost:3030/contactme/contact/';



class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
				sender: '',
				subject: '',
				message: '',
				mailSent: false,
				error: null,
				show: false
		};
		
		this.handleSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit(event) {
		event.preventDefault();
		axios({
			method: 'post',
			url: `${API_PATH}`,
			headers: {'content-type': 'application/json'},
			data: this.state
		}).then(result => {
				this.setState({
					mailSent: result.data.msg
				});
		}).catch(error => {
			this.setState({error: error.msg});
		})
			
		console.log(this.state);
		
	}
	
	handleFormChange(fieldName) {
		return function(event) {
			this.setState({[fieldName]: event.target.value});
		}
	}

	showModal = () => {
		this.setState({ show: true });
	}
	
	hideModal = () => {
		this.setState({ show: false});
	}
	
  render() {
    return (
      <div className="App">
      	<p>Contact Me</p>
      	<div>
      		<form action="#">
      			<label>Your Email</label>
      			<input type="email" id="sndr" name="sender" placeholder="Your email.."
      				value={this.state.sender}
      				onChange={this.handleFormChange('sender').bind(this)}
      			/>
      			<label>Subject</label>
      			<input type="text" id="subj" name="subject" placeholder="Your Subject.."
      				value={this.state.subject}
      				onChange={this.handleFormChange('subject').bind(this)}
      			/>
      			<label>Message</label>
      			<textarea id="msg" name="message" placeholder="Write something..."
      				value={this.state.message}
      				onChange={this.handleFormChange('message').bind(this)}
      			></textarea>
      			<input type="submit" value="Submit"
      				onClick={e => this.handleFormSubmit(e)}
      			/>
      			<div>
      				{ this.state.mailSent &&
      					<div>Thank you for contacting me</div> }
      			</div>
      		</form>
      	</div>
      </div>
    );
  }
}

export default App;
