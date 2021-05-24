import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Post from './Post';


// all available theme props
const theme = {
	background: '#f5f8fb',
	fontFamily: 'Helvetica Neue',
	headerBgColor: '#1AAFB3',
	headerFontColor: '#fff',
	headerFontSize: '15px',
	botBubbleColor: '#1AAFB3',
	botFontColor: '#fff',
	userBubbleColor: '#fff',
	userFontColor: '#4a4a4a',
};

// all available config props
const config ={
  	width: "400px",
  	height: "500px",
  	hideUserAvatar:true,
  	placeholder: 'Type your response.',
  	headerTitle: "Interested in Pet Insurance?"
};


class SimpleForm extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<ChatBot 
					steps={[
						{
				            id: 'welcome',
				            message:'Hello!',
				            trigger: '1',
				        },
				        {
				            id: '1',
				            message: 'Before we begin, do you agree with the Terms Of Use, Privacy Policy, and Cookie Policy of this Website and Online Offer?',
				            trigger: 'consent',
				        },
				        {
				            id: 'consent',
				            options: [
				              { value: 'yes', label: 'Yes, I consent', trigger: 'q-pets' },
				              { value: 'no', label: 'I do not consent', trigger: 'no-consent' },
				            ],
				        },
				        {
				            id: 'no-consent',
				            message: "Unfortunately we cannot continue without your consent.",
				            trigger:'reload',
				        },
				        {
				            id: 'reload',
							options:[
							{value:'reload', label:'Please ask the question again.', trigger:'1'},
							]
				        },
				        {
							id:'q-pets', 
							message:'Great! How may pets do you currently own?', 
							trigger:'pets'
						},
						{
							id:'pets', 
							options:[
							{value:'1', label:'1', trigger:'q-firstname'},
							{value:'2', label:'2', trigger:'q-firstname'},
							{value:'3', label:'3', trigger:'q-firstname'},
							{value:'4', label:'4', trigger:'q-firstname'},
							{value:'5+', label:'5 +', trigger:'q-firstname'},
							] 
						},
						{
							id:'q-firstname', 
							message:'What is your first name?', 
							trigger:'firstname',
						},
						{
							id:'firstname', 
							user:true,
							validator: (value) => {
				                if (/^[A-Za-z]+$/.test(value))
				                  {
				                    return true;
				                  }
				                else
				                  {
				                    return'Please input alphabet characters only.';
				                  }
				              },
							trigger:'q-lastname'
						},
						{
							id:'q-lastname', 
							message:'Hello, {previousValue}. What is your last name?', 
							trigger:'lastname',
						},
						{
							id:'lastname', 
							user:true,
							validator: (value) => {
				                if (/^[A-Za-z]+$/.test(value))
				                  {
				                    return true;
				                  }
				                else
				                  {
				                    return'Please input alphabet characters only.';
				                  }
				            },
							trigger:'q-zip'
						},
						{
				            id: 'q-zip',
				            message: 'Please enter your zip code.',
				            trigger: 'zip',
				        },
						{
				            id: 'zip',
				            user: true,
				            validator: (value) => {
				                if (/^[0-9]{5}(?:-[0-9]{4})?$/.test(value))
				                  {
				                    return true;
				                  }
				                else
				                  {
				                    return'Please enter a vaild zip code.';
				                  }
				              },
				            trigger: 'q-email'
				        },
						{
							id:'q-email', 
							message:'What is you email?', 
							trigger:'email',
						},
						{
							id:'email', 
							user:true,
							trigger:'q-phone'
						},
						{
				            id: 'q-phone',
				            message: 'What is your phone number?',
				            trigger: 'phone',
				         },
				         {
				            id: 'phone',
				            user: true,
				            validator: (value) => {
				                if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value))
				                  {
				                    return true;
				                  }
				                else
				                  {
				                    return "Please enter a valid phone number.";
				                  }
				              },
				            trigger: 'q-submit'
				        },
						{
							id:'q-submit', 
							message:'Do you wish to submit?', 
							trigger:'submit'
						},
						{
							id:'submit', 
							options:[
							{value:'y', label:'Yes', trigger:'end-message'},
							{value:'n', label:'No', trigger:'no-submit'},
							] 
						},
						{
				            id: 'no-submit',
				            message:'Your information was not submitted.', 
				            end: true,
				         },
	                    {
				            id: 'end-message',
				            component: <Post />,
				            asMessage: true,
				            end: true,
				         },
					]}
					{...config}
				/>
			</ThemeProvider>
				
		);
	}

}

export default SimpleForm;