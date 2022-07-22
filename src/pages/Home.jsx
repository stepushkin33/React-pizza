import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategory } from '../redux/slices/filterSlice';


const axios = require('axios').default;
 
const Home = () => {
    const dispatch = useDispatch()
    const categoryId = useSelector((state) => state.filterReducer.categoryId)
    const sort = useSelector(state => state.filterReducer.sort)
    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState([]);
    const [onLoading, setOnLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);

    const onClickCategory = (id) => {
        dispatch(setCategory(id))
    }

    React.useEffect(() => {
        setOnLoading(true);
        const order = sort.name.includes('по возрастанию')? 'asc' : 'desc';
        const search = searchValue ? `&search=${searchValue}` : ``
        axios.get(`https://62b34d614f851f87f458a36c.mockapi.io/item?page=${currentPage}&limit=4${categoryId > 0 ? `&category=${categoryId}` : ``
        }&sortBy=${sort.sortType}&order=${order}${search}`) 
        .then((res) => {
            setItems(res.data);
            console.log(res.data)
            setOnLoading(false);
        })
        window.scrollTo(0, 0);
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
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
        </>
    )
}

export default Home;