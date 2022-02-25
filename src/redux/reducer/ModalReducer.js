import React from 'react'
import  AddMemberModal  from '../../components/Modal/AddMemberModal/AddMemberModalBody';
import  EditMemberModal  from '../../components/Modal/EditMemberModalBody/EditMembetModalBody';
import { ModalType } from '../constant/ModalType/ModalType'
const stateDefault = {
    modalBody: <></>,
    modalTitle: "",
    ModalVisible: false
}

export const ModalReducer = (state=stateDefault,action) => {
    switch (action.type) {

        case ModalType.OPEN_ADD_MEMBER_MODAL: {
            state.ModalVisible = true
            state.modalBody = <AddMemberModal />
            state.modalTitle = "Add Member"
            return {...state}
        }

        case ModalType.OPEN_EDIT_MEMBER_MODAL: {
            state.ModalVisible = true
            state.modalBody = <EditMemberModal memberInfo={action.memberInfo}/>
            state.modalTitle = "Edit Member"
            return {...state}
        }

        case ModalType.CLOSE_MODAL:{
            state.ModalVisible = false
            return {...state}
        }

        default: return{...state}
    }
}