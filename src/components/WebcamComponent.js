import React from "react";
import Webcam from "react-webcam";
import Image from "react-image";

const url = "http://localhost:3001/api/v1/";

class WebcamComponent extends React.Component {
  render() {
    return (
      <div>
        <WebcamCapture />
      </div>
    );
  }
}

class WebcamCapture extends React.Component {
  constructor() {
    super();

    this.state = {
      images: [],
      currentImage: "",
      videoOn: false
    };
  }
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    console.log("capture");
    const imageSrc = this.webcam.getScreenshot();
    this.setState(
      {
        images: [...this.state.images, imageSrc]
      },
      () => this.postVideoData()
    );
  };

  startVideo = () => {
    this.setState(prevState => {
      return { videoOn: !prevState.videoOn };
    });
  };

  receiveData = () => {
    // fetch("http://localhost:3001/api/v1/users");
    // .then(res => res.json())
    // .then(json => console.log(json));
    fetch(`${url}users`)
      .then(res => res.json())
      .then(json => console.log(json));
  };

  postVideoData = () => {
    console.log("postVideoData");
    // console.log(this.state.images);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const myBody = JSON.stringify({
      user_id: 1,
      channel_id: 1,
      image_src: this.state.images[this.state.images.length - 1]
    });
    // console.log(myBody);
    fetch(`${url}video_files`, {
      method: "POST",
      headers: headers,
      body: myBody
    }).then(() => this.fetchVideoData());
  };

  fetchVideoData = () => {
    console.log("fetchVideoData");
    fetch(`${url}video_files`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          currentImage: json.data[json.data.length - 1].attributes["image-src"]
        })
      )
      .then(() => console.log(this.state.currentImage));
  };

  render() {
    // console.log(this.state);
    return (
      <div>
        <button onClick={this.startVideo}>
          {!this.state.videoOn ? "Start video" : "End Video"}
        </button>
        {this.state.videoOn ? (
          <div>
            <div>
              <Webcam
                audio={false}
                height={350}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={350}
              />
            </div>
            <button onClick={this.capture}>Capture photo</button>
          </div>
        ) : null}

        {this.state.currentImage !== "" ? (
          <div>
            <div>hey</div>

            <img src={this.state.currentImage} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default WebcamComponent;
