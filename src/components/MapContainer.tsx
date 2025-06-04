
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface Bus {
  id: string;
  route: string;
  lat: number;
  lng: number;
  direction: string;
  occupancy: 'low' | 'medium' | 'high';
  nextStop: string;
  eta: number;
}

interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  routes: string[];
}

interface MapContainerProps {
  selectedRoute: string | null;
  onSelectStop: (stop: BusStop) => void;
  searchQuery: string;
}

export const MapContainer: React.FC<MapContainerProps> = ({ 
  selectedRoute, 
  onSelectStop, 
  searchQuery 
}) => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // Initialize demo data
  useEffect(() => {
    const demoStops: BusStop[] = [
      { id: '1', name: 'Downtown Transit Center', lat: 40.7589, lng: -73.9851, routes: ['M15', 'M20', 'M34'] },
      { id: '2', name: 'City Hall Station', lat: 40.7614, lng: -73.9776, routes: ['M15', 'M22'] },
      { id: '3', name: 'Central Park South', lat: 40.7661, lng: -73.9797, routes: ['M20', 'M57'] },
      { id: '4', name: 'Columbus Circle', lat: 40.7681, lng: -73.9819, routes: ['M20', 'M57', 'M104'] },
      { id: '5', name: 'Lincoln Center', lat: 40.7736, lng: -73.9831, routes: ['M57', 'M104'] },
      { id: '6', name: 'Times Square', lat: 40.7580, lng: -73.9855, routes: ['M20', 'M42', 'M104'] },
    ];

    const demoBuses: Bus[] = [
      { id: 'b1', route: 'M15', lat: 40.7589, lng: -73.9851, direction: 'Northbound', occupancy: 'medium', nextStop: 'City Hall Station', eta: 3 },
      { id: 'b2', route: 'M20', lat: 40.7661, lng: -73.9797, direction: 'Southbound', occupancy: 'low', nextStop: 'Downtown Transit Center', eta: 8 },
      { id: 'b3', route: 'M57', lat: 40.7736, lng: -73.9831, direction: 'Eastbound', occupancy: 'high', nextStop: 'Columbus Circle', eta: 5 },
      { id: 'b4', route: 'M104', lat: 40.7681, lng: -73.9819, direction: 'Westbound', occupancy: 'medium', nextStop: 'Lincoln Center', eta: 4 },
      { id: 'b5', route: 'M22', lat: 40.7614, lng: -73.9776, direction: 'Northbound', occupancy: 'low', nextStop: 'Central Park South', eta: 6 },
    ];

    setBusStops(demoStops);
    setBuses(demoBuses);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Default to NYC if geolocation fails
          setUserLocation({ lat: 40.7614, lng: -73.9776 });
        }
      );
    }
  }, []);

  // Animate buses (simple simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => ({
          ...bus,
          lat: bus.lat + (Math.random() - 0.5) * 0.001,
          lng: bus.lng + (Math.random() - 0.5) * 0.001,
          eta: Math.max(1, bus.eta + (Math.random() > 0.5 ? -1 : 1))
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredBuses = selectedRoute 
    ? buses.filter(bus => bus.route === selectedRoute)
    : buses;

  const filteredStops = selectedRoute
    ? busStops.filter(stop => stop.routes.includes(selectedRoute))
    : busStops.filter(stop => 
        searchQuery === '' || stop.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const getOccupancyColor = (occupancy: string) => {
    switch (occupancy) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRouteColor = (route: string) => {
    const colors = {
      'M15': 'bg-blue-600',
      'M20': 'bg-green-600',
      'M57': 'bg-purple-600',
      'M104': 'bg-orange-600',
      'M22': 'bg-pink-600',
      'M34': 'bg-indigo-600',
      'M42': 'bg-red-600'
    };
    return colors[route as keyof typeof colors] || 'bg-gray-600';
  };

  return (
    <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg h-full">
      {/* Map Header */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white rounded-lg shadow-md p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Navigation className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-900">Live Map View</span>
          </div>
          <div className="text-sm text-gray-600">
            {filteredBuses.length} buses • {filteredStops.length} stops
          </div>
        </div>
      </div>

      {/* Simulated Map Background */}
      <div className="w-full h-full bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 relative overflow-hidden">
        {/* Grid lines to simulate map */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute border-gray-300" style={{
              left: `${i * 5}%`,
              top: 0,
              bottom: 0,
              borderLeftWidth: '1px'
            }} />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute border-gray-300" style={{
              top: `${i * 5}%`,
              left: 0,
              right: 0,
              borderTopWidth: '1px'
            }} />
          ))}
        </div>

        {/* User Location */}
        {userLocation && (
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: '50%',
              top: '50%'
            }}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-lg"></div>
              <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
            </div>
          </div>
        )}

        {/* Bus Stops */}
        {filteredStops.map((stop, index) => (
          <div
            key={stop.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{
              left: `${20 + (index * 15) % 70}%`,
              top: `${30 + (index * 12) % 50}%`
            }}
            onClick={() => onSelectStop(stop)}
          >
            <div className="group">
              <div className="w-3 h-3 bg-gray-700 border-2 border-white rounded-full shadow-lg group-hover:scale-125 transition-transform"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {stop.name}
              </div>
            </div>
          </div>
        ))}

        {/* Buses */}
        {filteredBuses.map((bus, index) => (
          <div
            key={bus.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-15"
            style={{
              left: `${25 + (index * 20) % 60}%`,
              top: `${25 + (index * 18) % 60}%`,
              transition: 'all 2s ease-in-out'
            }}
          >
            <div className="group cursor-pointer">
              <div className={`w-8 h-8 ${getRouteColor(bus.route)} rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-xs group-hover:scale-110 transition-transform relative`}>
                {bus.route.replace('M', '')}
                <div className={`absolute -top-1 -right-1 w-3 h-3 ${getOccupancyColor(bus.occupancy)} rounded-full border border-white`}></div>
              </div>
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <div className="font-medium">{bus.route} - {bus.direction}</div>
                <div>Next: {bus.nextStop}</div>
                <div>ETA: {bus.eta} min</div>
              </div>
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 z-10">
          <div className="text-sm font-medium text-gray-900 mb-2">Legend</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 border-2 border-white rounded-full"></div>
              <span>Your Location</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-700 border-2 border-white rounded-full"></div>
              <span>Bus Stop</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span>Bus</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="text-xs font-medium text-gray-700 mb-1">Occupancy</div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" title="Low"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Medium"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full" title="High"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
