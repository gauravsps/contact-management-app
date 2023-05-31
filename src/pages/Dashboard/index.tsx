import React from "react";
import { useQuery } from "react-query";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { separateNumberWithComma } from "../../utilities/NumberFormater";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import search from '../../assets/icon/search.png'
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
interface CountryData {
  country: string;
  active?: string;
  cases: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    lat: number;
    long: number;
  };
}

interface HistoricalData {
  cases: { [date: string]: number };
}

interface WorldData {
  cases: number;
  recovered: number;
  deaths: number;
}

const Dashboard: React.FC = () => {
  const { data: worldData } = useQuery<WorldData>("worldData", async () => {
    const response = await fetch("https://disease.sh/v3/covid-19/all");
    const data = await response.json();
    return data;
  });

  const { data: countriesData } = useQuery<CountryData[]>(
    "countriesData",
    async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await response.json();
      return data;
    }
  );

  // Fetching Last one year data for graph
  const { data: historicalData } = useQuery<HistoricalData>(
    "historicalData",
    async () => {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=365"
      );
      const data = await response.json();
      return data;
    }
  );

  // const countryIcon = L.icon({
  //   iconUrl: search,
  //   iconSize: [10, 10],
  //   // ...add other icon options if needed
  // });
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  });

  // Prepare data for line graph
  const dates = Object.keys(historicalData?.cases || {});

  const cases = dates.map((date) => historicalData?.cases[date]);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Cases",
        data: cases,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Worldwide Data</h2>

      {worldData && (
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
          <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Cases:
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              {separateNumberWithComma(worldData.cases)}
            </div>
          </div>
          <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Recovered:
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              {separateNumberWithComma(worldData.recovered)}
            </div>
          </div>
          <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Deaths:
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              {separateNumberWithComma(worldData.deaths)}
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold my-4">Country-specific Data</h2>
      {countriesData && (
        <MapContainer
          className="mb-8"
          style={{ height: "400px", width: "100%" }}
          zoom={2}
          center={[20, 0]}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {countriesData.map((country) => (

            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            // icon={countryIcon}
            >
              <Popup>
                <div>
                  <h4 className="text-lg font-bold mb-2">{country.country}</h4>
                  <p className="mb-1">
                    Total Cases:{" "}
                    <span className="font-bold">{country.cases}</span>
                  </p>
                  <p className="mb-1">
                    Total Recovered:{" "}
                    <span className="font-bold">{country.recovered}</span>
                  </p>
                  <p className="mb-1">
                    Total Deaths:{" "}
                    <span className="font-bold">{country.deaths}</span>
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      <h2 className="text-xl font-bold my-4">Graph Data for Cases</h2>
      {/* Showing last year data, show data of a week from one date to next */}
      {historicalData && <Line data={chartData} />}
    </div>
  );
};

export default Dashboard;
