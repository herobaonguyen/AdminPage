import { Button, Modal } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ModalType } from '../../../redux/constant/ModalType/ModalType';


export const MyModal = () => {

  const dispatch = useDispatch()
  const { modalBody, modalTitle, ModalVisible } = useSelector(state => state.ModalReducer)

  const handleCancel = () => {
    dispatch({
      type: ModalType.CLOSE_MODAL
    })
    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("address").value = ""
  };

  return (
    <>
      <Modal
        title={modalTitle}
        visible={ModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {modalBody}
      </Modal>
    </>
  )
}
