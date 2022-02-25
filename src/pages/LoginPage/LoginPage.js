import React, { useEffect } from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { connect, useDispatch } from 'react-redux';
import { SagaType } from '../../redux/saga/SagaType/SagaType';
import { useNavigate } from 'react-router-dom';

const LoginPage = (props) => {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type:'SEND_NAVIGATE',
            navigate
        })
    })

    return (
        <div className="login-page">
            <div className="login-page__container">
                <h1 className="login-page__heading">
                    Login
                </h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <p style={{fontSize:'14px',color:'red',alignSelf:"flex-start",display: props.loginFail == true ? 'block' : 'none'}}>
                        * Bạn đã nhập sai mật khẩu hoặc tài khoản
                    </p>
                    <div className="form-group">
                        <input onChange={handleChange} type="text" name="username" placeholder="Username" />
                        <p style={{fontSize:'14px',color:'red',alignSelf:"flex-start"}}>{errors.username}</p>
                    </div>
                    <div className="form-group">
                        <input onChange={handleChange} type="password" name="password" placeholder="Password" />
                        <p style={{fontSize:'14px',color:'red',alignSelf:"flex-start"}}>{errors.password}</p>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

const MyLoginForm = withFormik({
    mapPropsToValues: () => ({
        username: '',
        password: ''
    }),

    // Custom sync validation
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Bạn cần nhập tên đăng nhập vào đây !'),
        password: Yup.string().required('Bạn cần nhập mật khẩu vào !')
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
       props.dispatch({
           type: SagaType.LOGIN_SAGA,
           userLogin: values,
           navigate: props.navigate
       })
    },

    displayName: 'BasicForm',
})(LoginPage);

const mapStateToProps = (state) => ({
    navigate: state.LoginReducer.navigate,
    loginFail: state.LoginReducer.loginFail
    
})

export default connect(mapStateToProps)(MyLoginForm)