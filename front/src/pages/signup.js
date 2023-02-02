import React from 'react';
import { useState } from 'react';
import { client } from '../libs/axios'

export const SignUp = () => {
	const initialValues = {userName: "", mailAddress: "", password: ""};
	const [formValues, setFromValues] = useState(initialValues);
	const [fomrErrors, setFromError] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const handleChange = (e) => {
	  const {name, value} = e.target;
	  setFromValues({...formValues, [name]: value});
	}

	const handleSubmit = (e) => {
	  e.preventDefault();
	  //ここでAPIを叩く？？？
	  setFromError(validate(formValues));
	  setIsSubmit(true);
	  if (Object.keys(fomrErrors).length > 0) {
		return
	  }
	  const body = {
		userName: formValues.userName,
		password: formValues.password,
		email: formValues.mailAddress,
	  }
	  client.post('v1/signup', body)
	}

	const validate = (values) => {
	  const errors = {};
	  const regex = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
	  if (!values.userName) {
		errors.userName = "ユーザ名を入力してください"
	  }
	  if (!values.mailAddress) {
		errors.mailAddress = "メールをアドレスを入力してください"
	  } else if (!regex.test(values.mailAddress)) {
		errors.mailAddress = "正しいメールアドレスを入力してください"
	  }
	  if (!values.password) {
		errors.password = "パスワードを入力してください"
	  } else if (values.password.length < 8) {
		errors.password = "パスワードは8文字以上, 20文字以下にしてください"
	  } else if (values.password.length > 21) {
		errors.password = "パスワードは8文字以上, 20文字以下にしてください"
	  }

	  return errors
	}

	return (
	  <div className="formContainer">
		<form onSubmit={(e) => handleSubmit(e)}>
		  <h1>ログインフォーム</h1>
			<div className="uiForm">
			  <div className="formFiled">
				<label>ユーザ名</label>
				<input type="text" placeholder="ユーザ名" name="userName" onChange={(e) => handleChange(e)}/>
			  </div>
			  <p className="errorMsg">{fomrErrors.userName}</p>
			  <div className="formFiled">
				<label>メールアドレス</label>
				<input type="text" placeholder="メールアドレス" name="mailAddress" onChange={(e) => handleChange(e)}/>
			  </div>
			  <p className="errorMsg">{fomrErrors.mailAddress}</p>
			  <div className="formFiled">
				<label>パスワード</label>
				<input type="text" placeholder="パスワード" name="password" onChange={(e) => handleChange(e)}/>
			  </div>
			  <p className="errorMsg">{fomrErrors.password}</p>
			  <button className="submintButton">ログイン</button>
			  {Object.keys(fomrErrors).length === 0 && isSubmit && (
				<div className="MsgOk">ログインに成功しました</div>
			  )}
			</div>
		</form>
	  </div>
	);
}
