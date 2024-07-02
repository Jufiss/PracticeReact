import React from 'react'

const FirmCreate = ({ firms, setFirm }) => {

    const addFirm = (newFirm) => setFirm([...firms, newFirm]) // рендер всех фирм вместе с новой

    const handleSubmit = (e) => {
        e.preventDefault()

        // получаем данные из формы
        const { name } = e.target.elements

        // формируем новую фирму
        const newFirm = { name: name.value}

        // функция добавления новой фирмы
        const createFirm = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newFirm)
            }

            const response = await fetch("api/Firm/", requestOptions)
            return await response.json()
                .then((data) => {
                    console.log(data)
                    if (response.ok) {
                        addFirm(data)
                        e.target.elements.name.value = ""
                    }
                },
                    (error) => console.log(error)
                )
        }
        createFirm()
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <label>Название: </label>
                <input type="text" name="name" placeholder="Введите название:" />
                <br/>   
                <div style={{paddingLeft: "75%"}}><button className='btn btn-add' type="submit">Создать</button></div>
            </form>
        </React.Fragment >
    )
}

export default FirmCreate