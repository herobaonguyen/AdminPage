import { toast } from "react-toastify"

const poppopupBody = (text,type) => {
    toast[type](text, {
        theme: "colored",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000
    })
}

export const poppupNoti = {
    addMemberSuccess: () => {
        poppopupBody("Bạn đã thêm thành viên thành công","success")
    },

    addMemberFail: () => {
        poppopupBody("Thành viên mới thêm đã có tên trong danh sách","error")
    },
    editSuccess: () => {
        poppopupBody("Bạn đã chỉnh sửa thành công","success")
    },
    editFail: () => {
        poppopupBody("Tên bạn mới nhập đã tồn tại !!","error")
    }
}