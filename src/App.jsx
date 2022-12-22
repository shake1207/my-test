import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useFetchApi } from './utils';
import Loading from './components/Loading';
import Title from './components/Title';
import InputBox from './components/InputBox';
import Button from './components/Button';
import './App.css'

const ContainerStyle = styled.main`
*{outline: 1px solid}
  max-width: 80%;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 25px;
  border: 1px solid #000;
  padding: 15px 25px;
  background-color: #fff;
  color:#000;
  .wrap {
    width: 100%;
    height: 100%;
  }
  .searchBar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight:500;
  }
  .btnZone {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 20%;
    width: 100%;
  }
  ul {
    margin:0;
    padding: 0;
    li {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content:space-between;
      .rightBox {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span {
          margin-left: 10px;
        }
      }
    }
  }
`

function App() {
  const [historySearchData, setHistorySearchData] = useState([]);
  const cityRef = useRef(null);
  const countryRef = useRef(null);
  const {data, isLoading, isError} = useFetchApi();

  function handleInputClear() {
    cityRef.current.value = '';
    countryRef.current.value= '';
  }

  function handleSearch() {
    const history = {
      country: countryRef?.current.value,
      name: cityRef?.current.value,
      time: new Date().toLocaleTimeString(),
    }
    setHistorySearchData(prev => ([...prev, {...history}]))
  }
  const fakeData = [
    {
      country: 'TW',
      name: 'Taipei',
      time: '03:15:02 PM'
    },
    {
      country: 'JP',
      name: 'Osaka',
      time: '03:15:02 PM'
    }
  ];

  const inputs = [
    {
      labelName:'City',
      ref: cityRef,
    },
    {
      labelName: 'Country',
      ref: countryRef,
    }
  ];

  const btns = [
    {
      name: 'Search',
      onClickFc:() => handleSearch(),
    },
    {
      name: 'Clear',
      onClickFc:() => handleInputClear(),
    },
  ];
  console.log(new Date().toLocaleTimeString())

  if(isLoading) return (<Loading />)
  if(isError) return  <h1>error...</h1>
  console.log(historySearchData)
  return (
    <ContainerStyle>
      <Title titleName="Today's Weather" />
      <div className="wrap">
        <div className="searchBar">
          {inputs.map(({labelName, ref}) => (
            <InputBox key={labelName} labelName={labelName} ref={ref} />
          ))}
          <div className="btnZone">
            {btns.map(({name, onClickFc}) => (
              <Button key={name} name={name} onClickFc={onClickFc} />
            ))}
          </div>
        </div>
      <Title titleName="Search History" />
      {historySearchData.length ? (
        <ul>
        {historySearchData.map(({name, country, time}, index) => (
          <li className="listBox">
            {index + 1}. {name}, {country}
            <div className="rightBox">
              <time datetime={time}>{time}</time>
              <span>icon search</span>
              <span>icon delete</span>
            </div>
            
          </li>
        ))}
      </ul>
      ) : (<div>No Record</div>)}
      
      </div>

      {JSON.stringify(data)}
    </ContainerStyle>
  )
}

export default App
