import React from 'react'

import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const axios = require('axios').default;
 
const Home = (searchValue) => {
    const [items, setItems] = React.useState([]);
    const [onLoading, setOnLoading] = React.useState(true);
    const[sort, setSort]= React.useState({
        name: 'популярности(по убыванию)',
        sortType: 'raiting'
    });
    const[categoryID, setCategoryId] = React.useState (0);

    React.useEffect(() => {
        setOnLoading(true);
        const order = sort.name.includes('по возрастанию')? 'asc' : 'desc';
        axios.get(`https://62b34d614f851f87f458a36c.mockapi.io/item?${
            categoryID > 0 ? `category=${categoryID}` : ``
        }&sortBy=${sort.sortType}&order=${order}`) 
        .then((res) => {
            setItems(res.data);
            setOnLoading(false);
        })
        window.scrollTo(0, 0);
  }, [categoryID , sort])
    return (
        <>
        <div className="container">
            <div className="content__top">
                <Categories value={categoryID} onClickCategory={(i) => setCategoryId(i)}/>
                <Sort  value={sort} onClickSort={(i) => setSort(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
            { 
            onLoading ? [...new Array(6)].map((_, id) => <Skeleton key={id}/>) : items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
            }
            </div>
        </div>
        </>
    )
}

export default Home;