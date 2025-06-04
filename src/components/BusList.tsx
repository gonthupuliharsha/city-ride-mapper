
import React from 'react';
import { Bus, Clock, Users, Navigation } from 'lucide-react';

interface BusListProps {
  selectedRoute: string | null;
  onSelectStop: (stop: any) => void;
}

const busData = [
  {
    id: 'b1',
    route: 'M15',
    direction: 'Northbound',
    nextStop: 'City Hall Station',
    eta: 3,
    occupancy: 'medium',
    capacity: '32/45',
    color: 'bg-blue-600'
  },
  {
    id: 'b2',
    route: 'M20',
    direction: 'Southbound',
    nextStop: 'Downtown Transit Center',
    eta: 8,
    occupancy: 'low',
    capacity: '15/45',
    color: 'bg-green-600'
  },
  {
    id: 'b3',
    route: 'M57',
    direction: 'Eastbound',
    nextStop: 'Columbus Circle',
    eta: 5,
    occupancy: 'high',
    capacity: '42/45',
    color: 'bg-purple-600'
  },
  {
    id: 'b4',
    route: 'M104',
    direction: 'Westbound',
    nextStop: 'Lincoln Center',
    eta: 4,
    occupancy: 'medium',
    capacity: '28/45',
    color: 'bg-orange-600'
  },
  {
    id: 'b5',
    route: 'M22',
    direction: 'Northbound',
    nextStop: 'Central Park South',
    eta: 6,
    occupancy: 'low',
    capacity: '18/45',
    color: 'bg-pink-600'
  }
];

const upcomingArrivals = [
  { stop: 'Downtown Transit Center', route: 'M15', eta: 3, delay: 0 },
  { stop: 'Downtown Transit Center', route: 'M20', eta: 8, delay: 2 },
  { stop: 'Downtown Transit Center', route: 'M22', eta: 12, delay: 0 },
  { stop: 'City Hall Station', route: 'M15', eta: 7, delay: 1 },
  { stop: 'City Hall Station', route: 'M22', eta: 14, delay: 0 },
];

export const BusList: React.FC<BusListProps> = ({ selectedRoute, onSelectStop }) => {
  const filteredBuses = selectedRoute 
    ? busData.filter(bus => bus.route === selectedRoute)
    : busData;

  const getOccupancyColor = (occupancy: string) => {
    switch (occupancy) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getOccupancyText = (occupancy: string) => {
    switch (occupancy) {
      case 'low': return 'Low';
      case 'medium': return 'Medium';
      case 'high': return 'High';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-4">
      {/* Active Buses */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Bus className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">
            {selectedRoute ? `${selectedRoute} Buses` : 'Active Buses'}
          </h3>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {filteredBuses.length} online
          </span>
        </div>

        <div className="space-y-3">
          {filteredBuses.map((bus) => (
            <div key={bus.id} className="border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${bus.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                    {bus.route.replace('M', '')}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{bus.route}</div>
                    <div className="text-sm text-gray-600 flex items-center">
                      <Navigation className="h-3 w-3 mr-1" />
                      {bus.direction}
                    </div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getOccupancyColor(bus.occupancy)}`}>
                  {getOccupancyText(bus.occupancy)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-600">Next Stop</div>
                  <div className="font-medium text-gray-900">{bus.nextStop}</div>
                </div>
                <div>
                  <div className="text-gray-600">ETA</div>
                  <div className="font-medium text-blue-600">{bus.eta} min</div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>Capacity: {bus.capacity}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Arrivals */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-gray-900">Upcoming Arrivals</h3>
        </div>

        <div className="space-y-2">
          {upcomingArrivals.slice(0, 5).map((arrival, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              onClick={() => onSelectStop({ name: arrival.stop, route: arrival.route })}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-700">
                  {arrival.route.replace('M', '')}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{arrival.stop}</div>
                  <div className="text-xs text-gray-600">{arrival.route}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-blue-600">{arrival.eta} min</div>
                {arrival.delay > 0 && (
                  <div className="text-xs text-red-500">+{arrival.delay} min delay</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
