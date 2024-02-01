import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './WeatherCards.css';

interface WeatherCardProps {
  temperature: string;
  description: string;
  humidity: number;
  windSpeed: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ temperature, description, humidity, windSpeed }) => {
  return (
    <Card className="weatherCard">
      <CardContent>
        <Typography variant="h5" color="white" component="div">
          Temperature: {temperature}°C
        </Typography>
        <Typography color="white">Description: {description}</Typography>
        <Typography color="white">Humidity: {humidity}%</Typography>
        <Typography color="white">Wind speed: {windSpeed}</Typography>

      </CardContent>
    </Card>
  );
};

export default WeatherCard;
