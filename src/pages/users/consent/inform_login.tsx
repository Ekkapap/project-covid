/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, SetStateAction, Dispatch, useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Typography, Checkbox } from 'antd';
import { useMediaQuery } from 'react-responsive';
import './index.scss';
import { Trans, useTranslation } from 'react-i18next';
import consent from 'src/lang/th.json';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/reducers';
import { setUserConsentAction } from 'src/actions/auth/auth.action';
import { languageChanged } from 'src/actions/app/index';
interface ParentProps {
  showModalConsent?: boolean;
  setShowModalConsent?: Dispatch<SetStateAction<boolean>>;
}
const { Text } = Typography;
const Consent: FC<ParentProps> = (props: any) => {
  const dispatch = useDispatch();
  const appconfig = useSelector((state: RootState) => state.global.app?.lang);
  const logined = useSelector((state: RootState) => state.auth.loggedInSuccess);
  const informed = useSelector((state: RootState) => state.user.informConsent?.CovidCenter?.inform?.login);
  const isSubmitting = useSelector((state: RootState) => state.status.submit.set_user_consent.isSubmitting);
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const { showModalConsent, setShowModalConsent } = props;
  const [confirmInform, setConfirmInform] = useState(false);
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth, user } = useSelector((state: RootState) => state);
  const { i18n } = useTranslation();

  const onInform = () => {
    setLoading(true);
    if (confirmInform) {
      setWarning(false);
      if (!logined) { // ตอนลงทะเบียน
        // setShowModalConsent(false);
        // setShowModalRegister(true);
      } else { // ตอนล็อคอินเข้ามาแล้ว
        dispatch(setUserConsentAction.request({ login: true }));
        setLoading(false);
      }
    } else {
      setWarning(true);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    dispatch(languageChanged.set(lng));
  };
  // useEffect(() => {
  //   if (auth.loggedInSuccess && user.informConsent?.CovidCenter?.inform?.result !== true) {
  //     setLoading(false);
  //   } else {
  //     setLoading(true);
  //   }
  // }, [auth.loggedInSuccess, user.informConsent]);
  return (
    <Modal
      title={
        <Row gutter={12}>
          <Col span={12} xs={logined ? 24 : 21} md={logined ? 24 : 21} >
            <Row>
              <Col style={{ fontSize: (isMobile ? "1em" : "1.2em"), fontWeight: 'bold', lineHeight: '1.3em' }}>
                <Trans>consent2.header</Trans>
                <span style={{ color: 'green' }}> <Trans>consent2.for</Trans></span>
              </Col>
            </Row>
            {logined && (
              <Row style={{ marginTop: '10px' }}>
                <Col style={{ fontSize: (isMobile ? ".9em" : "1em"), fontWeight: 'bold', lineHeight: '1.3em', color: (informed ? '#3bb300' : 'red') }}>
                  <Trans>{informed ? "consent2.result.yes" : "consent2.result.no"}</Trans>
                </Col>
              </Row>
            )}
          </Col>
          {!logined && (<Col span={12} xs={3} md={3}>
            <Row>
              <Col>
                <Button
                  size='small'
                  type={appconfig === 'en' ? 'primary' : 'dashed'}
                  style={{ fontSize: 12, marginRight: 4 }}
                  onClick={() => changeLanguage('en')}
                >
                  EN
                </Button>
                <Button
                  size='small'
                  type={appconfig === 'th' ? 'primary' : 'dashed'}
                  style={{ fontSize: 12 }}
                  onClick={() => changeLanguage('th')}
                >
                  TH
                </Button>
              </Col>
            </Row>
          </Col>)}

        </Row>
      }
      centered
      width={isMobile ? "" : "70vw"}
      bodyStyle={{ overflowY: 'auto', maxHeight: (isMobile ? '60vh' : '60vh') }}
      style={{ margin: (isMobile ? '20px 1rem' : '40px 0') }}
      visible={showModalConsent}
      closable={false}
      okButtonProps={{ style: { fontSize: '.7em' }, loading: false }}
      footer={
        informed === true ?
          [
            <Button key="cancel" size={isMobile ? "small" : "middle"} onClick={() => setShowModalConsent(false)}> <Trans>consent2.btn.cancel</Trans></ Button>
          ] :
          [
            (warning && <span key="warning" style={{ color: 'red', marginRight: '1em' }}><Trans>consent2.warning</Trans></ span>),
            (!logined && <Button key="cancel" size={isMobile ? "small" : "middle"} onClick={() => setShowModalConsent(false)}><Trans>consent2.btn.cancel</Trans></Button>),
            <Button key="submit" loading={isSubmitting} size={isMobile ? "small" : "middle"} type="primary" onClick={() => onInform()}><Trans>consent2.btn.inform</Trans></Button>
          ]
      }
    >
      <Row gutter={12}>
        {
          Object.keys(consent.consent2).map((x) => {
            return (x !== 'header' && x !== 'result' && x !== 'btn' && x !== 'warning' && x !== 'for') &&
              <Col key={x} span={12} xs={24} md={24} style={{ fontSize: (isMobile ? '.7em' : '.8em'), marginBottom: '1rem' }}>
                {isMobile ? <span>&emsp;&emsp;</span> : <span>&emsp;&emsp;&emsp;&emsp;</span>}
                <Trans key={x}>{`consent2.${x}`}</Trans>
              </Col>;
          })
        }
      </Row>
      <Checkbox onChange={(e) => {
        if ((e.target.checked)) {
          setConfirmInform(true);
          setWarning(false);
        } else {
          setConfirmInform(false);
          setWarning(true);
        }

      }} style={{ color: 'green' }}><Trans>consent2.btn.checkbox</Trans></Checkbox>
    </Modal>
  );
};

export default Consent;
