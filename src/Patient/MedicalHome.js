

import React from "react";
import "./MedicalHome.css";

import "bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";



export default function MedicalHome() {
  return (
    <>

     <LandNav/>

      <div className="container-fluid d-flex flex-column">
        <div className="row MDfirstcard">
          <div className="MDfirstcard-cont col-xl-6">
            <h1>Online Medical Services</h1>
            <p>book your slot today</p>
            <button className="Mdfirstcardbtn">Book Slot</button>
          </div>
          <div className="MDfirstcard-img col-xl-4"><img src="animateddoctor.jpg"></img></div>
        </div>
        <div className="row services-section">
          <div className="col-sm-12 col-md-2 col-xl-2 card">
            <img className="therapyimage" alt="" src="therapy.jpg" />
            <div className="card-bottom">
              <p>Book your Therapy session</p>
              <Link to="/medicalservice"><button className="msbtn">Bookslot</button></Link>
            </div>
          </div>


          <div className="col-sm-12 col-md-2 col-xl-2 card">
            <img className="therapyimage" src="dialysis.jpg" alt="" />
            <div className="card-bottom">
              <p>Book your Therapy session</p>
              <Link to="/medicalservice"><button className="msbtn">Bookslot</button></Link>
            </div>
          </div>
          <div className="col-sm-12 col-md-2 col-xl-2 card">
            <img className="therapyimage" src="physiotherapy.jpg" alt="" />
            <div className="card-bottom">
              <p>Book your physiotherapy session</p>
              <Link to="/medicalservice"><button className="msbtn">Bookslot</button></Link>
            </div>
          </div>
          <div className="col-sm-12 col-md-2 col-xl-2 card">
            <img className="therapyimage" src="bloodtransfusion.jpg" alt="" />
            <div className="card-bottom">
              <p>Book your bloddtransfusion session</p>
              <Link to="/medicalservice"><button className="msbtn">Bookslot</button></Link>
            </div>
          </div>
          <div className="col-sm-12 col-md-2 col-xl-2 card">
            <img className="therapyimage" src="audio.jpg" alt="" />
            <div className="card-bottom">
              <p>Book your Audiology session</p>
              <Link to="/medicalservice"><button className="msbtn">Bookslot</button></Link>
            </div>
          </div>
        </div>
        <div>

          <div className="container-fluid">
            <div className="row doctorcards">
              <h1 className="ourdocs">Our Doctors</h1>
              <div className="col-sm-12 col-md-3 col-xl-3 doctorprofile d-flex flex-row">
                <div>
                  <img className="docimage" src="doctorimage.jpg" alt=""></img>
                  <p>Dr.Agarwal</p>
                </div>
                <div className="docdetails">
                  <p>About me</p>
                  <p>Experience:10years</p>
                  <p>Speciality:Therapy</p>
                  <p>Qualifications:MBBS,FRCS</p>
                  <p>Practice License:123987665</p>
                </div>
              </div>
              <div className="col-12 col-md-3 col-xl-3 doctorprofile d-flex flex-row">
                <div>
                  <img className="docimage" src="doctorimage.jpg" alt=""></img>
                  <p>Dr.Reddy</p>
                </div>
                <div className="docdetails">
                  <p>About me</p>
                  <p>Experience:10years</p>
                  <p>Speciality:Cardilogy</p>
                  <p>Qualifications:MBBS,FRCS</p>
                  <p>Practice License:123987665</p>
                </div>
              </div>
              <div className="col-12 col-md-3 col-xl-3 doctorprofile d-flex flex-row">
                <div>
                  <img className="docimage" src="doctorimage.jpg" alt=""></img>
                  <p>Dr.rakash</p>
                </div>
                <div className="docdetails">
                  <p>About me</p>
                  <p>Experience:10years</p>
                  <p>Speciality:Respiratory</p>
                  <p>Qualifications:MBBS,FRCS</p>
                  <p>Practice License:123987665</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>

        <div className="d-flex flex-row">
          <div className="articlecontent">
            <h1>Read top articles from health experts</h1>
            <p>Health articles that keep you informed about good health practices and achieve your goals.</p>
          </div>
          <div className="d-flex flex-row">
            <div className="articleacard">
              <a href="https://www.practo.com/healthfeed/12-coronavirus-myths-and-facts-that-you-should-be-aware-of-40556/post">

                <img className="articleimg" src="coronovirus.jpg"></img>
              </a>
              <p>CORONOVIRUS</p>
              <h3>Know the facts about the corono virus</h3>
            </div>

            <div className="articlecard">
              <a href="https://www.practo.com/healthfeed/eating-right-to-build-immunity-against-cold-and-viral-infections-40908/post">

                <img className="articleimg" src="vitamins.jpg"></img>
              </a>
              <p>NUTRIRION</p>
              <h3>Boost your immunity with good nutrition</h3>
            </div>

          </div>
          
        
        <hr></hr>


      </div>
      <div id="carouselExampleFade" class="MScorousel carousel slide carousel-fade">
            <div class="carousel-inner">
              <div class="carousel-item active MScorouselcard">
                <h1>What our users have to say.</h1>
                <p>Very helpful. Far easier than doing the slot booking physically</p>
              </div>
              <div class="carousel-item  MScorouselcard">
                <h1>What our users have to say.</h1>
                <p>Very Good app easy to access and services provided are easy to access and very effective</p>
              </div>
              <div class="carousel-item  MScorouselcard">
                <h1>What our users have to say</h1>
                <p></p>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
    <FooterPage/>
    </>
  );
}
