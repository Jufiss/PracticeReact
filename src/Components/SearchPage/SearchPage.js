import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Card, Col, Row, Input, Select, Button, Layout, theme, Slider, Pagination } from 'antd';

const SearchPage = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [firms, setFirms] = useState([]);
    const [q, setQ] = useState(""); // поисквая строка
    const location = useLocation(); // переменная, которая считывает url-адрес страницы
    const queryParams = new URLSearchParams(location.search); // считываем все параметры из url строки 
    const categoryParam = queryParams.get("category"); // считываем параметр с категорией 
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || "Bce"); // присваиваем категорию
    const [selectedFirm, setSelectedFirm] = useState("Bce");
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [sortType, setSortType] = useState("");
    const [searchParam] = useState("name"); // параметр продукта, по которому будет проводиться поиск
    const [currentPage, setCurrentPage] = useState(1); // текущая страница пагинации
    const [itemsPerPage] = useState(8); // количество товаров на одной странице
    const [filteredProducts, setFilteredProducts] = useState([]);

    const { Meta } = Card;
    const { Search } = Input;
    const { Option } = Select;
    const { Sider, Content } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const requestOptions = {
                    method: 'GET'
                };
                const response = await fetch(`/api/Products`, requestOptions);

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('An error occurred while fetching products:', error);
            }
        };
        getProducts();

        const fetchCategories = async () => {
            try {
                const response = await fetch("api/Category");
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();

        const fetchFirms = async () => {
            try {
                const response = await fetch("api/Firm");
                if (!response.ok) {
                    throw new Error('Failed to fetch firms');
                }
                const data = await response.json();
                setFirms(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFirms();

    }, []);

    // функция для применений фильтров по нажатию на кнопку 
    const applyFilters = () => {
        setCurrentPage(1); 
        const filteredItems = filterItems(products); // вызов функции фильтрации
        setFilteredProducts(filteredItems); // заносим отфильтрованные товары для отрисовки
    };


    // сбрасываем в фильтрах на значения ниже
    const resetFilters = () => {
        setSelectedCategory("Bce");
        setSelectedFirm("Bce");
        setPriceRange([0, 1000]);
        setSortType("");
        setCurrentPage(1);
    };

    // функция фильтрации
    function filterItems(items) {
        let filteredItems = items.filter((item) => { 
            const categoryMatch = selectedCategory === "Bce" || item.categoryId === parseInt(selectedCategory); // проверка, чтобы у товара совпадала категория с выбранной категорией
            const firmMatch = selectedFirm === "Bce" || item.firmId === parseInt(selectedFirm); 
            const priceMatch = parseFloat(item.price) >= priceRange[0] && parseFloat(item.price) <= priceRange[1]; // сравниваем цену товара с промежутком цены, который стоит в фильтрах

            return (
                categoryMatch &&
                firmMatch &&
                priceMatch &&
                item[searchParam] // смотрим товар по параметру поиска
                    .toString() // преобразуем в строку
                    .toLowerCase() // преобразуем строку в нижний регистр, чтобы сделать поиск регистронезависимым
                    .includes(q.toLowerCase()) // смотрим, содержится ли значение из поисковой строки
            );
        });
        
        // проверка, стоит ли какой-то из этих типов сортировок
        if (sortType === "A-я") {
            filteredItems.sort((a, b) => (a.name > b.name ? 1 : -1)); // если 1, то элемент перестраивается после
        } else if (sortType === "Я-a") {
            filteredItems.sort((a, b) => (a.name < b.name ? 1 : -1)); // если -1 то перед элементом
        } else if (sortType === "По убыванию") {
            filteredItems.sort((a, b) => (a.price < b.price ? 1 : -1));
        } else if (sortType === "По возрастанию") {
            filteredItems.sort((a, b) => (a.price > b.price ? 1 : -1));
        }
    
        return filteredItems; 
    }

    // Смена страницы в пагинации
    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    // при подгрузке товаров сразу используем фильтр
    useEffect(() => {
        if(products.length > 0) {
            const filteredItems = filterItems(products);
            setFilteredProducts(filteredItems);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    const indexOfLastItem = currentPage * itemsPerPage; // считаем индекс последнего элемента
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // считаем индекс первого
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem); // получаем подмассив c товарами для текущей страницы
    
    // кнопка поиска
    const customOnSearch = () => {
        applyFilters();
    };

    return (
        <>
            <Layout >
                {/* боковая панель с фильтрами */}
                <Sider
                    style={{
                        background: colorBgContainer,
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 64,
                        bottom: 0,

                    }}
                    width={200}
                >
                    <div className="wrapper">
                        <div className="search-wrapper">
                            <label htmlFor="search-form">
                                <Search
                                    placeholder="Введите название"
                                    allowClear
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    onSearch={customOnSearch}
                                    style={{
                                        width: "90%",
                                        paddingLeft: "10px",
                                        marginBottom: '15px',
                                        marginTop: '15px',
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                    <div style={{ marginBottom: '15px', paddingLeft: "10px" }}>
                        <label htmlFor="category-filter">Выберите категорию:</label>
                        <Select
                            id="category-filter"
                            style={{ width: '90%' }}
                            value={selectedCategory}
                            onChange={(value) => setSelectedCategory(value)}
                        >
                            <Option value="Bce">Bce</Option>
                            {categories.map(category => (
                                <Option key={category.id} value={category.id}>{category.name}</Option>
                            ))}
                        </Select>
                    </div>
                    <div style={{ marginBottom: '15px', paddingLeft: "10px" }}>
                        <label htmlFor="firm-filter">Выберите бренд:</label>
                        <Select
                            id="firm-filter"
                            style={{ width: '90%' }}
                            value={selectedFirm}
                            onChange={(value) => setSelectedFirm(value)}
                        >
                            <Option value="Bce">Bce</Option>
                            {firms.map(firm => (
                                <Option key={firm.id} value={firm.id}>{firm.name}</Option>
                            ))}
                        </Select>
                    </div>
                    <div style={{ marginBottom: '15px', paddingLeft: "10px", paddingRight: "10px" }}>
                        <label htmlFor="price-filter">Цена:</label>
                        <Slider
                            range
                            step={50}
                            defaultValue={priceRange}
                            onChangeComplete={(value) => setPriceRange(value)}
                            min={0}
                            max={5000}
                        />
                    </div>
                    <div style={{ marginBottom: '15px', paddingLeft: "10px" }}>
                        <label htmlFor="sort-filter">Сортировать:</label>
                        <Select
                            id="sort-filter"
                            style={{ width: '90%' }}
                            value={sortType}
                            onChange={(value) => setSortType(value)}
                        >
                            <Option value="">Нет</Option>
                            <Option value="A-я">A-я</Option>
                            <Option value="Я-a">Я-a</Option>
                            <Option value="По убыванию">По убыванию</Option>
                            <Option value="По возрастанию">По возрастанию</Option>
                        </Select>
                    </div>
                    <Button onClick={() => applyFilters()} type="primary" style={{ marginBottom: '15px', width: '45%', marginLeft: '7px', fontSize: 12 }}>Применить</Button>
                    <Button onClick={() => resetFilters()} type="primary" style={{ marginBottom: '15px', width: '45%', marginLeft: '7px', fontSize: 12  }}>Сбросить</Button>
                </Sider>
                {/* основное содержимое страницы с товарами*/ } 
                <Content style={{ padding: "0 150px", minHeight: "100vh" }}>
                            <div>
                                <br />
                                <Row style={{paddingLeft: "26px"}} gutter={5}>

                                    <Col>
                                        <Link to={`/dress1`}>
                                            <Card hoverable style={{ width: 240, marginRight: "16px", marginBottom:"15px" }} cover={<img style={{ width: "100%", height: "350px", objectFit: 'contain' }} alt="example" src="https://a.lmcdn.ru/product/M/P/MP002XW0Q3M8_22985397_1_v1_2x.jpg" />}>
                                                <Meta title={<span style={{ overflow: 'unset', whiteSpace: 'normal', textOverflow: 'unset' }}>Amie Платье </span>} description={<span style={{ color: 'black', fontSize: '16px' }}>4000 ₽</span>} />
                                            </Card>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <Link to={`/productpage`}>
                                            <Card hoverable style={{ width: 240, marginRight: "16px", marginBottom:"15px" }} cover={<img style={{ width: "100%", height: "350px",  }} alt="example" src="https://images.2moodstore.com/upload/iblock/9b9/30e9ccoad05cl2h6r1p8wmz82wa13mg7.jpg?img_type=pmain" />}>
                                                <Meta title={<span style={{ overflow: 'unset', whiteSpace: 'normal', textOverflow: 'unset' }}>Юбка миди из твида</span>} description={<span style={{ color: 'black', fontSize: '16px' }}>10000 ₽</span>} />
                                            </Card>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <Link to={`/productpage`}>
                                            <Card hoverable style={{ width: 240, marginRight: "16px", marginBottom:"15px" }} cover={<img style={{ width: "100%", height: "350px", }} alt="example" src="https://images.2moodstore.com/upload/iblock/b0b/d0ha2xuq7nz4cky1qq9y7hwun6yp68oo.jpg?img_type=pmain" />}>
                                                <Meta title={<span style={{ overflow: 'unset', whiteSpace: 'normal', textOverflow: 'unset' }}>Мюли </span>} description={<span style={{ color: 'black', fontSize: '16px' }}>5000 ₽</span>} />
                                            </Card>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <Link to={`/productpage`}>
                                            <Card hoverable style={{ width: 240, marginRight: "16px", marginBottom:"15px" }} cover={<img style={{ width: "100%", height: "350px", objectFit: 'contain' }} alt="example" src="https://a.lmcdn.ru/product/M/P/MP002XW00ESG_23678000_1_v1.jpeg" />}>
                                                <Meta title={<span style={{ overflow: 'unset', whiteSpace: 'normal', textOverflow: 'unset' }}>Nataly Платье </span>} description={<span style={{ color: 'black', fontSize: '16px' }}>5500 ₽</span>} />
                                            </Card>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <Link to={`/productpage`}>
                                            <Card hoverable style={{ width: 240, marginRight: "16px", marginBottom:"15px" }} cover={<img style={{ width: "100%", height: "350px", objectFit: 'contain' }} alt="example" src="https://a.lmcdn.ru/product/M/P/MP002XW0FOSJ_23281823_1_v1_2x.jpg" />}>
                                                <Meta title={<span style={{ overflow: 'unset', whiteSpace: 'normal', textOverflow: 'unset' }}>Funday Платье </span>} description={<span style={{ color: 'black', fontSize: '16px' }}>34500 ₽</span>} />
                                            </Card>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <Link to={`/productpage`}>
                                            <Card hoverable style={{ width: 240, marginRight: "16px", marginBottom:"15px" }} cover={<img style={{ width: "100%", height: "350px", objectFit: 'contain' }} alt="example" src="https://a.lmcdn.ru/product/M/P/MP002XW0L2DF_18107719_1_v1.jpeg" />}>
                                                <Meta title={<span style={{ overflow: 'unset', whiteSpace: 'normal', textOverflow: 'unset' }}>Eva Платье </span>} description={<span style={{ color: 'black', fontSize: '16px' }}>4300 ₽</span>} />
                                            </Card>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <Link to={`/productpage`}>
                                            <Card hoverable style={{ width: 240, marginRight: "16px", marginBottom:"15px" }} cover={<img style={{ width: "100%", height: "350px", objectFit: 'contain' }} alt="example" src="https://a.lmcdn.ru/product/M/P/MP002XW0D8V9_23959392_1_v2_2x.jpg" />}>
                                                <Meta title={<span style={{ overflow: 'unset', whiteSpace: 'normal', textOverflow: 'unset' }}>Zolla Платье </span>} description={<span style={{ color: 'black', fontSize: '16px' }}>3000 ₽</span>} />
                                            </Card>
                                        </Link>
                                    </Col>


                                </Row>

                                
                                <Pagination
                                    style={{ marginTop: '20px', textAlign: 'center' }} // Центрируем пагинацию
                                    defaultCurrent={1}
                                    current={currentPage}
                                    pageSize={itemsPerPage}
                                    total={filteredProducts.length} // Общее количество элементов после фильтрации
                                    onChange={handleChangePage}
                                />
                            </div>
                </Content>
            </Layout>
        </>
    );
};

export default SearchPage;
