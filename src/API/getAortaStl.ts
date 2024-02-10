import * as THREE from 'three';
import axios, { AxiosResponse } from 'axios';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

// Примерная версия функции
const getAortaStl = async (fileList: FileList, segmentationThreshold: number) => {
    try {
        // Создаем объект FormData и добавляем файлы
        const formData = new FormData();

        // Добавляем все файлы из FileList в FormData
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            formData.append('files', file, file.name);
        }

        formData.append('segmentationThreshold', segmentationThreshold.toString());

        // Отправляем запрос на сервер с использованием Axios
        const response: AxiosResponse<Blob> = await axios.post('/api/getAortaStl', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            responseType: 'blob', // указываем, что ожидаем получить Blob в ответе
        });

        return response.data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};

export default getAortaStl;
