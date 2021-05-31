import React, { Component } from "react";

export default class MultipleImageComponent extends Component {

  fileArray = [];

  constructor(props) {
    super(props)
    this.state = {
        file: [null]
    }
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
    this.upload = this.upload.bind(this)
  }

  uploadMultipleFiles(e) {
   
    for (let i = 0; i < e.target.files.length; i++) {
          this.fileArray.push(URL.createObjectURL(e.target.files[i]))
      }
    this.setState({ file: this.fileArray })
  }

  upload(e) {
    e.preventDefault()
    console.log(this.state.file)
  }

  render() {
    return (
      <div className="container"> 
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <form>
                <div className="form-group multi-preview">
                    {(this.fileArray || []).map(url => (
                        <img src={url} alt="..." height="250" width="200"/>
                    ))}
                </div>

                <div className="form-group">
                    <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
                </div>
                <button type="button" className="btn btn-primary" onClick={this.upload}>Upload</button>
            </form >
          </div>
        </div>
      </div>
    )
  }
}