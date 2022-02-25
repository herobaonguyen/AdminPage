import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Table, Tag, Space, Row, Col, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import { MainType } from '../../redux/constant/MainType/MainType';
import { DelayTime } from '../../util/DelayTime';
import { localSave } from '../../util/localSave';

import { ModalType } from '../../redux/constant/ModalType/ModalType';
import { AdminType } from '../../redux/constant/AdminType/AdminType';

export const AdminPage = () => {

  const { userList } = useSelector(state => state.AdminReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  if (localStorage.getItem(localSave.token)) {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',

      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Role',
        key: 'role',
        dataIndex: 'role',
      },
      {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        render: text => <a>{text}</a>,
      },
      {
        title: '',
        key: '',
        dataIndex: '',
        width: '12%',
        render: (record) => (
          <div className="button-group">
            {record.role !== 'Admin' ?
              <Button
                onClick={() => {
                  dispatch({
                    type: ModalType.OPEN_EDIT_MEMBER_MODAL,
                    memberInfo: record
                  })
                }}
               type="primary" ghost>
                <EditOutlined />
              </Button> :
              <Button type="primary" ghost disabled>
                <EditOutlined />
              </Button>}

            {record.role !== 'Admin' ?
              <Button
               onClick={() => {
                  dispatch({
                    type: AdminType.REMOVE_MEMBER,
                    memberId: record.id
                  })
                }}
              type="primary" danger>
                <DeleteOutlined />
              </Button> :
              <Button type="primary" danger disabled>
                <DeleteOutlined />
              </Button>}

          </div>
        ),
      },
    ];

    return (
      <div className="admin-page">

        <Row>
          <Col span={6}>
            <div className="admin-info">
              <div className="info-container">
                <img src={require('../../assets/avatar/tải xuống.png')} />
                <div className="admin-info__detail">
                  <p>Name: Nguyen</p>
                  <p>Email: nguyen@gmail.com</p>
                  <p>Role: Admin</p>
                </div>
              </div>
              <button
                onClick={() => {
                  dispatch({
                    type: MainType.OPEN_LOADING
                  })
                  setTimeout(() => {
                    localStorage.removeItem(localSave.token)
                    localStorage.removeItem(localSave.userLogin)
                    dispatch({
                      type: MainType.CLOSE_LOADING
                    })
                  }, DelayTime.logoutTime)
                }}
                className="login-out-btn"
              >Logout</button>
            </div>
          </Col>
          <Col span={18}>
            <div className="admin-info">
              <div className="user-list">
                <div className="user-list__header">
                  <h1>User Board</h1>
                  <button
                    onClick={() =>

                      dispatch({
                        type: ModalType.OPEN_ADD_MEMBER_MODAL
                      })}
                  > + Add Member</button>
                </div>
                <Table rowKey={(record) => record.id} columns={columns} dataSource={[...userList]} />
              </div>
            </div>
          </Col>
        </Row>


      </div>
    )
  }
  else {
    return (
      <Navigate to=".." />
    )
  }
}
