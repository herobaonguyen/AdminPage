import { withFormik } from 'formik'
import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { ModalType } from '../../../redux/constant/ModalType/ModalType'
import * as Yup from 'yup'
import { AdminType } from '../../../redux/constant/AdminType/AdminType'

export const AddMemberModal = (props) => {
  const dispatch = useDispatch()

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm
  } = props;

  return (
    <form onSubmit={handleSubmit} className="add-member-modal-body">
      <div className="modal-form-group">
        <label>Name</label>
        <input id="name" onChange={handleChange} type="text" name="name" className="form-control" />
        <p style={{ fontSize: '14px', color: 'red', alignSelf: "flex-start" }}>{errors.name}</p>
      </div>
      <div className="modal-form-group">
        <label>Email</label>
        <input id="email" onChange={handleChange} type="text" name="email" className="form-control" />
        <p style={{ fontSize: '14px', color: 'red', alignSelf: "flex-start" }}>{errors.email}</p>
      </div>
      <div className="modal-form-group">
        <label>Address</label>
        <input id="address" onChange={handleChange} type="text" name="address" className="form-control" />
        <p style={{ fontSize: '14px', color: 'red', alignSelf: "flex-start" }}>{errors.address}</p>
      </div>
      <div className="modal-form-group">
        <label>Role</label>
        <input type="text" name="role" className="form-control" value="User" disabled />
      </div>
      <div className="modal-button-group">
        <button
          type="button"
          className="modal-btn"
          onClick={() => {
            dispatch({
              type: ModalType.CLOSE_MODAL
            })
            document.getElementById("name").value = ""
            document.getElementById("email").value = ""
            document.getElementById("address").value = ""
          }}
        >Cancel</button>
        <button
          onClick={() => {

            if (JSON.stringify(errors) === '{}') {
              dispatch({
                type: ModalType.CLOSE_MODAL
              })
            }


          }}
          type='submit' className="modal-btn submit-btn">Add Member</button>
      </div>
    </form>
  )
}

const MyAddMemberForm = withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    address: '',
    role: 'User'
  }),

  // Custom sync validation
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Bạn cần nhập vào ô đây !'),
    email: Yup.string().email('Email không hợp lệ !!').required('Bạn cần nhập Email vào đây !'),
    address: Yup.string().required('Bạn cần nhập vào ô đây !'),
  }),

  handleSubmit: (values, { props, resetForm }) => {
    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("address").value = ""
    props.dispatch({
      type: AdminType.ADD_MEMBER,
      memberInfo: values
    })
  },

  displayName: 'BasicForm',
})(AddMemberModal);

export default connect()(MyAddMemberForm)