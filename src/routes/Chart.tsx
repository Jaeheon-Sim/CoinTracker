import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface IHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const { coinID } = useParams();
  const { isLoading, data } = useQuery<IHistory[]>(
    ["ohlcv", coinID],
    () => fetchCoinHistory(coinID),
    { refetchInterval: 10000 }
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              //data: data?.map((price) => parseInt(price.close)) as number[],
              data: data?.map((price) => {
                return [
                  price.time_close,
                  price.open,
                  price.high,
                  price.low,
                  price.close,
                ];
              }) as unknown as number[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 350,
              width: 500,
              foreColor: isDark ? "#4cd137" : "#9c88ff",
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            grid: { show: false },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_close),
              labels: {
                style: {
                  colors: isDark ? "#4cd137" : "#9c88ff",
                },
              },
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },

            colors: ["red"],
            tooltip: {
              theme: "true",
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#3C90EB",
                  downward: "#DF7D46",
                },
              },
            },
          }}
        ></ApexChart>
      )}
    </div>
  );
}
export default Chart;
