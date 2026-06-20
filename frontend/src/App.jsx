// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import HomePage from './pages/HomePage'
import TodoPage from './pages/TodoPage'
import EmployeePage from './pages/EmployeePage'
import HeaderBar from './components/layout/HeaderBar'
import SiderBar from './components/layout/SiderBar'
import { useContext, useState } from 'react'
import EmployeeProvider from './context/EmployeeContext'
import UserProvider from './context/UserContext'
import { EmployeeContext } from './context/EmployeeContext'
import { UserContext } from './context/UserContext'
import TodoProvider from './context/TodoContext'
// import { Provider } from 'react-redux'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductPage from './pages/sales/ProductPage'
import SalesPage from './pages/sales/SalesPage'
import "ag-grid-community/styles/ag-grid.css"
import"ag-grid-community/styles/ag-theme-alpine.css"
import { ModuleRegistry,AllCommunityModule } from 'ag-grid-community'
ModuleRegistry.registerModules([
  AllCommunityModule
])


const queryClient = new QueryClient();

function App() {

  return (
    <BrowserRouter>
      
        <QueryClientProvider client={queryClient}>
          <Container>
            <HeaderBar />
            <BodyLayout>
              <SiderBar />
              <PageContainer>
                <Routes>
                  <Route path="/" element={<HomePage />}/>
                  <Route path="/todo" element={<TodoPage />}/>
                  <Route path="/employee" element={
                    <EmployeeProvider>
                      <EmployeePage />
                    </EmployeeProvider>}/>
                    <Route path="/product" element={<ProductPage />}/>
                    <Route path="/sales" element={<SalesPage />}/>
                   

                </Routes>
              </PageContainer>
            </BodyLayout>
          </Container>
        </QueryClientProvider>
    </BrowserRouter >
  )
}

export default App


const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #f1f5f9;
`;

const BodyLayout = styled.div`
    display: flex;
`;

const PageContainer = styled.main`
    flex: 1;
    padding: 32px;
    background: #f8fafc;
    min-height: calc(100vh - 70px);

    @media (max-width: 768px){
        padding: 90px 20px 20px 20px;
    }
`;