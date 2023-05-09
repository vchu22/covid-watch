import React, { useState, useEffect } from "react";
import DataStore from "../store";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Chart = () => {
  const [histData, setHistData] = useState(DataStore.getHistoricalData());
  useEffect(() => {
    DataStore.on("change", () => {
      setHistData(DataStore.getHistoricalData());
    });
  });
  return histData ? (
    <div>
      <h4>Historical Data</h4>
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          data={histData}
          margin={{
            top: 5,
            right: 30,
            left: 50,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" hide={true} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="cases"
            stroke="#6A5ACD"
            fill="#6A5ACD"
            activeDot={{ r: 10 }}
          />
          <Area
            type="monotone"
            dataKey="recovered"
            stroke="#00e600"
            fill="#00e600"
            activeDot={{ r: 8 }}
          />
          <Area
            type="monotone"
            dataKey="deaths"
            stroke="#FF3300"
            fill="#FF3300"
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  ) : null;
};

export default Chart;
