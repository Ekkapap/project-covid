/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Row, Skeleton, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/reducers';
import { Trans, useTranslation } from 'react-i18next';
import consent from 'src/lang/th.json';
import './index.less';
import { useMediaQuery } from 'react-responsive';
import Register from 'src/pages/users/register';
const ProfilePage: FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const { i18n } = useTranslation();
  const { user } = useSelector((state: RootState) => state);
  const informed_register = useSelector((state: RootState) => state.user.informConsent?.CovidCenter?.inform?.register);
  const informed_login = useSelector((state: RootState) => state.user.informConsent?.CovidCenter?.inform?.login);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  return (
    <div style={{ paddingBottom: '48px' }}>
      {' '}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <Row style={{ marginBottom: '0.8rem' }}>
            <Col className='text-header-main'><Trans>pages.profile.profile_header</Trans></Col>
          </Row>
          <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]} style={{ backgroundColor: 'unset', minHeight: 'unset', marginBottom: '3rem' }}>
            <Col xs={24} md={24}>
              <Row className='profileRow'>
                <Col xs={7} md={4} className="topic"><Trans>pages.profile.name</Trans></Col>
                <Col xs={1} md={1} className="dimeter">:</Col>
                <Col xs={16} md={19} className="content">{user.name}</Col>
              </Row>
              <Row className='profileRow'>
                <Col xs={7} md={4} className="topic"><Trans>pages.profile.position</Trans></Col>
                <Col xs={1} md={1} className="dimeter">:</Col>
                <Col xs={16} md={19} className="content">{user.position}</Col>
              </Row>
              <Row className='profileRow'>
                <Col xs={7} md={4} className="topic"><Trans>pages.profile.department</Trans></Col>
                <Col xs={1} md={1} className="dimeter">:</Col>
                <Col xs={16} md={19} className="content">{(isMobile) ? user.department.hosname : user.department.hosfullname}</Col>
              </Row>
              <Row className='profileRow'>
                <Col xs={7} md={4} className="topic"><Trans>pages.profile.tambon</Trans></Col>
                <Col xs={1} md={1} className="dimeter">:</Col>
                <Col xs={16} md={19} className="content">{user.tambon.tambonname}</Col>
              </Row>
              <Row className='profileRow'>
                <Col xs={7} md={4} className="topic"><Trans>pages.profile.amphur</Trans></Col>
                <Col xs={1} md={1} className="dimeter">:</Col>
                <Col xs={16} md={19} className="content">{user.amphur.amphurname}</Col>
              </Row>
              <Row className='profileRow'>
                <Col xs={7} md={4} className="topic"><Trans>pages.profile.changwat</Trans></Col>
                <Col xs={1} md={1} className="dimeter">:</Col>
                <Col xs={16} md={19} className="content">{user.changwat.changwatname}</Col>
              </Row>
              <Row className='profileRow'>
                <Col xs={7} md={4} className="topic"><Trans>pages.profile.cid</Trans></Col>
                <Col xs={1} md={1} className="dimeter">:</Col>
                <Col xs={16} md={19} className="content">{user.cid}</Col>
              </Row>
              <Row className='profileRow'>
                <Col xs={7} md={4} className="topic"><Trans>pages.profile.email</Trans></Col>
                <Col xs={1} md={1} className="dimeter">:</Col>
                <Col xs={16} md={19} className="content">{user.email}</Col>
              </Row>
              <Row className='profileRow'>
                <Col xs={7} md={4} className="topic"><Trans>pages.profile.mobile</Trans></Col>
                <Col xs={1} md={1} className="dimeter">:</Col>
                <Col xs={16} md={19} className="content">{user.mobile}</Col>
              </Row>
            </Col>
            <Col xs={24} md={24}>
              <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => {
                setEditStatus(true);
                setShowModalEdit(true);
              }}> <Trans>pages.profile.editProfile</Trans></Button>
            </Col>
          </Row>

          <Row style={{ marginBottom: '0.8rem' }}>
            <Col xs={24} md={24} style={{ fontSize: (isMobile ? "1em" : "1.5em"), fontWeight: 'bold', lineHeight: '1.3em' }}>
              <Trans>consent1.header</Trans> <Trans>consent1.for</Trans>
            </Col>
            <Col xs={24} md={24} style={{ fontSize: (isMobile ? ".9em" : "1.2em"), fontWeight: 'bold', lineHeight: '1.3em', color: (informed_register ? '#3bb300' : 'red'), marginTop: '10px' }}>
              <Trans>{informed_register ? "consent1.result.yes" : "consent1.result.no"}</Trans>
            </Col>
          </Row>
          <Row className='card-body' style={{ backgroundColor: 'unset', minHeight: 'unset' }}>
            {
              Object.keys(consent.consent1).map((x) => {
                return (x !== 'header' && x !== 'result' && x !== 'btn' && x !== 'warning' && x !== 'for') &&
                  <Col key={x} span={12} xs={24} md={24} style={{ fontSize: (isMobile ? '.8em' : '.9em'), marginBottom: (isMobile ? '.5rem' : '1rem') }}>
                    {isMobile ? <span>&emsp;&emsp;</span> : <span>&emsp;&emsp;&emsp;&emsp;</span>}
                    <Trans key={x}>{`consent1.${x}`}</Trans>
                  </Col>;
              })
            }
          </Row>

          <Row style={{ marginTop: '3rem', marginBottom: '0.8rem' }}>
            <Col xs={24} md={24} style={{ fontSize: (isMobile ? "1em" : "1.5em"), fontWeight: 'bold', lineHeight: '1.3em' }}>
              <Trans>consent2.header</Trans> <Trans>consent2.for</Trans>
            </Col>
            <Col xs={24} md={24} style={{ fontSize: (isMobile ? ".9em" : "1.2em"), fontWeight: 'bold', lineHeight: '1.3em', color: (informed_login ? '#3bb300' : 'red'), marginTop: '10px' }}>
              <Trans>{informed_login ? "consent2.result.yes" : "consent2.result.no"}</Trans>
            </Col>
          </Row>
          <Row className='card-body' style={{ backgroundColor: 'unset', minHeight: 'unset' }}>
            {
              Object.keys(consent.consent2).map((x) => {
                return (x !== 'header' && x !== 'result' && x !== 'btn' && x !== 'warning' && x !== 'for') &&
                  <Col key={x} span={12} xs={24} md={24} style={{ fontSize: (isMobile ? '.8em' : '.9em'), marginBottom: (isMobile ? '.5rem' : '1rem') }}>
                    {isMobile ? <span>&emsp;&emsp;</span> : <span>&emsp;&emsp;&emsp;&emsp;</span>}
                    <Trans key={x}>{`consent2.${x}`}</Trans>
                  </Col>;
              })
            }
          </Row>
        </Col>
      </Row>
      <Register showModalRegister={showModalEdit} setShowModalRegister={setShowModalEdit} editStatus={editStatus} setEditStatus={setEditStatus} />
    </div>
  );
};
export default ProfilePage;