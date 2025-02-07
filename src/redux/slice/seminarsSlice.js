//файл для создания слфйса, для получения данных с сервера

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const API_URL = 'http://localhost:4000/seminars';



//фетч запрос на получения данных
export const fetchSeminars = createAsyncThunk('seminars/fetchSeminars', async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Не удалось загрузить');
        }

        return response.json();
    } catch (error) {
        console.error('Ошибка', error.message);
        throw error;
    }
});

//фетч запрос на редактирование данных
export const updateSeminar = createAsyncThunk(
    'seminars/updateSeminar',
    async ({ id, updatedData }) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Не удалось обновить');
            }

            // получаем обновленные данные
            const updatedSeminar = await response.json();
            // возвращаем обновленные данные
            return { id, data: updatedSeminar };
        } catch (error) {
            console.error('Ошибка:', error.message);
            throw error;
        }
    }
);


//инициализируем стейт
const initialState = {
    seminars: [],
    status: 'idle',
    error: null,
};


//созданм слайс для получения данных
const seminarsSlice = createSlice({
    name: 'seminars',
    initialState,
    reducers: {
        //редьюсер для удаления элемента на стороне клиента
        deleteSeminar: (state, action) => {
            state.seminars = state.seminars.filter(item => item.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeminars.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSeminars.fulfilled, (state, action) => {
                state.status = 'success';
                state.seminars = action.payload;
            })
            .addCase(fetchSeminars.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(updateSeminar.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSeminar.fulfilled, (state, action) => {
                const { id, data } = action.payload;
                const index = state.seminars.findIndex((item) => item.id.toString() === id.toString());

                if (index !== -1) {
                    // обновляем элемент
                    state.seminars[index] = { ...state.seminars[index], ...data };
                }

                state.status = 'success';
                state.error = null;
            })
            .addCase(updateSeminar.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Произошла ошибка';
            });
    },
});


export const {deleteSeminar} = seminarsSlice.actions;
export default seminarsSlice.reducer;
