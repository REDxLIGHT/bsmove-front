import React, { useState, useEffect } from 'react';
import { Dialog, Accordion, AccordionSummary, AccordionDetails, IconButton, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Close from '@material-ui/icons/Close';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { add, assoc, constructN, curry, findIndex, map, propEq, values, when } from 'ramda';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';

import { Subtitle } from '../../components/Texts';
import Button from '../../components/Button';
import Input from '../../components/Input';

import styles from './index.module.css';
import messages from './messages';
import DeleteDialog from '../../components/DeleteDialog';
import Autocomplete from '../../components/Autocomplete';
import { useCustomer } from '../../hooks/customer';
import API from '../../helpers/api';
import Counter from '../../components/Counter';
import { useEstimate } from '../../hooks/estimate';
import Routes from '../../helpers/routes';
import {METRICS} from "../../helpers/constants";

const VolumeCalculatorRoomItem = ({ roomId, item = {}, handleStateInc, handleStateDec }) => {
  const [count, setCount] = useState(0);

  function handleCountInc() {
    // addVolumeToRoom(item?.id, item?.volume)
    handleStateInc(roomId, item?.size)
    return setCount(prevCount => prevCount + 1);
  }

  function handleCountDec() {
    handleStateDec(roomId, item?.size);
    return setCount(prevCount => prevCount - 1);
  }

  return (
    <div className={styles.calculator_room_item}>
      <div>{item.name}</div>
      <Counter
        minValue={0}
        maxValue={item?.stock <= count}
        value={count}
        handleInc={handleCountInc}
        handleDec={handleCountDec}
      />
    </div>
  )
}

// const VolumeCalculatorOption = ({ option = {} }) => {
//   return (
//     <div>
//       {option.name}
//     </div>
//   )
// }

const VolumeCalculatorRoom = ({
  room = {}, addVolumeToCalculator, removeVolumeFromCalculator,
  removeRoomFromList, objectList = [], addVolumeToRoom, removeVolumeFromRoom,
}) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [roomList, setRoomList] = useState([]);

  function handleDeleteDialog() {
    return setDeleteDialog(prevState => !prevState);
  }

  function addObjectToList(event, value) {
    if (!value) return ;
    const option = objectList.find(obj => obj.name === value);
    return setRoomList(prevRoomList => ([...prevRoomList, option]))
  }

  function handleStateInc(id, value) {
    addVolumeToCalculator(value);
    addVolumeToRoom(id, value)
  }

  function handleStateDec(id, value) {
    removeVolumeFromCalculator(value);
    removeVolumeFromRoom(id, value)
  }

  return (
    <>
      <Accordion square={false} className={styles.volume_calculator_page_room_accordion}>
        <AccordionSummary
          className={styles.volume_calculator_page_accordion_header}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={styles.volume_calculator_page_accordion_header_content}>
            <div className={styles.volume_calculator_page_resume_room_name}>{room.name || '[non_defini]'}</div>
            <IconButton onClick={handleDeleteDialog}>
              <DeleteForever fontSize="small" />
            </IconButton>
          </div>
        </AccordionSummary>
        <AccordionDetails className={styles.volume_calculator_page_accordion_content}>
          {roomList?.map((item, index) => (
            <>
              <VolumeCalculatorRoomItem key={item?.id} roomId={room.id} item={item} handleStateInc={handleStateInc} handleStateDec={handleStateDec} />
              {roomList?.length > index + 1 && <Divider />}
            </>
          ))}
          <div className={styles.volume_autocomplete_container}>
            <Autocomplete
              handleChange={addObjectToList}
              options={objectList}
              messages={messages.calculator.roomAutocomplete}
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <DeleteDialog
        open={deleteDialog}
        item={`la pièce "${room.name || '[non_defini]'}"`}
        onClose={handleDeleteDialog}
        handleConfirm={() => removeRoomFromList(room)}
        handleDeny={handleDeleteDialog}
      />
    </>
  )
}

const RoomDialog = ({ open, onClose, handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      roomName: '',
    },
    validate: () => {},
    onSubmit: values => handleSubmit(values),
  })
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <div className={styles.room_dialog_container}>
        <div className={styles.room_dialog_header}>
          <Subtitle>{messages.dialog.title}</Subtitle>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <div>
          <form className={styles.room_dialog_content} onSubmit={formik.handleSubmit}>
            <Input
              label={messages.dialog.input.label}
              placeholder={messages.dialog.input.placeholder}
              name={messages.dialog.input.name}
              values={formik.values?.roomName}
              value={formik.values?.roomName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              type='text'
            />
            <Button type="submit" disabled={!formik?.values?.roomName}>
              {messages.dialog.action}
            </Button>
          </form>
        </div>
      </div>
    </Dialog>
  )
}

