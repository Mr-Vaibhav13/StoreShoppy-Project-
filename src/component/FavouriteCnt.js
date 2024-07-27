import React, { useEffect, useState } from 'react';

const FavouriteCnt = () => {
  
  const [data, setData] = useState([]);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    
    
    const fetchData = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const json = await response.json();
      setData(json.categories);
    };

    fetchData();

    const storedFav = JSON.parse(localStorage.getItem('id')) || [];
    
    setFav(storedFav);
  
  
  }, []);

  const handleBtn = (id) => {
    const favData = [...fav, id];
    // console.log(favData)

    setFav(favData);
    localStorage.setItem('id', JSON.stringify(favData));

    // localStorage.clear()
  };

  const handleClear = () =>{
    localStorage.clear()
    setFav([])
  }



  return (
    <div>
      {data.map((val) => (
        <div className='flex' key={val.idCategory}>
          
          <p>{val.strCategory}</p>
          
          <button onClick={() => handleBtn(val.idCategory)} 
          className='px-4 ml-10 border-2 bg-slate-500'>
            Fav
          </button>
        </div>
      ))}

<button onClick={handleClear} 
      className='p-3 bg-red-500 m-10 hover:bg-red-600'>clear</button>

      <h1 className='text-4xl pt-4'>FAVOURITES</h1>
      
      {fav.map((val, index) => {  
        const category = data.find(item => item.idCategory === val);
        
        return (
          <div key={index}>
            {category.strCategory}
          </div>
        );
      })}

      
    </div>
  );
};

export default FavouriteCnt;
