import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Modal } from 'antd';
import { Trans } from 'react-i18next';
import consent from 'src/lang/th.json';
import { RootState } from 'src/reducers';
import i18n from 'src/i18n';
import { Dispatch } from 'redux';
import { LANGUAGE_CHANGE } from 'src/actions/global';
import { setUserConsentAction } from 'src/actions/auth/auth.action';
import { SubmitStatus } from 'src/types/global';

interface IProps {
  informed?: boolean | null | undefined;
  appconfig: string;
  logined: boolean;
  status: SubmitStatus;

  dispatchLanguageChanged: (lang: string) => void;
  dispatchInformConsent: (payload: any) => void;
}

class ConsentModal extends Component<IProps> {
  changeLanguage = (lng: string) => {
    const { dispatchLanguageChanged } = this.props;
    i18n.changeLanguage(lng);

    dispatchLanguageChanged(lng);
  };

  onInformSubmit = () => {
    const { dispatchInformConsent } = this.props;

    dispatchInformConsent({ result: true });
  };

  render() {
    const { informed, appconfig, logined, status } = this.props;
    const isMobile = false;
    return (
      <Modal
        visible
        centered
        width={isMobile ? '' : '70vw'}
        bodyStyle={{ overflowY: 'auto', maxHeight: isMobile ? '60vh' : '60vh' }}
        style={{ margin: isMobile ? '20px 1rem' : '40px 0' }}
        closable={false}
        okButtonProps={{ style: { fontSize: '.7em' }, loading: false }}
        title={
          <Row gutter={12}>
            <Col span={12} xs={logined ? 24 : 21} md={logined ? 24 : 21}>
              <Row>
                <Col style={{ fontSize: isMobile ? '1em' : '1.5em', fontWeight: 'bold', lineHeight: '1.3em' }}>
                  <Trans>consent.header</Trans>
                </Col>
              </Row>
            </Col>

            <Col span={12} xs={3} md={3}>
              <Row>
                <Col>
                  <Button
                    size='small'
                    type={appconfig === 'en' ? 'primary' : 'dashed'}
                    style={{ fontSize: 12, marginRight: 4 }}
                    onClick={() => this.changeLanguage('en')}>
                    EN
                  </Button>
                  <Button
                    size='small'
                    type={appconfig === 'th' ? 'primary' : 'dashed'}
                    style={{ fontSize: 12 }}
                    onClick={() => this.changeLanguage('th')}>
                    TH
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        }
        footer={
          informed === true
            ? [
              <Button key='cancel' size={isMobile ? 'small' : 'middle'}>
                <Trans>consent.btn.cancel</Trans>
              </Button>,
            ]
            : [
              <Button
                key='submit'
                loading={status.isSubmitting}
                size={isMobile ? 'small' : 'middle'}
                type='primary'
                onClick={this.onInformSubmit}>
                <Trans>consent.btn.inform</Trans>
              </Button>,
            ]
        }>
        <Row gutter={12}>
          {Object.keys(consent.consent1).map((x) => {
            return (
              x !== 'header' &&
              x !== 'result' &&
              x !== 'btn' && (
                <Col
                  key={x}
                  span={12}
                  xs={24}
                  md={24}
                  style={{ fontSize: isMobile ? '.8em' : '.9em', marginBottom: '1rem' }}>
                  {isMobile ? <span>&emsp;&emsp;</span> : <span>&emsp;&emsp;&emsp;&emsp;</span>}
                  <Trans key={x}>{`consent.${x}`}</Trans>
                </Col>
              )
            );
          })}
        </Row>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  appconfig: state.global.app?.lang,
  informed: state.user.informConsent?.CovidCenter?.inform?.register,
  logined: state.auth.loggedInSuccess,
  status: state.status.submit.set_user_consent,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatchLanguageChanged: (lang: string) => {
      dispatch({ type: LANGUAGE_CHANGE, lang });
    },
    dispatchInformConsent: (payload: any) => {
      dispatch(setUserConsentAction.request(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsentModal);
