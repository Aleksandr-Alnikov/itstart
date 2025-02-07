import s from './seminarList.module.css'

// import {useDispatch, useSelector} from "react-redux";
// import {useEffect, useState} from "react";
// import {deleteSeminar, fetchSeminars} from "../../redux/slice/seminarsSlice.js";
import EditSeminar from "../EditSeminar/EditSeminar.jsx";
import {createPortal} from "react-dom";
import {useLocalObservable} from "mobx-react-lite";
import {observer} from "mobx-react";


const SeminarList = ({store}) => {
    // получаем данные из редакс
    // const seminars = useSelector((state) => state.seminars.seminars);
    // const dispatch = useDispatch();

    const state = useLocalObservable(() => ({
        isEditModalOpen: false, // Открыто ли модальное окно
        editData: null, // Данные для редактирования
    }));

    // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    // const [editData, setEditData] = useState(null);

    // useEffect(() => {
    //     dispatch(fetchSeminars());
    // }, [dispatch]);


    const handleEditClick = (seminar) => {
        // ллонируем объект
        // setEditData({...seminar});
        // setIsEditModalOpen(true);

        //клон объекта
        state.editData = {...seminar};
        state.isEditModalOpen = true;
    };

    const closeModal = () => {
        // setIsEditModalOpen(false);

        state.isEditModalOpen = false;
    };

    const handleDelete = async (id) => {
        // dispatch(deleteSeminar(id));
        try {
            await store.deleteSeminar(id); // Вызываем метод удаления из Store
        } catch (error) {
            console.error('Ошибка при удалении:', error.message); // Логируем ошибку
        }
    };

    return (
        <div>
            <ul className={s.list}>
                {/*разворачиваем данные с сервера*/}
                {store.seminars.map((item) => (
                    <li className={s.item} key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        {/*<img src={seminar.photo} alt={seminar.title} />*/}
                        <div className={s.btnWrapper}>
                            <button onClick={() => handleDelete(item.id)}>Удалить</button>
                            <button onClick={() => handleEditClick(item)}>Редактировать</button>
                        </div>
                    </li>
                ))}
            </ul>

            {state.isEditModalOpen &&
                createPortal(
                    <EditSeminar onClose={closeModal} initialData={state.editData} saveItem={(updatedData) => store.updateSeminar(state.editData.id, updatedData)} />,
                    document.body
                )}
        </div>
    );
};

export default observer(SeminarList);