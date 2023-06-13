import axios from "axios";

export const baseURL = 'http://localhost:1116/api/v1/user/space/1/record/';

export const getData = (setData) => {
    axios.get(baseURL)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
}
export const getRecord = (id, setData) => {
    axios.get(baseURL + id)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
}
export const deleteRecord = (item, setData) => {
    if (window.confirm(`Вы уверены что хотите удалить запись: ${item.title}?`)) {
        console.log(item)
        axios.delete(baseURL + item.id)
            .then((response) => {
                console.log(`Запись удалена:  ${response.data}`)
                getData(setData)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
