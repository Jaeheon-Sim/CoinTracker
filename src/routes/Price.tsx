import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { fetchCoinTickers } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Pdiv = styled.div`
  text-align: center;
  margin: 3px;
`;

const PdivTitle = styled(Pdiv)`
  font-weight: bold;
  border: 1px solid;
  padding: 5px;
  border-radius: 25px;
  margin-bottom: 10px;
`;

const PContainer = styled(Pdiv)`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Pdivs = styled(Pdiv)``;

const CostTitle = styled(PdivTitle)`
  margin-bottom: 25px;
  border-radius: 0px;
  color: ${(props) => props.theme.accentColor};
  border-color: ${(props) => props.theme.textColor}; ;
`;

function Price() {
  const [value, setValue] = useState(0);
  const { data }: any | number = useLocation().state;

  const { coinID } = useParams();
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinID],
    () => fetchCoinTickers(coinID),
    {
      refetchInterval: 5000,
    }
  );

  return (
    <div>
      <CostTitle> Cost Percentage compared to the time</CostTitle>
      <PContainer>
        <Pdivs>
          <PdivTitle>15minutes ago</PdivTitle>
          <Pdiv>{tickersData?.quotes.USD.percent_change_15m}%</Pdiv>
        </Pdivs>
        <Pdivs>
          <PdivTitle> 1hours ago</PdivTitle>
          <Pdiv>{tickersData?.quotes.USD.percent_change_1h}%</Pdiv>
        </Pdivs>
        <Pdivs>
          <PdivTitle> 12hours ago</PdivTitle>
          <Pdiv>{tickersData?.quotes.USD.percent_change_12h}%</Pdiv>
        </Pdivs>
        <Pdivs>
          <PdivTitle> 24hours ago</PdivTitle>
          <Pdiv>{tickersData?.quotes.USD.percent_change_24h}%</Pdiv>
        </Pdivs>
        <Pdivs>
          <PdivTitle> 7days ago</PdivTitle>
          <Pdiv>{tickersData?.quotes.USD.percent_change_7d}%</Pdiv>
        </Pdivs>
        <Pdivs>
          <PdivTitle> 30days ago</PdivTitle>
          <Pdiv>{tickersData?.quotes.USD.percent_change_30d}%</Pdiv>
        </Pdivs>
      </PContainer>
    </div>
  );
}
export default Price;
