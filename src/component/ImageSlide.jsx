import React, { useState, useEffect } from "react";
import "./ImageSlide.css";
import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdb-react-ui-kit";
export default function ImageSlide() {
  const [slideIndex, setSlideIndex] = useState(0);

  // Automatically move to the next slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => {
        let slides = document.getElementsByClassName("mySlides");
        return (prevIndex + 1) % slides.length;
      });
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Function to show the current slide
  const showSlides = () => {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; // Hide all slides
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", ""); // Remove "active" from all dots
    }

    slides[slideIndex].style.display = "block"; // Show current slide
    dots[slideIndex].className += " active"; // Set the current dot as active
  };

  useEffect(() => {
    showSlides();
  }, [slideIndex]);

  return (
    <MDBContainer className="my-5">
      <MDBCard className="p-4">
        <MDBRow className="align-items-center">
          <div className="mySlides fade" style={{ display: "block" }}>
            <div className="numbertext">1 / 4</div>
            <img src="img1.jpg" alt="Slide 1" />
            <div className="text">Caption Text</div>
          </div>

          <div className="mySlides fade">
            <div className="numbertext">2 / 4</div>
            <img src="img2.jpg" alt="Slide 2" />
            <div className="text">Caption Two</div>
          </div>

          <div className="mySlides fade">
            <div className="numbertext">3 / 4</div>
            <img src="img3.jpg" alt="Slide 3" />
            <div className="text">Caption Three</div>
          </div>

          <div className="mySlides fade">
            <div className="numbertext">4 / 4</div>
            <img src="img4.jpg" alt="Slide 4" />
            <div className="text">Caption Four</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}
