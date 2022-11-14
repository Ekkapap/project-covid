/* eslint-disable @typescript-eslint/no-unused-vars */


import React, { useCallback } from 'react';
import { toPng, toBlob } from 'html-to-image';
import { saveAs } from 'file-saver';
import { Col, Row, Button, Menu, Dropdown } from 'antd';
import { DownloadOutlined, UploadOutlined, LinkOutlined, FileImageOutlined, FileExcelOutlined } from '@ant-design/icons';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LineShareButton, LineIcon, EmailShareButton, EmailIcon } from "react-share";
import './style.less';

interface IProps {
  xs: number;
  md: number;
  chartData?: {
    ref: any,
    name: string,
    instance?: any;
  };
}
interface ImageExport {
  blob: Blob | null;
}
const Tools = (props: IProps) => {
  const { xs, md, chartData } = props;
  const ref = chartData?.ref;
  const name = chartData?.name;
  const instance = chartData?.instance;
  // const exportImage = useCallback(() => {
  //   alert("export as image");
  //   if (ref.current === null) {return}
  //   toPng(ref.current, { cacheBust: true }).then((dataUrl) => {
  //     saveAs(dataUrl, name+'.png');
  //   }).catch((err) => {alert(err);console.log(err);});
  // }, [ref,name]);
  const exportImage = async () => {
    // const blob = new Blob([ref], {type: "image/png"});
    // console.log(blob);
    // const dataUrl = URL.createObjectURL(blob);
    // saveAs(dataUrl, name+'.png');
    // console.log(ref.current);
    // console.log(instance);
    // if (ref.current === null) {return}
    // const dataUrl = await toPng(ref.current, { cacheBust: true });
    // saveAs(dataUrl, name+'.png');
    // instance.downloadImage();
    const blob = await toBlob(ref.current);
    if (blob) {
      const dataUrl = URL.createObjectURL(blob);
      if (window.saveAs) {
        window.saveAs(dataUrl, name + '.png');
      } else {
        saveAs(dataUrl, name + '.png');
      }
    }
  };

  const download = (
    <Menu
      items={[
        {
          key: 'd1',
          label: (
            <Button type="link" onClick={() => { exportImage(); }}>
              <FileImageOutlined style={{ fontSize: "1rem", margin: 0, width: 20 }} />as Image
            </Button>
          )
        },
        // { 
        //   key: 'd2', 
        //   label: (
        //     <Button type="link">
        //       <FileExcelOutlined style={{fontSize:"1rem",margin:0,width:20}}/>as Excel
        //     </Button>
        //   ) 
        // }
      ]}
    />
  );
  const share = (
    <Menu
      items={[
        {
          key: 's1',
          label: (
            <Button type="link">
              <LinkOutlined style={{ fontSize: "1rem", margin: 0, width: 20 }} />Copy link
            </Button>
          )
        }, {
          key: 's2',
          label: (
            <FacebookShareButton url="https://covidcenter-npm.moph.go.th" quote="Testing share Facebook">
              <FacebookIcon size={20} borderRadius={3} /><span>Facebook</span>
            </FacebookShareButton>
          )
        }, {
          key: 's3',
          label: (
            <TwitterShareButton url="https://covidcenter-npm.moph.go.th" title="Testing share Twitter" via="" hashtags={["covid"]}>
              <TwitterIcon size={20} borderRadius={3} /><span>Twitter</span>
            </TwitterShareButton>
          )
        }, {
          key: 's4',
          label: (
            <LineShareButton url="www.google.co.th" title="Testing share Line">
              <LineIcon size={20} borderRadius={3} /><span>Line</span>
            </LineShareButton>
          )
        }, {
          key: 's5',
          label: (
            <EmailShareButton url="https://covidcenter-npm.moph.go.th" subject="Testing send email" body="....">
              <EmailIcon size={20} borderRadius={3} /><span>Email</span>
            </EmailShareButton>
          )
        },
      ]}
    />
  );
  return (
    <Row className='card-footer tools'>
      <Dropdown overlay={download} placement="bottomLeft">
        <Col xs={xs} md={md} className='download-btn'>
          <Button type='link'><DownloadOutlined style={{ marginRight: '0' }} /> Download</Button>
        </Col>
      </Dropdown>
      <Dropdown overlay={share} placement="bottomLeft">
        <Col xs={xs} md={md} className='download-btn'>
          <Button type='link'><UploadOutlined style={{ marginRight: '0' }} /> Share</Button>
        </Col>
      </Dropdown>
    </Row>
  );
};

export default Tools;