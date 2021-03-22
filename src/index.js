import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import 'highlight.js/styles/railscasts.css';
import './theme/theme.scss';
import './dynamics.js';

hljs.registerLanguage('python', python);
hljs.registerLanguage('bash', bash);
hljs.initHighlightingOnLoad();
