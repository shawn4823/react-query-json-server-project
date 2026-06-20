import React from 'react'
import styled from 'styled-components'

import { useDashboard } from '../../store/hooks/userDashboard';

import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js"

import { Bar } from 'react-chartjs-2'

ChartJs.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashBoard = () => {

    const { kpi, userRanking, productRanking } = useDashboard();

    const userChartData = {
        labels: userRanking.map(item => item.name),
        datasets: [
            {
                label: "구매 건수",
                data: userRanking.map(item => item.count),
                backgroundColor: "#4F46E5"
            }
        ]
    }

    const productChartData = {
        labels: productRanking.map(item => item.name),
        datasets: [
            {
                label: "판매 수량",
                data: productRanking.map(item => item.quantity),
                backgroundColor: "#06B6D4"
            }
        ]
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
            legend: {
                position: "top"
            }
        }
    }

    return (
        <Container>

            <Title>📊 관리자 대시보드</Title>

            <KpiWrapper>

                <Card>
                    <Label>총 매출액</Label>
                    <Value>{kpi.totalSalesAmount.toLocaleString()}원</Value>
                </Card>

                <Card>
                    <Label>총 판매수량</Label>
                    <Value>{kpi.totalQuantity.toLocaleString()}개</Value>
                </Card>

                <Card>
                    <Label>총 주문건수</Label>
                    <Value>{kpi.totalOrderCount.toLocaleString()}건</Value>
                </Card>

                <Card>
                    <Label>고객 수</Label>
                    <Value>{kpi.customerCount.toLocaleString()}명</Value>
                </Card>

                <Card>
                    <Label>상품 수</Label>
                    <Value>{kpi.productCount.toLocaleString()}개</Value>
                </Card>

            </KpiWrapper>

            <ChartWrapper>

                <ChartCard>

                    <ChartTitle>
                        고객 구매 랭킹 TOP 10
                    </ChartTitle>

                    <ChartBox>
                        <Bar
                            data={userChartData}
                            options={chartOptions}
                        />
                    </ChartBox>

                </ChartCard>

                <ChartCard>

                    <ChartTitle>
                        상품 판매 랭킹 TOP 10
                    </ChartTitle>

                    <ChartBox>
                        <Bar
                            data={productChartData}
                            options={chartOptions}
                        />
                    </ChartBox>

                </ChartCard>

            </ChartWrapper>

        </Container>
    )
}

export default DashBoard



const Container = styled.div`
    padding: 30px;
    background-color: #F5F7FB;
    min-height: 100vh;
`

const Title = styled.h1`
    margin-bottom: 30px;
    font-size: 32px;
    font-weight: 700;
    color: #111827;
`

const KpiWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
`

const Card = styled.div`
    background-color: white;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);

    transition: 0.2s;

    &:hover {
        transform: translateY(-4px);
    }
`

const Label = styled.div`
    font-size: 15px;
    color: #6B7280;
    margin-bottom: 10px;
`

const Value = styled.div`
    font-size: 28px;
    font-weight: bold;
    color: #111827;
`

const ChartWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`

const ChartCard = styled.div`
    background-color: white;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`

const ChartTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 20px;
    color: #111827;
`

const ChartBox = styled.div`
    width: 100%;
    height: 400px;
`