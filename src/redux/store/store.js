//создание стора
import seminarsReduser from '../slice/seminarsSlice';


import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        seminars: seminarsReduser,
    },
});


export default store;