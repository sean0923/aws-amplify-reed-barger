import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Bring in default Element React theme
import 'element-theme-default';

import { i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/en';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

i18n.use(locale);

Amplify.configure(aws_exports);

ReactDOM.render(<App />, document.getElementById('root'));

// c1346353@urhen.com
