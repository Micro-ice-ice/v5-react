class MetadataParser {
    public static parseDate = (date: string) => {
        try {
            const year = parseInt(date.slice(0, 4));
            const month = parseInt(date.slice(4, 6));
            const day = parseInt(date.slice(6, 8));

            return new Date(year, month, day);
        } catch (err) {
            console.log('Ошибка в парсинге даты');
            console.log(err);
            return undefined;
        }
    };
}

export default MetadataParser;
