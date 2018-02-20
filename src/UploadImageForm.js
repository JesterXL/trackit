import React, { Component } from 'react';
const log = console.log;

export default class UploadIamgeForm extends Component {

    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
    }

    getBase64(file) {
        return new Promise((success, failure) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                log("reader.onload:");
              success(reader.result);
            };
            reader.onerror = function (error) {
                log("reader.onerror:", error);
              failure(error);
            };
        });
     }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        log("this.state.file:", this.state.file);
        // this.getBase64(this.state.file)
        // .then(result => {
        //     const base64result = result.split(',')[1];
        //     const data = {'image': base64result};
        //     // const url = 'http://localhost:8080/trackit/upload';
        //     const url = 'https://rkk1uvw7la.execute-api.us-east-1.amazonaws.com/prod/trackit/upload';
        //     fetch(url, {
        //         method: 'POST',
        //         body: JSON.stringify(data),
        //         headers: new Headers({
        //             'Content-Type': 'application/json'
        //         })
        //     }).then(res => res.json())
        // })
        // .then(result => {
        //     // this.fileInput.nativeElement.value = '';
        //     log("result:", result);
        // })
        // .catch(error => log("error:", error));

        // encodeURIComponent
        const file = this.state.file;
        this.getSignedURL(file);
      }

    getSignedURL(file) {
        const url = `http://localhost:5000/sign-s3?file-name=${file.name}&file-type=${file.type}`;
        return fetch(url, {
            method: 'GET'
        })
        .then(result => result.json())
        .then(result => {
            // log("result:", result);
            log("result:", result);
            return this.putImageOnS3(file, result.signedRequest, result.url);
        })
        .catch(error => {
            log("error:", error);
        });
    }

    putImageOnS3(file, signedRequest, url) {
        return fetch(signedRequest, {
            method: 'PUT',
            body: file
        })
        .then(result => {
            log("putImageOnS3::result:", result);
        })
        .catch(error => {
            log("putImageOnS3::error:", error);
        })
    }

    _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (
            <div>
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                    <input className="fileInput" 
                    type="file" 
                    onChange={(e)=>this._handleImageChange(e)} />
                    <button className="submitButton" 
                    type="submit" 
                    onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
                </form>
                <div className="imgPreview">
                    {$imagePreview}
                </div>
            </div>
        )
    }
}
