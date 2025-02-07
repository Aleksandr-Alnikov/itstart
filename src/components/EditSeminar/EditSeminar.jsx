import s from './EditSeminar.module.css';

import {createPortal} from "react-dom";
import {useState} from "react";
import {observer} from "mobx-react";
// import {useDispatch} from "react-redux";
// import {updateSeminar} from "../../redux/slice/seminarsSlice.js";

export const EditSeminar = ({onClose, initialData, saveItem}) => {
    const [formData, setFormData] = useState(initialData);
    // const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = () => {
        if (!formData.id) {
            console.error('ID не указан');
            return;
        }

        // dispatch(updateSeminar({id: formData.id, updatedData: formData}));
        saveItem(formData);
        onClose();
    };
//создаем портал для модалки
    return createPortal(
        <div className={s.overlay}>
            <div className={s.modal}>
                <h3>Редактирование семинара</h3>
                <form className={s.form} action="#">
                    <label>
                        <input
                            className={s.input}
                            type="text"
                            name="title"
                            value={formData.title || ''}
                            onChange={handleChange}
                            placeholder="Название"
                        />
                    </label>
                    <label>
                        <textarea
                            className={s.input}
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                            placeholder="Описание"
                        />
                    </label>
                    <label>
                        <input
                            className={s.input}
                            type="text"
                            name="date"
                            value={formData.date || ''}
                            onChange={handleChange}
                            placeholder="Дата"
                        />
                    </label>
                    <label>
                        <input
                            className={s.input}
                            type="text"
                            name="time"
                            value={formData.time || ''}
                            onChange={handleChange}
                            placeholder="Время"
                        />
                    </label>
                    <div className={s.btnWrapper}>
                        <button onClick={handleSubmit}>Сохранить</button>
                        <button onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default observer(EditSeminar);