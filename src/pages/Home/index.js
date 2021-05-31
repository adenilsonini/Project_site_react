import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { alertService } from "../../Componets/Alerts";

const Home = () => {

 const [listimg, setlistimg] = useState([{img: 'https://3.bp.blogspot.com/-gvTArjI6O7c/VwLa9WNRdKI/AAAAAAAADNI/tusCzb07DGQuCsJK0naULeoS_HE8kDSuA/s1600/natureza.jpg', alt: 'Image 01', h3: 'Teste Image 01', p: 'Paragrafo 01'},
 {img: 'https://mudatudo.com.br/website/wp-content/uploads/2019/06/mudatudo-tree-3822149-1280-1280x640.jpg', alt: 'Image 02', h3: 'Teste Image 02', p: 'Paragrafo 02'},
  {img: 'https://s2.glbimg.com/bgGxMP11Fdox4A7RVFLRZSLkeyo=/0x0:2048x1314/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/B/4/CpdjQ4SZANm1zQK9rIBw/pordosol.jpg', alt: 'Image 03', h3: 'Teste Image 03', p: 'Paragrafo 03'}]);

  return (
      <>
          <div className="container">

              <h1>Pagina principal</h1>

              <button className="btn btn-success m-1" onClick={() => alertService.success('Success!!',  {timer: '3000'})}>Success</button>

              <div style={{ width: '600px', height: '400px', marginLeft: 'auto', marginRight: 'auto' }}>

                  <Carousel>

                      {
                          listimg.map(data => {
                              return (

                                  <Carousel.Item>
                                      <img style={{ width: '600px', height: '400px' }}
                                          className="d-block w-100"
                                          src={data.img}
                                          alt={data.alt}
                                      />
                                      <Carousel.Caption>
                                          <h3>{data.h3}</h3>
                                          <p>{data.p}</p>
                                      </Carousel.Caption>

                                  </Carousel.Item>

                              );
                          })
                      }

                  </Carousel>

              </div>





          </div>

      </>
  )};

export default Home