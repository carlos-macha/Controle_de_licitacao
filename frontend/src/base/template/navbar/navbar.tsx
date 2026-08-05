import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { utilities } from '../../../base/utils/utilities';
import './navbar.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNetworkStatusContext } from '../../context/networkstatuscontext';
import 'tippy.js/dist/tippy.css';

let iconLigth: string = 'ri-sun-line';
let iconDark: string = 'ri-moon-fill';

export interface IOptionsNavbar {
   iconCss: string,
   title?: string,
   description?: string,
   onClick?: () => void
}

interface TemplateNavbarProps {
   onToggleDarkLigth: () => void,
   onClickPerfil?: () => void,
   onClickSair?: () => void,
   onClickBloquear?: () => void,
   menuTitle?: string,
   user?: string,
   name?: string,
   userDescription?: string,
   foto?: string,
   isDark?: boolean,
   imgLogo?: string,
   imgNameApp?: string,
   nameApp?: string,
   pathHome: string,
   hidePerfil?: boolean,
   optionsDropdownNavbar?: Array<IOptionsNavbar>,
   optionsNavbar?: Array<JSX.Element>
}

const TemplateNavbar: React.FC<TemplateNavbarProps> = (props) => {
   const { online, latencia, conexaoLenta } = useNetworkStatusContext()

   const { onToggleDarkLigth, onClickPerfil, onClickSair, onClickBloquear, menuTitle,
      name, user, userDescription, foto, isDark, imgLogo, imgNameApp, nameApp, pathHome, hidePerfil,
      optionsDropdownNavbar, optionsNavbar } = props;

   useEffect(() => {
      if (!isDark) {
         $("#iconDarkLigth").removeClass(iconLigth).addClass(iconDark);
         $("#page-tipography").attr('href', `${utilities.baseURL()}css/typography.css`);
         $("#page-style").attr('href', `${utilities.baseURL()}css/style.css`);
         $('body').removeClass('dark');
      } else {
         $("#iconDarkLigth").removeClass(iconDark).addClass(iconLigth);
         $("#page-tipography").attr('href', `${utilities.baseURL()}css/typography-dark.css`);
         $("#page-style").attr('href', `${utilities.baseURL()}css/style-dark.css`);
         $('body').addClass('dark');
      }
   }, [isDark]);

   var options: Array<JSX.Element> = [];
   if (optionsDropdownNavbar) {

      optionsDropdownNavbar.forEach((opt, idx) => {
         options.push(
            <a
               key={`opt-navbar-${idx}`}
               href="javascript:void();"
               className="iq-sub-card iq-bg-primary-hover"
               onClick={opt.onClick}
            >
               <div className="media align-items-center">
                  <div className="rounded iq-card-icon iq-bg-primary">
                     <i className={opt.iconCss}></i>
                  </div>
                  <div className="media-body ml-3">
                     <h6 className="mb-0 ">{opt.title}</h6>
                     <p className="mb-0 font-size-12">{opt.description}</p>
                  </div>
               </div>
            </a>
         )
      })
   }


   return (
      <Fragment>
         <div className="iq-top-navbar" >
            <div className="iq-navbar-custom">
               <div className="iq-sidebar-logo">
                  <div className="top-logo">
                     <a href="javascript:void();" className="logo">
                        {imgLogo && <img src={`${utilities.baseURL()}images/${imgLogo}`} alt={`Logo ${nameApp}`} className="img-fluid" />}
                        {imgNameApp ?
                           <img src={`${utilities.baseURL()}images/${imgNameApp}`} alt={`Logo ${nameApp}`} className="img-fluid ml-2" />
                           :
                           <span style={{ fontSize: 23 }}><div className='text-truncate' style={{ width: '170px' }}>{nameApp}</div></span>
                        }
                     </a>
                  </div>
               </div>

               {menuTitle &&
                  <div className="navbar-breadcrumb">
                     <h5 className="mb-0">{menuTitle}</h5>
                     <nav aria-label="breadcrumb">
                        <ul className="breadcrumb">
                           <li className="breadcrumb-item"><Link to={pathHome}>Home</Link></li>
                           <li className="breadcrumb-item active" aria-current="page">{menuTitle}</li>
                        </ul>
                     </nav>
                  </div>
               }
               <nav className="navbar navbar-expand-lg navbar-light p-0">
                  <button className="navbar-toggler"
                     type="button"
                     data-toggle="collapse"
                     data-target="#navbarSupportedContent"
                     aria-controls="navbarSupportedContent"
                     aria-expanded="false"
                     aria-label="Toggle navigation">
                     <i className="ri-menu-3-line"></i>
                  </button>
                  <div className="iq-menu-bt align-self-center" style={{marginRight: window.innerWidth < 1300 ? '60px' : 0}}>
                     <div className="wrapper-menu" id="btn-menu-navbar">
                        <div className="line-menu half start"></div>
                        <div className="line-menu"></div>
                        <div className="line-menu half end"></div>
                     </div>
                  </div>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                     <ul className="navbar-nav ml-auto navbar-list">

                        <li>
                           <OverlayTrigger
                              placement="bottom"
                              overlay={
                                 <Tooltip>
                                    {!online ? 'Sem conexão' : conexaoLenta ? `Conexão lenta: ${latencia}ms` : `Online: ${latencia}ms`}
                                 </Tooltip>
                              }
                           >
                              <a href="#" className="search-toggle iq-waves-effect">
                                 {!online && <i className="mdi mdi-wifi-off text-danger" />}
                                 {online && conexaoLenta && <i className="mdi mdi-wifi-strength-1-alert text-warning" />}
                                 {online && !conexaoLenta && <i className="mdi mdi-wifi text-success" />}
                              </a>
                           </OverlayTrigger>
                        </li>


                        {/* <li>
                           <a
                              href="#"
                              className="search-toggle iq-waves-effect"
                           // onClick={onToggleDarkLigth}
                           >
                              <i id="btnNotification" className="ri-notification-2-fill"></i>
                           </a>
                           <div className="iq-sub-dropdown">
                              <div className="iq-card iq-card-block iq-card-stretch iq-card-height shadow-none m-0">
                                 <div className="iq-card-body p-0 ">
                                    <div className="bg-primary p-3">
                                       <h5 className="mb-0 text-white">Notificações<small className="badge badge-light float-right pt-1"> ! </small></h5>
                                    </div>

                                    <a href="#" className="iq-sub-card">
                                       <div className="media align-items-center">
                                          <div className="">
                                             <img className="avatar-40 rounded" src="images/user/01.jpg" alt=""/>
                                          </div>
                                          <div className="media-body ml-3">
                                             <h6 className="mb-0 ">Emma Watson Nik</h6>
                                             <small className="float-right font-size-12">Just Now</small>
                                             <p className="mb-0">95 MB</p>
                                          </div>
                                       </div>
                                    </a>

                                 </div>
                              </div>
                           </div>
                        </li> */}

                        {optionsNavbar}

                        <li>
                           <a
                              href="#"
                              className="search-toggle iq-waves-effect"
                              onClick={onToggleDarkLigth}
                           >
                              <i id="iconDarkLigth" className="ri-moon-fill"></i>
                           </a>
                        </li>

                        <li className="nav-item iq-full-screen">
                           <a href="#"
                              className="search-toggle iq-waves-effect"
                              id="btnFullscreen">
                              <i className="ri-fullscreen-line"></i>
                           </a>
                        </li>
                     </ul>
                  </div>

                  {!hidePerfil &&
                     <ul className="navbar-list">
                        <li>
                           <a href="#" className="search-toggle iq-waves-effect bg-primary text-white">
                              {foto ?
                                 <img
                                    src={`data:image/png;base64,${foto}`}
                                    className="img-fluid rounded"
                                    alt="user"
                                    style={{
                                       objectFit: 'cover',
                                       objectPosition: 'center'
                                    }}
                                 />
                                 :
                                 <i className="mdi mdi-account-circle m-0 p-0" style={{ fontSize: '240%', lineHeight: 1, position: 'relative', top: '10px' }}></i>
                              }
                           </a>
                           <div className="iq-sub-dropdown iq-user-dropdown">
                              <div className="iq-card iq-card-block iq-card-stretch iq-card-height shadow-none m-0">
                                 <div className="iq-card-body p-0 ">
                                    <div className="bg-primary p-3">
                                       <h5 className="mb-0 text-white line-height">Olá {user}</h5>
                                       <span className="text-white font-size-12">{name}</span><br />
                                       <span className="text-white font-italic font-size-12">{userDescription}</span>
                                    </div>
                                    {onClickPerfil &&
                                       <a
                                          href="javascript:void();"
                                          className="iq-sub-card iq-bg-primary-hover"
                                          onClick={onClickPerfil}
                                       >
                                          <div className="media align-items-center">
                                             <div className="rounded iq-card-icon iq-bg-primary">
                                                <i className="mdi mdi-account-circle-outline"></i>
                                             </div>
                                             <div className="media-body ml-3">
                                                <h6 className="mb-0 ">Meu Perfil</h6>
                                                <p className="mb-0 font-size-12">Visualizar detalhes do meu perfil</p>
                                             </div>
                                          </div>
                                       </a>
                                    }
                                    {options}
                                    <div className="d-inline-block w-100 text-center p-3">
                                       <a className="iq-bg-danger iq-sign-btn mr-1" href="javascript:void();" role="button"
                                          onClick={onClickBloquear}
                                       >Bloquear
                                          <i className="mdi mdi-exit-run ml-2"></i>
                                       </a>
                                       <a className="iq-bg-danger iq-sign-btn ml-1" href="javascript:void();" role="button"
                                          onClick={onClickSair}
                                       >
                                          Sair<i className="mdi mdi-exit-to-app ml-2"></i></a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </li>
                     </ul>
                  }
               </nav>
            </div>
         </div >
      </Fragment >
   );
}

export default TemplateNavbar;