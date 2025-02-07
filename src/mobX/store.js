import {makeAutoObservable} from "mobx";
import axios from "axios";

const createSeminarsStore = () => {
    const store = {
        seminars: [],
        status: 'idle',
        error: null,

        //метод для загрузки данных
        fetchSeminars: async function () {
            this.status = 'loading';
            try {
                const response = await axios.get('http://localhost:4000/seminars');
                this.seminars = response.data;
                this.status = 'success';
                this.error = null;
            } catch (error) {
                this.status = 'failed';
                this.error = error.message || 'ошибка при загрузке';
            }
        },

        //удаление
        deleteSeminar: async function (id) {
            this.status = 'loading';
            try {
                await axios.delete(`http://localhost:4000/seminars/${id}`);
                this.seminars = this.seminars.filter((seminar) => seminar.id !== id);
                this.status = 'success';
                this.error = null;
            } catch (error) {
                this.status = 'failed';
                this.error = error.message || 'ошибка при удалении';
            }
        },

        //обновления
        updateSeminar: async function (id, updatedData) {
            this.status = 'loading';
            try {
                await axios.put(`http://localhost:4000/seminars/${id}`, updatedData);
                this.seminars = this.seminars.map(item =>
                    item.id.toString() === id.toString()
                        ? { ...item, ...updatedData }
                        : item
                );
                this.status = 'success';
                this.error = null;
            } catch (error) {
                this.status = 'failed';
                this.error = error.message || 'ошибка при обновлении';
            }
        },
    };

    //делаем все свойства и методы стора реактивными
    makeAutoObservable(store);

    return store;
};

export default createSeminarsStore();