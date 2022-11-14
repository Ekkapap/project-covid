import { Card, Row, Col, Statistic } from 'antd';
import { useMediaQuery } from 'react-responsive';


// class PopulationVaccinated extends Component {


//   render() {
//     return (
//       <Card title='Population Vaccinated' bordered={false}>

//         <Row>
//           <Col xs={24} md={6} style={{ marginBottom: true ? 20 : undefined }}>
//             <Statistic title='Daily - Administered' prefix='+' value={112893} valueStyle={{ fontWeight: 'bold' }} />
//             <Statistic title='Daily - 1st Dose' prefix='+' value={112893} valueStyle={{ fontWeight: 'bold' }} />
//             <Statistic title='Daily - 2nd Dose' prefix='+' value={112893} valueStyle={{ fontWeight: 'bold' }} />
//             <Statistic title='Daily - Booster' prefix='+' value={112893} valueStyle={{ fontWeight: 'bold' }} />
//           </Col>
//           <Col xs={24} md={6}>
//             <Statistic title='Total - Administered' value={112893} valueStyle={{ fontWeight: 'bold' }} />
//             <Statistic title='Total - At Least 1 Dose' value={112893} valueStyle={{ fontWeight: 'bold' }} />
//             <Statistic title='Total - 2 Doses' value={112893} valueStyle={{ fontWeight: 'bold' }} />
//             <Statistic title='Total - Boosters' value={112893} valueStyle={{ fontWeight: 'bold' }} />
//           </Col>
//           <Col xs={24} md={4}></Col>
//           <Col xs={24} md={8}>
//             <Statistic title='Active Users' value={112893} valueStyle={{ fontWeight: 'bold' }} />
//           </Col>
//         </Row>
//       </Card>
//     );
//   }
// }


/// Redux State
// const mapStateToProps = (state: RootState) => ({
//   auth: state.auth
// });

/// Redux Action
// const mapDispatchToProps = {};

/// Mapping
// export default connect(mapStateToProps, mapDispatchToProps)(PopulationVaccinated);
const PopulationVaccinated = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 576px)'
  });

  return (
    <Card title='Population Vaccinated' bordered={false}>

      <Row>
        <Col xs={24} md={6} style={{ marginBottom: isMobile ? 20 : undefined }}>
          <Statistic title='Daily - Administered' prefix='+' value={112893} valueStyle={{ fontWeight: 'bold' }} />
          <Statistic title='Daily - 1st Dose' prefix='+' value={112893} valueStyle={{ fontWeight: 'bold' }} />
          <Statistic title='Daily - 2nd Dose' prefix='+' value={112893} valueStyle={{ fontWeight: 'bold' }} />
          <Statistic title='Daily - Booster' prefix='+' value={112893} valueStyle={{ fontWeight: 'bold' }} />
        </Col>
        <Col xs={24} md={6} style={{ marginBottom: isMobile ? 20 : undefined }}>
          <Statistic title='Total - Administered' value={112893} valueStyle={{ fontWeight: 'bold' }} />
          <Statistic title='Total - At Least 1 Dose' value={112893} valueStyle={{ fontWeight: 'bold' }} />
          <Statistic title='Total - 2 Doses' value={112893} valueStyle={{ fontWeight: 'bold' }} />
          <Statistic title='Total - Boosters' value={112893} valueStyle={{ fontWeight: 'bold' }} />
        </Col>
        <Col xs={24} md={4}></Col>
        <Col xs={24} md={8} style={{ marginBottom: isMobile ? 20 : undefined }}>
          <Statistic title='Active Users' value={112893} valueStyle={{ fontWeight: 'bold' }} />
        </Col>
      </Row>
    </Card>
  );
};
export default PopulationVaccinated;