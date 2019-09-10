import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/App';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

ReactDOM.render(<App />, document.getElementById('root'));

// temp email from https://10minutemail.com/10MinuteMail/index.html
// c1184473@urhen.com
