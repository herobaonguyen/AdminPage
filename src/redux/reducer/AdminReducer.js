import userList from '../../assets/data/data.json'
import { poppupNoti } from '../../util/Notification'
import { AdminType } from '../constant/AdminType/AdminType'


const stateDefault = {
    userList,
    admin: JSON.parse(localStorage.getItem('userLogin'))
}

export const AdminReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case AdminType.ADD_MEMBER: {
            let newMember = action.memberInfo
            let index = state.userList.findIndex((user) => user.name === newMember.name)
            if (index == -1) {
                newMember.id = state.userList.length + 1
                state.userList.push(newMember)
                poppupNoti.addMemberSuccess()
            } else {
                poppupNoti.addMemberFail()
            }

            return { ...state }
        }

        case AdminType.EDIT_MEMBER: {
            let editInfo = action.editInfo
            //Dùng để check xem tên mới vừa nhập vào có trùng với những tên khác đã có trong list hay không
            let nameIndex = state.userList.findIndex((user) => user.name === editInfo.name)
            if (nameIndex === -1) {
                //Dùng id để tìm ra index của thành viên vừa chọn trong mảng userList để thực hiện thay đổi thông tin
                let index = state.userList.findIndex((user) => user.id === editInfo.id) 
                state.userList[index].name = editInfo.name !== "" ? editInfo.name : state.userList[index].name
                state.userList[index].email = editInfo.email !== "" ? editInfo.email : state.userList[index].email
                state.userList[index].address = editInfo.address !== "" ? editInfo.address : state.userList[index].address

                console.log(state.userList[index])

                poppupNoti.editSuccess()
            } else poppupNoti.editFail()
            return { ...state }
        }

        case AdminType.REMOVE_MEMBER: {
            let index = state.userList.findIndex((user) => user.id === action.memberId) 
            state.userList.splice(index,1)
            return{...state}
        }

        default: return { ...state }
    }
}