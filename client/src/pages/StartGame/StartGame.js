import React, { Component } from "react";
import { Link } from "react-router-dom";
import DrawApp from "../../components/DrawApp";
import ToggleRadio from "../../components/ToggleRadio";
import { FormBtn, Input } from "../../components/Form";
import API from "../../utils/API";
import { Container, Header, Icon, Grid, Message } from "semantic-ui-react";

class StartGame extends Component {
  state = {

    //Player 1 State/Submission Data
    title: "",
    pImg1: "",

    pImg2: "",
    id: "",
    mongoTestImg: "",
    private:false
  };


  //Submit button press function
  handleMuralSubmit = event => {
    event.preventDefault();

    //Get current canvas
    let canvasDownload = document.getElementById("canvas").toDataURL("image/jpeg", .3);

    //Save canvas to state
    this.setState({
      pImg1: canvasDownload
    });

    //Send All user 1 info to mongo
    API.createMural({
      title: this.state.title,
      pImg1: canvasDownload,
      private:false


      //Take the returned data and as a demonstration of pulling info from mongo and rendering it, add this res.data stuff to the current state
    }).then(res =>
      this.setState({ pImg2: res.data.pImg1, title: res.data.title, id: res.data._id,private:res.data.private })

    )
      //Mongo Error handling
      .catch(err => console.log((err))
      )
  };

  //Title input form handling
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
handleOptionChange=event=>{
  if(this.state.private===false){
  this.setState({private:true});
  }else if(this.state.private===true){
    this.setState({private:false});
  }
  console.log(this.state.private)
}
  gameUrl = () => ("localhost:3000/game/" + this.state.gameId)

  render() {
    return (
      <div>
        <Container>
          <Input
            placeholder="Mural Title"
            value={this.state.title}
            name="title"
            onChange={this.handleInputChange}
          />
          <ToggleRadio onChange={this.handleOptionChange} value={this.state.private} label=" Make my mural private" />
          <DrawApp />
          <FormBtn onClick={this.handleMuralSubmit}>Submit Drawing</FormBtn>
        </Container>
        <p>IMG A:</p>
        <img src={this.state.pImg1} />
        <Link to={`/game/${this.state.id}`}> <p> Link to the game </p>
        </Link>
        <p>IMG B Image and  Title Loaded: {this.state.title}</p>
        <img src={this.state.pImg2} />
        <p>mongodblink.com/{this.state.id}</p>
      </div>
    );
  }
}

export default StartGame;
