import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories/Categories';
import Sort, { popupList } from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategory, setCurrentPage, setFilters} from '../redux/slices/filterSlice';


const axios = require('axios').default;
 
const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {categoryId, sort, currentPage} = useSelector((state) => state.filterReducer);
    const {searchValue} = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [onLoading, setOnLoading] = React.useState(true);

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const onClickCategory = (id) => {
        dispatch(setCategory(id))
    }

    //Получение пицц с сервера
    const getPizzas = () => {
        setOnLoading(true);
        const sortBy = sort.sortType.replace('-','');
        const order = sort.sortType.includes('-')? 'desc' : 'asc';
        const search = searchValue ? `&search=${searchValue}` : ``
        axios.get(`https://62b34d614f851f87f458a36c.mockapi.io/item?page=${currentPage}&limit=4${categoryId > 0 ? `&category=${categoryId}` : ``
        }&sortBy=${sortBy}&order=${order}${search}`) 
        .then((res) => {
            setItems(res.data);
            setOnLoading(false);
        })
    }

    //Был первый рендер, проверка параметров в URL и сохранение их в Redux
    React.useEffect(() => {
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = popupList.find(obj => obj.sortType === params.sort)
            dispatch(
                setFilters({
                    ...params, 
                    sort
                })
            )
        isSearch.current = true;
        }
    }, [])

    //Был первый реднер => запрашиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0,0)
        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false;
    },[categoryId , sort, searchValue, currentPage])

    //Если был первый рендер, и параметры были изменены
  React.useEffect(() => {
   if (isMounted.current) {
    const queryString = qs.stringify({
        sort : sort.sortType,
        categoryId,
        currentPage
    });
    navigate(`?${queryString}`);
   };
    isMounted.current = true;
    }, [categoryId , sort, searchValue, currentPage]);

    

    const skeletons = [...new Array(6)].map((_, id) => <Skeleton key={id}/>);

    const pizzaList = items.map((obj) => <PizzaBlock key={obj.id} { ...obj}/>)

    return (
        <>
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
            { 
            onLoading ? skeletons : pizzaList
            }
            </div>
            <Pagination onChangePage={(number) => dispatch(setCurrentPage(number))}/>
        </div>
        </>
    )
}

export default Home;