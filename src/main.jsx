import { createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import store from "./mobX/store.js";
import {Provider} from 'mobx-react';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App srore={store} />
  </Provider>,
);
