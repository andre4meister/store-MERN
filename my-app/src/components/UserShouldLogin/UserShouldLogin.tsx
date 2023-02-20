import { Button, Result, Row } from 'antd';
import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserShouldLoginProps {
  pageName: string;
}

const UserShouldLogin: FC<UserShouldLoginProps> = ({ pageName }) => {
  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate('/login');
  };

  const onSignUpClick = () => {
    navigate('/registration');
  };

  return (
    <Row justify="center" align="middle">
      <Result
        status="info"
        title={`You should be logged in to see ${pageName} page`}
        extra={[
          <Button type="primary" size="large" onClick={onLoginClick}>
            Sign in
          </Button>,
          <Button type="primary" size="large" onClick={onSignUpClick}>
            Sign up
          </Button>,
        ]}
      />
    </Row>
  );
};

export default memo(UserShouldLogin);
