interface ServiceAPI {
    segaorta(
        files: File[],
        percent: number
    ): Promise<File | { error: string } | { progress: number }>;
}

// Основная функция для проверки класса ServiceAPI и его методов
async function checkServiceAPI(): Promise<void> {
    try {
        // Скачиваем файл ozakiAPI.js
        const response = await fetch('http://localhost:7000/ozakiAPI.js');
        const jsCode = await response.text();
        console.log(jsCode);

        // Выполняем код JavaScript из скачанного файла
        eval(jsCode);

        // Проверяем, определен ли класс ServiceAPI после выполнения кода
        if (typeof ServiceAPI !== 'undefined') {
            // Проверяем, соответствует ли класс интерфейсу
            const serviceInstance = new ServiceAPI();
            if ('segaorta' in serviceInstance) {
                console.log('Класс ServiceAPI соответствует интерфейсу');
                // Используем класс ServiceAPI
                // Например:
                // const result = await serviceInstance.segaorta([/* ваш массив файлов */], /* ваш процент */);
            } else {
                console.error('Класс ServiceAPI не соответствует интерфейсу');
            }
        } else {
            console.error('Класс ServiceAPI не найден в загруженном JS-файле');
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

export default checkServiceAPI;
