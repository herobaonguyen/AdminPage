import { withFormik } from 'formik'
import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { ModalType } from '../../../redux/constant/ModalType/ModalType'
import * as Yup from 'yup'
import { AdminType } from '../../../redux/constant/AdminType/AdminType'

const EditMemberModal = (props) => {
    const dispatch = useDispatch()
    const { address, email, id, name, role } = props.memberInfo
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

    useEffect(() => {
        setFieldValue('id', id)
    }, [id])

    return (
        <form onSubmit={handleSubmit} className="add-member-modal-body">
            <div className="modal-form-group">
                <label>Id</label>
                <input id="Id" onChange={handleChange} type="text" name="id" className="form-control" value={id} disabled />

            </div>
            <div className="modal-form-group">
                <label>Name</label>
                <input id="name" onChange={handleChange} type="text" name="name" className="form-control" placeholder={name} />

            </div>
            <div className="modal-form-group">
                <label>Email</label>
                <input id="email" onChange={handleChange} type="text" name="email" className="form-control" placeholder={email} />
                <p style={{ fontSize: '14px', color: 'red', alignSelf: "flex-start" }}>{errors.email}</p>
            </div>
            <div className="modal-form-group">
                <label>Address</label>
                <input id="address" onChange={handleChange} type="text" name="address" className="form-control" placeholder={address} />

            </div>
            <div className="modal-form-group">
                <label>Role</label>
                <input type="text" name="role" className="form-control" value={role} disabled />
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
                    type='submit' className="modal-btn submit-btn">Edit Member</button>
            </div>
        </form>
    )
}

const MyEditMemberForm = withFormik({
    mapPropsToValues: () => ({
        id: '',
        name: '',
        email: '',
        address: '',
        role: 'User'
    }),

    // Custom sync validation
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email không hợp lệ !!')
    }),

    handleSubmit: (values, { props, resetForm }) => {
        document.getElementById("name").value = ""
        document.getElementById("email").value = ""
        document.getElementById("address").value = ""
        props.dispatch({
            type: AdminType.EDIT_MEMBER,
            editInfo: values
        })
    },

    displayName: 'BasicForm',
})(EditMemberModal);



export default connect()(MyEditMemberForm)