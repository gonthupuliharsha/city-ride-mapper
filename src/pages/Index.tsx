
import React, { useState } from 'react';
import { MapContainer } from '../components/MapContainer';
import { RouteSearch } from '../components/RouteSearch';
import { BusList } from '../components/BusList';
import { BusStopPanel } from '../components/BusStopPanel';
import { Bus } from 'lucide-react';

const Index = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [selectedStop, setSelectedStop] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Bus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CityBus Tracker</h1>
                <p className="text-sm text-gray-600">Real-time bus locations</p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Live Tracking
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search */}
            <RouteSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedRoute={selectedRoute}
              setSelectedRoute={setSelectedRoute}
            />
            
            {/* Bus List */}
            <BusList 
              selectedRoute={selectedRoute}
              onSelectStop={setSelectedStop}
            />
            
            {/* Bus Stop Panel */}
            {selectedStop && (
              <BusStopPanel 
                stop={selectedStop}
                onClose={() => setSelectedStop(null)}
              />
            )}
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <MapContainer 
              selectedRoute={selectedRoute}
              onSelectStop={setSelectedStop}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
