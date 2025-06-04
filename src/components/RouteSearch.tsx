
import React from 'react';
import { Search, MapPin, Bus } from 'lucide-react';

interface RouteSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRoute: string | null;
  setSelectedRoute: (route: string | null) => void;
}

const routes = [
  { id: 'M15', name: 'M15 - First/Second Ave', color: 'bg-blue-600' },
  { id: 'M20', name: 'M20 - Seventh/Eighth Ave', color: 'bg-green-600' },
  { id: 'M57', name: 'M57 - 57th Street Crosstown', color: 'bg-purple-600' },
  { id: 'M104', name: 'M104 - Broadway', color: 'bg-orange-600' },
  { id: 'M22', name: 'M22 - Madison/Fifth Ave', color: 'bg-pink-600' },
];

export const RouteSearch: React.FC<RouteSearchProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRoute,
  setSelectedRoute
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search bus stops..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Route Filter */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Bus className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter by Route</span>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={() => setSelectedRoute(null)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedRoute === null 
                ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">All Routes</span>
            </div>
          </button>
          
          {routes.map((route) => (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(route.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedRoute === route.id 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 ${route.color} rounded flex items-center justify-center text-white text-xs font-bold`}>
                  {route.id.replace('M', '')}
                </div>
                <div>
                  <div className="text-sm font-medium">{route.id}</div>
                  <div className="text-xs text-gray-500">{route.name.split(' - ')[1]}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="pt-3 border-t border-gray-200">
        <div className="text-sm font-medium text-gray-700 mb-2">Quick Actions</div>
        <div className="grid grid-cols-1 gap-2">
          <button className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <MapPin className="h-4 w-4" />
            <span>Find Nearby Stops</span>
          </button>
        </div>
      </div>
    </div>
  );
};
