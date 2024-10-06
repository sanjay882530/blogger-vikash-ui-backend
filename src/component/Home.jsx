import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdb-react-ui-kit";
import ImageCard from "./ImageCard";
import ImageSlide from "./ImageSlide";
import Notice from "./Notice";
import "./Home.css";

function Home() {
  return (
    <div className="container-color ">
      <ImageSlide />
      <Notice />
      <ImageCard />

      <MDBContainer className="my-5 gradient-bg-home">
        <MDBCard className="p-4 gradient-bg-home">
          <MDBRow className="align-items-center">
            {/* Image on one side */}
            {/* <MDBCol md="3">
              <img 
                src="/itcsanjay.jpeg" 
                alt="Descriptive" 
                className='img-fluid rounded'
              />
            </MDBCol> */}

            {/* Form and description on the other side */}
            <MDBCol md="6">
              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h2 className="text-4xl font-bold mb-4">
                  How to Write a Blog Post: A Step-by-Step Guide
                </h2>

                <h3 className="text-xl">1. Choose a Topic</h3>
                <ul className="info-points">
                  <li>
                    Select a subject you're knowledgeable about or passionate
                    about
                  </li>
                  <li>Consider your audience's interests and needs</li>
                  <li>Research current trends in your niche</li>
                </ul>

                <h3 className="text-xl">2. Research Your Topic</h3>
                <ul className="info-points">
                  <li>Gather information from reliable sources</li>
                  <li>Take notes on key points and interesting facts</li>
                  <li>Look for unique angles or perspectives on the topic</li>
                </ul>

                <h3 className="text-xl">3. Create an Outline</h3>
                <ul className="info-points">
                  <li>Develop a clear structure for your post</li>
                  <li>Include an introduction, main points, and conclusion</li>
                  <li>Organize your ideas in a logical flow</li>
                </ul>
                <h3 className="text-xl">4. Write a Compelling Title</h3>
                <ul className="info-points">
                  <li>Make it attention-grabbing and descriptive</li>
                  <li>
                    Consider using numbers, questions, or strong statements
                  </li>
                  <li>Aim for 60 characters or less for SEO purposes</li>
                </ul>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Home;
