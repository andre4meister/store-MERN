import { Button, Result } from 'antd';
import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';

interface AppErrorPageProps {
  appError: string;
}

const AppErrorPage: FC<AppErrorPageProps> = ({ appError }) => {
  const navigate = useNavigate();

  const onReloadClick = () => {
    window.location.reload();
  };

  const onGoHomeClick = () => {
    navigate('/');
  };

  return (
    <Result
      status="500"
      title="Oops! Something went wrong"
      subTitle={appError}
      extra={[
        <Button type="primary" size="large" onClick={onReloadClick} key="reload">
          Reload page
        </Button>,
        <Button type="primary" size="large" onClick={onGoHomeClick} key="home">
          Back to Home
        </Button>,
      ]}
    />
  );
};

export default memo(AppErrorPage);
