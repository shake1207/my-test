import { useState, useRef } from 'react';
import styled from 'styled-components';
import uuid from 'react-uuid';
import Title from './components/Title';
import InputBox from './components/InputBox';
import Button from './components/Button';
import Detail from './components/Detail';
import Error from './components/Error';
import './App.css'

const ContainerStyle = styled.main`
  max-width: 80%;
  min-height:50vh;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 15px 25px;
  border-radius: 25px;
  border: 1px solid #000;
  color:#000;
  background-color: #fff;
  .wrap {
    width: 100%;
    height: 100%;
    padding: 10px 0;
  }
  .searchBar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 500;
  }
  .btnZone {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 20%;
    width: 100%;
  }
  @media(max-width: 880px) {
    max-width: 100%;
    .searchBar {
      flex-direction: column;
    }
  }
`

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError,setIsError] = useState(false);
  const [historySearchData, setHistorySearchData] = useState([]);
  const cityRef = useRef(null);
  const countryRef = useRef(null);
  
  const APIKEY = `db5e868c80035e683ce2af4d26f7ae2c`;

  const fetchData = async (city = '', country = '') => {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIKEY}`;

    setIsLoading(true);
    await fetch(api, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        if(data.cod === 200) {
          const historyData = {
            country: data?.sys.country,
            name: data?.name,
            time: new Date().toLocaleTimeString(),
            id: uuid(),
          }
          setHistorySearchData(prev => (
            [{...historyData}, ...prev]
          ));
        }
      })
      .catch((error) => setIsError(error))
      .finally(() => setTimeout(() => setIsLoading(false), 200));
  };

  const inputs = [
    {
      labelName:'City',
      ref: cityRef,
      id: uuid(),
    },
    {
      labelName: 'Country',
      ref: countryRef,
      id: uuid(),
    }
  ];

  const btns = [
    {
      name: 'Search',
      onClickFc:() => handleSearch(),
      id: uuid(),
    },
    {
      name: 'Clear',
      onClickFc:() => handleInputClear(),
      id: uuid(),
    },
  ];

  function handleDate(){
    const date = new Date();
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D = date.getDate() + ' ';
    const localeTimeString = date.toLocaleTimeString();

    return `${Y}${M}${D} ${localeTimeString}`
  }

  function handleHistorySearch(item) {
    fetchData(item.name, item.country);
  }

  function handleInputClear() {
    cityRef.current.value = '';
    countryRef.current.value= '';
  }

  function handleSearch() {
    fetchData(countryRef?.current?.value, cityRef?.current?.value);
  }

  function handleDelete(id) {
    setHistorySearchData(prev => prev.filter(filterItem => filterItem.id !== id))
  }


  return (
    <ContainerStyle>
      <Title titleName="Today's Weather" />
      <div className="wrap">
        <div className="searchBar">
          {inputs.map(({labelName, ref, id}) => (
            <InputBox key={id} labelName={labelName} ref={ref} />
          ))}
          <div className="btnZone">
            {btns.map(({name, onClickFc, id}) => (
              <Button key={id} name={name} onClickFc={onClickFc} />
            ))}
          </div>
        </div>
        <Detail isSuccess={data.cod === 200} isLoading={isLoading}>
          {data.cod === 200 ? (
            <>
              <div className="city">{data?.name}</div>
              <div className="clouds">{data?.weather[0].main}</div>
              <ul>
                <li>
                  <label>Description</label>
                  <div>{data?.weather[0].description}</div>
                </li>
                <li>
                  <label>Temperature</label>
                  <div>{`${data?.main.temp_min}℃ ~ ${data?.main.temp_max}℃`}</div>
                </li>
                <li>
                  <label>Humidity</label>
                  <div>{data?.main.humidity}</div>
                </li>
                <li>
                  <label>Time</label>
                  <div>{handleDate()}</div>
                </li>
              </ul>
            </>
            ) : (data.cod === '400' || data.cod === '404' ) ? (
              <Error errorMsg={data.message} />
            ) : null}
        </Detail> 
        <Title titleName="Search History" />
          <Detail className="history">
            {historySearchData.length ? (
              <ul>
                {historySearchData.map((item, index) => (
                  <li className="listBox" key={item.id}>
                    {index + 1}. {item.name}, {item.country}
                    <div className="rightBox">
                      <time dateTime={item.time}>{item.time}</time>
                      <span onClick={()=> handleHistorySearch(item)}>search</span>
                      <span onClick={()=> handleDelete(item.id)}>delete</span>
                    </div>
                    
                  </li>
                ))}
              </ul> 
            ) : (<div>No Record</div>)}
          </Detail>
      </div>
    </ContainerStyle>
  )
}

export default App