const VolumeCalculatorContainer = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [objectList, setObjectList] = useState([]);
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [total, setTotal] = useState({ quantity: 0, volume: 0 });
  const { addToEstimateInventoryByKey } = useEstimate();
  
  useEffect(() => {
    async function fetchObjectList() {
      // const res = await API.get(`/Products?filter={"where": {"tags": {"inq": ["boxes"] }, "stock": { "gt": 0 } }}`);
      const res = await API.get(`/Furnitures`);
      setObjectList(res.data);
    }

    fetchObjectList();
  }, [])

  function removeRoomFromList(roomToDelete) { // delete ici
    setTotal(prevTotal => ({ ...prevTotal, volume: prevTotal?.volume - roomToDelete?.volume, quantity: prevTotal?.quantity - roomToDelete?.quantity }))
    setRooms(rooms.filter((room) => room.id != roomToDelete.id));
  }

  function handleRoomDialog() {
    return setRoomDialogOpen(prevState => !prevState);
  }

  function modifyVolume(list, key, value, type = 'add') {
    const index = findIndex(propEq('id', key))(list);
    const newRoomsList = [...list];
    type === 'add' ? newRoomsList[index].volume += value : newRoomsList[index].volume -= value;
    type === 'add' ? newRoomsList[index].quantity += 1 : newRoomsList[index].quantity -= 1;
    return newRoomsList;
  }

  function addVolumeToRoom(roomId, volume = 1) {
    // const roomPosition = rooms?.findIndex((room) => room.id === roomId);
    setRooms(previousRooms => modifyVolume(previousRooms, roomId, volume, 'add'))
    // return setRooms(previousRooms => modifyVolume(previousRooms, roomId, volume));
  }

  function addVolumeToEstimate() {
    addToEstimateInventoryByKey('volume', { size: total?.volume });
    return router.push(Routes.ESTIMATE_INVENTORY_PAGE);
  }

  function removeVolumeFromRoom(roomId, volume = 1) {
    setRooms(previousRooms => modifyVolume(previousRooms, roomId, volume, 'dec'))
  }

  function addVolumeToCalculator(volume) {
    setTotal(previousState => ({ ...previousState, quantity: previousState?.quantity + 1, volume: previousState?.volume + volume }))
  }

  function removeVolumeFromCalculator(volume) {
    setTotal(previousState => ({ ...previousState, quantity: previousState?.quantity - 1, volume: previousState?.volume - volume}))
  }

  function addRoomToCalculator(values) {
    setRooms(prevRooms => [...prevRooms, { name: values.roomName, id: Date.now(), volume: 0, quantity: 0 }]);
    return handleRoomDialog();
  }

  return (
    <div className={styles.volume_calculator_page_container}>
      <div className={styles.volume_calculator_page_calculator}>
        <Subtitle>{messages.title}</Subtitle>
        <div className={styles.volume_calculator_page_subtitle}>{messages.subtitle}</div>
        <div className={styles.volume_calculator_page_rooms_container}>
          {
            rooms?.length
              ? rooms.map((room, index) => (
                <VolumeCalculatorRoom
                  key={`${room?.name}-${index}`}
                  objectList={objectList}
                  removeRoomFromList={removeRoomFromList}
                  room={room}
                  removeVolumeFromCalculator={removeVolumeFromCalculator}
                  addVolumeToCalculator={addVolumeToCalculator}
                  addVolumeToRoom={addVolumeToRoom}
                  removeVolumeFromRoom={removeVolumeFromRoom}  
                />
              )) : <div className={styles.volume_calculator_no_room}>{messages.noRoom}</div>
          }
        </div>
        <div className={styles.volume_calculator_page_calculator_action_container}>
          <Button onClick={handleRoomDialog} outlined>
            {messages.calculator.action}
          </Button>
        </div>
      </div>
      <div className={styles.volume_calculator_page_resume}>
        <div className={styles.volume_calculator_page_resume_content}>
          <div className={styles.volume_calculator_page_resume_header}>
            <div className={styles.volume_calculator_page_resume_title}>{messages.resume.title}</div>
            <div className={styles.volume_calculator_page_subtitle}>{`${total?.quantity || 0} ${messages.resume.subtitle}`}</div>
          </div>
          <Divider />
          <div className={styles.volume_calculator_page_resume_items}>
            {
              rooms?.length
                ? rooms.map((room) => (
                  <div key={room?.id} className={styles.volume_calculator_page_resume_item_infos}>
                    <div className={styles.volume_calculator_page_resume_room_name}>{room?.name || '[non_defini]'}</div>
                    <div>{`${room?.volume.toFixed(2)} ${METRICS.CUBE}`}</div>
                  </div>
                ))
                : <div className={styles.volume_calculator_no_room}>{messages.noRoom}</div>
            }
          </div>
          <Divider />
          <div className={styles.volume_calculator_page_resume_total_container}>
            {rooms?.length
              ? (
                <div className={styles.volume_calculator_page_resume_total_volume}>
                  <div className={styles.volume_calculator_page_resume_total_volume_number}>{`${total?.volume} ${METRICS.CUBE}`}</div>
                  <div className={styles.volume_calculator_page_resume_total_volume_info}>{`${total?.quantity} ${messages.resume.subtitle}`}</div>
                </div>
              )
            : null}
            <div className={styles.volume_calculator_page_resume_action_container}>
              {/*<div className={styles.volume_calculator_page_resume_room_name}>{messages.resume.goBack}</div>*/}
              <Button disabled={!rooms?.length} onClick={addVolumeToEstimate} >{messages.resume.action}</Button>
            </div>
          </div>
        </div>
      </div>
      <RoomDialog
        open={roomDialogOpen}
        onClose={handleRoomDialog}
        handleSubmit={addRoomToCalculator}
      />
    </div>
  )
}

export default VolumeCalculatorContainer;