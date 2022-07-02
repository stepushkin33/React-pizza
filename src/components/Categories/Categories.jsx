import React from 'react';

function Categories({value, onClickCategory}) {

  const categories = ['Все', 'Мясные', 'Вегетрианские', 'Гриль', 'Острые', 'Закрытые']

    return (
      <div className="categories">
                <ul>
                  {
                    categories.map((category,i) => (
                      <li key={i} onClick={() =>onClickCategory(i)} className={value === i ? 'active' : ''}>{category}</li>
                    ))
                  }
                </ul>
              </div>
    );
  };

  export default Categories;