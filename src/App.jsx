import './App.css';
// import {Provider} from "react-redux";
// import store from "./redux/store/store.js";
import SeminarList from "./components/SeminarList/SeminarList";
import {observer, inject} from 'mobx-react';
import {useEffect} from "react";



function App({store}) {

    //монтируем компонент и грузим данные из mobX
    useEffect(() => {
        store.fetchSeminars();
    }, []);

  return (
        <>
            <h1>seminars</h1>
            {/*делаем проверку на загрузку данных*/}
            {store.status === 'loading' && <p>Загрузка данных...</p>}
            {store.status === 'failed' && (
                <p style={{ color: 'red' }}>Ошибка: {store.error}</p>
            )}
            {store.status === 'success' && <SeminarList store={store} />}
        </>
  );
}

export default inject('store')(observer(App));
