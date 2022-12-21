import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useFetchApi } from './utils';
import Loading from './components/Loading';
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
  header {
    padding: 10px 0;
    border-bottom: 1px solid #000;
    text-align:left;
    h1 {
      font-size: 3rem;
      margin: 0;
    }
  }
  .wrap {
    width: 100%;
    height: 100%;
  }
  .searchBar {
    display: flex;
    align-items: center;
    justify-content: center;
    .inputBox {
      width: 100%;
      display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    }
  }
  .btnZone {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100px;
    width: 100%;
    flex: 1;
    button {
      width: 100px;
      height: 40px;
    }

  }
`

function App() {
  const {data, isLoading, isError} = useFetchApi();
    console.log(data, isLoading, isError)

    function handleInputClear() {

    }

    function handleSearch() {

    }



  if(isLoading) return (<Loading />)
  if(isError) return  <h1>error...</h1>
  return (
    <ContainerStyle>
      <header>
        <h1>Todays Weather</h1>
      </header>
      <div className="wrap">
        <div className="searchBar">
          <div className="inputBox">
            <label>City:</label>
            <input type="text" />
          </div>
          <div className="inputBox">
            <label>Country:</label>
            <input type="text" />
          </div>
          <div className="btnZone">
            <div type="button" className="button" onClick={handleSearch}>Search</div><div type="button" className="button" onClick={handleInputClear}>Clear</div>
          </div>
        </div>
      </div>

      {JSON.stringify(data)}
    </ContainerStyle>
  )
}

export default App
