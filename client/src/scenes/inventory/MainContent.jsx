

import React from 'react';
import Container from "../../components/Container";
import { Link } from "react-router-dom";

const MainContent = () => {
  return (
    <main>
      {
      /* Your main content goes here */
      
      <main>
        <h1>Inventory</h1>

        <Container class1="main-content-wrapper-1 py-5">

        <div class="analyse">

        <Link to="additems">
            <div class="add_items">
              <div class="status">
                
                  <div class="info">
                    <h2>Add Items</h2>
                  </div>
                  <div class="progresss">
                    <img src="assets/6324813.png" alt="" />
                  </div>
                
              </div>
            </div>
        </Link>


        <Link to="releaseitems">

        <Link to="/release-items">

            <div class="release_items">
              <div class="status">
                

                  <div class="info">
                    <h2>Release Items</h2>
                  </div>
                  <div class="progresss">
                    <img src="assets/6324813.png" alt="" />
                  </div>

                
              </div>
            </div>
        </Link>

        <Link to="createevent">

        <Link to="/create-event">

            <div class="create_event">
                <div class="status">
                  

                    <div class="info">
                      <h2>Create Event</h2>
                    </div>
                    <div class="progresss">
                      <img src="assets/12342931.png" alt="" />
                    </div>

                  
                </div>
              </div>
        </Link>


              <div class="generate_report">
                <div class="status">
                  

                    <div class="info">
                      <h2>Generate Report</h2>
                    </div>
                    <div class="progresss">
                      <img src="assets/2415836.png" alt="" />
                    </div>

                  
                </div>
              </div>

              

          </div>

          </Container>

      </main>
      
      }
    </main>
  );
}

export default MainContent;
