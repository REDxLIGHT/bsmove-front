import React, { useEffect, useState } from 'react';

import { Subtitle } from '../../../../components/Texts';
import Switch from '../../../../components/Switch';
import VehicleCard from '../../../../components/VehicleCard';

import styles from './index.module.css';
import messages from './messages';

const vehicles = [
  { id: 1, name: 'test-vehicle' },
  { id: 12, name: 'test-vehicle' },
  { id: 3, name: 'test-vehicle' },
  { id: 4, name: 'test-vehicle' },
  { id: 5, name: 'test-vehicle' },
  { id: 6, name: 'test-vehicle' },
  { id: 7, name: 'test-vehicle' },
  { id: 7, name: 'test-vehicle' },
  { id: 7, name: 'test-vehicle' },
  { id: 7, name: 'test-vehicle' },
  { id: 7, name: 'test-vehicle' },
]

const DashboardVehicleRentingVehicleCard = ({ vehicle = {} }) => {
  const [vehicleVisible, setVehicleVisible] = useState(false);

  async function handleActionChange(event) {
    setVehicleVisible(prevState => !prevState);
  }

  useEffect(() => {
    async function handleVehicleVisible(id) {
    }

    handleVehicleVisible(vehicle?.id);
  }, [vehicleVisible]);

  return (
    <VehicleCard vehicle={vehicle}>
      <span>{vehicleVisible ? 'Disponible' : 'Non disponible'}</span>
      <Switch
        onChange={handleActionChange}
        checked={vehicleVisible}
        name={`${vehicle?.name}_${vehicle?.id}`}
      />
    </VehicleCard>
  )
}

const DashboardVehicleRentingContainer = () => {
  return (
    <div className={styles.dashboard_vehicle_location_container}>
      <Subtitle>{messages.title}</Subtitle>
      <div className={styles.dashboard_vehicle_location_main}>
        {
          vehicles?.map((vehicle) => (
            <DashboardVehicleRentingVehicleCard
              vehicle={vehicle}
            />
          ))
        }
      </div>
    </div>
  )
}

export default DashboardVehicleRentingContainer;
