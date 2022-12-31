import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Fade, FormControlLabel } from '@mui/material';

import { useAlert } from '../../../../../../hooks/alert';

import Card from '../../../../../../components/Card';
import Button from '../../../../../../components/Button';
import CheckBox from '../../../../../../components/CheckBox';

import styles from './index.module.css';
import detailStyles from '../index.module.css';
import messages from './messages';
import { ALERT } from '../../../../../../helpers/constants';
import LoadingComponent from '../../../../../../components/LoadingComponent';
import { ChevronRight } from '@mui/icons-material';
import VehicleCard from '../../../../../../components/VehicleCard';

const mockedChiefs = [
  { id: 1, name: 'Chef 1', },
  { id: 2, name: 'Chef 2', },
  { id: 3, name: 'Chef 3', },
]

const mockedMovers = [
  { id: 1, name: 'Savanah nguyen' },
  { id: 2, name: 'Savanah nguyen 2' },
  { id: 3, name: 'Savanah nguyen 3' },
  { id: 4, name: 'Savanah nguyen 4' },
  { id: 5, name: 'Savanah nguyen 5' },
  { id: 6, name: 'Savanah nguyen 6' },
];

const EmptyDataComponent = ({ children = 'Aucune donnée disponible' }) => (
  <div className={styles.no_data_component}>
    {children}
  </div>
)

const DashboardMovingDetailAcceptedMoversStep = ({
  setDisabled, disabled, title = 'Personnel', role = 'mover',
}) => {
  const [loading, setLoading] = useState(true);
  const [movers, setMovers] = useState([])
  const [list, setList] = useState(role === 'mover' ? mockedMovers : mockedChiefs);

  function handleChange(event) {
    if (movers.find(mover => mover === event.target.name)) return setMovers(prevList => prevList.filter((mover) => mover !== event.target.name))
    return setMovers(prevList => ([...prevList, event.target.name]));
  }

  useEffect(() => {
    setDisabled(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (movers?.length && disabled === true) setDisabled(false);
    if (!movers?.length && disabled === false) setDisabled(true);
  }, [movers])

  return (
    <>
      {
        loading
          ? <LoadingComponent />
          : (
            <Card title={title}>
              {
                !list?.length
                  ? <EmptyDataComponent>{messages.noData.movers}</EmptyDataComponent>
                  : list?.map((mover, index) => (
                    <FormControlLabel
                      id={mover.id}
                      control={<CheckBox name={mover.id} />}
                      label={mover.name}
                      onChange={handleChange}
                    />
                  ))
              }
            </Card>
          )
      }
    </>
  );
}

const vehiclesMocked = [
  { id: 1, name: 'Camion dimensions intérieur d\'un utilitaire 22m3' },
  { id: 2, name: 'Camion dimensions intérieur d\'un utilitaire 35m3' },
  { id: 3, name: 'Camion dimensions intérieur d\'un utilitaire 543m3' },
]
const DashboardMovingDetailAcceptedVehicleSelectionStep = ({
  setDisabled, disabled, title = 'Vehicules', role = 'vehicle',
}) => {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([])
  const [list, setList] = useState(vehiclesMocked);

  function handleChange(event) {
    if (vehicles.find(mover => mover === event.target.name)) return setVehicles(prevList => prevList.filter((mover) => mover !== event.target.name))
    return setVehicles(prevList => ([...prevList, event.target.name]));
  }

  useEffect(() => {
    setDisabled(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (vehicles?.length && disabled === true) setDisabled(false);
    if (!vehicles?.length && disabled === false) setDisabled(true);
  }, [vehicles])

  return (
    <>
      {
        loading
          ? <LoadingComponent />
          : (
            <Card title={title}>
              {
                !list?.length
                  ? <EmptyDataComponent>{messages.noData.vehicle}</EmptyDataComponent>
                  : (
                    <div className={styles.dashboard_moving_accepted_estimate_vehicle_selection_container}>
                      {
                        list?.map((vehicle) => ( // faire une div ici avec la direction
                          <div id={vehicle?.id}>
                            <VehicleCard vehicle={vehicle}>
                              <FormControlLabel
                                id={vehicle?.id}
                                control={<CheckBox name={vehicle?.id} />}
                                label={'Choisir'}
                                onChange={handleChange}
                              />
                            </VehicleCard>
                          </div>
                        ))
                      }
                    </div>
                  )
              }
            </Card>
          )
      }
    </>
  );
}


const DashboardMovingDetailAccepted = () => {
  const [disabled, setDisabled] = useState(true);
  const [step, setStep] = useState(0);
  const router = useRouter();
  
  const { setAlert } = useAlert();
  const { ref } = router.query;

  function handleLastStep() {
  }

  function handleAccept() {
    if (step === 2) return handleLastStep()
    setStep(previousStep => previousStep + 1);
  }

  // faire en sorte de réutiliser first step pour la seconde step

  return (
    <div className={styles.dashboard_moving_accepted_estimate_container}>
      {
        step === 0 && (
          <Fade in={step === 0}>
            <DashboardMovingDetailAcceptedMoversStep
              role='mover'
              title={messages.firstStep.title}
              disabled={disabled}
              setDisabled={setDisabled}
            />
          </Fade>
        )
      }
      {
        step === 1 && (
          <Fade in={step === 1}>
            <DashboardMovingDetailAcceptedMoversStep
              role='chief'
              title={messages.secondStep.title}
              disabled={disabled}
              setDisabled={setDisabled}
            />
          </Fade>
        )
      }
      {
        step === 2 && (
          <Fade in={step === 1}>
            <DashboardMovingDetailAcceptedVehicleSelectionStep
              role='vehicle'
              title={messages.thirdStep.title}
              disabled={disabled}
              setDisabled={setDisabled}
            />
          </Fade>
        )
      }
      <div className={styles.dashboard_moving_accepted_estimate_action_container}>
        <Button onClick={handleAccept} disabled={disabled}>
          <div className={styles.dashboard_moving_accepted_estimate_action_elements}>
            <div>{step < 2 ? messages.action.nextStep : messages.action.validate}</div>
            <ChevronRight />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default DashboardMovingDetailAccepted;
