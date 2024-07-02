import React from 'react'

const CategoryCreate = ({categories, setCategory}) => {

    
    // функция добавления категории для отрисовки
    const addCategory = (newCategory) => setCategory([...categories, newCategory])

    const handleSubmit = (e) => {
        e.preventDefault()

        // получаем данные из формы
        const { name, imageLink } = e.target.elements
        // формируем новую категорию
        const newCategory = {
             name: name.value,
             imageLink: imageLink.value
            }
        // функция добавления новой категории
        const createCategory = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory)
            }

            const response = await fetch("api/Category/", requestOptions)
            return await response.json()
                .then((data) => {
                    console.log(data)
                    if (response.ok) {
                        addCategory(data)
                        e.target.elements.name.value = ""
                    }
                },
                    (error) => console.log(error)
                )
        }
        createCategory()
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <label>Название: </label>
                <input type="text" name="name" placeholder="Введите название:" />
                <br/>
                <label>Картинка url: </label>
                <input type="text" name="imageLink" placeholder="url:" />
                <div style={{paddingLeft: "75%"}}><button className='btn btn-add' type="submit">Создать</button></div>
            </form>
        </React.Fragment >
    )
}

export default CategoryCreate