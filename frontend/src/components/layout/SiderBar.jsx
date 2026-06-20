// SiderBar.jsx

import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import {
    MdExpandMore,
    MdExpandLess,
    MdDashboard,
    MdChecklist,
    MdPeople,
    MdShoppingCart,
    MdInventory2,
    MdPointOfSale
} from 'react-icons/md'

const SiderBar = () => {

    const [open, setOpen] = useState(false)
    const [salesOpen, setSaleOpen] = useState(false)

    const location = useLocation()

    return (
        <>

            <MobileTopBar>

                <MenuButton
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </MenuButton>

                <MobileLogo>
                    MySystem
                </MobileLogo>

            </MobileTopBar>

            <Container $open={open}>

                <Menu>

                    <MenuItem
                        to="/"
                        $active={location.pathname === "/"}
                    >
                        <MenuLeft>
                            <MdDashboard size={22} />
                            <span>Home</span>
                        </MenuLeft>
                    </MenuItem>

                    <MenuItem
                        to="/todo"
                        $active={location.pathname === "/todo"}
                    >
                        <MenuLeft>
                            <MdChecklist size={22} />
                            <span>할일</span>
                        </MenuLeft>
                    </MenuItem>

                    <MenuItem
                        to="/employee"
                        $active={location.pathname === "/employee"}
                    >
                        <MenuLeft>
                            <MdPeople size={22} />
                            <span>고용인 정보</span>
                        </MenuLeft>
                    </MenuItem>

                    <MenuWrapper>

                        <SubMenuTitle
                            onClick={() =>
                                setSaleOpen(prev => !prev)
                            }
                        >

                            <MenuLeft>
                                <MdShoppingCart size={22} />
                                <span>판매 관리</span>
                            </MenuLeft>

                            {salesOpen
                                ? <MdExpandLess size={24} />
                                : <MdExpandMore size={24} />
                            }

                        </SubMenuTitle>

                        {salesOpen && (

                            <SubMenu>

                                <MenuItem
                                    to="/product"
                                    $active={location.pathname === "/product"}
                                >
                                    <MenuLeft>
                                        <MdInventory2 size={20} />
                                        <span>상품 정보</span>
                                    </MenuLeft>
                                </MenuItem>

                                <MenuItem
                                    to="/sales"
                                    $active={location.pathname === "/sales"}
                                >
                                    <MenuLeft>
                                        <MdPointOfSale size={20} />
                                        <span>판매 정보</span>
                                    </MenuLeft>
                                </MenuItem>

                            </SubMenu>

                        )}

                    </MenuWrapper>

                </Menu>

            </Container>

        </>
    )
}

export default SiderBar

const MenuWrapper = styled.div`

    background: #0f172a;

    border-radius: 14px;

    padding: 8px;

    border: 1px solid #334155;
`;

const SubMenuTitle = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 14px 16px;

    border-radius: 10px;

    cursor: pointer;

    color: #e2e8f0;

    transition: 0.2s;

    &:hover{
        background: #334155;
    }
`;

const SubMenu = styled.div`

    display: flex;
    flex-direction: column;

    gap: 8px;

    margin-top: 8px;

    padding-left: 10px;

    animation: fadeDown 0.3s ease;

    @keyframes fadeDown{

        from{
            opacity: 0;
            transform: translateY(-10px);
        }

        to{
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const MenuLeft = styled.div`

    display: flex;
    align-items: center;

    gap: 12px;
`;

const MobileTopBar = styled.div`

    display: none;

    @media (max-width: 768px){

        width: 100%;
        height: 60px;

        background: #1e293b;

        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 0 16px;

        position: fixed;

        top: 0;
        left: 0;

        z-index: 1000;
    }
`;

const MenuButton = styled.button`

    border: none;
    background: transparent;

    color: white;

    font-size: 28px;

    cursor: pointer;
`;

const MobileLogo = styled.div`

    color: white;

    font-size: 20px;
    font-weight: bold;
`;

const Container = styled.aside`

    width: 260px;

    min-height: 100vh;

    background: #1e293b;

    padding: 24px 16px;

    transition: 0.3s;

    @media (max-width: 768px){

        position: fixed;

        top: 60px;

        left: ${({ $open }) =>
            ($open ? "0" : "-100%")};

        width: 260px;

        height: calc(100vh - 60px);

        overflow-y: auto;

        z-index: 999;
    }
`;

const Menu = styled.nav`

    display: flex;
    flex-direction: column;

    gap: 14px;
`;

const MenuItem = styled(Link)`

    display: flex;
    align-items: center;

    text-decoration: none;

    padding: 14px 16px;

    border-radius: 12px;

    color: ${({ $active }) =>
        $active ? "white" : "#cbd5e1"};

    background: ${({ $active }) =>
        $active ? "#3b82f6" : "transparent"};

    font-size: 15px;
    font-weight: 500;

    transition: 0.2s;

    &:hover{
        background: #334155;
        color: white;
    }
`;