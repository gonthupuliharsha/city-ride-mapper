
import React from 'react';
import { X, MapPin, Clock, Bus, Navigation } from 'lucide-react';

interface BusStopPanelProps {
  stop: any;
  onClose: () => void;
}

const arrivals = [
  { route: 'M15', direction: 'Northbound', eta: 3, delay: 0, capacity: 'Medium' },
  { route: 'M20', direction: 'Southbound', eta: 8, delay: 2, capacity: 'Low' },
  { route: 'M22', direction: 'Northbound', eta: 12, delay: 0, capacity: 'High' },
  { route: 'M15', direction: 'Southbound', eta: 18, delay: 1, capacity: 'Medium' },
];

export const BusStopPanel: React.FC<BusStopPanelProps> = ({ stop, onClose }) => {
  const getRouteColor = (route: string) => {
    const colors = {
      'M15': 'bg-blue-600',
      'M20': 'bg-green-600',
      'M22': 'bg-pink-600',
      'M57': 'bg-purple-600',
      'M104': 'bg-orange-600'
    };
    return colors[route as keyof typeof colors] || 'bg-gray-600';
  };

  const getCapacityColor = (capacity: string) => {
    switch (capacity.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Bus Stop Info</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {/* Stop Details */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-1">{stop.name}</h4>
        <div className="text-sm text-gray-600">Stop ID: #{stop.id || '001'}</div>
      </div>

      {/* Real-time Arrivals */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Clock className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-gray-700">Real-time Arrivals</span>
        </div>

        <div className="space-y-2">
          {arrivals.map((arrival, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${getRouteColor(arrival.route)} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                  {arrival.route.replace('M', '')}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{arrival.route}</div>
                  <div className="text-sm text-gray-600 flex items-center">
                    <Navigation className="h-3 w-3 mr-1" />
                    {arrival.direction}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium text-blue-600">
                  {arrival.eta} min
                  {arrival.delay > 0 && (
                    <span className="text-red-500 ml-1">(+{arrival.delay})</span>
                  )}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${getCapacityColor(arrival.capacity)}`}>
                  {arrival.capacity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="pt-3 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600">Accessibility</div>
            <div className="font-medium text-green-600">♿ Accessible</div>
          </div>
          <div>
            <div className="text-gray-600">Amenities</div>
            <div className="font-medium text-gray-900">Shelter, Bench</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Get Directions
        </button>
        <button className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Add to Favorites
        </button>
      </div>
    </div>
  );
};
