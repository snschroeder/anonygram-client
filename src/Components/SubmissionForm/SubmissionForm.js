import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import ImageContext from '../../contexts/ImageContext';
import './SubmissionForm.css';
import config from '../../config';
import { AddToPhotos, Close } from '@material-ui/icons';
import TokenService from '../../services/token-service';

class SubmissionForm extends Component {
  static contextType = ImageContext;

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      image: null,
      image_text: '',
      loading: false,
      error: null,
      uploading: false,
    };
  }

  imageSelectHandler = (e) => {
    const { clearAlert } = this.context;
    document.body.style.overflow = 'hidden'
    this.setState({
      image: e.target.files[0],
      isActive: true
    }, () => {
      document.getElementById('your-image').src = window.URL.createObjectURL(this.state.image)
    });
    e.target.value = null;
    clearAlert();
  };

  imageTextHandler = (e) => {
    this.setState({
      image_text: e.target.value,
    });
  };

  imageDragHandler = (file) => {
    const { clearAlert } = this.context;
    document.body.style.overflow = 'hidden'
    this.setState({
      image: file,
      isActive: true
    }, () => {
      document.getElementById('your-image').src = window.URL.createObjectURL(this.state.image)
    });
    clearAlert();
  };

  onSubmitImageUploader = (e) => {
    e.preventDefault();
    const { setAlert } = this.context;

    //Start loading spinner
    this.setState({ loading: true });
    const formData = new FormData();
    formData.append('someImage', this.state.image);
    formData.append('image_text', this.state.image_text);
    formData.set('latitude', this.props.userLocation.lat);
    formData.set('longitude', this.props.userLocation.long);

    const userAuth = TokenService.hasAuthToken()
      ? { Authorization: `Bearer ${TokenService.getAuthToken()}` }
      : {};

    fetch(`${config.API_ENDPOINT}/api/images`, {
      method: 'POST',
      body: formData,
      headers: userAuth,
    })
      .then((res) => {
        //Remove loading spinner
        this.setState({ loading: false });
        document.body.style.overflow = 'unset'
        if (res.status === 400) {
          setAlert('Sorry, that content is not permitted');
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .then((resJson) => {
        const newImg = resJson;
        this.props.updateNewContent(newImg);
        this.setState({ isActive: false, image: null, image_text: '', error: null });
        setAlert(null);
      })
      .catch((e) => {
        this.setState({
          error: e.error,
        });
      });
  };

  resetState = () => {
    // restore scroll when setting form's activeness back to default
    // and remove the overlay
    document.body.style.overflow = 'unset'
    this.setState({ image: null, image_text: '', isActive: false });
  };

  render() {
    return (
      <>
      {this.state.isActive && (<div className="SubmissionForm__overlay" onClick={this.resetState}>

      </div>)}
      <div className={`SubmissionForm ${this.state.isActive && 'hasImage'}`}>
        {/* Display loading spinner if loading */}
        {this.state.loading && (
            <div className='loader-container'>
              <div className="loader"></div>
            </div>
          )
        }

        {/* 
          component utilizing hooks to detect dropped files 
          while users are on desktop applications
           */}
        <Dropzone onDrop={(file) => this.imageDragHandler(file[0])}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <form
              {...getRootProps()}
              className="SubmissionForm__form"
              encType="multipart/form-data"
              onSubmit={this.onSubmitImageUploader}
            >
              <input
                {...getInputProps()}
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                onChange={this.imageSelectHandler}
                name="someImage"
                ref={(imageInput) => (this.imageInput = imageInput)}
              />
              {isDragActive && <p className="SubmissionForm__drag--active">Nice pic!</p>}
              
              {!this.state.image ? (
                !isDragActive && (
                  <>
                    <button
                      type="button"
                      className="SubmissionForm__button mobile green"
                      onClick={() => this.imageInput.click()}
                    >
                      <AddToPhotos fontSize="large" />
                    </button>
                    {this.props.parent === 'Header' && (
                      <button
                      type="button"
                      className='SubmissionForm__button laptop'
                      onClick={() => this.imageInput.click()}
                    >
                      <AddToPhotos fontSize="default" /><div className='button-text Aramanth'>Add Post</div>
                    </button>
                    )}
                  </>
                )
              ) : (
                <>
                  <button onClick={() => this.resetState()} className='SubmissionForm__button close'><Close /></button>
                  <img className='SubmissionForm__img' id='your-image' alt='uploaded content' />
                  <label className='SubmissionForm__label' htmlFor="text">Caption Image</label>
                  <input className='SubmissionForm__input' id="text" type="text" onChange={this.imageTextHandler} />
                  <button
                    className="SubmissionForm__button hasImage green"
                    type="reset"
                    onClick={() => this.resetState()}
                  >
                    Cancel
                  </button>
                  <button className="SubmissionForm__button hasImage green" type="submit" value="Upload">
                    Upload
                  </button>
                </>
              )}
            </form>
          )}
        </Dropzone>
      </div>
      </>
    );
  }
}

export default SubmissionForm;
